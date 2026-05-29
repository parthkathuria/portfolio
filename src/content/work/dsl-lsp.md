---
title: Domain-Specific Language with LSP Integration
summary: Replaced a legacy XML architecture with an AI-agent-ready DSL, delivering a 15x faster clean build (60s → 4s).
problem: A form-conversion service was built on a verbose legacy XML architecture that was slow to build, hard for both humans and AI agents to author, and lacked editor tooling.
approach: I designed and productionized a domain-specific language to replace the XML, then built first-class editor support around it so authors get real-time feedback instead of failing late in a build.
architecture: A purpose-built DSL with a compiler/toolchain, fronted by full Language Server Protocol (LSP) integration that provides diagnostics, validation, and editor intelligence in any LSP-capable IDE. The language was shaped to be equally legible to AI agents and humans.
impact: 15x improvement in clean build times — from 60 seconds to 4 seconds — plus an authoring surface that AI agents can target directly.
tags: ["LSP", "Compilers / DSL", "Developer Experience", "AI-Ready Architecture"]
order: 2
---

Designing the language for *two* consumers — humans and AI agents — drove the
syntax decisions. LSP integration meant the same validation logic powered both
the editor experience and the build, so there was one source of truth for what
"valid" means.
