# 添加 changeset

> 该文档翻译已由[nnecec](https://github.com/nnecec)修订

嗨！您来到这里可能是因为有人或机器人要求您“添加 changeset”到一个项目中。让我们一步步了解添加 changeset。但首先，什么是 changeset?

## 什么是 changeset?

changeset 是关于分支或提交中的变更的一段信息。它包含三个信息:

- 我们需要发布什么
- 我们发布软件包时使用的版本(使用[语义化版本规则](https://semver.org/))
- 已发布软件包的变更日志入口

## 我在一个多包仓库(monorepo)

1. 运行命令行脚本`npx changeset` 或 `yarn changeset`。
2. 使用<kbd>↑</kbd>和<kbd>↓</kbd>导航到包，并使用<kbd>空格</kbd>选择一个包，选择要包含在 changeset 中的包。选择完所有需要的包后，按回车。
3. 系统会提示您为每个选定的包选择一个版本类型。根据所做的更改选择一个合适的版本类型。有关语义化版本控制的信息，请参阅[这里](https://semver.org/)。
4. 您最后将会被提示提供一条信息与该 changeset 组合。这将在下次发布时写入变更日志。之后，将添加一个新的 changeset，它是一个带有 YAML 头信息的 Markdown 文件。

   ```
   -| .changeset/
   -|-| UNIQUE_ID.md
   ```

   您输入的消息可以在 Markdown 文件中找到。如果您想扩展它，可以编写尽可能多的 Markdown，这都将在发布时添加到变更日志中。如果您想添加更多包或更改任何包的版本类型，也没有问题。虽然不是每个 changeset 都需要大量的详细信息，但一个好的 changeset 中应该包括的是:

   - 变更是**什么**
   - **为什么**要做变更
   - 消费者应该**如何**更新他们的代码

5. 当您对 changeset 满意时，将文件变更提交到您的开发分支。

## 我在单包仓库

1. 运行命令行脚本`npx changeset`或`yarn changeset`。
2. 根据所做的更改选择一个适当的版本类型。有关语义化版本控制的信息，请参阅[此处](https://semver.org/)。
3. 您最后的提示是需要提供一条信息与 changeset 组合。这将在下次发布时写入变更日志。之后，将添加一个新的 changeset，它是一个带有 YAML 头信息的 Markdown 文件。

   ```
   -| .changeset/
   -|-| UNIQUE_ID.md
   ```

   您输入的消息可以在 Markdown 文件中找到。如果您想扩展它，可以编写尽可能多的 Markdown，这都将在发布时添加到变更日志中。如果您想更改 changeset 的版本类型，也没有问题。尽管不是每个 changeset 都需要大量的详细信息，但 changeset 中应该包括的一个好主意是:

   - 变更是**什么**
   - **为什么**要做变更
   - 消费者应该**如何**更新他们的代码

4. 当您对 changeset 满意时，将文件变更提交到您的开发分支。

## 添加 changeset 的提示

### 您可以向 pull request 添加多个 changeset

changesets 被设计为可叠加的，所以添加多个没有问题。当您想要在以下情况下添加多个 changeset 时:

- 您想要发布多个包且具有不同变更日志入口
- 您对单个包进行了多个更改，每个更改都应单独说明

## 我想了解更多关于 changeset 的信息

[这里是 changeset 的更深入解释](/detailed-explanation)
