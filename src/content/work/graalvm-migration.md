---
title: Print-Engine Migration to GraalVM Native Image
company: Intuit
summary: Migrated the tax-form print engine off a legacy Java→.NET bridge to a GraalVM native image for Java 11, coordinated across TurboTax Desktop and ProSeries.
problem: The tax-form print engine ran through a legacy Java-to-.NET bridge (IKVM) that blocked a Java 11 upgrade and tied two major desktop products to an aging, hard-to-maintain interop layer. Staying put meant carrying that liability indefinitely; moving meant touching a component both TurboTax Desktop and ProSeries depend on to render correct tax forms.
approach: I led the migration from the IKVM bridge to a GraalVM native image, getting the engine to Java 11 compatibility while preserving exact print output. Because the engine is shared, the work was as much cross-team coordination as it was code — sequencing and validating delivery across two product lines that could not afford print regressions.
architecture: Replaced the Java→.NET (IKVM) interop bridge with a GraalVM native image of the print engine, eliminating the bridge layer and unblocking the Java 11 upgrade. Delivery was coordinated across the TurboTax Desktop and ProSeries teams so both consumed the new engine without regressions in rendered output.
impact: Removed a long-standing interop liability, brought the print engine to Java 11, and shipped the change across two flagship desktop products without breaking print fidelity — turning a blocked upgrade into a clean modernization.
tags: ["GraalVM", "Java", "Native Image", "Cross-Team Delivery"]
order: 5
---

Shared components are the scariest things to modernize: the blast radius spans
every product that depends on them. The technical move — IKVM bridge to GraalVM
native image — mattered, but the reason it shipped without incident was the
cross-team sequencing and validation across TurboTax Desktop and ProSeries.
Print fidelity is non-negotiable in tax software; the migration had to be
invisible to the end product.
