---
title: TurboTax Interview Screen Modernization
company: Intuit
summary: Built the artifact-generation pipeline that drove migration of TurboTax interview screens from a legacy proprietary DSL to modern TypeScript on the company's React-based screen player — cutting medium-complexity migration from 1–2 weeks to 1–2 days.
problem: TurboTax's interview screens ran on a legacy proprietary DSL. A company-wide modernization program was rebuilding them as modern TypeScript rendered on the company's React-based screen player. Migration was slow and manual, and the legacy flows didn't always encode IRS compliance directly — it was enforced in a separate process — so the new screens had to be verified against IRS rules as they were built.
approach: I led a dedicated sub-team (tools engineers, a screen-team engineer, and a tax analyst) behind the pipeline that generates the inputs the new screens are built from. A deterministic stage parses the legacy interview code and produces four artifacts per topic — the starter completeness graph, the calc file of embedded logic to extract, the migration report, and interview files organized by topic. A human-in-the-loop prompt chain in Cursor then uses those artifacts to audit IRS compliance and iteratively fix the completeness graph, with a teammate's MCP tools handling validation. Migrators ran the chain one prompt at a time, with a five-retry ceiling and human pickup for anything the loop couldn't resolve. This deterministic-then-AI pattern was proven here first, then reused on an internal form-conversion service.
architecture: A deterministic parser over the legacy interview DSL emits four artifacts per topic — the starter completeness graph, the calc file, the migration report, and interview files organized by topic. Those feed a single-purpose Cursor prompt chain (logic map → verification → compliance fix → compliance evaluation, up to 5× → audit report), backed by MCP tools for completeness-graph validation and updates. Human-in-the-loop by design — a migrator runs each step, not an autonomous agent.
impact: Delivered ready-to-use migration inputs that cut medium-complexity screen migration from roughly 1–2 weeks to 1–2 days. Validated in a sprint with six migrators across topics ranging easy to hard — every migrated topic rendered correctly in the new player, giving the team confidence to hand the workflow to the broader migration org.
tags: ["Screen Modernization", "TypeScript", "React", "AI Compliance Audit", "Developer Tooling"]
order: 1
---

The leverage came from generating inputs the migration teams could trust, and
keeping a human in the loop throughout. Deterministic parsing produced the four
artifacts; a single-purpose prompt chain then fixed compliance and wrote the
audit report — each step done by a migrator, not an autonomous agent, so the
model's output was always cross-checked against real validation rather than its
own opinion. Getting compliance right was the hard part — the legacy flows
leaned on a separate process to enforce it — and that disciplined chain is what
turned a 1–2 week effort into 1–2 days. The pattern proved out here, then
carried over to an internal form-conversion service.
