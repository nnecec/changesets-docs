# 命令行选项

> 该文档翻译已由[nnecec](https://github.com/nnecec)修订

命令行选项是与 changesets 交互的主要方式，它提供了四个主要命令。如果你想知道我们如何推荐使用命令来设置和管理 changesets，可以查看我们的 [changesets 使用入门](/)。

- init
- add [--empty][--open]
- version [--ignore, --snapshot]
- publish [--otp=code, --tag]
- status [--since=master --verbose --output=JSON_FILE.json]
- pre [exit|enter {tag}]
- tag

最重要的命令是 `add`，用于贡献者添加有关其变更的信息，`version` - 使用 `add` 生成的 changesets 来更新包版本和变更日志，然后是 `publish`，它将变更发布到 npm。

## `init`

```bash
changeset init
```

此命令用于设置 `.changeset` 文件夹，生成自述文件和配置文件。配置文件包含了默认选项及其注释说明。您只需要在开始配置 changesets 时，运行一次这个命令。

## `add`

```bash
changeset add
```

或者只运行

```bash
changeset
```

这是用户与 changesets 交互的主要命令。

这个命令会问你一系列问题，首先关于你想发布哪些包，然后是每个包的语义化版本递增类型，然后它会要求你总结整个 changeset。最后一步它会展示将要生成的 changeset，并确认您是否要添加它。

一旦确认，这个 changeset 将被写入一个 Markdown 文件中，该文件包含摘要以及 YAML 前置数据，这些数据用来存储将要发布的包及它们对应的语义化版本递增类型。

一个由 @changesets/cli 生成的 major 版本变更 changeset 看起来像这样:

```mdx
---
"@changesets/cli": major
---

对主要更改的描述。
如果你想在生成后修改此文件，完全没有问题，或者如果你想自己编写 changeset 文件，那也可以。
```

- `--empty` - 如果没有包被升级，则允许创建一个空的 changeset，通常只有在您有阻止合并的 CI 时才需要。

```bash
changeset --empty
```

使用 empty 标志创建的 changeset 看起来像这样:

```mdx
---
---
```

如果在配置中设置了 commit 选项，该命令将添加更新的 changeset 文件，然后提交它们。

- `--open` - 在外部编辑器中打开创建的 changeset

## version

```bash
changeset version
```

这是负责发布包的两个命令之一。version 命令获取已生成的 changesets，并更新包的版本和依赖项，以及编写变更日志。它负责在发布到 npm 之前对版本的所有文件更改。

> 我们建议在运行 publish 之前，确保从这个命令生成的更改被合并回主分支。

Version 有两个选项，`ignore` 和 `snapshot`:

```bash
changeset version --ignore PACKAGE_NAME
```

此命令用于允许您跳过发布的包。这允许您对仓库执行部分发布。使用 ignore 具有一些安全隐患:

1. 如果忽略的包在包含未被忽略的包的 changeset 中，则发布将会失败。
2. 如果忽略的包需要将其依赖项之一作为发布的一部分更新。

这些限制存在是为了确保您的仓库或发布的代码不会处于被破坏的状态。有关发布更多的信息，请查看我们的指南 [monorepo 中的发布问题](/problems-publishing-in-monorepos)。

```bash
changeset version --snapshot
```

snapshot 用于一种特殊类型的发布以进行测试 - 它创建具有标记的临时版本，而不是从当前语义化版本范围更新版本。在阅读 [快照版本文档](/snapshot-releases) 文档前，您不应使用它。

## publish

```bash
changeset publish [--otp={token}]
```

此命令将变更发布到 npm，并创建 git 标签。。它的工作方式是对每个包进行检查，确认其 package.json 文件中的版本是否已发布于 npm，如果未发布，则运行 `npm publish`。如果您正在使用 `pnpm` 作为包管理器，它会自动检测并使用 `pnpm publish`。

由于此命令假定最后一次提交为发布提交，所以在调用 version 和 publish 之间不应有任何其他提交变更的操作。这两个命令分开执行是为了让你能检查将要发布的更改是否准确无误。

`--otp={token}` - 若你在 npm 启用了 auth 和 writes 权限控制，该命令可以提供一次性密码。若未使用 --otp 选项提供 OTP，CLI 也会提示你输入。

`--tag TAGNAME` - 对于已发布的包，提供的标签选项将代替 `latest` 使用，这样可发布用于测试和验证其他版本标签而不是主 tag。通常与 [快照版本](/snapshot-releases) 一起使用。

### Git 标签

拥有发布的 git 标签很有用，这样用户在寻找那个时间的代码时可以找到它们。我们在发布期间在 git 中生成标签，但是如果要使它们可用，则需要将它们推送回去。我们建议在发布后运行:

```bash
git push --follow-tags
```

## status

```bash
status [--verbose] [--output={filePath}] [--since={gitTag}]
```

status 命令提供关于当前存在的 changesets 的信息。如果没有 changesets 存在，它将以错误状态代码退出。

- `--verbose` - 如果想要知道新版本号，并获取相关 changeset 摘要的链接，请使用。
- `--output` - 允许你将状态输出的 JSON 对象写入文件，以供其他工具(如 CI)使用。
- `--since` - 仅显示自特定分支或 git 标签(如 `main` 或最新版本的 git 哈希值)之后的 changesets 信息。虽然这可以用来添加对 changesets 的 CI 检查，但我们不建议这样做。我们建议使用 [changeset bot](https://github.com/apps/changeset-bot) 来检测缺少 changesets 的 PR，因为在 GitHub 上，并非所有 PR 都需要 changesets。

> 注意:`status` 在运行 `version` 或 `publish` 期间会失败。如果要在版本升级和发布时获取 changeset 状态，需要在运行 `version` 之前立即运行它。

## pre

```bash
changeset pre [exit|enter {tag}]
```

`pre` 命令进入和退出预发布模式。该命令不执行任何实际的版本控制，在进行预发布时，应该运行 `changeset pre enter next`(或使用其他标签，该标签即版本中的标签，也是 npm 分发标签)，然后使用 `changeset version` 和 `changeset publish` 执行正常的发布过程。有关 pre 命令的更多信息，请参阅预发布文档 [预发布文档](/prereleases)。

> 注意:预发布是一个非常复杂的特性。许多 changesets 帮助你规避的风险在此过程中可能不再有效。我们建议在使用前，你不仅要阅读[monorepo 中的发布问题](/problems-publishing-in-monorepos)，还要清楚地理解如何进入和退出预发布流程。另外，对于较为简单的场景，你可能更倾向于使用 [快照版本](./snapshot-releases)。

## tag

```bash
changeset tag
```

tag 命令为所有包的当前版本创建 git 标签。创建的标签与 [`changeset publish`](#publish) 创建的标签相同，但是 `tag` 命令不会向 npm 发布任何内容。

这一功能在使用其他工具（比如 pnpm publish -r）替代 changeset 发布包的场景下非常有用。如果已经执行了 `changeset publish`，那么就没有必要再运行 `changeset tag` 了。

在 monorepo 中的 git 标签基于每个包的 `package.json` 的当前版本以 `pkg-name@version-number` 的格式创建。需要注意的是，在单包仓库中，git 标签将在版本号前会包含一个 `v`，例如 `v1.0.0`。通常在 `changeset tag` 之前运行 [`changeset version`](#version)，以便在创建 git 标签之前更新 `package.json` 版本。
