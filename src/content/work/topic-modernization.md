---
title: Topic Modernization — TurboTax Interview Screens
summary: Migrated TurboTax interview screens from Intuit's legacy DSL to modern TypeScript rendered in Fuego Player (React) — cutting medium-complexity migration from 1–2 weeks to 1–2 days.
problem: TurboTax's interview screens ran on Intuit's legacy proprietary DSL. The company-wide Topic Modernization program needed them rebuilt as modern TypeScript that renders in Fuego Player, Intuit's React-based screen player. Manual migration took 1–2 weeks per medium-complexity flow. Harder still, the legacy screen flows didn't always encode IRS compliance directly — it was enforced in a separate process — so the migrated flows had to be reconstructed to follow IRS rules strictly.
approach: I led a cross-team effort and built a hybrid workflow that pairs deterministic conversion with AI. A deterministic stage handles the structural DSL-to-TypeScript translation; targeted AI prompts then enhance the output, with iterative self-correction. Working directly with the engineers doing migrations, I decomposed the work into task-specific prompts — and made sure the regenerated flows strictly followed the IRS compliance the legacy flows had handled elsewhere. This deterministic-then-AI approach was proven here first, then reused on the Form Conversion Service.
architecture: Deterministic transforms convert the legacy DSL into TypeScript targeting Fuego Player (React); AI prompts handle the ambiguous reconstruction; self-correction loops re-run flagged output. The generated screen flows are reshaped to encode IRS-compliant sequencing the legacy flows lacked. MCP plays a small supporting role, giving the AI agents better context for the task.
impact: Cut migration time for medium-complexity screens from 1–2 weeks to 1–2 days, and produced screen flows that strictly follow IRS compliance instead of depending on a separate downstream process.
tags: ["Topic Modernization", "TypeScript", "Fuego Player (React)", "AI-Assisted Migration", "IRS Compliance"]
order: 1
---

The genuinely hard part wasn't the language translation — it was compliance.
The legacy flows leaned on a separate process to enforce IRS rules, so a
faithful 1:1 port would have been wrong. The migrated screens had to be
reconstructed to follow IRS sequencing themselves. This is also where the
deterministic-then-AI pattern was first proven, before it was reused elsewhere.
