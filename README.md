# Cognis - 高精度认知与职场行为评估系统

<p align="center">
  <img src="./public/icon.svg" alt="Cognis Logo" width="96" height="96" />
</p>

<p align="center">
  <b>Cognis</b> 是一个基于现代化前端技术与严格心理测量学（Psychometrics）理论打造的高精度认知与职场行为评估系统。系统结合 <b>2PL 项目反应理论 (2PL-IRT)</b>、<b>MAP 最大后验估计</b> 与 <b>贝叶斯防御机制矩阵</b>，提供五大维度交织的多模态心理与行为画像。
</p>

<p align="center">
  <a href="#核心评估模块">核心模块</a> •
  <a href="#心理测量学与算法架构">算法架构</a> •
  <a href="#技术栈">技术栈</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#项目结构">项目结构</a>
</p>

---

## 🌟 核心亮点

- **🧠 科学严谨的心理学模型**：拒绝简单的加权求和，引入 **2PL-IRT（双参数项目反应理论）** 及 **MAP（最大后验估计）** 算法，计算包含 95% 置信区间 (SEM) 的真分数。
- **📊 全景五大测评体系整合**：
  - **大五人格 (Big Five)**：包含 30 组真 SJT（情境判断）锚定题，精准评估开放性、尽责性、外向性、宜人性与神经质。
  - **九型人格 (Enneagram)**：连续 9 级健康度动态推演，结合动机选项级评分与应激防卫机制识别。
  - **盖洛普优势识别 (CliftonStrengths)**：覆盖全套 180 组对比卡片，100% 覆盖 34 大官方核心主题。
  - **DiSC 职场行为模式**：测量 D (支配)、i (影响)、S (稳健)、C (服从) 四向向量。
  - **荣格认知自效能 (Jungian Cognitive Self-Efficacy)**：6 大情境化认知自效能决断卡与投射测试。
- **🖼️ 原生 Canvas 2D 离线海报合成**：零第三方依赖，毫秒级在客户端合成高分辨率个性化测评报告与成果卡片，方便分享。
- **🔒 100% 离线优先与数据隐私**：所有测量算法与题目数据均可在客户端纯离线运行，零数据上报与泄露风险。

---

## 📐 心理测量学与算法架构

Cognis 引擎底层采用严谨的量化测量与统计估计方法：

### 1. Big Five 2PL-IRT (双参数项目反应理论)
对于每个题目 $i$，作答概率采用双参数 Logistic 模型：
$$P_i(\theta) = \frac{1}{1 + e^{-a_i(\theta - b_i)}}$$
- $a_i$ 为题目区分度 (Discrimination)
- $b_i$ 为题目难度 (Difficulty)
- $\theta$ 为被试潜能能力值 (Latent Trait)

使用 **Newton-Raphson 迭代法** 进行 MAP (Maximum A Posteriori) 求解，并通过 Fisher 信息阵导数导出测量标准误 (SEM) 与 **95% 置信区间**。

### 2. 连续 9 级 Enneagram 健康度演化
打破传统固化的健康/不健康二分类，通过反应时 (Reaction Time) 抖动与应激题选择，平滑推演连续 1.0 - 9.0 的健康度指数。

### 3. DiSC 与认知资源分配协同
将资源分配测试 (`rd`, `mkt`, `hr`, `ops`) 重构为 DiSC 向量的辅助依据，形成“任务导向 vs 人际导向”的交叉验证，并计算反应时整体置信度。

---

## 🛠️ 技术栈

- **核心框架**：Next.js 16 (App Router) + React 19
- **语言**：TypeScript 5.7 (严格模式)
- **样式与设计系统**：Tailwind CSS 4 + 原生 Vanilla CSS 设计变量
- **状态管理**：Zustand
- **数据库与 ORM**：Prisma 7 + PostgreSQL Adapter (`@prisma/adapter-pg`)
- **图表与可视化**：Recharts
- **动画**：Framer Motion + Tw-Animate-CSS
- **数据解耦**：JSON 静态资源数据库适配模式 (`public/data/questions.json`)

---

## 🚀 快速开始

### 前置要求

- Node.js 18.x 或更高版本
- pnpm / npm / yarn

### 1. 克隆项目

```bash
git clone https://github.com/<your-username>/cognis.git
cd cognis
```

### 2. 安装依赖

```bash
pnpm install
# 或者使用 npm
npm install
```

### 3. 启动开发服务器

```bash
pnpm run dev
# 或
npm run dev
```

在浏览器中打开 `http://localhost:3000` 查看运行效果。

### 4. 生产环境构建

```bash
pnpm run build
pnpm run start
```

---

## 📁 项目结构

```
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

---

## 📜 许可协议

本项目采用 [MIT License](LICENSE) 协议开源。
