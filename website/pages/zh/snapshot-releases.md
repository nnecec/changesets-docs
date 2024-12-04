# 快照发布

> 该文档翻译已由[@nnecec](https://github.com/nnecec)修订

快照发布是一种在不更新版本号的情况下发布更改以供测试的方式。通过修改的 `version` 和修改的 `publish` 命令来完成快照发布。两个过程运行完毕后，你将在 Changesets 中拥有一个已发布的包版本，其版本号为 `0.0.0-{tag}-DATETIMESTAMP`。

## 开始

按照[添加变更集](./adding-a-changeset.md)中描述的方法正常创建变更集。当你准备好发布快照时，应该为此创建一个专门的分支。

## 版本化你的包

```sh npm2yarn
npx changeset version --snapshot
```

这将应用变更集，但不是使用下一个版本号，而是所有版本都将被设置为 `0.0.0-THE_TIME_YOU_DID_THIS`。

如果你想向这个版本号添加个性化部分，例如 `bulbasaur`，你可以运行

```sh npm2yarn
npx changeset version --snapshot bulbasaur
```

这将把版本更新为 `0.0.0-bulbasaur-THE_TIME_YOU_DID_THIS`。

## 发布你的包

在运行 `yarn changeset version` 命令之后，你可以使用 `changeset publish --tag bulbasaur` 命令来发布这些包。通过使用 `--tag` 标志，你不会将其添加到 npm 的 `latest` 标签上。这一点非常重要，因为如果你不包含标签，人们在使用 `yarn add your-package-name` 安装你的包时将会安装快照版本。

## 使用 `--no-git-tag` 标志

如果你打算本地发布快照版本，或者从 CI 环境推送到远程仓库时推送 [git 标签](http://npm.github.io/publishing-pkgs-docs/updating/using-tags.html)，则可以在运行 `changeset publish` 时使用 `--no-git-tag` CLI 标志。

当你运行 `changeset publish --no-git-tag --snapshot` 时，Changesets 将跳过为已发布的快照包创建 git 标签。这意味着在推送稳定版本（使用常规的 `changeset publish`）时仍然可以创建 git 标签，并且你可以安全地本地发布快照版本，而不会创建不必要的标签。

## 使用快照版本

当希望人们测试你的快照时，他们可以更新自己的 `package.json` 到你新发布的版本并运行安装命令，或使用 `yarn add your-package-name@YOUR_TAG_OR_VERSIONS`。

对于上面的例子，你可以运行

```sh npm2yarn
npm install your-package-name@0.0.0-bulbasaur-THE_TIME_YOU_DID_THIS
```

或者标签：

```sh npm2yarn
npm install your-package-name@bulbasaur
```

## 快照分支的处理方式

几乎在所有情况下，我们建议在运行 `version` 后将更改合并回主分支。但对于快照，情况并非如此。我们建议不要将此次 `version` 运行后的更改推送到任何分支。这是因为快照仅供安装使用，不代表仓库的正确发布状态。保存生成的版本和你使用的标签，但不要推送到你计划合并到主分支的分支，也不要将其合并到主分支。
