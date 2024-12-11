# 使用 Changesets

Changesets 的设计目的是通过允许做出贡献的人在做出贡献时做出关键决定,来简化您的工作流程。Changesets 保存两件关键信息:一个版本类型(遵循 [语义化版本](https://semver.org/)),以及要添加到变更日志中的变更信息。

此外,Changesets 最初是为在 [bolt monorepos](https://github.com/boltpkg/bolt) 中实现而设计的。因此,在 monorepo 环境中,如果需要,Changesets 将处理更改包的依赖项版本升级。

这个指南面向的是将 Changesets 作为工具添加的包维护者。对于贡献者相关的信息,请参阅 [添加 changeset](./adding-a-changeset.md)。

初始化后,整个工具应该会形成这样的循环:

1. 每次变更时都添加 Changesets
2. 准备发布时运行 version 命令,并验证更改
3. 之后运行 publish 命令

后两个步骤可以成为 CI 流程的一部分。

## 添加 Changeset 工具

```sh npm2yarn
npm install @changesets/cli
```

```sh npm2yarn
npm run changeset init
```

## 添加 Changesets

```sh npm2yarn
npm run changeset
```

> 注意:如果想的话,你可以运行 `changeset add` 来添加 changeset,但是直接运行 Changesets 也可以。

## 版本控制和发布

当您决定要发布时,可以运行

```sh npm2yarn
npm run changeset version
```

这会消费所有变更集,并根据这些变更集更新到最合适的语义化版本。它还为每个已消费的变更集编写变更日志条目。我们建议在此步骤中查看变更日志条目和软件包的版本更改。

一旦您确信这些是正确的,并对变更日志进行了任何必要的调整,就可以发布您的软件包:

```sh npm2yarn
npm run changeset publish
```

这将在 npm 上当前列出的版本较新 的每个包中运行 npm 发布。

## 一些有用的建议

### 并非每次变更都需要 changeset

由于 changesets 专注于发布和变更日志,对仓库的更改如果不需要这些就不需要 changeset。因此,我们建议在缺少 changeset 的情况下,不要对贡献添加阻止元素。
