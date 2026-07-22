import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg-void text-text-primary selection:bg-accent-red/30">
      {/* Background Grid Pattern (Subtle) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-100 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-[880px] mx-auto px-6 py-24 md:py-32 font-mono flex flex-col items-center">
        {/* Header / Hero */}
        <header
          className="w-full flex flex-col items-center text-center mb-32 animate-fade-in"
          style={{ animationDuration: "1200ms" }}
        >
          <div className="text-[10px] text-accent-red uppercase tracking-[0.2em] mb-6">
            Cognitive Assessment Framework
          </div>
          <h1 className="font-display text-[64px] md:text-[88px] text-text-primary tracking-tight leading-none mb-8">
            Cognis
          </h1>
          <p className="text-[13px] md:text-[15px] text-text-secondary leading-[1.8] max-w-[600px] mb-12">
            摒弃单一人格标签的局限。Cognis 整合大五人格、九型动机、DiSC
            行为风格、盖洛普才干与荣格认知功能，通过动态情境测试与亚秒级反应时分析，解构你的底层运作系统。
          </p>

          <Link
            href="/assessment"
            className="group relative flex items-center justify-center w-[240px] h-16 border border-border-default hover:border-border-active bg-transparent hover:bg-bg-surface transition-all duration-300"
          >
            <span className="font-mono text-[13px] uppercase tracking-widest text-text-primary group-hover:text-accent-white transition-colors">
              Initiate Protocol // 开始解构
            </span>
          </Link>
          <div className="mt-6 text-[10px] text-text-ghost flex items-center gap-4">
            <span>预计耗时 18-25 分钟</span>
            <span className="w-1 h-1 rounded-full bg-border-active" />
            <span>需在安静、无打扰的环境下完成</span>
          </div>
        </header>

        {/* Modules Section */}
        <section
          className="w-full animate-fade-in"
          style={{
            animationDuration: "1200ms",
            animationDelay: "200ms",
            animationFillMode: "both",
          }}
        >
          <div className="border-b border-border-default pb-4 mb-12">
            <h2 className="text-[12px] text-text-tertiary uppercase tracking-[0.15em]">
              Five Dimensions of Analysis // 五维解析矩阵
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {/* Module 1 */}
            <div className="group border-l border-border-subtle pl-6 hover:border-accent-red/50 transition-colors duration-300">
              <div className="text-[10px] text-accent-red font-bold mb-2">
                PART 01
              </div>
              <h3 className="font-display text-[24px] text-text-primary mb-3">
                Big Five / 核心特质
              </h3>
              <p className="text-[12px] text-text-secondary leading-relaxed">
                引入基于项目反应理论 (IRT)
                的自适应算法。告别非黑即白的量表，通过沉浸式情境行为滑块，测量你的人格在「开放、尽责、外倾、宜人、神经质」维度的精准坐标。
              </p>
            </div>

            {/* Module 2 */}
            <div className="group border-l border-border-subtle pl-6 hover:border-accent-red/50 transition-colors duration-300">
              <div className="text-[10px] text-accent-red font-bold mb-2">
                PART 02
              </div>
              <h3 className="font-display text-[24px] text-text-primary mb-3">
                Enneagram / 深层动机
              </h3>
              <p className="text-[12px] text-text-secondary leading-relaxed">
                放弃自我报告式问卷。我们将你置于高压叙事迷宫中，通过观察你在极端情境下的本能解离与整合倾向，剥开伪装，触及你的核心恐惧与欲望。
              </p>
            </div>

            {/* Module 3 */}
            <div className="group border-l border-border-subtle pl-6 hover:border-accent-red/50 transition-colors duration-300">
              <div className="text-[10px] text-accent-red font-bold mb-2">
                PART 03
              </div>
              <h3 className="font-display text-[24px] text-text-primary mb-3">
                DiSC / 职场矢量
              </h3>
              <p className="text-[12px] text-text-secondary leading-relaxed">
                完全模拟真实办公通讯界面（包含对话打字延迟）。通过高拟真度的即时沟通压力，捕捉你在职场中对人/对事的原始反应矢量。
              </p>
            </div>

            {/* Module 4 */}
            <div className="group border-l border-border-subtle pl-6 hover:border-accent-red/50 transition-colors duration-300">
              <div className="text-[10px] text-accent-red font-bold mb-2">
                PART 04
              </div>
              <h3 className="font-display text-[24px] text-text-primary mb-3">
                CliftonStrengths / 本能才干
              </h3>
              <p className="text-[12px] text-text-secondary leading-relaxed">
                结合亚秒级反应时 (Reaction Time)
                算法的极限闪卡分拣。用速度验证真伪，剥离社会赞许性偏差，找出你无需思考即可调用的本能才干。
              </p>
            </div>

            {/* Module 5 */}
            <div className="group border-l border-border-subtle pl-6 hover:border-accent-red/50 transition-colors duration-300 md:col-span-2 md:max-w-[50%]">
              <div className="text-[10px] text-accent-red font-bold mb-2">
                PART 05
              </div>
              <h3 className="font-display text-[24px] text-text-primary mb-3">
                Jungian / 认知堆栈
              </h3>
              <p className="text-[12px] text-text-secondary leading-relaxed">
                无痕的认知沙盒任务。通过模糊图解码测算 N/S
                倾向，通过资源分配博弈揭示 T/F
                权重。利用无意识的行为信号，反演你大脑处理信息的核心堆栈。
              </p>
            </div>
          </div>
        </section>

        {/* Footer Elements */}
        <footer className="w-full mt-32 border-t border-border-default pt-12 flex flex-col items-center">
          <div className="text-[10px] text-text-ghost text-center tracking-[0.1em] leading-relaxed">
            SYSTEM REQUIREMENTS: DESKTOP/TABLET RECOMMENDED
            <br />
            UNINTERRUPTED FOCUS MANDATORY
            <br />© COGNIS FRAMEWORK V1.0
          </div>
        </footer>
      </div>
    </main>
  );
}
