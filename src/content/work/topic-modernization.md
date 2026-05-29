---
title: Topic Modernization — TurboTax Interview Screens
summary: Built the artifact-generation pipeline that accelerated migrating TurboTax interview screens from Intuit's legacy DSL toward modern TypeScript on Fuego Player (React) — helping cut medium-complexity migration from 1–2 weeks to 1–2 days.
problem: TurboTax's interview screens ran on Intuit's legacy proprietary DSL. The company-wide Topic Modernization program was rebuilding them as modern TypeScript rendered in Fuego Player, Intuit's React-based screen player — a large, multi-team effort. The dev teams building the new screens needed accurate inputs (the full screen flow, language files, a clear view of each legacy Topic) and assurance the screens met IRS compliance, which the legacy flows didn't always encode directly.
approach: My team owned the pipeline that produces those inputs — we built the accelerator, not the end-to-end rewrite. A deterministic stage parses the legacy interview code and generates three artifacts per Topic: the complete screen flow, the language files, and a Markdown migration report. AI prompts then consume those artifacts to audit the screens for IRS compliance and produce an audit report. Everything flows to the dev teams creating the new screens. This deterministic-then-AI pattern was proven here first, then reused on the Form Conversion Service.
architecture: A deterministic parser over the legacy interview DSL emits, per Topic, the screen flow, the language files, and a Markdown migration report. Those artifacts feed AI prompts that audit IRS compliance and output an audit report. All of it is consumed downstream by the teams building the new TypeScript / Fuego Player screens. MCP plays a small supporting role, giving the AI agents better context for the audit.
impact: Gave dev teams ready-to-use migration inputs — screen flow, language files, migration and compliance-audit reports — which helped cut medium-complexity screen migration from roughly 1–2 weeks to 1–2 days. The team owned the artifact pipeline, not the full screen rewrite: a force-multiplier on a larger migration.
tags: ["Topic Modernization", "TypeScript", "Fuego Player (React)", "AI Compliance Audit", "Developer Tooling"]
order: 1
---

The honest scope here matters: we didn't migrate every screen — we built the
pipeline that fed the teams who did. Deterministic parsing produced the flow,
language files, and migration report; AI audited those for IRS compliance and
wrote the audit report. Generating trustworthy inputs is what actually moved the
needle on migration speed, and it's where the deterministic-then-AI pattern was
first proven before it was reused on FCS.
