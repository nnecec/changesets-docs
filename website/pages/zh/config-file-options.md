# 配置 Changesets

Changesets 提供了轻量配置选项，主要用于修改默认工作流时使用。这些配置存储在 `.changeset/config.json` 文件中。默认配置如下：

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

> 注意:`linked`、`fixed`、`updateInternalDependencies`、`bumpVersionsWithWorkspaceProtocolOnly` 和 `ignore` 选项仅用于 monorepo 中的行为。

## `commit` (布尔值，或作为模块路径的 `string` 类型，或数组类型 `[modulePath: string， options: any]`)

此选项用于设置 `changeset add` 和 `changeset version` 命令是否也通过 git 添加和提交更改的文件，以及如何为它们生成提交消息。

默认情况下，我们不提交文件，而是让用户提交文件。当设为 `true` 时，我们使用默认的提交消息生成器(`["@changesets/cli/commit", { "skipCI": "version" }]`)。当设为字符串和选项数组时，可指定加载提交消息生成函数的路径。路径对应的文件期望导出以下之一或两者：

```
{
  getAddMessage，
  getVersionMessage
}
```

如果缺少任一方法，我们则不会为 `commit` 命令提交改动文件。

您可以使用以下方式指定自定义提交消息生成器:

```json
{
  "commit": ["../scripts/commit.js", { "customOption": true }]
}
```

