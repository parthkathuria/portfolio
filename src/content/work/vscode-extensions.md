---
title: IDE-Native Developer Tooling (VSCode Extensions)
summary: Unified diagnostics, deployment, and localization authoring into VSCode extensions — projected +30% and measured +50% developer productivity.
problem: Tax developers were context-switching across scattered command-line tools and web dashboards to diagnose, deploy, and author form localization (NLS) files. The localization workflow in particular was a recurring source of malformed JSON that only surfaced downstream, costing real time and trust.
approach: I led end-to-end delivery of IDE-native tooling that brings the work to where developers already are. Rather than another external dashboard, the diagnostic and deployment workflows became a single in-editor experience, and the localization authoring tool validated JSON in real time as developers typed — backed by MCP integration so the editor has the context it needs.
architecture: VSCode extensions built on the VSCode Extension API. One unifies diagnostic and deployment tooling into a single IDE-native surface. A second authors and validates NLS localization files with real-time JSON error detection and Model Context Protocol (MCP) integration, catching malformed JSON at author time instead of in a downstream pipeline.
impact: The unified diagnostic/deployment extension is projected to raise developer velocity by 30%. The localization extension eliminated a critical class of malformed-JSON errors and increased tax-developer productivity by 50%.
tags: ["VSCode Extension API", "MCP", "Developer Experience", "Tooling"]
order: 3
---

The theme across both extensions: meet developers in the editor, validate at the
moment of authoring, and kill whole error classes before they enter a pipeline.
Real-time JSON validation on the localization files didn't just speed people up —
it removed a recurring source of downstream failures entirely, which is worth far
more than the raw productivity number suggests.
