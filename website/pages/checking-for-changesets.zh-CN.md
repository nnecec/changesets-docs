# 检查 changesets

> 该文档翻译已由[nnecec](https://github.com/nnecec)修订

使用 `@changesets/cli`，有一个 `status` 命令。可以在 [@changesets/cli 自述文件](https://github.com/changesets/changesets/tree/main/packages/cli#status)中看到它的文档。

我们有 [github bot](https://github.com/apps/changeset-bot) 和[bitbucket 插件](https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/build/bitbucket-release-addon/) 用于提醒用户注意缺失 changesets。

如果你希望在 CI 中因 changesets 缺失而执行失败(不推荐)，可以通过运行命令 `changeset status --since=main` 来实现，当没有新的 changesets 存在时，此命令会以退出码 1 结束。
