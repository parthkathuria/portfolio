---
title: Tax-Calculation Authoring Tool on AWS
company: Intuit
summary: Architected a hosted, event-driven platform for Tax Content access across the org — with the calc authoring tool as the MVP — then led its strategic deprecation, saving ~$20K/year in infrastructure costs.
problem: Every tool across the Tax Content org needed access to calc content, but each solved that on its own. The calc authoring tool was the most painful case — a Spring app developers ran locally, loading ~100K calcs into memory for a federal agency like the IRS, which would occasionally crash their machine. Distributing updates meant handing out JARs manually.
approach: I architected a hosted shared platform that any tool could build on, proved it by moving the calc authoring tool onto it as the MVP, then led its strategic deprecation when the surrounding platform shifted — rather than keeping a system alive for its own sake.
architecture: Microservices on Java/Spring, deployed via Kubernetes and ArgoCD. SNS/SQS for the pub/sub event backbone — the onboarding workflow publishes status without knowing who listens, so any team can subscribe without touching the producer. EventBridge for scheduled jobs. Content compilation (10+ minutes, full Maven toolchain) ran on ECS; short orchestration steps on Lambda — both coordinated by Step Functions. DynamoDB as the primary store, keyed per user/agency/tax year for idempotency. Elasticsearch for searching calcs by graph path, tax year, and agency. EFS as the shared volume for onboarded content.
impact: Every local tool user moved onto the hosted platform, eliminating the crash-prone local app. The pub/sub design kept the platform open-ended — any other tool could onboard by subscribing, with no changes to the onboarding workflow. When it was the right call, retired it cleanly to save ~$20K in annual infrastructure costs.
tags: ["AWS", "Event-Driven", "Kubernetes / ArgoCD", "Step Functions", "SNS/SQS", "DynamoDB"]
order: 4
---

The part I'm proudest of isn't the build — it's two things: the pub/sub seam
that made the platform extensible without coordination, and the deprecation.
The onboarding workflow never needed to know who was listening — that's the
design. And recognizing when a system has outlived its value, then retiring it
cleanly instead of keeping it alive, is as much engineering as building it.
Good engineering includes subtraction.
