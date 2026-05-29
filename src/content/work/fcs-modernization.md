---
title: Form Conversion Service (FCS) Modernization
summary: Led productionization of a new DSL (designed by other engineers) to replace FCS's legacy XML/XSLT conversion to the IRS MeF data model — owning the XML→DSL migration and the user tooling. 15× faster clean builds (60s → 4s).
problem: The Form Conversion Service (FCS) converts Intuit's XML tax data into the IRS MeF (Modernized e-File) data model. The existing architecture relied on custom XSLTs and mappings — verbose, slow to build (60s clean builds), and without real editor tooling. A new domain-specific language had been designed to replace it, but getting it production-ready, migrating the legacy XSLTs onto it, and giving users the tooling to author in it all needed an owner.
approach: The project was handed off to me and I led it from there. I productionized the DSL and its toolchain, drove the migration of the legacy XML/XSLT onto the new DSL, and built the tooling users needed — including LSP-based editor support for real-time diagnostics and validation. For the migration I reused the deterministic-then-AI approach proven on Topic Modernization — a deterministic XML-to-DSL conversion first, then AI prompts to enhance the output, with quality checks and self-correction. The high-level shape matched; the low-level implementation differed for XML/XSLT.
architecture: The DSL (designed by other engineers) has its own compiler and toolchain; I hardened it for production and added Language Server Protocol (LSP) integration so authors get diagnostics and validation in any LSP-capable IDE. The DSL performs the XML-to-IRS-MeF conversion that custom XSLTs handled before. Migration runs a deterministic XML-to-DSL stage, then AI enhancement with self-correction; MCP plays a small supporting role giving the AI agents better context.
impact: 15× faster clean builds — 60 seconds down to 4 — plus a production-ready DSL, an LSP authoring experience, and a working XML→DSL migration path. Migration time-savings weren't measured; my role ended before the full rollout.
tags: ["FCS", "DSL Productionization", "LSP", "IRS MeF", "AI-Assisted Migration"]
order: 2
---

Credit where due: I didn't design the DSL — other engineers did. What I owned
was making it real: productionizing the language and toolchain, leading the
XML→DSL migration, and building the LSP-based tooling authors actually use. I was
laid off before the full migration shipped, so the durable wins I can point to
are the production-ready tooling and the 15× build improvement rather than a
final migration metric.
