---
title: Agentic AI Migration Pipeline
summary: Cut medium-complexity form migration from 1–2 weeks to 1–2 days with a hybrid deterministic + AI workflow.
problem: A company-wide modernization program needed to migrate thousands of complex forms off a legacy format. Pure manual migration took 1–2 weeks per medium-complexity form and did not scale to the program's timeline.
approach: Working directly with the engineers who do migrations, I decomposed the work into task-specific prompts with iterative self-correction loops, pairing deterministic conversion with targeted AI enhancement so each step stayed verifiable.
architecture: A deterministic conversion stage produces a structured intermediate, an AI enhancement stage improves it, an independent AI judge scores output quality against explicit criteria, and an automated feedback loop re-runs flagged items. Orchestrated over the Model Context Protocol (MCP) so tools and context are composable.
impact: Reduced migration time for medium-complexity forms from 1–2 weeks to 1–2 days, and made quality measurable rather than subjective via the independent judge stage.
tags: ["MCP", "Agentic AI", "Developer Tooling", "Platform Modernization"]
order: 1
---

The hard part was not generating output — it was *trusting* it. The independent
judge stage and feedback loop are what made an AI step safe to put in a
production migration path: every artifact is scored and bad ones are
automatically reworked before a human sees them.
