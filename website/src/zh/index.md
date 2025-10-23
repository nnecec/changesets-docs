---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "🦋 Changesets"
  text: "一个专注于多包仓库并用于管理版本和变更日志的工具"
  actions:
    - theme: brand
      text: 文档
      link: /readme

features:
  - title: 面向 Monorepo 的多包版本管理
    details: Changesets 专为 monorepo 场景设计，可同时管理多个包的版本变更，并自动处理包之间的依赖更新
  - title: 基于语义化版本的变更声明
    details: 开发者通过创建变更集（changeset）声明每个变更对包的影响类型（major/minor/patch），确保版本升级符合语义化版本规范
  - title: 自动生成 Changelog 与版本号
    details: 工具能自动汇总所有变更集内容，生成结构化的 CHANGELOG.md 文件，并为相关包计算正确的版本号
  - title: 变更即发布意图（Changeset as Release Intent）
    details: 每个 changeset 代表一次明确的发布意图，包含受影响的包、版本升级类型和变更摘要，使发布过程透明可控
  - title: 与 Git 和 CI/CD 深度集成
    details: 变更集以 Markdown 文件形式存储在 .changeset 目录中，需随代码提交；支持在 CI 环境中自动化执行版本升级与发布流程
  - title: 轻量且可自动化的发布工作流
    details: Changesets 提供 CLI 工具，支持从变更声明到版本发布的一站式自动化流程，简化团队协作中的版本管理
---

