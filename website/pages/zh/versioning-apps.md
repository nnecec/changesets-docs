# 管理应用程序或非 npm 包

> 该文档翻译已由[@nnecec](https://github.com/nnecec)修订

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
