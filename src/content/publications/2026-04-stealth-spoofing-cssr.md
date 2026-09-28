---
title: "Stealth Spoofing of the CSSR Open Standard: A First Demonstration with QZSS CLAS"
authors: ["Hayato Shiono", "Nobuaki Kubo"]
venue: "Pacific PNT 2026"
year: 2026
type: conference
status: published
pages: "pp. 772-785"
doi: "10.33012/2026.20610"
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
presented_at: "2026-04-pacificpnt-waikiki"
featured: false
date: 2026-04-15
awards:
  - name: "Student Paper Award"
    venue: "Pacific PNT 2026"
    year: 2026
    type: paper
    url: https://www.kaiyodai.ac.jp/en/faculty/graduate/news/detail/pacific_pnt2026.html
---

<!-- Body content. Fill in or replace. -->
