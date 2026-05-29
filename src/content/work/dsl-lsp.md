---
title: Domain-Specific Language with LSP Integration
summary: Replaced a legacy XML architecture with an AI-agent-ready DSL and a language server — a 15x faster clean build (60s → 4s).
problem: The form-conversion service was built on a verbose legacy XML architecture. Clean builds took 60 seconds, the format was painful for humans to author and nearly impossible for AI agents to target reliably, and authors only discovered mistakes late in the build instead of while typing.
approach: I designed and productionized a domain-specific language to replace the XML, shaping its syntax to be equally legible to humans and AI agents. Then I built first-class editor support around it via the Language Server Protocol, so the same validation logic that gates the build also powers real-time feedback in the editor — one source of truth for what "valid" means.
architecture: A purpose-built DSL with its own compiler and toolchain, fronted by a Language Server Protocol (LSP) implementation providing diagnostics, validation, and editor intelligence in any LSP-capable IDE. The compiler and the language server share the same semantic core, so editor errors and build errors never disagree.
impact: 15x improvement in clean build times — 60 seconds down to 4 seconds — an authoring surface AI agents can target directly, and validation that surfaces in-editor instead of failing late in CI.
tags: ["LSP", "Compilers / DSL", "Developer Experience", "AI-Ready Architecture"]
order: 2
---

Designing the language for *two* consumers — humans and AI agents — drove every
syntax decision. The payoff from LSP was architectural, not cosmetic: because
the language server and the compiler share one semantic core, the editor
experience and the build can never disagree about what is valid. That is the
difference between tooling that helps and tooling you have to second-guess.
