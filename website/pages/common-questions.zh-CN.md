# 常见问题

> 该文档翻译已由[nnecec](https://github.com/nnecec)修订

以下是一些常见问题的简要解答，帮助您快速理解 changesets 的运作机制，而不涉及过多细节或具体工作流程。

## changesets 是自动生成的

changesets 是通过 `yarn changeset` 或 `npx changeset` 命令生成的。只要您遵循 changeset 发布流程，通常不会出现问题。

## 每个 changeset 都是独立文件

默认情况下，我们使用随机易读的文件名生成这些变更集，以避免创建时的命名冲突。重命名这些文件也不会带来任何不良影响。

## changesets 会被自动删除

当运行 `changeset version` 或等效命令时，所有 changeset 都会被删除。这是为了确保我们只使用一次 changeset。因此，不建议在这里存放任何其他信息

## changesets 是带有 YAML 头信息的 markdown 文件

该文件中的两部分别用于不同用途。您可以随意编辑这两部分。

- Markdown 文本是对即将加入到变更日志中的变更摘要，当您下次运行版本命令时，这部分内容会置于变更日志的前面。
- YAML 头信息描述了版本命令应当如何处理版本更新，即哪些包需要进行何种级别的版本升级。

## 我想修改摘要或包的版本升级类型，这样安全吗？

修改摘要或包的版本升级类型是完全安全的。如果您愿意，甚至可以直接手写 changeset 而不使用命令生成。

## 我可以手动删除 changesets 吗?

可以，但您应该意识到这样做会移除 changeset 传达的发布意图，因此应谨慎操作。
