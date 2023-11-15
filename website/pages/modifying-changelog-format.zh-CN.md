# 修改变更日志格式

Changesets 自带了一个相对基本的包变更日志的默认格式，显示了一些信息，但这是可定制的。在这里，我们将讨论如何修改变更日志，以包含额外的元信息。

## 设置使用哪些格式化函数

要更改变更日志的生成方式，您可以在 `./changeset/config.json` 中使用 `changelog` 设置。该设置接受一个字符串，指向一个模块。您可以引用已安装的 npm 包，或者引用您自己编写的本地文件。

例如，`changesets` 有一个名为 `@changesets/changelog-git` 的包。要使用它，首先需要安装该包。

```bash
yarn add @changesets/changelog-git
```

然后，更改您的 `.changeset/config.json` 以指向新的包：

```json
"changelog": "@changesets/changelog-git"
```

如果您想自己编写，可以引用文件路径。例如，您可以创建一个新文件 `.changeset/my-changelog-config.js`，然后在 `.changeset/config.json` 文件中引用它：

```json
"changelog": "./my-changelog-config.js"
```

## 编写变更日志格式化函数

变更日志的格式化由两个不同的函数完成。`getReleaseLine` 和 `getDependencyReleaseLine`。它们必须作为生成文件的导出提供在一个对象中。变更日志生成函数的基本文件设置如下：

```js
async function getReleaseLine() {}

async function getDependencyReleaseLine() {}

module.exports = {
  getReleaseLine,
  getDependencyReleaseLine,
};
```

这些函数在 `changeset version` 期间运行，预计返回一个字符串（或一个带有字符串的 promise）。

如果您使用 TypeScript 编写变更日志函数，可以使用类型。首先安装 `@changesets/types`，然后：

```ts
import { ChangelogFunctions } from "@changesets/types";

async function getReleaseLine() {}

async function getDependencyReleaseLine() {}

const defaultChangelogFunctions: ChangelogFunctions = {
  getReleaseLine,
  getDependencyReleaseLine,
};

export default defaultChangelogFunctions;
```

```ts
type getReleaseLine = (
  changeset: {
    // This is the string of the summary from the changeset markdown file
    summary: string;
    // This is an array of information about what is going to be released. each is an object with name: the name of the package, and type, which is "major", "minor", or "patch"
    releases;
    // the hash for the commit that introduced the changeset
    commit;
  },
  // the type of the change this changeset refers to, as "major", "minor", or "patch"
  type,
  // This needs to be explained - see @changesets/changelog-github's code for how this works
  changelogOpts
) => string;
```

TODO - 这个指南还没有完成。在完成之前，您可能需要深入研究我们现有的一些代码。

## 向变更日志函数添加选项

TODO
