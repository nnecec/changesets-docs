# 实验性选项

> 该文档翻译已由[@nnecec](https://github.com/nnecec)修订

所有实验性选项都在 `config.json` 的 `__experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH` 标记下配置。

> 请谨慎使用这些实验性标记，并请注意版本更新说明——这些配置标记在补丁版本中可能会发生变化。

## `updateInternalDependents` (类型:`'out-of-range' | 'always'`)

默认值:`'out-of-range'`。

此配置标记可用于将依赖包添加到发布中（如果它们还不是发布的一部分），并进行补丁级别的版本升级。

当设置为 `out-of-range` 时，只有当内部依赖超出其指定的版本范围时，才会被添加到发布中并进行补丁级别的版本升级。
当设置为 `always` 时，无论内部依赖是否超出其指定的版本范围，都会被添加到发布中并进行补丁级别的版本升级。

## `onlyUpdatePeerDependentsWhenOutOfRange` (类型:`boolean`)

默认值:`false`

设置为 `true` 时,Changesets 仅在 `peerDependencies` 超出范围时才会提升 peer 依赖项。

当设置为 `true` 时，Changesets 只有在 peerDependencies 超出范围时才会对同级依赖（peer dependents）进行版本升级。
