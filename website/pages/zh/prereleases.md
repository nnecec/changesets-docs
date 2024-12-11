# 预发版

> 该文档翻译已由[@nnecec](https://github.com/nnecec)修订

> 警告！预发版非常复杂！使用它们需要对 npm 发布的所有部分有透彻的理解。错误可能导致非常难以修复的仓库和发布状态。
>
> 警告：如果您决定从仓库的主分支进行预发版，而没有为上一个稳定发布版本创建一个不包含预发版更改的分支，您将阻塞其他更改，直到您准备退出预发版模式。我们强烈建议从主分支以外的分支运行预发版。

您可能希望在实际发布之前发布包的版本，Changesets 允许您执行此操作，但由于单体仓库增加的复杂性，重要的是要了解一些注意事项。

当您想要进行预发版时，您需要进入预发版模式。您可以使用 `pre enter <tag>` 完成。需要传递的标签在版本中使用（例如 `1.0.0-beta.0`）以及 npm 的 dist 标签。

预发版工作流可能如下所示：

```sh
npx changeset pre enter next
npx changeset version
git add .
git commit -m "进入预发版模式并为包版本化"
npx changeset publish
git push --follow-tags
```

让我们看看这里发生了什么。对于此示例，假设您的仓库如下所示：

```
packages/
  pkg-a@1.0.0 依赖于 pkg-b@^2.0.0
  pkg-b@2.0.0 无依赖
  pkg-c@3.0.0 无依赖
.changeset/
  pkg-b@minor
```

```sh npm2yarn
npm run changeset pre enter next
```

此命令将 Changesets 切换到预发版模式，这将在 `.changeset` 目录中创建一个 `pre.json` 文件，其中存储了有关预发版状态的信息。有关在 `pre.json` 文件中存储的具体数据，请参见 [`@changesets/types`](https://github.com/changesets/changesets/tree/main/packages/types) 中 `PreState` 的类型定义。

```sh npm2yarn
npm run changeset version
```

此命令将按照您通常期望的方式为包版本化，但附加 `-next.0`。一个重要的注意是，这将增加那些在正常发布中不会被增加版本的依赖包，因为预发版版本不符合大多数 semver 范围（例如，`^5.0.0` 不满足 `5.1.0-next.0`）。

现在，仓库看起来是这样的：

```
packages/
  pkg-a@1.0.1-next.0 依赖于 pkg-b@^2.0.1
  pkg-b@2.1.0-next.0 无依赖
  pkg-c@3.0.0 无依赖
.changeset/
```

```sh npm2yarn
npm run changeset publish
```

此命令将像发布命令一样发布到 npm，但它将将 dist 标签设置为运行预发版命令时指定的标签。

当您想要进行另一次预发版时，您的工作流程可能如下：

```sh npm2yarn
npm run changeset version
git add .
git commit -m "Version packages"
npm run changeset publish
git push --follow-tags
```

假设我们添加了一些 changeset 和一个新的包，那么我们的仓库现在如下所示：

```
packages/
  pkg-a@1.0.1-next.0 依赖于 pkg-b@^2.0.1
  pkg-b@2.1.0-next.0 无依赖
  pkg-c@3.0.0 无依赖
  pkg-d@0.0.0 无依赖

.changeset/
  pkg-a@minor
  pkg-c@patch
  pkg-d@major
```

```sh npm2yarn
npm run changeset version
```

version 命令的行为与首次进行预发版的版本化相同，只是末尾的数字会更新。仓库现在看起来是这样的：

```
packages/
  pkg-a@1.1.0-next.1 依赖于 pkg-b@^2.0.1
  pkg-b@2.1.0-next.0 无依赖
  pkg-c@3.0.1-next.0 无依赖
  pkg-d@1.0.0-next.0 无依赖
```

```sh npm2yarn
npm run changeset publish
```

此命令将发布到 npm，就像第一次预发版一样，只是因为我们正在添加一个新的包（我们需要定义这个，是新的到仓库还是新到 npm？我认为是新到 npm），新的包将以 `latest` dist 标签发布，而不是 `next` 标签，因为它是第一次发布，这意味着它将始终在 `latest` 上。在 pkg-d 退出预发版之前的未来发布中，它也将被发布到 `latest`。

当您准备进行最终发布时，您的工作流可能如下：

```sh npm2yarn
npm run changeset pre exit
npm run changeset version
git add .
git commit -m "退出预发版模式并为包版本化"
npm run changeset publish
git push --follow-tags
```

```sh npm2yarn
npm run changeset pre exit
```

此命令将设置在 `pre.json` 文件中退出预发版模式的意图，但不会执行任何实际的版本控制。

```sh npm2yarn
npm run changeset version
```

version 命令将应用当前仓库中的任何 changeset，然后从版本中删除预发版标签。仓库现在看起来是这样的：

```
packages/
  pkg-a@1.1.0 依赖于 pkg-b@^2.0.1
  pkg-b@2.1.0 无依

赖
  pkg-c@3.0.1 无依赖
  pkg-d@1.0.0 无依赖
```

```sh npm2yarn
npm run changeset publish
```

publish 命令将像往常一样将所有内容发布到 `latest` dist 标签。
