---
title: Tax-Calculation Authoring Tool on AWS
summary: Architected an event-driven authoring & debugging tool on AWS — then led its strategic deprecation, saving ~$20k/yr.
problem: Authoring and debugging tax calculations was slow and opaque. The team needed a faster way to author calculation logic and inspect its behavior, without standing up and babysitting long-lived infrastructure.
approach: I architected an event-driven microservice system on AWS so the tool scaled with demand instead of running idle capacity. Later, when usage and the surrounding platform shifted, I made the harder, less glamorous call — rather than keep a system alive for its own sake, I led its strategic deprecation and migrated off it cleanly.
architecture: An event-driven microservice architecture on AWS — Lambda for compute, ECS for longer-running workloads, EventBridge for event routing, and CloudFormation for reproducible infrastructure-as-code. The event-driven design kept the system responsive under bursty authoring workloads without paying for idle capacity.
impact: Delivered a working authoring-and-debugging capability on a scalable, reproducible AWS footprint — and, when it was the right decision, retired it cleanly to save approximately $20,000 per year in infrastructure cost. Knowing when to sunset a system is as much engineering as building it.
tags: ["AWS", "Event-Driven", "Lambda / ECS", "Infrastructure-as-Code"]
order: 4
---

The part I'm proudest of here isn't the build — it's the deprecation. It's easy
to let a system you architected live forever. Recognizing that the platform had
moved on, then leading a clean migration off it to save ~$20k/yr, was the
higher-leverage decision. Good engineering includes subtraction.
