import { useRouter } from "next/router";

/** @type {import('nextra-theme-docs').DocsThemeConfig} */
export default {
  logo: <span>🦋 changesets</span>,
  project: {
    link: "https://github.com/changesets/changesets",
  },
  docsRepositoryBase: "https://github.com/nnecec/changesets/tree/main/website",
  chat: {
    icon: (
      <svg height={24} viewBox="0 0 24 24" width={24}>
        <g>
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
    ),
    link: "https://x.com/nnecec_cn",
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{" "}
        <a href="https://github.com/changesets/changesets" target="_blank">
          🦋 changesets
        </a>
        , website built by{" "}
        <a href="https://github.com/nnecec/changesets" target="_blank">
          @nnecec
        </a>
      </span>
    ),
  },
  i18n: [
    { locale: "en-US", text: "English" },
    { locale: "zh-CN", text: "中文（AI Translations）" },
  ],
  useNextSeoProps() {
    const { pathname } = useRouter();
    if (pathname.includes("zh-CN")) {
      return {
        titleTemplate: "%s – changesets 文档",
        description: "🦋 管理 monorepo 的版本更新及变更历史的工具",
      };
    }
    return {
      titleTemplate: "%s – changesets documentation",
      description:
        "🦋 A way to manage your versioning and changelogs with a focus on monorepos",
    };
  },
};
