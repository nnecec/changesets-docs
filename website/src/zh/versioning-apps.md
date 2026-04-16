# 管理应用程序或非 npm 包

> 此翻译已由[@nnecec](https://github.com/nnecec)修订

Changesets 也可以用于管理应用程序版本或非 npm 包（例如 dotnet NuGet 包、ruby gems、docker 镜像等）。

唯一的要求是项目必须有一个 `package.json` 文件来管理仓库内的版本和依赖关系。

要启用此功能，需在 `.changesets/config.json` 文件中将 `privatePackages` 设置为 `{ version: true, tag: true }`。默认情况下，Changesets 仅更新变更日志和版本（即 `{ version: true, tag: false }`）。

> **注意**
> Changesets 仅对 NPM 的 `package.json` 文件进行版本控制，你可以通过创建在 Changesets 创建标签/发布时触发的工作流来触发其他包格式的发布。

## 设置包

为了让一个项目能够被 Changesets 跟踪，它需要一个最少包含 `name`、`private` 和 `version` 的 `package.json`。

```json
{
  "name": "my-project",
  "private": true,
  "version": "0.0.1"
}
```

## 私有依赖

当一个版本化的私有包（应用）依赖于另一个被跳过的私有包（无论是通过 `ignore` 选项还是 `privatePackages.version: false`），changesets 不会要求该应用也被跳过。由于私有包不会发布到 npm，因此它们依赖于被跳过的包是安全的。

例如，如果你有一个依赖私有库 `B` 的应用 `A`，你可以忽略 `B` 同时对 `A` 进行版本控制：

```json
{
  "ignore": ["B"]
}
```

这是可行的，因为 `A` 是私有的，永远不会带着对 `B` 的过时引用发布到 npm。
