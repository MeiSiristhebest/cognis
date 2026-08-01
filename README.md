# Cognis 高精度认知与职场行为评估系统

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
  <strong>基于 2PL-IRT 项目反应理论的高精度认知与职场行为评估系统</strong>
</p>

## 目录

- [项目简介](#项目简介)
- [核心功能](#核心功能)
- [环境要求](#环境要求)
- [安装](#安装)
- [快速开始](#快速开始)
- [配置](#配置)
- [架构设计](#架构设计)
- [项目结构](#项目结构)
- [技术栈](#技术栈)
- [参与贡献](#参与贡献)
- [安全说明](#安全说明)
- [许可证](#许可证)

## 项目简介

Cognis 是一套面向职场场景的高精度认知与行为评估系统，采用严谨的心理测量学模型替代经验式加权打分。系统覆盖大五人格、九型人格、盖洛普优势、DiSC 与荣格认知自效能五大测评体系，所有算法与题库均可在客户端纯离线运行，兼顾测量精度与数据隐私。

## 核心功能

- **🧠 科学严谨的心理学模型**：拒绝简单的加权求和，引入 **2PL-IRT（双参数项目反应理论）** 及 **MAP（最大后验估计）** 算法，计算包含 95% 置信区间 (SEM) 的真分数。
- **📊 全景五大测评体系整合**：
  - **大五人格 (Big Five)**：包含 30 组真 SJT（情境判断）锚定题，精准评估开放性、尽责性、外向性、宜人性与神经质。
  - **九型人格 (Enneagram)**：连续 9 级健康度动态推演，结合动机选项级评分与应激防卫机制识别。
  - **盖洛普优势识别 (CliftonStrengths)**：覆盖全套 180 组对比卡片，100% 覆盖 34 大官方核心主题。
  - **DiSC 职场行为模式**：测量 D (支配)、i (影响)、S (稳健)、C (服从) 四向向量。
  - **荣格认知自效能 (Jungian Cognitive Self-Efficacy)**：6 大情境化认知自效能决断卡与投射测试。
- **🖼️ 原生 Canvas 2D 离线海报合成**：零第三方依赖，毫秒级在客户端合成高分辨率个性化测评报告与成果卡片，方便分享。
- **🔒 100% 离线优先与数据隐私**：所有测量算法与题目数据均可在客户端纯离线运行，零数据上报与泄露风险。

## 环境要求

- Node.js 18.x 或更高版本
- 包管理器：pnpm / npm / yarn

## 安装

```bash
git clone https://github.com/MeiSiristhebest/cognis.git
cd cognis
pnpm install
# 或使用 npm
npm install
```

## 快速开始

启动开发服务器：

```bash
pnpm run dev
# 或
npm run dev
```

**预期输出**：

```bash
▲ Next.js 16.x.x
- Local:        http://localhost:3000
✓ Ready in XXX ms
```

在浏览器中打开 `http://localhost:3000` 查看运行效果。

生产环境构建：

```bash
pnpm run build
pnpm run start
```

## 配置

项目以纯前端 / 离线模式运行，无需配置即可启动。启用服务端数据库模式时，需通过环境变量下发以下密钥：

| 环境变量 | 说明 | 必填 |
|---------|------|------|
| `NEXTAUTH_SECRET` | NextAuth 会话签名密钥，强制通过环境变量下发 | 是（生产） |
| `AUTH_TRUST_HOST` | 信任 Host 头，仅本地开发开启 | 否 |

## 架构设计

Cognis 引擎底层采用严谨的量化测量与统计估计方法：

### 1. 大五人格 2PL-IRT（双参数项目反应理论）

对于每个题目 $i$，作答概率采用双参数 Logistic 模型：

$$P_i(\theta) = \frac{1}{1 + e^{-a_i(\theta - b_i)}}$$

- $a_i$ 为题目区分度 (Discrimination)
- $b_i$ 为题目难度 (Difficulty)
- $\theta$ 为被试潜能能力值 (Latent Trait)

使用 **Newton-Raphson 迭代法** 进行 MAP (Maximum A Posteriori) 求解，并通过 Fisher 信息阵导数导出测量标准误 (SEM) 与 **95% 置信区间**。

### 2. 连续 9 级九型人格健康度演化

打破传统固化的健康/不健康二分类，通过反应时 (Reaction Time) 抖动与应激题选择，平滑推演连续 1.0 - 9.0 的健康度指数。

### 3. DiSC 与认知资源分配协同

将资源分配测试 (`rd`, `mkt`, `hr`, `ops`) 重构为 DiSC 向量的辅助依据，形成“任务导向 vs 人际导向”的交叉验证，并计算反应时整体置信度。

## 项目结构

```text
cognis/
├── app/                  # Next.js App Router 页面与路由入口
│   ├── globals.css       # 核心样式与设计变量
│   ├── layout.tsx        # 根布局与元数据配置
│   └── page.tsx          # 评估入口与测试主页
├── components/           # UI 组件库
│   ├── cognis/           # Cognis 专属测评 UI 引擎
│   │   ├── assessment-shell.tsx  # 测评向导外壳
│   │   ├── results-dashboard.tsx # 测评结果渲染与图表看板
│   │   └── scoring-engine.ts    # 心理测量学评分引擎核心
│   └── ui/               # 通用基础 UI 元素
├── lib/                  # 工具函数与适配器
├── public/               # 静态资源与测试数据库
│   └── data/
│       └── questions.json # 物理解耦的题库数据文件
├── prisma/               # Prisma Schema 与数据库配置
├── GEMINI.md             # 架构演进与决策记录 (Chronicle)
├── package.json          # 项目配置文件
└── README.md             # 项目说明文档
```

## 技术栈

| 分类 | 技术 |
|------|------|
| 核心框架 | Next.js 16 (App Router) + React 19 |
| 语言 | TypeScript 5.7（严格模式） |
| 样式与设计系统 | Tailwind CSS 4 + 原生 Vanilla CSS 设计变量 |
| 状态管理 | Zustand |
| 数据库与 ORM | Prisma 7 + PostgreSQL Adapter (`@prisma/adapter-pg`) |
| 图表与可视化 | Recharts |
| 动画 | Framer Motion + Tw-Animate-CSS |
| 数据解耦 | JSON 静态资源数据库适配模式 (`public/data/questions.json`) |

## 参与贡献

欢迎贡献代码。简要流程：

```bash
# 1. Fork → Clone → 切分支
git checkout -b feat/your-feature

# 2. 类型检查通过
pnpm tsc --noEmit

# 3. 运行 lint
pnpm lint

# 4. Commit 并提 PR
git commit -m "feat: your change"
git push origin feat/your-feature
```

**欢迎贡献的方向**：

- 🧮 优化 IRT 估计算法（新增 EAP、MCMC 等估计策略）
- 🎨 打磨 Canvas 海报合成视觉细节
- 🌐 新增 i18n 国际化语言包
- 🧪 补充评分引擎与各测评模块单元测试

## 安全说明

| 风险场景 | 防护措施 |
|---------|---------|
| **测评题目数据泄露** | 纯前端 `public/data/questions.json` 静态加载；如需商业授权请拆分私有题集并启用 Prisma 服务端获取模式 |
| **用户测评报告外泄** | 默认本地/离线运行；启用 Prisma 模式后所有用户与报告记录绑定 Row Level Security（RLS）按用户 ID 隔离 |
| **NextAuth 未授权访问** | `NEXTAUTH_SECRET` 强制通过环境变量下发；生产环境启用 Secure Cookie + HTTPS；`AUTH_TRUST_HOST` 仅本地开启 |
| **Prisma SQL 注入** | 所有查询通过 Prisma Client 参数化查询；禁止字符串拼接原始 SQL（需原生 SQL 时用 `$queryRaw` + 模板参数） |
| **Canvas 海报 XSS** | 海报 Canvas 2D 绘制 API 只接受 primitive 类型输入；不注入 HTML/外框字符串 |

**漏洞上报**：发现安全问题请直接发邮件至 **`maox_neta@foxmail.com`**，不要公开在 Issue 里。承诺 **24 小时内首次响应**。

## 许可证

本项目采用 **MIT License** 开源协议。详见 [LICENSE](LICENSE) 文件。
