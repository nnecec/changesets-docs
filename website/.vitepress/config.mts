import { defineConfig, HeadConfig } from "vitepress";

const isProd = process.env.NODE_ENV === "production";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "🦋 Changesets",
  locales: {
    root: {
      label: "English",
      lang: "en",
      description:
        "🦋 A way to manage your versioning and changelogs with a focus on monorepos",
      themeConfig: {
        nav: [
          { text: "Home", link: "/" },
          { text: "Documentation", link: "/readme" },
          { text: "v2.30.0", link: "https://github.com/changesets/changesets" },
        ],
        sidebar: [
          {
            text: "What is Changesets?",
            link: "/readme",
          },
          {
            text: "Intro to using changesets",
            link: "/intro-to-using-changesets",
          },
          {
            text: "Detailed explanation",
            link: "/detailed-explanation",
          },
          {
            text: "Common questions",
            link: "/common-questions",
          },
          {
            text: "Adding a changeset",
            link: "/adding-a-changeset",
          },
          {
            text: "Automating changesets",
            link: "/automating-changesets",
          },
          {
            text: "Checking for changesets",
            link: "/checking-for-changesets",
          },
          {
            text: "Command line options",
            link: "/command-line-options",
          },
          {
            text: "Config file options",
            link: "/config-file-options",
          },
          {
            text: "Decisions",
            link: "/decisions",
          },
          {
            text: "Dictionary",
            link: "/dictionary",
          },
          {
            text: "Fixed packages",
            link: "/fixed-packages",
          },
          {
            text: "Linked packages",
            link: "/linked-packages",
          },
          {
            text: "Modifying changelog format",
            link: "/modifying-changelog-format",
          },
          {
            text: "Prereleases",
            link: "/prereleases",
          },
          {
            text: "Problems publishing in monorepos",
            link: "/problems-publishing-in-monorepos",
          },
          {
            text: "Snapshot releases",
            link: "/snapshot-releases",
          },
          {
            text: "Versioning applications and other non-npm packages",
            link: "/versioning-apps",
          },
          {
            text: "Experimental Options",
            link: "/experimental-options",
          },
        ],
      },
    },
    zh: {
      label: "中文",
      lang: "zh", // optional, will be added  as `lang` attribute on `html` tag
      link: "/zh/",
      description: "🦋 一个专注于多包仓库并用于管理版本和变更日日志的工具",
      themeConfig: {
        nav: [
          { text: "主页", link: "/zh/" },
          { text: "文档", link: "/zh/readme" },
        ],
        sidebar: [
          {
            text: "什么是 changesets？",
            link: "/zh/readme",
          },
          {
            text: "changesets 使用简介",
            link: "/zh/intro-to-using-changesets",
          },
          {
            text: "changesets 技术详解",
            link: "/zh/detailed-explanation",
          },
          {
            text: "常见问题",
            link: "/zh/common-questions",
          },
          {
            text: "添加一个 changeset",
            link: "/zh/adding-a-changeset",
          },
          {
            text: "自动化 changesets",
            link: "/zh/automating-changesets",
          },
          {
            text: "检查 changesets",
            link: "/zh/checking-for-changesets",
          },
          {
            text: "命令行选项",
            link: "/zh/command-line-options",
          },
          {
            text: "配置文件选项",
            link: "/zh/config-file-options",
          },
          {
            text: "changesets 规则和决策设计",
            link: "/zh/decisions",
          },
          {
            text: "changesets 名词注释",
            link: "/zh/dictionary",
          },
          {
            text: "固定包",
            link: "/zh/fixed-packages",
          },
          {
            text: "关联包",
            link: "/zh/linked-packages",
          },
          {
            text: "修改变更日志格式",
            link: "/zh/modifying-changelog-format",
          },
          {
            text: "预发行版",
            link: "/zh/prereleases",
          },
          {
            text: "monorepos 中发布的问题",
            link: "/zh/problems-publishing-in-monorepos",
          },
          {
            text: "快照发布",
            link: "/zh/snapshot-releases",
          },
          {
            text: "为应用程序和其他非 npm 包版本化",
            link: "/zh/versioning-apps",
          },
          {
            text: "实验性选项",
            link: "/zh/experimental-options",
          },
        ],
      },
    },
  },
  head: [
    [
      "meta",
      {
        property: "og:image",
        content:
          "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦋</text></svg>",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦋</text></svg>",
      },
    ],
    isProd &&
      process.env.GOOGLE_ID && [
        "script",
        {
          async: "",
          src: `https://www.googletagmanager.com/gtag/js?id=${
            process.env.GOOGLE_ID || ""
          }`,
        },
      ],
    isProd && [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.GOOGLE_ID || ""}');`,
    ],
  ].filter(Boolean) as HeadConfig[],
  themeConfig: {
    logo: "🦋",
    footer: {
      message:
        'Built with ❤️ by <a href="https://github.com/nnecec" target="_blank">@nnecec</a><br/><a href="https://github.com/nnecec/changesets-docs">The way</a> if you find the documentation source code.',
      copyright: `MIT ${new Date().getFullYear()} © <a href="https://github.com/changesets/changesets" target="_blank">Changesets</a>`,
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/changesets/changesets" },
      { icon: "x", link: "https://x.com/nnecec_cn" },
    ],
    editLink: {
      pattern:
        "https://github.com/nnecec/changesets-docs/edit/main/website/:path",
    },
    search: {
      provider: "local",
    },
  },
  titleTemplate: ":title - 🦋 Changesets",
  srcDir: "./src",
});
