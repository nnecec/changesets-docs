# 配置 Changesets

> 该文档翻译已由[@nnecec](https://github.com/nnecec)修订

Changesets 的配置选项很少。这些选项主要用于当你需要更改默认工作流时使用。它们存储在 `.changeset/config.json` 中。我们的默认配置是：

```json
{
  "commit": false,
  "updateInternalDependencies": "patch",
  "linked": [],
  "access": "restricted",
  "baseBranch": "master",
  "ignore": [],
  "changelog": "@changesets/cli/changelog"
}
```

> 注意：`linked`、`fixed`、`updateInternalDependencies`、`bumpVersionsWithWorkspaceProtocolOnly` 和 `ignore` 选项仅用于 monorepo 中的行为。

## `commit` (`boolean`，或模块路径作为 `string`，或像 `[modulePath: string, options: any]` 这样的元组)

此选项用于设置 `changeset add` 命令和 `changeset version` 命令是否也会使用 git 添加并提交更改的文件，以及如何为它们生成提交信息。

默认情况下，我们不会提交文件，而是留给用户去提交文件。如果设置为 `true`，我们将使用默认的提交信息生成器 (`["@changesets/cli/commit", { "skipCI": "version" }]`)。将其设置为字符串和选项元组会指定一个路径，我们从该路径加载提交信息生成函数。它期望是一个导出以下一个或两个方法的文件：

```
{
  getAddMessage,
  getVersionMessage
}
```

如果其中一个方法不存在，则我们不会为该命令提交更改的文件。

你可以通过以下方式指定自定义的提交信息生成器：

```json
{
  "commit": ["../scripts/commit.js", { "customOption": true }]
}
```

这与 [changelog 生成函数的工作方式](#changelog-false-or-a-path)类似。

## `access` (`restricted` | `public`)

这设置了包的发布方式——如果 `access: "restricted"`，包将被私有发布，需要登录具有安装权限的 npm 账户。如果 `access: "public"`，包将在公共注册表上可用。

默认情况下，npm 会将作用域内的 npm 包作为 `restricted` 发布——因此为了确保你不会意外地公开发布代码，默认设置为 `restricted`。对于大多数情况，你可能想要将其设置为 `public`。

你可以在特定包的 `package.json` 中设置 `access` 来覆盖这一设置。

如果你想阻止一个包被发布到 npm，在该包的 `package.json` 中设置 `private: true`

## `baseBranch` (git 分支名称)

Changesets 将进行比较的分支。许多内部 Changesets 功能使用 git 将当前 Changesets 与另一个分支进行比较。这决定了将使用哪个分支进行这些比较。通常应将其设置为你合并更改的主要分支。使用此信息的命令接受一个 `--since` 选项，可以用它来覆盖这个设置。

> 为了帮助使编码体验更具包容性，我们建议将你的 `master` 分支名称更改为 `main`。

## `ignore` (包数组)

此选项允许你指定一些即使在 Changesets 中引用也不会发布的包。相反，那些 Changesets 将被跳过，直到它们从这个数组中移除。

> **此功能旨在临时使用，以便在不发布的情况下合并更改**——如果你完全不想发布一个包，请在它的 `package.json` 中设置 `private: true`。

有两个注意事项。

1. 如果包在一个也包含未被忽略的包的 Changeset 中被提及，发布将会失败。
2. 如果包需要更新其依赖之一作为发布的一部分。

这些限制存在是为了确保你的仓库或已发布代码不会处于损坏状态。有关发布的更多细节，请参阅我们关于[monorepo 发布问题](/problems-publishing-in-monorepos)的指南。

> 注意：你还可以提供通配符表达式来匹配包，根据 [micromatch](https://www.npmjs.com/package/micromatch) 格式。

## `fixed` (包名数组的数组)

此选项可用于声明包应该一起进行版本升级和发布。例如，如果你有一个 `@changesets/button` 组件和一个 `@changesets/theme` 组件，并且你想确保当一个升级到 `1.1.0` 时，另一个也升级到 `1.1.0`，无论它是否有任何更改。为此，你的配置应该是：

```json
{
  "fixed": [["@changesets/button", "@changesets/theme"]]
}
```

如果你想使用此选项，你应该阅读 [固定包](/fixed-packages) 的文档以充分理解实现和影响。

## `linked` (包名数组的数组)

此选项可用于声明包应该'共享'一个版本，而不是完全独立地进行版本控制。例如，如果你有一个 `@changesets/button` 组件和一个 `@changesets/theme` 组件，并且你想确保当一个升级到 `2.0.0` 时，另一个也升级到 `2.0.0`。为此，你的配置应该是：

```json
{
  "linked": [["@changesets/button", "@changesets/theme"]]
}
```

如果你想使用此选项，你应该阅读 [链接包](/linked-packages) 的文档以充分理解实现和影响。

> 注意：这并不像其他工具所做的那样，确保当任何一个包被发布时，所有其他包也以相同的版本发布。

## `updateInternalDependencies`

此选项设置当一个被依赖的包发生改变时，是否应该更新它所依赖的版本。为了更好地理解这一点，这里有一个例子：

假设我们有两个包，一个依赖于另一个：

```
pkg-a @ 版本 1.0.0
pkg-b @ 版本 1.0.0
  依赖于 pkg-a 在范围 `^1.0.0
```

假设我们正在发布 `pkg-a` 和 `pkg-b` 的补丁版本——这个标志用于确定我们是否更新 `pkg-b` 对 `pkg-a` 的依赖。

如果选项设置为 `patch`，我们将更新依赖关系，因此我们现在有：

```
pkg-a @ 版本 1.0.1
pkg-b @ 版本 1.0.1
  依赖于 pkg-a 在范围 `^1.0.1
```

然而，如果选项设置为 `minor`，只有在发生次要版本更改时才会更新依赖关系，因此状态将是：

```
pkg-a @ 版本 1.0.1
pkg-b @ 版本 1.0.1
  依赖于 pkg-a 在范围 `^1.0.0
```

使用 `minor` 允许使用者更积极地控制他们自己的包去重，并且如果有很多相互关联的包，可以让他们安装更少的版本。使用 `patch` 意味着使用者将更经常使用更新后的代码，但可能会导致去重问题。

如果这会导致旧的 semver 范围失效，Changesets 总是会更新依赖关系。

> ⚠ 注意：这仅适用于当前发布中已经发布的包。如果 A 依赖于 B，而我们只发布 B，那么 A 不会被升级。

## `changelog` (false 或路径)

此选项用于设置包的变更日志应该如何生成。如果它是 `false`，则不会生成变更日志。将其设置为字符串会指定一个路径，我们从该路径加载变更日志生成函数。它期望是一个导出以下内容的文件：

```
{
  getReleaseLine,
  getDependencyReleaseLine
}
```

除了默认的之外，你可以使用 `@changesets/changelog-git`，它会在变更日志中添加提交链接，或者使用 `@changesets/changelog-github`，它需要 GitHub 认证，并包括对添加 Changeset 的人的感谢信息以及相关 PR 的链接。

你可以通过以下方式指定我们的 GitHub 变更日志生成器：

```json
{
  "changelog": ["@changesets/changelog-github", { "repo": "<org>/<repo>" }]
}
```

有关这些函数的更多详情以及如何编写自己的信息，请参阅[changelog-functions](/modifying-changelog-format)。

## `bumpVersionsWithWorkspaceProtocolOnly` (布尔值)

决定 Changesets 是否只应该为使用 workspace 协议的包更新依赖范围。

## `snapshot` (对象或 undefined)

默认值：`undefined`

### `useCalculatedVersion` (可选布尔值)

默认值：`false`

当使用 `changesets version --snapshot` 时，默认行为是使用 `0.0.0` 作为快照发布的基准版本。

设置 `useCalculatedVersion: true` 将改变默认行为，并将使用基于 Changeset 文件计算出的版本。

### `prereleaseTemplate` (可选字符串)

默认值：`undefined`（见下文说明）

配置快照发布的后缀，使用带有占位符的模板。

**可用占位符：**

你可以使用以下占位符来自定义快照发布版本：

- `{tag}` - 快照标签的名称，如在 `--snapshot something` 中指定
- `{commit}` - Git 提交 ID
- `{timestamp}` - 发布时间的 Unix 时间戳
- `{datetime}` - 发布的日期和时间（14 个字符，例如 `20211213000730`）

> 注意：如果你使用带有空标签名的 `--snapshot`，则不能使用 `{tag}` 作为占位符——这将导致错误。

**默认行为**

如果你没有指定 `prereleaseTemplate`，默认行为将回退到使用以下模板：`{tag}-{datetime}`，而在标签为空（`--snapshot` 没有标签名）的情况下，它将只使用 `{datetime}`。
