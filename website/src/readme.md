## What is Changesets?

<p align="center">
  <img src="https://github.com/changesets/changesets/raw/main/assets/images/changesets-banner-light.png" />
</p>

<p align="center">
  A tool to manage versioning and changelogs <br/>
  with a focus on multi-package repositories
</p>
<br/>

[![npm package](https://img.shields.io/npm/v/@changesets/cli?label=%40changesets%2Fcli)](https://npmjs.com/package/@changesets/cli)
[![View changelog](https://img.shields.io/badge/Explore%20Changelog-brightgreen)](https://github.com/changesets/changesets/blob/main/packages/cli/CHANGELOG.md)

The `changesets` workflow is designed to help when people are making changes, all the way through to publishing. It lets contributors declare how their changes should be released, then we automate updating package versions, and changelogs, and publishing new versions of packages based on the provided information.

Changesets has a focus on solving these problems for multi-package repositories, and keeps packages that rely on each other within the multi-package repository up-to-date, as well as making it easy to make changes to groups of packages.

## How do we do that?

A `changeset` is an intent to release a set of packages at particular [semver bump types](https://semver.org/) with a summary of the changes made.

The **@changesets/cli** package allows you to write `changeset` files as you make changes, then combine any number of changesets into a release, that flattens the bump-types into a single release per package, handles internal dependencies in a multi-package-repository, and updates changelogs, as well as release all updated packages from a mono-repository with one command.

## How do I get started?

If you just want to jump in to using changesets, the [Intro to using changesets](/intro-to-using-changesets.md) and [@changesets/cli](https://github.com/changesets/changesets/blob/main/packages/cli/README.md) docs are where you should head.

If you want a detailed explanation of the concepts behind changesets, or to understand how you would build on top
of changesets, check out our [detailed-explanation](/detailed-explanation).

We also have a [dictionary](/dictionary).

## Integrating with CI

While changesets can be an entirely manual process, we recommend integrating it with how your CI works.

To check that PRs contain a changeset, we recommend using [the changeset bot](https://github.com/apps/changeset-bot), or if you want to fail builds on a changesets failure, run the following command in CI.

```sh npm2yarn
npm run changeset status
```

To make releasing easier, you can use [this changesets github action](https://github.com/changesets/action) to automate creating versioning pull requests, and optionally publishing packages.

## Cool Projects already using Changesets for versioning and changelogs

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

# Thanks/Inspiration

- [bolt](https://github.com/boltpkg/bolt) - Brought us a strong concept of how packages in a mono-repo should be able to interconnect, and provided the initial infrastructure to get inter-package information.
- [Atlassian](https://www.atlassian.com/) - The original idea/sponsor of the changesets code, and where many of the ideas and processes were fermented. It was originally implemented by the team behind [atlaskit](https://atlaskit.atlassian.com).
- [lerna-semantic-release](https://github.com/atlassian/lerna-semantic-release) - put down many of the initial patterns around updating packages within a multi-package-repository, and started us thinking about how to manage dependent packages.
- [Thinkmill](https://www.thinkmill.com.au) - For sponsoring the focused open sourcing of this project, and the version two rearchitecture.
