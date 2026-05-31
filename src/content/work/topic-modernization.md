---
title: TurboTax Interview Screen Modernization
company: Intuit
summary: Built the artifact-generation pipeline that drove migration of TurboTax interview screens from a legacy proprietary DSL to modern TypeScript on the company's React-based screen player — cutting medium-complexity migration from 1–2 weeks to 1–2 days.
problem: TurboTax's interview screens ran on a legacy proprietary DSL. A company-wide modernization program was rebuilding them as modern TypeScript rendered on the company's React-based screen player. Migration was slow and manual, and the legacy flows didn't always encode IRS compliance directly — it was enforced in a separate process — so the new screens had to be verified against IRS rules as they were built.
approach: I led the effort behind the pipeline that generates the inputs the new screens are built from. A deterministic stage parses the legacy interview code and produces three artifacts per topic — the complete screen flow, the language files, and a Markdown migration report — and AI prompts then audit those screens for IRS compliance and generate an audit report. I owned the deterministic stage and built several of the AI compliance prompts, and the artifacts flow to the teams creating the new TypeScript screens. This deterministic-then-AI pattern was proven here first, then reused on an internal form-conversion service.
architecture: A deterministic parser over the legacy interview DSL emits, per topic, the screen flow, the language files, and a Markdown migration report. Those artifacts feed AI prompts that audit IRS compliance and output an audit report, all consumed downstream by the teams building the new TypeScript screens. MCP plays a small supporting role, giving the AI agents better context for the audit.
impact: Delivered ready-to-use migration inputs — screen flow, language files, migration and compliance-audit reports — that cut medium-complexity screen migration from roughly 1–2 weeks to 1–2 days, the primary driver of the program's acceleration.
tags: ["Screen Modernization", "TypeScript", "React", "AI Compliance Audit", "Developer Tooling"]
order: 1
---

The leverage came from generating inputs the migration teams could trust.
Deterministic parsing produced the screen flow, language files, and migration
report; AI then audited those screens for IRS compliance and wrote the audit
report. Getting compliance right was the hard part — the legacy flows leaned on
a separate process to enforce it — and automating that audit is what turned a
1–2 week effort into 1–2 days. The pattern proved out here, then carried over to
an internal form-conversion service.
