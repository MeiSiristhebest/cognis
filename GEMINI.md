# Cognis Project Chronicle

## [2026-07-23] Feature: Project Renaming to Cognis & GitHub Repository Release
- **Decision**: Updated project name from `my-project` to `cognis` in `package.json` to match the official system identity.
- **Reason**: To align repository configuration with the project's brand name "Cognis".
- **Decision**: Authored a comprehensive `README.md` documenting Cognis's 2PL-IRT psychometric engine, 5 assessment modules, technical architecture, and installation guides. Initialized Git local repository and published the main branch to GitHub remote (`https://github.com/MeiSiristhebest/cognis`).
- **Reason**: To fulfill user request for GitHub repository submission and professional open-source documentation.

## [2026-06-14] Feature: Jungian Input Hardening & DiSC Relocation
- **Decision**: Replaced direct resource allocation mappings to Jungian (MBTI) functions with 6 scenario-based cognitive self-efficacy questions. Repurposed resource allocation categories (`rd`, `mkt`, `hr`, `ops`) to feed into DiSC vectors (D/i/S/C) as secondary evidence of task/people orientation (20% weight).
- **Reason**: To eliminate the weak psychometric correlation between corporate budget allocation and Jungian cognitive style, introducing a direct self-efficacy measure instead while leveraging the budget allocations to reinforce the task-vs-people DiSC vectors.
- **Decision**: Refactored step 4 of `AssessmentShell` into a 3-part progressive wizard: Section A (8 inkblot projection cards grouped by 8 options), Section B (6 cognitive self-efficacy scenario cards), and Section C (resource allocation dilemma).
- **Reason**: To solve the layout bug where all 64 options were rendered on 64 separate card instances, while establishing a progressive, non-overwhelming cognitive load pipeline for the candidate.

