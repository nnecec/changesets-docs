# 自动化 Changesets

虽然 changesets 设计用于完全手动的流程,但它也提供了帮助自动化这些发布的工具。这些可以分为两个主要决定:

1. 我想如何确保拉取请求有 changesets?
2. 我如何运行 version 和 publish 命令?

这里我们有一个推荐的快速启动工作流程,以及更多详细信息。

## 推荐的自动化流程

1. 在你的仓库中安装我们的 [changeset bot](https://github.com/apps/changeset-bot)。
2. 在你的仓库中添加 [github action](https://github.com/changesets/action)。

## 我想如何确保拉取请求有 changesets?

Changesets 提交到文件中,所以勤勉的评审者总是可以技术性地判断 changeset 是否缺失并请求添加。但是,作为人类,缺少文件很容易被忽略。我们建议添加一些方式来检测拉取请求上 changeset 的存在或缺失,这样你就不必了,也可以把它突出显示给拉取请求创建者,这样你也不必了。这有两种主要方法。

### 非阻塞

在这种方法中,如果没有 changeset,拉取请求可以被合并,缺少 changeset 不会创建红色构建。我们的 [github changeset bot](https://github.com/apps/changeset-bot) 是提示 changeset 而不使其成为阻塞的最佳方式。作为方便的额外功能,它为你提供了一个链接,作为维护者可以添加自己的 changeset 来平滑地合并没有等待贡献者添加 changeset 的拉取请求。

### 阻塞

有时,如果没有 changeset,你可能希望 CI 失败,以确保没有 PR 可以在没有 changeset 的情况下合并。要做到这一点:

在 CI 流程中,添加运行以下命令的步骤:

```bash
changeset status --since=main
```

如果自 master 以来没有新的 changeset,这将以退出码 1 退出。

在某些情况下,你可能想要在不做任何发布的情况下合并更改(例如仅更改测试或构建工具时)。在这种情况下,你可以运行 `changeset --empty`。这将添加一个不会发布任何内容的特殊 changeset。

## 我如何运行 version 和 publish 命令?

我们有一个 [github action](https://github.com/changesets/action),它 - 创建一个 `version` PR,然后保持它最新,在合并时重新创建它。这个 PR 始终具有 `changeset version` 的最新运行。

- 可选地允许在更改合并到基本分支时执行发布。

如果你不想使用这个 action,我们建议手动运行 `version` 和 `publish` 命令的工作流程是:

- 一个发布协调员(RC)调用停止合并到基本分支
- RC 拉取基本分支,运行 `changeset version`,然后使用版本控制更改创建一个新的 PR
- 版本控制更改被合并回基本分支
- RC 再次拉取基本分支并运行 `changeset publish`
- RC 运行 `git push --follow-tags` 将发布标签推送回去
- RC 取消阻止对基本分支的合并

这有很多步骤,而且非常麻烦(我们必须从基本分支拉取两次)。随意调整它以适应您自己的情况。
