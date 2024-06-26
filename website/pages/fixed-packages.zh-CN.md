# 固定包

固定包允许您指定一组或一组包，应该一起进行版本控制和发布。

> 与`linked packages`不同，固定包组中的所有包都将被一起版本化和发布，即使其中一些成员包没有进行任何更改。

## 示例

我有三个包，`pkg-a`、`pkg-b`和`pkg-c`。`pkg-a`和`pkg-b`是固定的，但`pkg-c`不是，因此配置如下。

```json
{
  "fixed": [["pkg-a", "pkg-b"]]
}
```

- `pkg-a` 版本为 `1.0.0`
- `pkg-b` 版本为 `1.0.0`
- `pkg-c` 版本为 `1.0.0`

我有一个变更集，对 `pkg-a` 进行了修补，对 `pkg-b` 进行了小版本更改，对 `pkg-c` 进行了主版本更改，然后我进行了发布，结果的版本将是：

- `pkg-a` 版本为 `1.1.0`
- `pkg-b` 版本为 `1.1.0`
- `pkg-c` 版本为 `2.0.0`

现在我有另一个变更集，对 `pkg-a` 进行了小版本更改，然后我进行了发布，结果的版本将是：

- `pkg-a` 版本为 `1.2.0`
- `pkg-b` 版本为 `1.2.0`
- `pkg-c` 版本为 `2.0.0`

## 使用 glob 表达式

有时您希望固定项目中的许多或所有包（例如在 monorepo 设置中），在这种情况下，您需要保持固定包列表的最新状态。

为了更容易维护该列表，您可以在列表中提供 glob 表达式，这些表达式将匹配并解析为您希望包含的所有包。

例如：

```json
{
  "fixed": [["pkg-*"]]
}
```

它将匹配所有以 `pkg-` 开头的包。

**Glob 表达式必须根据 [micromatch](https://www.npmjs.com/package/micromatch) 格式定义。**
