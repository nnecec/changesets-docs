# 决策

> 该文档翻译已由[@nnecec](https://github.com/nnecec)修订

本文件讨论了创建 changesets 的一些规则和设计决策。这些决策的目标都是使使用 changesets 的体验尽可能简单，同时还提供最大可能的价值。

## 如何组合 changesets

Changesets 的设计目的是尽可能轻松地叠加。因此，当在 `version` 中使用 changesets 时，我们会将版本提升平铺到指定语义化范围中的最高的升级版本中。

例如：如果运行 `version`，并且我们在 `packageA` 中有 `1.1.1`，其中有两个 `minor` changesets 和一个 `patch` changeset，我们会将 `packageA` 升级到 `1.2.1`。

这允许安全地添加和叠加 changesets，并确保软件包只会以适合 changeset 组合的版本发布一次，同时仍然确保每个更改都被捕获到变更日志中，并指明它是什么类型的变更。

## 如何升级依赖项

> 注意：这特别指在 monorepo 中使用的 changesets 的一个特性

生成 changesets 时，我们会检查所选包是否会导致 monorepo 中的其他包脱离语义化版本控制。

例如，如果我有两个包：

`packageA` 在 `1.1.1`

和 `packageB` 在 `1.1.0` 同时依赖于 `packageA@^1.1.0`。

如果我为 packageA 添加了 `major` 变更，则 monorepo 中的 `packageB` 版本也应该更新。如果没有，要么 monorepo 中的 `packageB` 在开发中要么不会使用 `packageA`，要么开发中的 `packageB` 将与生产中安装的 `packageB` 不匹配。

因此，我们最终得到一个包含 `packageA` 为 `major` 和 `packageB` 为 `patch` 的 changeset。

所有依赖项的更新都是作为 `patch` 版本提升完成。如果您想指出消费新版本的 `packageA` 对 `packageB` 的是更重要的变更，我们建议专门为 `packageB` 添加第二个 changeset。

## 为什么我们要将文件写入到硬盘

我们之所以这样做，有两个原因。首先是为了使 changeset 描述在创建后可编辑，用户可以打开并根据自己的意愿更改它。其次，这意味着我们对你的 git 工作流没有干扰，随意 squash 和修改 git 提交都是完全安全的，不用担心破坏版本。

## 与语义化发布有何区别

如果您之前看过自动化版本控制，您可能已经看到过 [semantic release](https://github.com/semantic-release/semantic-release) 或其等价的 monorepo 方式 [lerna semantic release](https://github.com/atlassian/lerna-semantic-release)。这对理解 changesets 如何以不同的方式运作是很有好处的。

1. Changesets 首先为 monorepos 设计

这意味着我们可以管理存储库中的依赖关系，这是其他工具无法做到的。

2. 我们将更改信息提交到文件系统，而不是存储在 git 中。

请参阅上面关于我们为什么将文件写入硬盘的部分

3. 我们使用 semver 来指定更改

在选择包的更改类型时，我们不会指定超出 `major`、`minor` 或 `patch` 之外的任何更改类型。而语义化发布允许您指定一系列字段(bug-fix、feature)，它将其转换为适当的语义化版本类型。这是我们的设计决策，旨在将此信息添加到 changeset 描述本身中。

## peer dependencies 的版本控制

目前，如果将一个包列为另一个包的 peerDependency，这会导致声明了 peerDependency 的包被当作 `major` 更改发布。这是因为 peerDependency 更改不会被包安装过程捕获。

这个决定有待讨论。

## Changesets 如何与 Git 交互

Changesets 添加变更集、对包进行版本控制 / 编写变更日志以及发布包的核心流程应当能在不使用 Git 的情况下正常运作。当用户没有明确要求执行涉及 Git 的操作（比如在添加命令中显示已更改的包这类操作）时，即便 Git 由于任何原因出现故障，也不应显示错误。而当用户明确选择使用 Git 的情况（比如使用提交选项或者 `status --since main` 这类操作）时，Changesets 应当记录错误，并且以非零退出代码的方式终止运行。
