# 检查 changesets

使用 `@changesets/cli`,有一个 `status` 命令。可以在 [@changesets/cli 自述文件](../packages/cli/README.md#status)中看到它的文档。

我们有一个 [github bot](https://github.com/apps/changeset-bot) 和一个 [bitbucket 插件](https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/build/bitbucket-release-addon/),它们会提醒用户 changeset 缺失的情况。

如果你想在 changeset 缺失时在 CI 中失败(不推荐),你可以运行 `changeset status --since=main`,如果没有新的 changeset 它会以状态码 1 退出。
