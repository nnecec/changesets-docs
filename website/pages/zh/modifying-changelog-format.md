# 修改变更日志格式

> 该文档翻译已由[@nnecec](https://github.com/nnecec)修订

Changesets 为包提供了默认的变更日志格式，它所显示的信息相对基础，但这个格式是可以自定义的。在这里我们将讨论如何修改变更日志，以便它可以包含额外的元信息。

## 设置使用的格式化函数

要更改变更日志的生成方式，可以使用 `./changeset/config.json` 中的 `changelog` 设置。此设置接受一个字符串，该字符串指向一个模块。你可以引用已安装的 npm 包，或编写自己的函数并存放在本地文件中。

例如，Changesets 提供了一个名为 `@changesets/changelog-git` 的包。要使用它，你需要先安装该包。

```sh npm2yarn
npm install @changesets/changelog-git
```

然后，修改你的 `.changeset/config.json` 文件以指向新包：

```json
"changelog": "@changesets/changelog-git"
```

如果你想自己编写，可以引用一个文件路径。例如，你可以创建一个新的文件 `.changeset/my-changelog-config.js`，然后在 `.changeset/config.json` 文件中引用它：

```json
"changelog": "./my-changelog-config.js"
```

## 编写变更日志格式化函数

变更日志的格式化是由两个不同的函数完成的：`getReleaseLine` 和 `getDependencyReleaseLine`。这两个函数必须作为一个对象导出，作为你的生成文件的一部分。一个基本的变更日志生成函数文件设置如下：

```js
async function getReleaseLine() {}

async function getDependencyReleaseLine() {}

module.exports = {
  getReleaseLine,
  getDependencyReleaseLine,
};
```

这些函数在 `changeset version` 运行期间执行，并期望返回一个字符串（或是一个带有字符串的 promise）。

如果你使用 TypeScript 编写变更日志函数，可以使用类型定义。首先安装 `@changesets/types`，然后：

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

`getReleaseLine` 函数的类型定义如下：

```ts
type getReleaseLine = (
    changeset: {
        // 这是从 Changeset Markdown 文件中提取的摘要字符串
        summary: string;
        // 这是一个关于即将发布的包的信息数组，每个元素都是一个具有 name（包名）和 type（"major"、"minor" 或 "patch"）的对象
        releases: Array<{ name: string; type: "major" | "minor" | "patch" }>;
        // 引入此 Changeset 的提交哈希
        commit: string;
    },
    // 此 Changeset 所指更改的类型，为 "major"、"minor" 或 "patch"
    type: "major" | "minor" | "patch";
    // 需要解释 - 参见 @changesets/changelog-github 的代码了解其工作原理
    changelogOpts: any;
) => Promise<string>;
```

TODO: 本指南尚未完成。在它完成之前，你可能需要查阅我们现有实现的代码。

## 向变更日志函数添加选项

TODO
