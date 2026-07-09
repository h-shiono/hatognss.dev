---
title: "Inter-augmentation SIS bias (IASB): a novel integrity monitor for QZSS CLAS PPP-RTK"
authors: ["H.Shiono", "N.Kubo"]
venue: "GPS Solutions"
year: 2026
type: journal
status: published
doi: "10.1007/s10291-026-02109-6"
abstract: |
    Bottom-up PPP-RTK services, such as QZSS CLAS, generate corrections using local reference station networks.
    Prior work identified ``Error Cross-Contamination,'' where global errors leak into local atmospheric estimates.
    This study addresses the inverse risk: local anomalies---such as crustal deformation from earthquakes---being absorbed into global Signal-In-Space (SIS) corrections, creating ``silent failures'' that maintain internal consistency while producing physically erroneous outputs.
    As a feasibility study for autonomous user-side integrity monitoring, we propose the Inter-Augmentation SIS Bias (IASB), which compares SIS corrections between bottom-up PPP-RTK and top-down global PPP architectures.
    We position IASB as a complement to existing observation-domain integrity methods (e.g., ARAIM-based approaches), specifically targeting threats that are architecturally unique to bottom-up systems and undetectable through self-consistency-based quality indicators.
    Validation using real data, including the 2024 Noto Peninsula earthquake, geomagnetic storms, and tropospheric divergence events, demonstrated that IASB detects anomalies with high sensitivity where existing indicators failed.
    The proposed fault isolation framework further classified detected anomalies by root cause: crustal deformation, atmospheric disturbances, or system errors.
    Operating in the correction domain rather than the measurement domain, the method requires minimal computational resources and can be executed autonomously by user receivers, offering a practical foundation for next-generation PPP-RTK integrity monitoring at the user edge.
tags: ["QZSS", "CLAS", "PPP-RTK", "Integrity monitoring", "Fault detection and isolation"]
url: "https://link.springer.com/article/10.1007/s10291-026-02109-6"
featured: false
date: 2026-06-22
---

<!-- Body content. Fill in or replace. -->
