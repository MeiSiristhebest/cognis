# Cognis — High-Precision Cognitive & Workplace Behavioral Assessment System

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" /></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&amp;logo=next.js" alt="Next.js" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&amp;logo=typescript" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&amp;logo=tailwindcss" alt="Tailwind" /></a>
  <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&amp;logo=prisma" alt="Prisma" /></a>
</p>

<p align="center">
  <a href="README.md">🇨🇳 中文</a> &nbsp;|&nbsp; <a href="README_EN.md">🇺🇸 English</a>
</p>

---

<p align="center">
  <strong>High-Precision Cognitive & Workplace Behavior Assessment System Powered by 2PL-IRT Item Response Theory</strong>
</p>

## Table of Contents

- [About](#about)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## About

Cognis is a high-precision cognitive and behavioral assessment system for workplace scenarios, replacing heuristic weighted scoring with rigorous psychometric models. It covers five assessment systems — Big Five, Enneagram, CliftonStrengths, DiSC, and Jungian Cognitive Self-Efficacy. All algorithms and question banks run entirely offline on the client, balancing measurement precision with data privacy.

## Features

- **🧠 Scientifically Rigorous Psychological Model**: Rejects simplistic weighted summation, introducing **2PL-IRT (Two-Parameter Logistic Item Response Theory)** and **MAP (Maximum-A-Posteriori)** estimation algorithms, computing true scores with 95% confidence intervals (SEM).
- **📊 Comprehensive Five-Assessment System Integration**:
  - **Big Five (OCEAN) Personality**: 30 validated SJT (Situational Judgment Test) anchored items, precisely measuring Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.
  - **Enneagram**: Continuous 9-tier health-level dynamic evolution, combined with motivational option-level scoring and stress defense mechanism recognition.
  - **CliftonStrengths (Gallup)**: Full 180 paired-comparison card coverage, 100% coverage of the 34 official core themes.
  - **DiSC Workplace Behavior Model**: Measures four directional vectors: D (Dominance), i (Influence), S (Steadiness), and C (Conscientiousness).
  - **Jungian Cognitive Self-Efficacy**: Six situational cognitive self-efficacy decision cards with projective testing.
- **🖼️ Native Canvas 2D Offline Poster Composition**: Zero third-party dependencies, millisecond client-side composition of high-resolution personalized assessment reports and achievement cards for easy sharing.
- **🔒 100% Offline-First & Data Privacy**: All measurement algorithms and question data can run purely offline on the client side, with zero data telemetry or leakage risk.

## Requirements

- Node.js 18.x or higher
- Package managers: pnpm / npm / yarn

## Installation

```bash
git clone https://github.com/MeiSiristhebest/cognis.git
cd cognis
pnpm install
# or using npm
npm install
```

## Quick Start

Start the development server:

```bash
pnpm run dev
# or
npm run dev
```

**Expected output**:

```bash
▲ Next.js 16.x.x
- Local:        http://localhost:3000
✓ Ready in XXX ms
```

Open `http://localhost:3000` in your browser to see the running application.

Production build:

```bash
pnpm run build
pnpm run start
```

## Configuration

The project runs in a pure frontend / offline mode and starts without any configuration. When enabling the server-side database mode, distribute the following secrets via environment variables:

| Environment Variable | Description | Required |
|----------------------|-------------|----------|
| `NEXTAUTH_SECRET` | NextAuth session signing secret, enforced via environment variable | Yes (production) |
| `AUTH_TRUST_HOST` | Trust the Host header; enable locally only | No |

## Architecture

The Cognis engine is built on rigorous quantitative measurement and statistical estimation methods:

### 1. Big Five 2PL-IRT (Two-Parameter Logistic Item Response Theory)

For each item $i$, the response probability follows the two-parameter logistic model:

$$P_i(\theta) = \frac{1}{1 + e^{-a_i(\theta - b_i)}}$$

- $a_i$ = Item Discrimination
- $b_i$ = Item Difficulty
- $\theta$ = Examinee's Latent Trait Ability Value

**Newton-Raphson iteration** is used to solve the MAP (Maximum A Posteriori) estimate, and the Standard Error of Measurement (SEM) plus the **95% confidence interval** are derived from the Fisher information matrix derivative.

### 2. Continuous 9-Tier Enneagram Health Evolution

Breaks the traditional rigid healthy/unhealthy binary classification, smoothly interpolating a continuous health-level index from 1.0 – 9.0 through reaction-time (Reaction Time) jitter and stress-item selection patterns.

### 3. DiSC & Cognitive Resource Allocation Synergy

The resource-allocation test (`rd`, `mkt`, `hr`, `ops`) is reconstructed as an auxiliary basis for DiSC vectors, forming "task-oriented vs. people-oriented" cross-validation, and computing the overall reaction-time confidence level.

## Project Structure

```text
cognis/
├── app/                  # Next.js App Router pages & route entry
│   ├── globals.css       # Core styles & design tokens
│   ├── layout.tsx        # Root layout & metadata config
│   └── page.tsx          # Assessment entry & test home
├── components/           # UI component library
│   ├── cognis/           # Cognis-exclusive assessment UI engine
│   │   ├── assessment-shell.tsx  # Assessment wizard shell
│   │   ├── results-dashboard.tsx # Assessment results renderer & chart dashboard
│   │   └── scoring-engine.ts    # Psychometrics scoring engine core
│   └── ui/               # Generic base UI primitives
├── lib/                  # Utility functions & adapters
├── public/               # Static assets & question database
│   └── data/
│       └── questions.json # Physically decoupled question-bank data file
├── prisma/               # Prisma Schema & database config
├── GEMINI.md             # Architectural evolution & decision log (Chronicle)
├── package.json          # Project configuration
└── README.md             # This documentation
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Core Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript 5.7 (Strict Mode) |
| Styling & Design System | Tailwind CSS 4 + native Vanilla CSS design variables |
| State Management | Zustand |
| Database & ORM | Prisma 7 + PostgreSQL Adapter (`@prisma/adapter-pg`) |
| Charts & Visualization | Recharts |
| Animation | Framer Motion + Tw-Animate-CSS |
| Data Decoupling | JSON static-asset database adapter mode (`public/data/questions.json`) |

## Contributing

Contributions welcome. Quick flow:

```bash
# 1. Fork → Clone → Branch
git checkout -b feat/your-feature

# 2. Type-check passes
pnpm tsc --noEmit

# 3. Run lint
pnpm lint

# 4. Commit and open a PR
git commit -m "feat: your change"
git push origin feat/your-feature
```

**Welcome contribution directions**:

- 🧮 Optimize the IRT estimation algorithm (add EAP, MCMC, and other estimation strategies)
- 🎨 Polish Canvas poster composition visual details
- 🌐 Add i18n internationalization language packs
- 🧪 Add unit tests for the scoring engine and each assessment module

## Security

| Risk Scenario | Mitigation |
|---------|---------|
| **Assessment Question Data Leakage** | Pure frontend `public/data/questions.json` static loading; for commercial licensing split private question banks and enable Prisma server-side fetch mode |
| **User Assessment Report Exposure** | Defaults to local/offline mode; with Prisma mode enabled all user and report records are bound to Row Level Security (RLS) isolated by user ID |
| **NextAuth Unauthorized Access** | `NEXTAUTH_SECRET` enforced via environment variable distribution; production enables Secure Cookie + HTTPS; `AUTH_TRUST_HOST` enabled only locally |
| **Prisma SQL Injection** | All queries use Prisma Client parameterized queries; string-concatenated raw SQL is prohibited (use `$queryRaw` + template parameters when raw SQL is required) |
| **Canvas Poster XSS** | Poster Canvas 2D drawing APIs accept only primitive types; no HTML/outer-frame strings are injected |

**Vulnerability disclosure**: Report security issues directly to **`maox_neta@foxmail.com`** — do not file a public issue. We commit to a **first response within 24 hours**.

## License

This project is released under the **MIT License**. See the [LICENSE](LICENSE) file for details.
