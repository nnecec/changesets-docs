# 常见问题

这里是一些常见的问题,可以帮助你理解 changesets 在做什么,而无需深入了解细节或工作流程。

## changesets 是自动生成的

changesets 是通过 `yarn changeset` 或 `npx changeset` 命令生成的。只要你遵循 changeset 发布流程,就不应该有任何问题。

## 每个 changeset 都是其自己的文件

我们默认使用随机的易读名称为这些文件命名,以避免生成它们时发生冲突,但是重命名它们不会带来任何伤害。

## changesets 会被自动删除

当运行 `changeset version` 或等价命令时,所有 changeset 文件夹都会被删除。这是为了确保我们只使用一次 changeset。这使其成为存储任何其他信息的非常不好的位置。

## changesets 是带有 YAML 头信息的 markdown 文件

该文件中的两部分用于不同目的。你应该随意编辑这两部分。

- markdown 文本是更改摘要,将在下次运行版本命令时预先添加到你的变更日志中。

- YAML 头信息描述了版本命令应该控制版本的内容。

## 我想编辑摘要或包版本类型 - 安全吗?

编辑摘要或包版本类型是完全安全的。如果想的话,你甚至可以不用命令就编写 changeset。

## 我可以手动删除 changesets 吗?

可以,但你应该意识到这将删除 changeset 传达的发布意图,应谨慎对待。
