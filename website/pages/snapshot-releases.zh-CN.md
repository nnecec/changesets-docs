# 快照发布

快照发布是一种在不更新版本的情况下为您的更改发布以进行测试的方法。为了实现快照发布，使用了修改后的 `version` 和修改后的 `publish` 命令。在两个过程都运行后，您将在 changesets 中拥有一个版本为 `0.0.0-{tag}-DATETIMESTAMP` 的已发布版本的包。

## 开始

按照[添加 changeset](./adding-a-changeset.md)中描述的方式创建 changeset。当您准备发布快照时，应创建一个专用的分支进行操作。

## 为您的包版本化

```bash
yarn changeset version --snapshot
```

这将应用 changesets，但是与使用下一个版本不同，所有版本都将设置为 `0.0.0-THE_TIME_YOU_DID_THIS`。

如果您想要为此版本号添加个性化部分，例如 `bulbasaur`，您可以运行

```bash
yarn changeset version --snapshot bulbasaur
```

这将将版本更新为 `0.0.0-bulbasaur-THE_TIME_YOU_DID_THIS`。

## 发布您的包

在运行 `yarn changeset version` 命令后，可以使用 `changeset publish --tag bulbasaur` 命令发布包。通过使用 `--tag` 标志，您将不会将其添加到 npm 上的 `latest` 标志中。这非常重要，因为如果不包含标签，通过 `yarn add your-package-name` 安装包的人将安装快照版本。

## 使用 `--no-git-tag` 标志

如果计划在本地发布快照版本或者在 CI 环境中从 [git tags](http://npm.github.io/publishing-pkgs-docs/updating/using-tags.html) 推送到远程，则可以在运行 `changeset publish` 时使用 `--no-git-tag` 命令行标志。

当运行 `changeset publish --no-git-tag --snapshot` 时，changesets 将跳过为已发布的快照包创建 git 标签。这意味着可以在推送稳定版本时（使用常规的 `changeset publish`），仍然可以创建 git 标签，并且可以安全地在本地发布快照版本，而不会创建不必要的标签。

## 使用快照版本

当您希望其他人测试您的快照时，他们可以将其 package.json 更新到您新发布的版本并运行安装，或者使用 `yarn add your-package-name@YOUR_TAG_OR_VERSIONS`。

对于上述示例，您可以运行

```bash
yarn add your-package-name@0.0.0-bulbasaur-THE_TIME_YOU_DID_THIS
```

或者使用标签：

```bash
yarn add your-package-name@bulbasaur
```

## 关于快照分支的处理

在几乎所有情况下，我们建议在运行 `version` 后将更改合并回主分支。但是在快照情况下，情况并非如此。我们建议不要将此次 `version` 更改推送到任何分支。这是因为快照仅用于安装，而不是表示仓库的正确发布状态。保存生成的版本和使用的标签，但不要将其推送到计划合并到主分支的任何分支，也不要将其合并到主分支。
