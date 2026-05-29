---
title: Form Conversion Service (FCS) Modernization
summary: Designed a new DSL with LSP tooling to replace FCS's legacy XML/XSLT conversion into the IRS MeF data model, and migrated legacy XSLTs onto it — 15× faster clean builds (60s → 4s).
problem: The Form Conversion Service (FCS) converts Intuit's XML tax data into the IRS MeF (Modernized e-File) data model. The existing architecture relied on custom XSLTs and mappings — verbose, slow to build (60s clean builds), hard for both humans and AI agents to author, and without real editor tooling.
approach: I designed and productionized a new domain-specific language to replace the XSLT approach, with first-class LSP editor support so authors get diagnostics and validation as they type. To move the legacy logic onto the new DSL, I reused the deterministic-then-AI approach proven on Topic Modernization — a deterministic XML-to-DSL conversion first, then AI prompts to enhance the output, with quality checks and self-correction. The high-level shape was the same; the low-level implementation differed for XML/XSLT.
architecture: A purpose-built DSL with its own compiler and toolchain, fronted by Language Server Protocol (LSP) integration that provides diagnostics, validation, and editor intelligence in any LSP-capable IDE. The DSL performs the XML-to-IRS-MeF conversion that custom XSLTs handled before. Migration runs a deterministic XML-to-DSL stage, then AI enhancement with self-correction; MCP plays a small supporting role, giving the AI agents better context.
impact: 15× faster clean builds — 60 seconds down to 4 — and an authoring surface legible to both humans and AI agents. Migration time-savings weren't measured; my role ended before the full rollout.
tags: ["FCS", "DSL / Compilers", "LSP", "IRS MeF", "AI-Assisted Migration"]
order: 2
---

Designing the DSL for two audiences — humans and AI agents — drove the syntax,
and LSP meant the editor and the compiler shared one definition of "valid." I
designed the language, the tooling, and the migration approach; I was laid off
before seeing the full XSLT migration through, so the lasting wins I can point
to are the architecture and the 15× build improvement rather than a final
migration metric.
