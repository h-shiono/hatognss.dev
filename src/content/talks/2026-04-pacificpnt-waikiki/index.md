---
title: "Stealth Spoofing of the CSSR Open Standard: A First Demonstration with QZSS CLAS"
event: "Pacific PNT 2026"
date: 2026-04-15
location: "Waikiki, US"
type: oral
abstract: |
    High-precision GNSS services utilizing the Compact State Space Representation (CSSR) format, such as QZSS CLAS, have become a de facto standard for scalable augmentation.
    However, the openness of these correction streams introduces significant security vulnerabilities.
    This study presents a comprehensive vulnerability analysis of CSSR against stealthy data-layer spoofing attacks.
    We classify potential attack vectors and evaluate their impact using both post-processing analysis and Hardware-in-the-Loop (HILS) experiments targeting a commercial u-blox ZED-F9P receiver.
    Our results reveal a critical dichotomy in receiver response: while scalar-based manipulations (clock, phase bias) are largely absorbed by the Kalman filter’s floating ambiguities, exhibiting intrinsic resilience, vector-based attacks (orbit, troposphere) successfully induce controlled position drifts without triggering integrity alarms.
    HILS validation confirmed that a 1-meter horizontal displacement was achieved while maintaining Fix solution quality, demonstrating the real-world feasibility of these attacks.
    We conclude that algorithmic defenses alone are insufficient, underscoring the necessity of cryptographic countermeasures such as Navigation Message Authentication (NMA) to secure the open high-precision GNSS ecosystem.
tags: ["QZSS", "CLAS", "Spoofing", "Vulnerability"]
url: "https://www.ion.org/publications/abstract.cfm?articleID=20610"
featured: false
lat: 21.2766
lng: -157.8267
thumbnail: ./photo.jpg
---

<!-- Body content. Fill in or replace. -->
