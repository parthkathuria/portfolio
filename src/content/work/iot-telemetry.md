---
title: Telemetry Pipeline at 650k+ Devices
summary: Built a distributed pipeline collecting real-time telemetry from 650,000+ solar trackers worldwide, with a 99% uptime database migration.
problem: A global solar fleet of 650,000+ trackers needed real-time monitoring and remote control. The telemetry had to be reliable enough to drive operational decisions and feed a proprietary predictive tracking algorithm — at a scale where backpressure, partial failure, and schema drift are constant, and where the fleet can't tolerate maintenance windows.
approach: I built the data pipeline end to end — edge collection, ingestion, storage, and a monitoring/configuration dashboard for both internal teams and customers — and designed the IoT data-management device that anchors collection at the edge. I also automated the configuration and deployment of the predictive tracking algorithm so rolling it out stopped being a manual, error-prone chore.
architecture: Edge devices stream telemetry into a scalable distributed pipeline backed by a time-series database, which I migrated from a single instance to a VM + Docker hybrid cluster while holding 99% uptime. A REST API exposes metrics to the Data Analytics team, and Jenkins CI/CD automates build, test, and deployment across the toolchain.
impact: Real-time visibility and remote control across 650,000+ devices, a 60% reduction in predictive-algorithm deployment time via automated configuration, and a live database migration completed at 99% uptime — no maintenance window the fleet couldn't afford.
tags: ["Distributed Systems", "IoT", "Time-Series", "AWS", "CI/CD"]
order: 6
---

This is the systems-at-scale counterweight to the tooling work. Telemetry from
hundreds of thousands of devices is unforgiving about backpressure, partial
failure, and schema drift — the failure modes are statistical, not anecdotal.
Migrating the time-series database to a hybrid cluster at 99% uptime was the
proof the pipeline could evolve without a maintenance window the fleet couldn't
afford.
