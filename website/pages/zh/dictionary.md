# Changesets 术语表

> 该文档翻译已由[@nnecec](https://github.com/nnecec)修订

以下是一些在 changesets 中使用的词汇和短语列表，了解这些有助于贡献者对项目中的各种概念有一个共同的理解。

部分词汇有关联的类型定义，您可以在[我们的 types 包](https://github.com/changesets/changesets/tree/main/packages/types)中找到。

- **changeset** - 发布一组包的目的，包括特定的版本升级类型和更改摘要。Changesets 是可叠加的，也就是说运行 `bump` 命令会正确应用任意数量的 changesets。Changesets 用于生成进一步的信息，如`发布信息`和`发布计划`。
- **summary** - 关于 changeset 所代表更改的信息——这些信息会被写入 changeset 中提到的每个包的 `CHANGELOG.md` 文件中。
- **changeset 文件夹** - 一个 `./changeset` 文件夹——这是存储变化集文本版本的地方。目前我们假设所有 changesets 都是写在这个文件夹中的。
- **workspace** - 多包仓库（multi-package repo）中的本地包
- **bump-type** - 预期的更改类型。类型为 `major | minor | patch | none`，基于 [semver](https://semver.org/) 的变更类型。
- **range-type** - 包依赖的范围类型，例如 `1.0.0`、`~1.0.0` 或 `^1.0.0`。这是一个由 [Node 定义](https://github.com/npm/node-semver#ranges)的有效 semver 范围的子集，限定了我们可以程序化更新的范围。
- **bump**
  - (1) 应用所有当前 changesets 并更新所有包的版本和变更日志的命令。
  - (2) 更新包版本到新版本的行为。
- **单包仓库** - 只包含一个位于仓库根目录下的包的仓库。
- **多包仓库/单体仓库(monorepo)** - 包含多个包的仓库，通常由 [Bolt](https://github.com/boltpkg/bolt) 或 [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) 管理。
- **发布行生成器** - 负责创建插入到变更日志中的行的 `getReleaseLine` 和 `getDependencyReleaseLine` 函数。特定发布的变更日志条目可以视为 `releaseLineGenerators(changesets)` 的结果。
- **固定包** - 固定包共享一个 semver 分类，即所有固定包具有相同的 semver 版本并且总是同时发布。此逻辑的最佳解释参见我们的 [fixed-packages 文档](./fixed-packages)。
- **链接包** - 链接包共享一个 semver 分类，即所有已发布的链接包都有统一的新 semver 范围。此逻辑的最佳解释参见我们的 [linked-packages 文档](./linked-packages)。
- **发布指令** - 包含发布单个包意图的对象，由包名和 bump 类型组成。
- **发布计划** - 一个显示一组 changesets 将发布的所有内容及其版本和方式的对象。该对象包括依赖关系的计算，并考虑了 `链接` 包的因素。
- **绝对正确的 semver** - 进行 semver 版本决策以确保任何低于 major 的变更都不会破坏消费者的代码。因为实际上任何变更都有可能破坏用户的代码，所以绝对正确的 semver 要求所有变更为 major 变更。
- **实际正确的 semver** - 你认为正确的 semver 决策，但可能会有误。随着项目的用户数量和 API 表面积的变化，实用评估也可能发生变化。当我们谈论‘正确的 semver’时，我们指的是‘实际正确的 semver’。
- **依赖项** - 被另一个给定包所依赖的包。
- **依赖者** - 依赖于另一个给定包的包。这个术语经常用于获取一个包的依赖者以便它们能够被发布。
- **发布** - 包括版本控制和发布一个或多个包的过程，可能在发布前包含构建过程。
- **预发布** - 使用标签的发布，不会作为 npm 上的 `latest` 发布。这设计用于分享代码，但还不准备让所有人都使用它作为主要包。虽然包的预发布很常见，但在 monorepo 内的预发布带来了独特的挑战。您可以在我们的 [预发布文档](./prereleases) 中查看详尽的预发布文档。此外，有两种不同的预发布方法分别定义为单独使用。
- **发布候选（RC）预发布** - 在计划的重要发布之前进行的 RC 预发布，可能是 major 发布。它包含了关于下一个预期发布版本的 semver 信息、标签和预发布的迭代数字。其输出旨在提交，并在分支上继续进一步的工作。例如，如果我有一个包的版本是 `1.0.0`，并且我想为下一个 `major` 版本做一次 RC，那么我们将会有：`package-one@2.0.0-my-tag.0`，然后下一次发布将是 `package-one@2.0.0-my-tag.1`。
- **快照预发布** - 快照预发布的目的是为了方便测试特定 Git 提交的所有更改。它会在 `0.0.0` 发布，并使用 Git hash 作为标签。这应该作为一种比发布候选更非正式的方法，使安装和测试更改更加容易。例如，如果我们有一个包的版本是 `1.0.0`，并且有一个将其版本升至 `major` 的 changeset，那么快照发布将会是 `0.0.0-ABCDEFGH`（最后的 GitHub hash）。如果我们添加更多提交，下一个快照将会是 `0.0.0-HIJKLMNOP`。

## 我们尚未想好如何解释清楚的事物

- 包依赖于另一个包的事实以及依赖范围是在包的依赖列表中指定的。这具体不是关于依赖本身，而是关于依赖者和依赖之间的关系。
