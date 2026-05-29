---
title: Agentic AI Migration Pipeline
summary: Cut medium-complexity form migration from 1–2 weeks to 1–2 days with a hybrid deterministic + AI workflow on MCP.
problem: A company-wide modernization program needed to migrate thousands of complex tax forms off a legacy format. Pure manual migration took 1–2 weeks per medium-complexity form, depended on scarce domain experts, and could not scale to the program's timeline. Naively handing the job to an LLM was worse — output looked plausible but failed silently, and nobody could trust it in a production migration path.
approach: I led the cross-team effort and worked directly with the engineers who do migrations to decompose the workflow into task-specific prompts with iterative self-correction loops. The guiding principle was to use determinism wherever the transformation is well-defined and reserve AI for the genuinely ambiguous steps — then make the AI's output measurable instead of taking it on faith.
architecture: A deterministic stage performs the structural XML-to-DSL conversion. An AI enhancement stage handles the ambiguous, judgment-heavy parts. An independent AI judge scores each artifact against explicit quality criteria, and an automated feedback loop re-runs anything the judge flags before a human ever sees it. The whole pipeline is orchestrated over the Model Context Protocol (MCP) so tools, context, and models stay composable and swappable.
impact: Reduced migration time for medium-complexity forms from 1–2 weeks to 1–2 days, removed the hard dependency on a handful of domain experts, and — via the independent judge — turned "is this migration correct?" from a subjective review into a measurable gate.
tags: ["MCP", "Agentic AI", "LLM Evaluation", "Platform Modernization"]
order: 1
---

The hard part was never generating output — it was *trusting* it. The
independent judge stage and the automated feedback loop are what made an AI step
safe to put in a production migration path: every artifact is scored against
explicit criteria, and anything that fails is reworked automatically before it
reaches a reviewer. Determinism where the problem is well-defined, AI where it
genuinely isn't, and a measurable gate between them.
