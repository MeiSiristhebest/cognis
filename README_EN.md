# Cognis — High-Precision Cognitive & Workplace Behavioral Assessment System

<p align="center">
  [![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
  [![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
</p>

<p align="center">
  <a href="README.md">🇨🇳 中文</a> &nbsp;|&nbsp; <a href="README_EN.md">🇺🇸 English</a>
</p>

---

<p align="center">
    <strong>High-Precision Cognitive & Workplace Behavior Assessment System Powered by 2PL-IRT Item Response Theory</strong>
</p>

## 🌟 Core Highlights

- **🧠 Scientifically Rigorous Psychological Model**: Rejects simplistic weighted summation, introducing **2PL-IRT (Two-Parameter Logistic Item Response Theory)** and **MAP (Maximum-A-Posteriori)** estimation algorithms, computing true scores with 95% confidence intervals (SEM).
- **📊 Comprehensive Five-Assessment System Integration**:
  - **Big Five (OCEAN) Personality**: 30 validated SJT (Situational Judgment Test) anchored items, precisely measuring Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.
  - **Enneagram**: Continuous 9-tier health-level dynamic evolution, combined with motivational option-level scoring and stress defense mechanism recognition.
  - **CliftonStrengths (Gallup)**: Full 180 paired-comparison card coverage, 100% coverage of the 34 official core themes.
  - **DiSC Workplace Behavior Model**: Measures four directional vectors: D (Dominance), i (Influence), S (Steadiness), and C (Conscientiousness).
  - **Jungian Cognitive Self-Efficacy**: Six situational cognitive self-efficacy decision cards with projective testing.
- **🖼️ Native Canvas 2D Offline Poster Composition**: Zero third-party dependencies, millisecond client-side composition of high-resolution personalized assessment reports and achievement cards for easy sharing.
- **🔒 100% Offline-First & Data Privacy**: All measurement algorithms and question data can run purely offline on the client side, with zero data telemetry or leakage risk.

---

## 📐 Psychometrics & Algorithmic Architecture

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

---

## 🛠️ Technology Stack

- **Core Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript 5.7 (Strict Mode)
- **Styling & Design System**: Tailwind CSS 4 + native Vanilla CSS design variables
- **State Management**: Zustand
- **Database & ORM**: Prisma 7 + PostgreSQL Adapter (`@prisma/adapter-pg`)
- **Charts & Visualization**: Recharts
- **Animation**: Framer Motion + Tw-Animate-CSS
- **Data Decoupling**: JSON static-asset database adapter mode (`public/data/questions.json`)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- pnpm / npm / yarn

### 1. Clone the project

```bash
git clone https://github.com/MeiSiristhebest/cognis.git
cd cognis
```

### 2. Install dependencies

```bash
pnpm install
# or using npm
npm install
```

### 3. Start the development server

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

### 4. Production build

```bash
pnpm run build
pnpm run start
```

---

## 📁 Project Structure

```
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

---

## 🤝 Contributing

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

---

## 🔒 Security

| Risk Scenario | Mitigation |
|---------|---------|
| **Assessment Question Data Leakage** | Pure frontend `public/data/questions.json` static loading; for commercial licensing split private question banks and enable Prisma server-side fetch mode |
| **User Assessment Report Exposure** | Defaults to local/offline mode; with Prisma mode enabled all user and report records are bound to Row Level Security (RLS) isolated by user ID |
| **NextAuth Unauthorized Access** | `NEXTAUTH_SECRET` enforced via environment variable distribution; production enables Secure Cookie + HTTPS; `AUTH_TRUST_HOST` enabled only locally |
| **Prisma SQL Injection** | All queries use Prisma Client parameterized queries; string-concatenated raw SQL is prohibited (use `$queryRaw` + template parameters when raw SQL is required) |
| **Canvas Poster XSS** | Poster Canvas 2D drawing APIs accept only primitive types; no HTML/outer-frame strings are injected |

**Vulnerability disclosure**: Report security issues directly to **`maox_neta@foxmail.com`** — do not file a public issue. We commit to a **first response within 24 hours**.

---

## 📜 License

This project is released under the **MIT License**. See the [LICENSE](LICENSE) file for details.
