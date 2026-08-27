# UCD Resume — Portfolio

[![CI](https://github.com/ayosomo/UCD-resume/actions/workflows/ci.yml/badge.svg)](https://github.com/ayosomo/UCD-resume/actions/workflows/ci.yml)

A focused frontend-engineering portfolio for Olu Osomo. The site presents three production-style projects, the engineering problems behind them and the quality practices used to ship them.

| | |
| --- | --- |
| **Live demo** | [Open the portfolio](https://ayosomo.github.io/UCD-resume/) |
| **Stack** | Semantic HTML, modern CSS, responsive design |
| **Tests** | Node test runner for structure, content and privacy checks |
| **Deployment** | GitHub Pages, gated by GitHub Actions |

## Screenshot

![Portfolio homepage showing selected frontend engineering work](./docs/images/portfolio.png)

## Highlights

- Clear positioning and concise project case-study cards
- Direct links to live demos and source repositories
- Responsive layout with a dark, high-contrast visual system
- Semantic landmarks, skip navigation and visible keyboard focus
- Reduced-motion support
- No home address, phone number or non-functional contact form

## Installation

Prerequisite: Node.js 20 or newer for the automated checks.

```bash
git clone https://github.com/ayosomo/UCD-resume.git
cd UCD-resume
npm install
npm test
```

Open `index.html` directly or start a local static server:

```bash
npx serve .
```

## Tests

```bash
npm test
```

The test suite verifies the document structure, project links, accessibility hooks, stylesheet reference and the removal of obsolete personal contact details.

## Project structure

```text
.
├── .github/workflows/  # CI and GitHub Pages release
├── assets/css/         # Visual system and responsive layout
├── docs/images/        # README screenshot
├── tests/              # Dependency-free source checks
└── index.html          # Portfolio content and semantic structure
```

## Licence

Copyright (c) 2026 Olu Osomo. All rights reserved. The source is available for portfolio review.
