---
title: "MRTKLIB"
category: oss
status: active
summary: "Modern GNSS positioning library — PPP, PPP-AR, PPP-RTK (CLAS/MADOCA) built on RTKLIB"
tech: ["C"]
tags: ["GNSS", "RTK", "PPP", "PPP-RTK", "CLAS", "MADOCA"]
repo: "https://github.com/h-shiono/MRTKLIB"
website: "https://h-shiono.github.io/MRTKLIB/"
doi: "10.5281/zenodo.20373746"
featured: true
startDate: 2026-02-23
---

MRTKLIB is a GNSS positioning library written in C11.
It is a modernized rework of [RTKLIB](https://www.rtklib.com/).
It brings the QZSS augmentation libraries (MALIB, MADOCALIB, CLASLIB) into one codebase.

- PPP and PPP-AR with QZSS MADOCA-PPP
- PPP-RTK with QZSS CLAS, in post-processing and real time
- PPP with IGS products and Galileo HAS
- RTK with algorithm improvements from demo5 RTKLIB
- One `mrtk` command for post-processing (`mrtk post`) and real time (`mrtk run`)

See the [release notes](https://github.com/h-shiono/MRTKLIB/releases) for the latest version.

## Getting started · はじめかた

Choose by how you want to use it.

- **Try real-time MADOCA-PPP with a receiver** → [mrtklib-quickstart](https://h-shiono.github.io/mrtklib-quickstart/)
  Start scripts for Windows, macOS, and Linux. One script sets up the receiver and opens the Web UI in your browser.
- **Use a GUI on any machine with Docker** → [mrtklib-docker-ui](/oss/mrtklib-docker-ui/)
  Set options, run post-processing or real-time positioning, and view results in a browser.
- **Command line, embedding, or development** → [MRTKLIB documentation](https://h-shiono.github.io/MRTKLIB/)
  Build from source with CMake. Runs on Linux, macOS, and embedded ARM boards.

## Components · 構成要素

- **MRTKLIB** — positioning engine and `mrtk` command
- **[mrtklib-docker-ui](/oss/mrtklib-docker-ui/)** — Web UI in a Docker container
- **[mrtklib-quickstart](https://github.com/h-shiono/mrtklib-quickstart)** — start scripts and teaching material for mrtklib-docker-ui
- **mrtklib-win** — native Windows app (planning)

## In use · 使用実績

- **2026-09-03: IPNTJ International GNSS Summer School 2026 (Day 4, Receiver Practice)**
  Septentrio used MRTKLIB and mrtklib-docker-ui for the real-time MADOCA-PPP exercise. ([report](/blog/2026-09-ipntj-summer-school/))
- **[CLAS Summary Dashboard](/works/clas-dashboard/)**
  Real-time CLAS PPP-RTK performance, computed with MRTKLIB.

## Papers · 論文

- [Blind, Laser-Validated Environment Estimation for Crowdsourced GNSS Reference Stations](/research/talks/2026-09-iongnss-orlando/) — Talk, ION GNSS+ 2026, EN. Proceedings forthcoming. The first paper to use MRTKLIB.

## Related · 関連

- [QZSS L6 対応受信機まとめ](/blog/2026-05-l6-capability-low-cost-receiver/) — Blog, 2026-05, JA
- [IPNTJ 2026 全国大会で MRTKLIB について講演しました](/blog/2026-05-ipntj-reflection/) — Blog, 2026-05, JA
- [L6対応受信機を CLAS 測位対応にする — MRTKLIB v0.6.5 と小型端末レシピ](https://zenn.dev/hatognss/articles/3c102a051af51d) — Zenn, 2026-03, JA

## Citation · 引用

To cite MRTKLIB, use the DOI above.
It points to all versions on Zenodo.
GitHub's "Cite this repository" button gives BibTeX and APA.

## License · ライセンス

BSD 2-Clause. See [LICENSE](https://github.com/h-shiono/MRTKLIB/blob/main/LICENSE).