这与 [changelog 生成器函数的工作方式](#changelog-false-or-a-path) 类似。

## `access` (`restricted` | `public`)

这设置发布包的方式 - 如果 `access: "restricted"`，包将作为私有发布，需要登录 npm 帐户并拥有访问权限才能安装。如果 `access: "public"`，包将可在公共 registry 中使用。

默认情况下，npm 会将 scoped npm 包发布为 `restricted` - 所以为了确保您不会意外公开发布代码，我们默认为 `restricted`。在大多数情况下，会被设置为 `public`。

可以通过在包的 `package.json` 中设置 `access` 来覆盖默认设置。

如果要阻止将包发布到 npm，请在该包的 `package.json` 中设置 `private: true`

## `baseBranch` (git 分支名称)

将与 changeset 进行比较的基分支。许多内部 changeset 特性使用 git 将当前 changeset 与另一个分支进行比较。这个默认基分支将用于这些比较。通常应该设置为您将要合并更改的主分支。接受此信息的命令有一个 `--since` 选项，可用于覆盖此信息。

> 为了帮助创造一个更具包容性的编码体验，我们建议将您的 `master` 分支重命名为 `main`。

## `ignore` (包名称的数组)

此选项允许您指定一些即使在 changeset 中引用也不会发布的包。相反，这些 changeset 将被跳过，直到它们从这个数组中删除。

> 此功能旨在临时使用，以允许更改合并而不发布它们 - 如果要完全停止发布包，请在其 `package.json` 中设置 `private: true`。

这有两个注意事项。

1. 如果被 ignore 的包在未 ignore 的包的 changeset 中被提到，发布将失败。
2. 如果作为发布的一部分，ignore 的包需要更新其中一个依赖项，发布将失败。

这些限制存在是为了确保您的仓库或发布的代码不会进入被破坏状态。有关发布复杂性的更多详细信息，请查看我们的指南[monorepo 中的发布问题](/problems-publishing-in-monorepos)。

> 注意:您还可以按照 [micromatch](https://www.npmjs.com/package/micromatch) 格式提供 glob 表达式来匹配包。

## `fixed` (包名称数组的数组)

此选项可用于声明哪些包作为一组同时进行版本升级和发布。例如，如果您有一个 `@changesets/button` 组件和一个 `@changesets/theme` 组件，并且您希望确保当一个被升级到 `1.1.0` 时，另一个也被升级到 `1.1.0`，而不管它是否有任何变更。要实现这一点，您可以通过以下配置:

```json
{
  "fixed": [["@changesets/button", "@changesets/theme"]]
}
```

使用此选项前，您应该阅读 [fixed packages](/fixed-packages) 的文档，以完全理解实现和影响。

## `linked` (包名称数组的数组)

此选项可用于声明包应该“共享”一个版本，而不是完全独立地进行版本控制。例如，如果您有一个 `@changesets/button` 组件和一个 `@changesets/theme` 组件，并且您希望确保当一个被升级到 `2.0.0` 时，另一个也被升级到 `2.0.0`。要实现这一点，您会有以下配置:

```json
{
  "linked": [["@changesets/button", "@changesets/theme"]]
}
```

使用此选项前，您应该阅读 [linked packages](/linked-packages) 的文档，以完全理解实现和影响。

> 注意:这与其他一些工具不同，其他工具会确保每当发布任何包时，所有其他包也都使用相同的版本发布。

## `updateInternalDependencies`

此选项设置当正在依赖的包发生变化时，是否应更新所依赖的版本。为了使这更容易理解，这里有一个示例:

假设我们有两个包，一个依赖另一个:

```
pkg-a @ version 1.0.0
pkg-b @ version 1.0.0
  depends on pkg-a at range `^1.0.0
```

假设我们正在发布 `pkg-a` 和 `pkg-b` 的 patch 版本 - 此标志是用于确定我们是否更新 `pkg-b` 依赖 `pkg-a` 的方式。

如果该选项设置为 `patch`，我们将更新依赖关系，所以现在我们会有:

```
pkg-a @ version 1.0.1
pkg-b @ version 1.0.1
  depends on pkg-a at range `^1.0.1
```

但是，如果该选项设置为 `minor`，那么它所依赖的只会在出现 minor 更改时才会更新，所以状态将是:

```
pkg-a @ version 1.0.1
pkg-b @ version 1.0.1
  depends on pkg-a at range `^1.0.0
```

使用 `minor` 允许用户更主动地控制自己的重复使用包，并且如果您有许多相互连接的包，他们将能够安装更少的版本。使用 `patch` 将意味着用户会更频繁地使用更多更新的代码，但可能会导致重复使用问题。

如果超出已存在的版本范围声明，Changesets 将总是更新依赖关系。

> ⚠ 注意:这仅适用于当前版本中已经发布的包。如果 A 依赖 B，我们只发布 B，那么 A 不会被升级。

## `changelog` (布尔值或路径)

此选项用于设置应该如何为包生成变更日志。如果它是 `false`，则不会生成变更日志。将其设置为字符串可以指定从中加载变更日志生成函数的路径。它需要是一个导出以下内容的文件:

```
{
  getReleaseLine，
  getDependencyReleaseLine
}
```

除了默认值，您还可以使用 `@changesets/changelog-git`，它会在变更日志中添加提交的链接，或者使用 `@changesets/changelog-github`，它需要 github 认证信息，并包含对添加 changeset 的人的感谢消息以及相关 PR 的链接。

您可以使用以下方式指定我们的 github 变更日志生成器:

```json
{
  "changelog": ["@changesets/changelog-github", { "repo": "<org>/<repo>" }]
}
```

有关这些函数的更多详细信息以及编写自己的信息，请参见 [changelog-functions](/modifying-changelog-format)

## `bumpVersionsWithWorkspaceProtocolOnly` (布尔值)

确定 Changesets 是否仅更新使用工作区协议且属于工作区的包的依赖范围。

## `snapshot` (对象或 undefined)

默认值:`undefined`

### `useCalculatedVersion` (可选布尔值)

默认值:`false`

当使用 `changesets version --snapshot` 时，默认行为是使用 `0.0.0` 作为快照版本的基础版本。

设置 `useCalculatedVersion: true` 将更改默认行为，并使用基于 changeset 文件计算出的版本。

### `prereleaseTemplate` (可选字符串)

默认值:`undefined` (参见下面的注释)

使用带占位符的模板配置快照版本的后缀。

**可用的占位符:**

您可以使用以下占位符来自定义快照版本:

- `{tag}` - 快照的名称，如 `--snapshot something` 中指定
- `{commit}` - Git 提交 ID
- `{timestamp}` - 发布时间的 Unix 时间戳
- `{datetime}` - 发布的日期和时间(14 个字符，例如 `20211213000730`)

> 注意:如果使用空标记名 `--snapshot`，则不能使用 `{tag}` 作为占位符 - 这将导致错误。

**默认行为**

如果您未指定 `prereleaseTemplate`，默认行为将回退到使用以下模板:`{tag}-{datetime}`，如果标记为空(`--snapshot` 没有标记名)，它将只使用 `{datetime}`。
