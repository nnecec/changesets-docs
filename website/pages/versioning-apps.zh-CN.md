# 管理应用程序或非 npm 包

Changesets 也可以用于管理应用程序版本或非 npm 包（例如 dotnet NuGet 包、ruby gems、docker 镜像等）。

唯一的要求是项目必须有一个 package.json 文件，以管理仓库内的版本和依赖关系。

要启用此功能，请在 `.changesets/config.json` 文件中将 `privatePackages` 设置为 `{ version: true, tag: true }`。默认情况下，changesets 只会更新变更日志和版本（即 `{ version: true, tag: false }`）。

> **注意**
> Changesets 只对 NPM package.json 文件进行版本化，您可以通过创建工作流，在 changesets 创建的标签/发布上触发它来触发其他包格式的发布。

## 设置一个包

要使项目被 changesets 跟踪，它需要一个最小的 package.json，至少包含 `name`、`private` 和 `version`。

```json
{
  "name": "my-project",
  "private": true,
  "version": "0.0.1"
}
```
