# 自动化 Changesets

> 该文档翻译已由[nnecec](https://github.com/nnecec)修订

虽然 changesets 设计用于完全手动的流程，但它也提供了帮助自动化这些发布的工具。这些可以分为两个主要决定:

1. 如何确保 Pull Request 包含 changesets？
2. 如何执行 version 和 publish 命令?

这里我们有一个推荐的快速启动工作流程，以及更多详细信息。

## 推荐的自动化流程

1. 在你的仓库中安装我们的 [changeset bot](https://github.com/apps/changeset-bot)。
2. 在你的仓库中添加 [github action](https://github.com/changesets/action)。

## 如何确保拉取请求包含 changesets?

Changesets 是通过提交文件来管理的，理论上审阅者可以检查是否存在 changeset 并要求添加。但人为检查容易疏漏。我们建议采用某种方式自动检测拉取请求中 changesets 的存在与否，减轻人工检查负担，并直接向拉取请求提交者提示这一要求。

这主要包括两种方法：

### 非阻塞

在这种方式下，即使没有 changeset，pull request 也能被合并，缺失 changeset 不会导致构建失败。我们的[github changeset bot](https://github.com/apps/changeset-bot) 最适合在不妨碍流程的前提下提示添加 changeset。作为额外便利功能，机器人还会提供链接，以便维护者在无需等待贡献者添加 changeset 的情况下自行添加并合并 pull request。

### 阻塞

有时你可能希望在缺少 changeset 时使 CI 失败，以确保没有 changeset 的拉取请求无法被合并。实现这一点的操作如下：

在 CI 流程中，添加运行以下命令的步骤:

```bash
changeset status --since=main
```

如果自主分支以来没有新的 changesets，此命令将以退出码 1 结束，导致 CI 失败。

在某些情况下，你可能想在不做任何发布的情况下合并变更（比如仅修改测试或构建工具）。此时，可以运行 `changeset --empty`。这将添加一个特殊的 changeset，不触发任何发布。

## 如何执行 version 和 publish 命令?

我们提供的 [github action](https://github.com/changesets/action) 能够：

- 自动生成一个 `version` PR，并在合并后自动更新，始终保持最新的 `changeset version` 执行结果。
- 支持在变更合并至主分支时自动执行发布。

如果你不想使用这个 action，我们建议手动运行 `version` 和 `publish` 命令的工作流程是:

- 版本管理者（Release Coordinator, RC）停止对主分支的合并
- RC 拉取主分支，运行 `changeset version`，然后携带这个版本变更创建一个新的 PR
- 版本变更被合并回主分支
- RC 再次拉取主分支并执行 `changeset publish`
- RC 运行 `git push --follow-tags` 推送发布标签
- RC 解除对主分支的合并限制

这有很多步骤，而且非常麻烦（我们必须拉取两次主分支）。请根据实际情况调整优化。
