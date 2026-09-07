---
title: "mrtklib-docker-ui"
category: oss
status: active
summary: "Web UI for MRTKLIB — GNSS post-processing, real-time positioning, QZSS CLAS/MADOCA, in Docker"
tech: ["Docker", "TypeScript"]
tags: ["GNSS", "Tooling"]
repo: "https://github.com/h-shiono/mrtklib-docker-ui"
featured: false
startDate: 2026-03-30
---

mrtklib-docker-ui wraps [MRTKLIB](../mrtklib) with a Web UI and deploys via Docker. 
Users can set parameters in a browser, switch between post-processing and real-time positioning, and visualize output from QZSS CLAS or MADOCA-PPP.

## Usage · 使い方

[mrtklib-quickstart](https://github.com/h-shiono/mrtklib-quickstart) provides a beginner-friendly introduction to running mrtklib-docker-ui, including startup scripts for Windows, Linux, and macOS. 
See the [companion web page](https://h-shiono.github.io/mrtklib-quickstart/) for step-by-step instructions.

## In use · 使用実績

- **2026-09-03: IPNTJ International GNSS Summer School 2026 (Day 4, Receiver Practice)**
  Septentrio demonstrated real-time MADOCA-PPP positioning using MRTKLIB, showing centimeter-level accuracy with QZSS augmentation.

## Related articles · 関連記事

- [MRTKLIB Web UI を公開しました](https://zenn.dev/hatognss/articles/32aff3662710e3) — Zenn, 2026-05-11
- [L6対応受信機を CLAS 測位対応にする — MRTKLIB v0.6.5 と小型端末レシピ](https://zenn.dev/hatognss/articles/3c102a051af51d) — Zenn, 2026-03-30
