# 实验性选项

所有实验性选项都在 `config.json` 的 `__experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH` 标志下配置。

> 请谨慎使用这些实验标志,并请注意发行说明 - 这些配置标志可能会在小版本中更改。

## `updateInternalDependents` (类型:`'out-of-range' | 'always'`)

默认值:`'out-of-range'`。

该配置标志可用于使用补丁版本提升将依赖包添加到发布中(如果它们还不是发布的一部分)。

## `onlyUpdatePeerDependentsWhenOutOfRange` (类型:`boolean`)

默认值:`false`

设置为 `true` 时,Changesets 仅在 `peerDependencies` 超出范围时才会提升 peer 依赖项。
