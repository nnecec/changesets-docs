# 命令行选项

命令行是与 changesets 交互的主要方式。主要有 4 个命令。如果你正在寻找我们如何建议你使用命令来设置和管理 changesets,可以查看我们的 [changesets 使用入门](./intro-to-using-changesets.md)。

- init
- add [--empty][--open]
- version [--ignore, --snapshot]
- publish [--otp=code, --tag]
- status [--since=master --verbose --output=JSON_FILE.json]
- pre [exit|enter {tag}]
- tag

最重要的命令是 `add`,用于贡献者添加有关其更改的信息,`version` - 负责使用 `add` 生成的 changesets 来更新包版本和变更日志,然后是 `publish`,它将更改发布到 npm。

## `init`

```
changeset init
```

这个命令设置 `.changeset` 文件夹。它生成一个自述文件和一个配置文件。配置文件包含默认选项和注释,说明这些选项表示什么。在设置 changesets 时,应该运行一次此命令。

## `add`

```
changeset add
```

或者只运行

```
changeset
```

这是人们与 changesets 交互的主要命令。

这个命令会问你一系列问题,首先是要发布的包,然后是每个包的语义化版本类型,然后它会要求你总结整个 changeset。最后一步将显示它将生成的 changeset,并确认您是否要添加它。

确认后,changeset 将被写入一个 Markdown 文件,其中包含摘要和用于存储要发布的包以及它们的语义化版本类型的 YAML 前言。

主版本 @changesets/cli 的 changeset 看起来像这样:

```
---
"@changesets/cli": major
---

对主要更改的描述。
如果你想在生成后修改此文件,那么完全没有问题,或者如果你想自己编写 changeset 文件,那也可以。
```

- `--empty` - 如果没有包被升级,则允许创建一个空的 changeset,通常只有在您有阻止合并的 CI 时才需要。

```
changeset --empty
```

使用 empty 标志创建的 changeset 看起来像这样:

```
---
---
```

如果在配置中设置了 commit 选项,该命令将添加更新的 changeset 文件,然后提交它们。

- `--open` - 在外部编辑器中打开创建的 changeset

## version

```
changeset version
```

这是负责发布包的两个命令之一。version 命令获取已做的 changesets,并更新包的版本和依赖项,以及编写变更日志。它负责在发布到 npm 之前对版本的所有文件更改。

> 我们建议在运行 publish 之前,确保从这个命令生成的更改被合并回基本分支。

Version 有两个选项,`ignore` 和 `snapshot`:

```
changeset version --ignore PACKAGE_NAME
```

此命令用于允许您跳过发布的包。这允许您对仓库执行部分发布。使用 ignore 具有一些安全措施:

1. 如果包在一个同时包含未忽略的包的 changeset 中被提及,发布将失败。

2. 如果发布的一部分要求其中一个依赖项被更新。

这些限制存在是为了确保您的仓库或发布的代码不会进入损坏状态。有关发布复杂性的附加信息,请查看我们的指南 [monorepo 中的发布问题](./problems-publishing-in-monorepos.md)。

```
changeset version --snapshot
```

快照用于一种特殊类型的发布以进行测试 - 它创建具有标记的临时版本,而不是从当前语义化版本范围更新版本。在不阅读 [快照版本文档](./snapshot-releases.md) 的情况下,您不应使用它。

## publish

```
changeset publish [--otp={token}]
```

这会向 npm 发布更改,并创建 git 标签。它的工作方式是进入每个包,检查其 `package.json` 中的版本是否已在 npm 上发布,如果未发布,则运行 `npm publish`。如果您使用 `pnpm` 作为包管理器,它会自动检测并使用 `pnpm publish`。

因为此命令假设最后一次提交是发布提交,所以在调用 version 和 publish 之间不要提交任何更改。这些命令是分开的,以使您能够检查发布更改是否准确。

`--otp={token}` - 如果您在 npm 上启用了 auth 和 writes,则允许您提供 npm 单次密码。如果没有用 --otp 选项提供,CLI 也会提示 OTP。

`--tag TAGNAME` - 对于已发布的包,选择的标签将代替 `latest` 使用,允许您发布用于测试和验证而不是主要使用的更改。这很可能与 [快照版本](./snapshot-releases.md) 一起使用。

### Git 标签

拥有发布的 git 标签很有用,这样人们在寻找那个时间的代码时可以找到它们。我们在发布期间在 git 中生成标签,但是如果要使它们可用,则需要将它们推送回去。我们建议在发布后运行:

```
git push --follow-tags
```

## status

```
status [--verbose] [--output={filePath}] [--since={gitTag}]
```

status 命令提供关于当前存在的 changesets 的信息。如果没有 changeset 存在,它将以错误状态代码退出。

- `--verbose` - 如果想要知道新版本,并获取相关 changeset 摘要的链接,请使用。

- `--output` - 允许你将状态输出的 JSON 对象写入文件,以供其他工具(如 CI)使用。

- `--since` - 仅显示特定分支或 git 标记(如 `main` 或最新版本的 git 哈希值)之后的 changesets 信息。虽然这可以用来添加对 changesets 的 CI 检查,但我们不建议这样做。我们建议使用 [changeset bot](https://github.com/apps/changeset-bot) 来检测缺少 changesets 的拉取请求,因为如果您在 GitHub 上,并非所有拉取请求都需要一个。

> 注意:`status` 在运行 `version` 或 `publish` 期间会失败。如果要在版本增加和发布时获取 changeset 状态,需要在运行 `version` 之前立即运行它。

## pre

```
pre [exit|enter {tag}]
```

pre 命令进入和退出预发布模式。该命令不执行任何实际的版本控制,在进行预发布时,应该运行 changeset pre enter next(或不同的标签,标签是版本和 npm 发布标签中的内容),然后使用 changeset version 和 changeset publish 执行正常的发布过程。有关 pre 命令的更多信息,请参阅预发布文档 [预发布文档](https://github.com/changesets/changesets/blob/master/docs/prereleases.md)。

> 注意:预发布是一个非常复杂的特性。Changesets 帮助您的许多安全措施将被取消。我们建议您同时阅读 [monorepo 中的发布问题](./problems-publishing-in-monorepos.md),并在使用它之前明确进入和退出预发布。您也可以更喜欢使用 [快照版本](./snapshot-releases.md) 略微不那么复杂的过程。

## tag

```
tag
```

tag 命令为所有包的当前版本创建 git 标签。创建的标签与 [`changeset publish`](#publish) 创建的标签相同,但是 `tag` 命令不会向 npm 发布任何内容。

当使用诸如 `pnpm publish -r` 之类的其他工具而不是 changeset 来发布包时,这很有用。对于执行 `changeset publish` 的情况,运行 `changeset tag` 是不必要的。

在 monorepo 中的 git 标签以 `pkg-name@version-number` 的格式创建,并基于每个包的 `package.json` 的当前版本号。请注意,在单包存储库中,git 标签将在版本号之前包含 `v`,例如 `v1.0.0`。期望在 `changeset tag` 之前运行 [`changeset version`](#version),以便在创建 git 标签之前更新 `package.json` 版本。
