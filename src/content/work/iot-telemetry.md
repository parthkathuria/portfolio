---
title: Telemetry Pipeline at 650k+ Devices
summary: Built a distributed pipeline collecting real-time telemetry from 650,000+ solar trackers worldwide.
problem: A global solar fleet of 650,000+ trackers needed real-time monitoring and remote control, with telemetry reliable enough to drive operational decisions and a proprietary predictive tracking algorithm.
approach: I built the data pipeline end to end — ingestion, storage, and a monitoring/configuration dashboard for internal teams and customers — and designed the IoT data-management device that anchors collection at the edge.
architecture: Edge devices stream telemetry into a scalable distributed pipeline backed by a time-series database, migrated from a single instance to a VM + Docker hybrid cluster at 99% uptime. A REST API exposes metrics to analytics consumers; Jenkins CI/CD automates build, test, and deploy across the toolchain.
impact: Real-time visibility and control across 650,000+ devices, 60% faster deployment of the predictive tracking algorithm via automated configuration, and a database migration completed at 99% uptime.
tags: ["Distributed Systems", "IoT", "Time-Series", "AWS", "CI/CD"]
order: 3
---

This is the systems-at-scale counterweight to the tooling work: telemetry from
hundreds of thousands of devices is unforgiving about backpressure, partial
failure, and schema drift. The hybrid-cluster migration at 99% uptime was the
proof the pipeline could evolve without a maintenance window the fleet couldn't
afford.
