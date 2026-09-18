---
title: "Blind, Laser-Validated Environment Estimation for Crowdsourced GNSS Reference Stations"
event: "ION GNSS+ 2026"
date: 2026-09-16
location: "Orlando, US"
type: oral
abstract: |
    Community-driven GNSS reference networks built on low-cost dual-frequency receivers are expanding dense RTK coverage far beyond government infrastructure, but their open participation model creates a quality-assurance gap: stations are installed by non-experts on balconies and rooftops, without site surveys, obstruction metadata, or antenna calibration.
    We present a blind, map-free estimator that recovers a station’s multipath environment from its own dual-frequency SNR and code-minus-carrier observables alone—no 3D model, external database, or site visit—by inverting GNSS interferometric reflectometry for the geometry of the obstructing environment rather than a geophysical quantity.
    Validated against an independently laser-surveyed pilot, it blindly recovers the obstructed hemisphere, the near-field wall and water-heater distances, and the antenna height above ground to the few-centimeter level, finer than public satellite imagery.
    We then ask systematically whether this per-direction map can improve positioning, across three operator families—direction-dependent variance inflation, satellite exclusion / partial ambiguity resolution, and empirical phase correction—in single-point and RTK modes.
    In single-point positioning the prior is subsumed by a-posteriori robust estimation (sub-centimeter change at all 21 stations); at the only severely-obstructed RTK base available here it does not beat a-posteriori residual gating, because the error is dominated by non-repeatable NLOS that only epoch-wise rejection removes.
    The map’s operative positioning role is thus classification and activation: a self-disabling dual-observable gate acts as a survey-free pre-classifier (validated do-no-harm across a ten-station network) that, with a legacy RTK health check, restricts intervention to environment-affected bases, where a physically-sized residual gate then rescues the study’s one broken base from meter-scale wrong fixes to centimeter grade.
    Across 21 stations from three networks on three continents, the work contributes a laser-validated blind site-characterization tool for crowdsourced networks and a clear delineation of where environment priors help positioning—in site QC and activation, not in direction-resolved measurement weighting.
tags: ["CORS", "GNSS-IR"]
url: "https://www.ion.org/gnss/abstracts.cfm?paperID=16787"
featured: false
lat: 28.3808
lng: -81.5110
thumbnail: ./photo.jpg
---

<!-- Body content. Fill in or replace. -->
