# Changesets 词典

这是 changesets 中使用的一些词汇和短语的列表,了解这些词汇有助于 changesets 的贡献者对项目中的各种概念达成共识。

其中几个有相关的类型定义,您可以在[我们的 types 包](../packages/types)中找到。

- **changeset** - 发布一组特定升级类型的包以及所做更改摘要的 intent。Changesets 是可堆叠的,也就是说运行 `bump` 将正确应用任何数量的 changesets。Changesets 用于生成更多信息,例如 `发布信息` 和 `发布计划`。
- **summary** - 关于 changeset 所代表的更改的信息 - 这将被写入 changeset 中提到的每个包的 `CHANGELOG.md` 文件。
- **changeset folder** - 一个 `./changeset` 文件夹 - 这是我们存储 changeset 的地方。当前我们假设所有的 changeset 都写入这个文件夹。
- **workspace** - 多包仓库中的本地包
- **bump-type** - 预期的更改类型。类型为 `major | minor | patch | none`,基于 [semver](https://semver.org/) 的更改类型。
- **range-type** - 包所依赖的范围类型,比如 `1.0.0`、`~1.0.0` 或 `^1.0.0`。这是 [node 定义的](https://github.com/npm/node-semver#ranges)有效语义化版本范围的子集,缩小到我们可以以编程方式更新的范围。
- **bump**
  - (1) 应用所有当前 changeset 并更新所有包版本和变更日志的命令。
  - (2) 将包版本更新到新版本的行为。
- **single-package repo** - 只包含一个位于仓库根目录的包的仓库。
- **multi-package repo/monorepo** - 包含多个包的仓库,通常由 [Bolt](https://github.com/boltpkg/bolt) 或 [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) 管理。
- **release line generators** - `getReleaseLine` 和 `getDependencyReleaseLine` 函数,负责为变更日志创建插入的行。可以将特定版本的变更日志条目视为 `releaseLineGenerators(changesets)`。
- **fixed packages** - 固定包共享语义化分类,这样所有固定包都具有相同的语义化版本,并且总是一起发布。这方面的日志最好参见我们的 [fixed-packages](./fixed-packages.md) 文档。
- **linked packages** - 链接包共享语义化分类,这样所有已发布的链接包都具有一致的新语义化范围。这方面的日志最好参见我们的 [linked-packages](./linked-packages.md) 文档。
- **release instruction** - 包含发布单个包的意图的对象,由包名称和升级类型组成。
- **release plan** - 显示 changeset 集合将发布的所有内容以及版本和方式的计算对象。该对象包括对依赖项的计算以及对 `linked` 包的考虑。
- **absolutely correct semver** - 做出语义化版本控制决策,以确保除主要版本之外的任何事情都不会破坏消费者的代码。因为从技术上讲,任何更改都可能会破坏用户的代码,绝对正确的语义化版本控制需要将所有更改视为主要更改。
- **pragmatically correct semver** - 做出你认为正确的语义化版本控制决定,但可能有误。务实评估可能会随着项目的用户数量和项目的 API 表面区域而改变。每当我们谈论“正确的语义化版本控制”时,我们指的是“务实正确的语义化版本控制”。
- **dependency** - 给定包所依赖的包。
- **dependent** - 依赖于给定包的包。这通常用于获取包的依赖项的上下文,以便可以发布它们。
- **release** - 组合版本控制和发布包,可能在发布之前包括构建过程。
- **prereleases** - 预发布使用标记发布,不会在 npm 上作为 `latest` 发布。这是为了在你想要分享代码但尚未准备好让所有人使用的主要包时使用的。包的预发布很常见,但在单仓库中进行预发布存在独特的问题。您可以在我们的[预发布文档](./prereleases.md)中看到我们详尽的预发布文档。此外,还定义了两种不同的预发布方法,它们设计为分开使用。
- **Release Candidate(RC)预发布** - RC 预发布在计划的重要发布(可能是主要发布)之前完成。它包括关于下一个计划发布版本的语义化版本信息、标签和预发布的迭代编号。预期的是提交这个版本,然后在分支上进行进一步工作。例如,如果我在一个包的 `1.0.0` 上,并且我想为下一个 `major` 版本做一个 RC,我们会有:`package-one@2.0.0-my-tag.0`,然后下一个发布是 `package-one@2.0.0-my-tag.1`。
- **snapshot 预发布** - 快照预发布旨在轻松测试特定 git 提交时的所有更改。它以 `0.0.0` 发布,并使用 git hash 作为标签。这应该用于少形式化的方法,而不是发布候选版本,以便轻松安装和测试更改。例如,如果我们有一个在 `1.0.0` 的包,并且有一个将其升级为 `major` 的 changeset,快照版本将是 `0.0.0-ABCDEFGH`(最后的 github hash)。如果我们添加更多提交,下一个快照将是 `0.0.0-HIJKLMNOP`。

## 我们还没有弄明白如何很好地解释的事情

- 包所依赖的包以及依赖关系的范围在包的依赖关系列表中指定的事实。这具体不涉及依赖关系,而是关于依赖项和依赖关系之间的关系。
