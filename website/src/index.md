---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "🦋 Changesets"
  text: "A way to manage your versioning and changelogs with a focus on monorepos"
  actions:
    - theme: brand
      text: Documentation
      link: /readme

features:
  - title: Monorepo-Friendly Multi-Package Versioning
    details: Changesets is purpose-built for monorepos, enabling coordinated versioning across multiple packages and automatically updating inter-package dependencies
  - title: Semantic Versioning via Explicit Changeset Declarations
    details: Developers declare the impact of each change (major/minor/patch) through a changeset, ensuring version bumps adhere to Semantic Versioning (SemVer) principles
  - title: Automatic Changelog Generation and Version Bumping
    details: The tool aggregates all changesets to automatically generate a structured CHANGELOG.md and compute correct version numbers for affected packages
  - title: Changeset as Intent to Release
    details: Each changeset represents a clear intent to release specific packages at defined SemVer bump types, accompanied by a human-readable summary of changes
  - title: Deep Integration with Git and CI/CD
    details: Changesets are stored as Markdown files in a .changeset directory and committed alongside code, enabling seamless automation of versioning and publishing in CI pipelines
  - title: Lightweight and Automatable Release Workflow
    details: With a simple CLI, Changesets supports an end-to-end automated workflow—from declaring changes to publishing packages—streamlining team-based version management
---

