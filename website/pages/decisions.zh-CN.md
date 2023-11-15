# 决策

本文件讨论了制定 changesets 的一些规则和设计决策。所有这些的目标都是使使用 changesets 的体验尽可能简单,同时还提供最大可能的价值。

## 如何组合 changesets

Changesets 的设计目的是尽可能轻松地累积。因此,当在 `version` 中使用 changesets 时,我们会将版本提升平铺到指定的最高语义化范围中的单个提升中。

例如:如果运行 `version`,并且我们在 `packageA` 中有 `1.1.1`,其中有两个 `minor` changesets 和一个 `patch` changeset,我们会将 `packageA` 升级到 `1.2.1`。

这允许安全地添加和累积 changesets,并确信软件包只会以适合 changeset 组合的版本发布一次,同时仍然确保每个更改都被捕获到变更日志中,并指明它是什么类型的更改。

## 如何升级依赖项

> 注意:这特别指在 monorepo 中使用的 changesets 的一个特性

生成 changesets 时,我们会检查所选包是否会导致 monorepo 中的其他包脱离语义化版本控制。

例如,如果我有两个包:

`packageA` 在 `1.1.1`

和 `packageB` 在 `1.1.0` 依赖于 `packageA` 在 `^1.1.0`。

如果我在一个 `major` 变更中添加 packageA,则 monorepo 中的 `packageB` 版本也应该更新。如果没有,则 monorepo 中的 `packageB` 在开发中要么不会使用 `packageA`,要么开发中的 `packageB` 将与生产中安装的 `packageB` 不匹配。

因此,我们最终得到一个包含 `packageA` 为 `major` 和 `packageB` 为 `patch` 的 changeset。

所有依赖项的更新都作为补丁版本提升完成。如果您想指出消费新版本的 `packageA` 对 `packageB` 的更重大更改,我们建议专门为 `packageB` 添加第二个 changeset。

## 为什么我们要写入磁盘文件的原因

我们之所以这样做有两个原因。首先是为了使 changeset 描述在创建后可编辑,用户可以进入并根据自己的意愿更改它。其次,这意味着我们对你的 git 工作流没有意见,随意压缩和修改提交都是完全安全的,不必担心会破坏发布。

## 与语义化发布有何区别

如果您之前看过自动化版本控制,您可能已经看到过 [semantic release](https://github.com/semantic-release/semantic-release) 或其等价的 monorepo 方式 [lerna semantic release](https://github.com/atlassian/lerna-semantic-release)。理解 changesets 的不同运作方式很重要。

1. Changesets 首先针对 monorepo 设计

这意味着我们管理仓库内的依赖关系,这是其他工具不做的。

2. 我们将更改信息提交到文件系统,而不是存储在 git 中。

请参阅上面关于我们为什么写入磁盘文件的部分

3. 我们使用 semver 来指定更改

在选择软件包的更改类型时,我们不会指定超出 `major`、`minor` 或 `patch` 之外的任何更改类型。语义化发布允许您指定一系列字段(bug 修复、新特性),它将其转换为适当的语义化版本类型。这是我们的一个设计决策,将添加此信息推到 changeset 描述本身中。

## peer 依赖项的版本控制

当前,如果将一个包列为另一个包的 peerDependency,这会导致具有 peerDependency 的包被释出为 `major` 更改。这是因为 peerDependency 更改不会被包安装捕获。

这个决定有待讨论。

## Changesets 如何与 Git 交互

Changesets 的核心流程是添加 changesets、版本化包/编写变更日志以及发布包,这些应该可以在没有 Git 的情况下工作。以 Git 不明确要求执行某些涉及 Git 的操作的方式使用 Git,比如在添加命令中显示已更改的包,如果因为任何原因 Git 失败也不应该显示错误。以 Git 用户明确选择使用 Git 的方式使用 Git,比如使用 commit 选项或 `status --since main`,Changesets 应该记录错误并以非零退出代码失败。
