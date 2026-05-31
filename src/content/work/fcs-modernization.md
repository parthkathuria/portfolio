---
title: DSL Modernization for a Form-Conversion Service
company: Intuit
summary: Led the productionization of a new DSL that replaces an internal form-conversion service's legacy XML/XSLT conversion to the IRS MeF data model — owning the XML→DSL migration and the user tooling. 15× faster clean builds (60s → 4s).
problem: An internal form-conversion service converts the company's XML tax data into the IRS MeF (Modernized e-File) data model. The legacy architecture relied on custom XSLTs and mappings — verbose, slow to build (60s clean builds), and without real editor tooling. Moving the service onto a new DSL meant making the language production-ready, migrating the legacy XSLTs onto it, and giving authors the tooling to work in it.
approach: I led the effort end to end — productionizing the DSL and its toolchain, driving the migration of the legacy XML/XSLT onto the new DSL, and building the tooling authors needed, including LSP-based editor support for real-time diagnostics and validation. For the migration I reused the deterministic-then-AI approach proven on the TurboTax screen modernization — a deterministic XML-to-DSL conversion first, then AI prompts to enhance the output, with quality checks and self-correction.
architecture: The DSL compiles through its own toolchain, which I hardened for production and fronted with Language Server Protocol (LSP) integration so authors get diagnostics and validation in any LSP-capable IDE. The DSL performs the XML-to-IRS-MeF conversion that custom XSLTs handled before. Migration runs a deterministic XML-to-DSL stage, then AI enhancement with self-correction; MCP plays a small supporting role, giving the AI agents better context.
impact: 15× faster clean builds — 60 seconds down to 4 — plus a production-ready DSL, an LSP authoring experience, and a working XML→DSL migration path off the legacy XSLTs.
tags: ["DSL Productionization", "Compilers", "LSP", "IRS MeF", "AI-Assisted Migration"]
order: 2
---

Productionizing a language is its own discipline. I fronted the toolchain with
an LSP server so the editor and the compiler share one definition of "valid" —
authors get diagnostics as they type instead of failing late in a build. Pairing
that with the deterministic-then-AI migration gave a fast, legible path off the
legacy XSLTs and onto a DSL that both humans and AI agents can target.
