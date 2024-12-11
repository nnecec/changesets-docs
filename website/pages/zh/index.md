## 什么是 Changesets？

<p align="center">
  <img src="https://github.com/changesets/changesets/raw/main/assets/images/changesets-banner-light.png" alt="Changesets Banner"/>
</p>

<p align="center">
  一个专注于多包仓库并用于管理版本和变更日志的工具
</p>
<br/>

[![npm package](https://img.shields.io/npm/v/@changesets/cli?label=%40changesets%2Fcli)](https://npmjs.com/package/@changesets/cli)
[![View changelog](https://img.shields.io/badge/Explore%20Changelog-brightgreen)](https://github.com/changesets/changesets/blob/main/packages/cli/CHANGELOG.md)

`changesets` 工作流旨在为人们从开始做更改直到发布的过程中提供帮助。它允许贡献者声明他们的变更应该如何发布，然后我们根据提供的信息自动化更新包版本、变更日志，并发布新版本的包。

Changesets 致力于解决多包仓库中的这些问题，保持相互依赖的包在多包仓库中是最新的，并且使得对一组包进行变更变得简单。

## 我们是如何做到这一点的？

一个 `changeset` 是一种意图，即以特定的 [semver 版本提升类型](https://semver.org/) 发布一组包，并附有对所做变更的总结。

**@changesets/cli** 包允许你在进行变更时编写 `changeset` 文件，然后将任意数量的变更集组合成一次发布，该过程会将版本提升类型合并为每个包的一次发布，处理多包仓库中的内部依赖关系，更新变更日志，并通过一个命令从单体仓库中发布所有已更新的包。

## 如何开始？

如果你只想直接使用 changesets，[changesets 使用介绍](/intro-to-using-changesets) 和 [@changesets/cli](https://github.com/changesets/changesets/blob/main/packages/cli/README.md) 文档是你应该查阅的地方。

如果你想详细了解 changesets 背后的概念，或者理解如何基于 changesets 构建，可以查看我们的 [详细解释](/detailed-explanation)。

我们也提供了一个 [术语表](/dictionary)。

## 与 CI 的集成

虽然 changesets 可以是一个完全手动的过程，但我们推荐将其与你的 CI 流程集成。

为了检查 PR 是否包含变更集，我们建议使用 [changeset-bot](https://github.com/apps/changeset-bot)，或者如果你想在变化集失败时使构建失败，可以在 CI 中运行

```sh npm2yarn
npm run changeset status
```

为了简化发布过程，你可以使用 [这个 Changesets GitHub Action](https://github.com/changesets/action) 来自动化创建版本化拉取请求，并可选地发布包。

## 已经使用 Changesets 管理版本和变更日志的项目


- [atlaskit](https://atlaskit.atlassian.com/)
- [emotion](https://emotion.sh/docs/introduction)
- [keystone](https://v5.keystonejs.com/)
- [react-select](https://react-select.com/home)
- [XState](https://xstate.js.org/)
- [pnpm](https://pnpm.io/)
- [filbert-js](https://github.com/kuldeepkeshwar/filbert-js)
- [tinyhttp](https://github.com/talentlessguy/tinyhttp)
- [Firebase Javascript SDK](https://github.com/firebase/firebase-js-sdk)
- [Formik](https://github.com/formium/formik)
- [MobX](https://github.com/mobxjs/mobx)
- [Nhost](https://github.com/nhost/nhost)
- [verdaccio](https://verdaccio.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Astro](https://astro.build)
- [SvelteKit](https://kit.svelte.dev/)
- [Hydrogen](https://hydrogen.shopify.dev)
- [react-pdf](https://github.com/diegomura/react-pdf)
- [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator)
- [GraphQL Yoga](https://github.com/dotansimha/graphql-yoga)
- [GraphQL-Mesh](https://github.com/Urigo/graphql-mesh)
- [GraphiQL](https://github.com/graphql/graphiql)
- [wagmi](https://github.com/wagmi-dev/wagmi)
- [refine](https://github.com/pankod/refine)
- [Modern Web](https://modern-web.dev)
- [Atomizer](https://github.com/acss-io/atomizer)
- [Medusa](https://github.com/medusajs/medusa)
- [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Block Protocol](https://github.com/blockprotocol/blockprotocol)
- [Remix](https://remix.run/)
- [Clerk](https://github.com/clerk/javascript)
- [Hey API](https://github.com/hey-api/openapi-ts)
- [neverthrow](https://github.com/supermacro/neverthrow)

# 致谢/灵感来源

- [bolt](https://github.com/boltpkg/bolt) - 为我们带来了关于单体仓库中的包应该如何相互连接的强烈概念，并提供了获取包间信息的初始基础设施。
- [Atlassian](https://www.atlassian.com/) - Changesets 代码的原始想法和赞助者，许多理念和流程都是在这里酝酿而成的。它最初是由 [Atlaskit](https://atlaskit.atlassian.com) 背后的团队实现的。
- [lerna-semantic-release](https://github.com/atlassian/lerna-semantic-release) - 奠定了多包仓库内更新包的许多初始模式，并促使我们开始思考如何管理依赖包。
- [Thinkmill](https://www.thinkmill.com.au) - 赞助了该项目的专注开源工作及第二版的重新架构。