## [2026-06-14] Feature: Refactoring for Psychometric Validity and Decoupling
- **Decision**: Refactored `questions.json` by adding `dimension`, `facet`, `isReversed`, and IRT `a`/`b` parameters to Big Five questions, `scoring` metadata with balanced instincts to Enneagram options, and `talentKey` to Strengths cards. Also stripped transparent dimension labels from Big Five subtitles.
- **Reason**: To completely decouple data from the scoring logic, eliminate cheating opportunities (high transparency), and allow the scoring engine to load parameters dynamically.
- **Decision**: Implemented 2PL-IRT inverse logistic (logit) scoring for Big Five, option-level motivation scoring for Enneagram, and direct talentKey lookup for CliftonStrengths.
- **Reason**: To solve psychometric flaws where Big Five used incorrect linear formulas and mismatched facet-to-dimension mappings, Enneagram type mapping was randomized by hardcoded modulo logic, and CliftonStrengths mapped cards by index.
- **Decision**: Added continuous 9-level Enneagram health scoring, task-vs-people consistency check warning, and holistic RT confidence calculations. Added confidence disclosures card to the UI.
- **Reason**: To fix health level skipping bugs, add cross-validation, utilize all reaction time data, and provide transparency about module confidences.
- **Decision**: Configured real-time reaction-time measurements for Big Five and Enneagram in `assessment-shell.tsx` and validated TypeScript compiler checks and Turbopack production build successfully.
- **Reason**: To replace hardcoded 1000ms latency fallbacks and ensure production compile safety.
- **Decision**: Contextualized `bf1` to `bf30` as Scenario 1 specific "真 SJT 锚定题", referencing details like war room logs and cloud rollbacks to eliminate template repetition.
- **Reason**: To fulfill the requirements of Task 2.2 (Phase 2), providing high-quality情境化 behavioral descriptions.
- **Decision**: Added 3 missing CliftonStrengths cards (`s178`, `s179`, `s180`) to represent Consistency, Responsibility, and Intellection, bringing the total to 180 cards and covering all 34 official themes.
- **Reason**: To achieve 100% CliftonStrengths theme coverage as specified in Task 1.3 (Phase 2).
- **Decision**: Implemented a mathematically rigorous Maximum A Posteriori (MAP) 2PL-IRT estimation using Newton-Raphson iterations and computed standard error of measurement (SEM) values using Fisher Information.
- **Reason**: To replace approximation formulas with standard psychometric estimation techniques, solving Task 2.4.
- **Decision**: Visualized 95% confidence intervals (e.g. `65% (±8)`) on both the canvas poster and the RadarChart view in [results-dashboard.tsx](file:///e:/Mei/下载/b_2b1zzI8kq6E/components/cognis/results-dashboard.tsx).
- **Reason**: To present measurement error margins transparently to the user, satisfying Task 2.4 UI.

## [2026-06-14] Feature: Physical Decoupling of Question Assets & Format Optimization
- **Decision**: Completed the physical decoupling of the expanded question assets, migrating the hardcoded database to `public/data/questions.json` and refactoring `components/cognis/constants/questions.ts` into a lightweight, type-safe data adapter.
- **Reason**: To fulfill the strict "Zero Hardcoding" and "100% offline-ready" requirements, isolating data assets from React presentation logic.
- **Decision**: Fixed 11 key JSON format syntax errors in `questions.json` (such as illegal property keys with trailing colons, unquoted property keys, and missing commas).
- **Reason**: Trailing colons inside keys (e.g. `"highBehavior: "`) led to attribute mismatch and undefined runtime bugs, and syntax errors blocked TypeScript compiler.
- **Decision**: Added `isStressTest` optional property to `EnneagramQuestion` interface in `questions.ts`.
- **Reason**: To eliminate the `TS2339` error in `assessment-shell.tsx` when accessing `isStressTest` dynamically.
- **Decision**: Verified compile safety and output size by running `tsc --noEmit` and `pnpm run build` synchronously in Next.js Turbopack compiler.
- **Reason**: To guarantee production-ready package stability and ensure zero runtime delays during offline client execution.

## [2026-06-13] Feature: Interactive UI Refactoring & Compilation Diagnostics
- **Decision**: Refactored the core layout of `EnneagramNarrativeQuestion` and `DiSCWorkplaceSimulation` to remove viewport-relative overlays (`fixed inset-0`, `h-screen`, `bg-bg-void`), switching them to card-like modular structures.
- **Reason**: The absolute and full-screen layouts were breaking the parent shell (`AssessmentShell`) layout and causing UI collision (overlapped components).
- **Decision**: Fixed the JSX syntax error in `BigFiveQuestion` and wrapped LaTeX template braces `{base}` inside a React string JSX literal `{"..."}` in `RTCalibrationWizard`.
- **Reason**: To solve TypeScript compilation errors (unclosed HTML tag error and "Cannot find name 'base'" undeclared variable error) preventing successful builds.
- **Decision**: Implemented native Canvas 2D offline poster synthesis in `ResultsDashboard` for shareable personality cards.
- **Reason**: To fulfill the requirements of Acceptance Criteria [AC-9] and avoid importing heavy third-party packages like html2canvas which are prone to layout breaks and slow rendering speeds in Next.js Turbopack SSR environment.
- **Decision**: Expanded seed question database in `questions.ts` to 5-10x scale (30 Big Five, 12 Enneagram, 50 CliftonStrengths, 8 Jungian images) with high-quality psychometric SJT & projective tests.
- **Reason**: To achieve standard psychometric reliability (Cronbach's alpha) and validity, avoiding self-report bias.
- **Decision**: Replaced hardcoded scoring parameters in `scoring-engine.ts` with dynamic IRT parameter generators (up to 80 Big Five items) and Bayesian defense mechanism matrices (up to 60 Enneagram items).
- **Reason**: To achieve 100% decoupling between scoring algorithms and variable-length question databases, ensuring future-proof expansion.
- **TODO**: Verify user performance on mobile webviews and check reaction-time (RT) latency subtraction validity with production user feedback.
