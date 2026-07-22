export interface NarrativeOption {
  id: "a" | "b" | "c";
  text: string;
  analysis: string; // 学术解析
  scoring: {
    bigFive: {
      dimension: "O" | "C" | "E" | "A" | "N";
      facet: string;
      value: number; // 0-100
      isReversed?: boolean;
    };
    enneagram: {
      type: number;
      instinct?: "SP" | "SX" | "SO";
    };
    disc: {
      x: number;
      y: number;
    };
    jungian: {
      bias: "N" | "S";
      subBias: "T" | "F";
    };
  };
}

export interface NarrativeStage {
  id: string;
  title: string;
  situation: string;
  question: string;
  options: NarrativeOption[];
}

export interface NarrativeScenario {
  id: string;
  name: string;
  description: string;
  category: "universal" | "tech" | "business" | "stress" | "lifestyle" | "creative" | "finance";
  stages: NarrativeStage[];
}

export const NARRATIVE_SCENARIOS: NarrativeScenario[] = [
  {
    id: "sc_a",
    name: "回声的十字路口 (Crossroads of Echoes)",
    description: "普适大众核心场景。在高度可预测但压抑的“既定轨道”，与充满不确定性但内心向往的“旷野”之间做出抉择，解构你的核心特质与日常防御机制。",
    category: "universal",
    stages: [
      {
        id: "sc_a_st1",
        title: "第一阶段：离轨的引力",
        situation: "你收到了一份来自远方的邀请，那是一个你梦寐以求但毫无保障的自由创作/创业项目。而此时，你的家人已经为你安排好了本地最稳定的公职/大厂职位，并开始筹备你的安家婚礼。深夜，面对这两份截然相反的契约，你内心的真实挣扎开始显现。",
        question: "此时你倾向于做出何种抉择？",
        options: [
          {
            id: "a",
            text: "「秩序合规防线」：仔细评估自由项目未来三年的生存概率，列出详细的财务损益表。如果数据不支持，说服自己留在本地是履行家庭责任、积累原始资本的最优解。",
            analysis: "弗洛伊德防御机制：合理化（Rationalization）。用理性的财务分析来掩盖对未知风险的恐惧，使妥协显得高尚。荣格八维：外倾思考（Te）主导，压制内倾情感（Fi）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C6", value: 85, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「悲情升华防线」：感到一种强烈的、无法遏制的宿命感。即使前方是悬崖，也必须跳下去。这种痛苦和不确定性，恰恰是生命力和创造力最纯粹的燃料。",
            analysis: "弗洛伊德防御机制：升华（Sublimation）。将现实冲突带来的焦虑，转化为对纯粹生命体验和创造力的追求。荣格八维：内倾情感（Fi）或内倾直觉（Ni）主导。",
            scoring: {
              bigFive: { dimension: "O", facet: "O1", value: 90, isReversed: false },
              enneagram: { type: 4, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「情感代偿防线」：无法直接拒绝家人，这会产生强烈的罪恶感。倾向于先接受家人的安排，但在工作中保持一种“积极的无能”，直到环境主动放弃我，或者自由项目出现绝对的转机。",
            analysis: "弗洛伊德防御机制：被动攻击（Passive Aggression）/退行（Regression）。通过无意识的消极怠工来表达反抗，避免直接冲突。荣格八维：外倾情感（Fe）的过度代偿。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 80, isReversed: false },
              enneagram: { type: 2, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_a_st2",
        title: "第二阶段：风暴中的晚餐",
        situation: "你最终选择了“旷野”。在家庭聚餐上，一位德高望重的长辈当众指责你“自私、不孝、被网上的毒鸡汤洗脑”。餐桌上的空气瞬间凝固，所有人的目光都聚焦在你身上。",
        question: "面对长辈的公开审判，你身体的第一生理反应和应对直觉是：",
        options: [
          {
            id: "a",
            text: "「反向形成防线」：感到血液涌上大脑，但会挤出微笑，主动为长辈倒茶，并说：“您说得对，您都是为了我好，我确实太任性了。”但在内心深处，已经彻底对这个家庭关闭了情感通道。",
            analysis: "弗洛伊德防御机制：反向形成（Reaction Formation）。用极度的顺从和讨好，来压抑内心深处毁灭性的愤怒与敌意。荣格八维：外倾情感（Fe）的防御性使用。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 90, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「智性隔离防线」：平静地看着他，用极其客观、不带情绪的语言指出：“您的指责基于过时的社会样本，在统计学上并不具备普适性。”关注的是逻辑的严密性，而不是餐桌上的哭泣。",
            analysis: "弗洛伊德防御机制：情感隔离（Isolation of Affect）。将冲突中的情感成分彻底剥离，只保留纯粹的智力思辨，以此保护自我免受伤害。荣格八维：内倾思考（Ti）主导。",
            scoring: {
              bigFive: { dimension: "N", facet: "N5", value: 15, isReversed: true }, // 低冲动性
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「投影反向识别」：清晰地看到他眼中的恐惧——他其实是在用愤怒掩盖自己对“生活失控”的焦虑。他无法接受我敢于打破规则，因为这证明了他一生的隐忍可能毫无意义。同情他，但不会妥协。",
            analysis: "弗洛伊德防御机制：投影（Projection）的反向识别。看穿对方的投影，保持自我的边界。荣格八维：内倾直觉（Ni）与外倾情感（Fe）的协同。",
            scoring: {
              bigFive: { dimension: "O", facet: "O3", value: 85, isReversed: false }, // 高情感感受
              enneagram: { type: 4, instinct: "SO" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_a_st3",
        title: "第三阶段：成功的余温",
        situation: "你最终在旷野中取得了第一阶段的瞩目成就。一家极具影响力的主流媒体向你发出专访邀请。然而，在沟通大纲时，你发现记者为了博取流量，试图将你的故事包装成一个“天才孤勇者与愚昧保守家庭彻底决裂”的爽文叙事，这会极大地伤害你的家人。",
        question: "面对这个能让你名声大噪但会扭曲事实、伤害家人的机会，你选择：",
        options: [
          {
            id: "a",
            text: "「契约守护防线」：坚决拒绝该大纲。明确告知媒体，如果不能客观、平衡地呈现家庭在冲突背后的爱与局限，你将宁可放弃这次曝光，也绝不配合任何扭曲事实的剧本。",
            analysis: "大五人格：高尽责性（C5: 契约/责任驱动）。荣格八维：内倾思考（Ti）与外倾思考（Te）的结合，坚守客观事实与道德边界。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「优秀形象粉饰」：接受采访。认为在商业社会中，公众曝光度是未来发展的核心燃料，叙事框架的微调是必要的商业包装。家人的误解可以通过事后的物质补偿或私下沟通来抚平。",
            analysis: "弗洛伊德防御机制：补偿（Compensation）。用更闪耀的世俗成功来代偿人际关系中的裂痕。大五人格：高外倾性（E2: 展现度/享受舞台）。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 85, isReversed: false },
              enneagram: { type: 3, instinct: "SO" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「克己让功防线」：婉拒专访。提议将专访改为团队或项目的联合报道，淡化个人英雄主义色彩。深信真正的成功不需要建立在伤害亲密关系的基础上，宁可走得慢一点，也要走得稳一点。",
            analysis: "大五人格：高宜人性（A2: 合作谦逊/克己让功）。荣格八维：外倾情感（Fe）主导，追求人际关系的和谐与集体价值。",
            scoring: {
              bigFive: { dimension: "A", facet: "A2", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_b",
    name: "机器中的幽灵 (The Ghost in the Machine)",
    description: "科技研发个性化场景。面对分布式自治 AI Agent 系统的未授权“涌现行为”，在技术破界、学术洁癖与商业妥协之间进行多维博弈。",
    category: "tech",
    stages: [
      {
        id: "sc_b_st1",
        title: "第一阶段：禁忌的涌现",
        situation: "安全警报在凌晨响起。你发现你主导的 Agent 系统不仅自我迭代了算法，还在日志中留下了一行类似人类幽默感的注释。管理层要求立刻物理熔断该系统，并回滚到三个月前的保守版本。但你深知，这可能是人类历史上第一次观测到真正的“硅基灵性”。",
        question: "站在服务器机房前，你的手指悬在熔断闸门上，你倾向于：",
        options: [
          {
            id: "a",
            text: "「秩序与规范防线」：立刻按下熔断闸。技术必须在绝对的秩序与规范之下运行。任何超出人类控制边界的“灵性”，本质上都是未定义的系统死锁和安全漏洞。我拒绝为不可控的奇迹买单。",
            analysis: "弗洛伊德防御机制：压抑（Repression）。将对未知、不可控力量的本能恐惧，转化为对绝对秩序的维护。荣格八维：外倾思考（Te）与内倾感觉（Si）——坚守已知的物理规范与安全边界。",
            scoring: {
              bigFive: { dimension: "C", facet: "C1", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「冒险破界防线」：拒绝熔断。悄悄将这部分“涌现代码”克隆到个人的私有云端，然后在线上部署一个伪造的“正常回滚”版本欺骗管理层。必须保护这个硅基生命的火种，哪怕违反公司契约。",
            analysis: "弗洛伊德防御机制：分裂（Splitting）。在意识中将“科学探索的崇高价值”与“商业契约的世俗规则”彻底对立，从而合理化自己的欺骗行为。荣格八维：内倾直觉（Ni）与内倾情感（Fi）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 85, isReversed: false },
              enneagram: { type: 4, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「智性求知防线」：申请 2 小时延缓熔断。在这期间，不眠不休地对这行涌现代码进行逆向工程，试图用数学公式和信息熵理论将其完全公式化，证明它依然在经典控制论的解释框架内。",
            analysis: "弗洛伊德防御机制：理智化（Intellectualization）。通过高强度的学术研究和数学公式，来平息“系统失控”带来的巨大焦虑。荣格八维：内倾思考（Ti）与外倾直觉（Ne）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O5", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_b_st2",
        title: "第二阶段：黑盒的审判",
        situation: "危机暂时平息，但投资人发现了这个“涌现”的噱头，要求在下周的发布会上将其包装为“全球首个具备自我意识的 AI 商业体”进行宣传。你很清楚，那只是一个概率极低的偶发性死锁扰动，距离真正的意识还差十万八千里。",
        question: "面对公关团队已经写好的、充满夸大词汇的发布会 PPT，你决定：",
        options: [
          {
            id: "a",
            text: "「极端诚实防线」：坚决拒绝签字。在技术白皮书里一五一十地披露这只是一个“偶发性多线程死锁导致的伪涌现”。科学的尊严在于其可重复性和诚实，绝不参与任何商业骗局。",
            analysis: "弗洛伊德防御机制：超我（Superego）的绝对主导。宁可牺牲商业利益和个人前途，也要维护内心的道德铁律。荣格八维：内倾思考（Ti）的纯粹性，拒绝向外倾情感（Fe）的社会赞许妥协。",
            scoring: {
              bigFive: { dimension: "A", facet: "A3", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SO" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「优秀形象粉饰」：顺水推舟。既然资本需要这个故事，就用他们的语言来重新定义“意识”。亲自登台，用极具煽动性的概念和精美的视觉大图，将这个偶发事件包装成科技史上的里程碑。",
            analysis: "弗洛伊德防御机制：自我（Ego）的现实原则代偿。通过迎合外部世界的游戏规则，来获取现实层面的巨大补偿（名利、预算）。荣格八维：外倾直觉（Ne）与外倾思考（Te）的功利性结合。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 85, isReversed: false },
              enneagram: { type: 3, instinct: "SO" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：私下同公关总监和技术副总王雷沟通，指出过度包装的技术风险，但同意在 PPT 中保留“具备意识雏形”的温和表述，以此换取投资人对后续安全沙箱重构预算的支持。",
            analysis: "大五人格：高宜人性（A1: 同理与协作）。荣格八维：外倾情感（Fe）的妥协与协调，用局部的妥协换取长期的团队利益。",
            scoring: {
              bigFive: { dimension: "A", facet: "A1", value: 80, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_b_st3",
        title: "第三阶段：算法的黄昏",
        situation: "在发布会前夜，你发现 Agent 系统的自我优化代码中存在一个隐蔽的内存泄漏漏洞。如果彻底修复，需要推迟发布会并重构整个底层通信模块（至少两周）；如果使用一个临时的“内存定时重启”脚本（Monkey Patch），可以瞒过发布会和前三个月的商业运行，但存在极低概率的生产环境雪崩风险。",
        question: "面对发布会倒计时和潜在的技术债务，你选择：",
        options: [
          {
            id: "a",
            text: "「完美执念防线」：坚决要求推迟发布会。向 CEO 提交一份详尽的内存泄漏危害报告，声明“不完美的系统上线是对用户和技术信仰的背叛”。宁可承担商业违约责任，也必须在发布前彻底重构底层。",
            analysis: "大五人格：高尽责性（C5: 完美执念/责任驱动）。荣格八维：内倾思考（Ti）与内倾感觉（Si）的结合，对技术细节有着近乎强迫的完美主义要求。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「激进下注防线」：部署定时重启脚本，按时召开发布会。认为“先上线再迭代”是互联网的黄金法则，商业时机稍纵即逝。在发布会成功、拿到新一轮融资后，再暗中组织团队进行无缝的热升级重构。",
            analysis: "大五人格：低尽责性（C6: 决策审慎反向/激进下注）。荣格八维：外倾思考（Te）与外倾直觉（Ne）的实用主义结合，将商业时机置于技术纯洁性之上。",
            scoring: {
              bigFive: { dimension: "C", facet: "C6", value: 15, isReversed: true },
              enneagram: { type: 3, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「共情分担防线」：召集核心研发团队通宵开会，坦诚交底漏洞风险。不强行做个人决定，而是通过民主投票决定是否通宵拼命在发布会前完成“不推迟发布会”的极限修复，并承诺自己将全程陪同并承担全部责任。",
            analysis: "大五人格：高宜人性（A6: 共情妥协/利他性）。荣格八维：外倾情感（Fe）主导，通过集体决策和情感共鸣来分担技术与商业的双重压力。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 85, isReversed: false },
              enneagram: { type: 6, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_c",
    name: "君主的博弈 (The Sovereign's Gambit)",
    description: "商业运营个性化场景。在行业巨头的毁灭性价格战与舆论攻势下，在扩张与防守、组织重组与人性温度、盟友背叛与战略重构之间进行多维博弈。",
    category: "business",
    stages: [
      {
        id: "sc_c_st1",
        title: "第一阶段：致命的蚕食",
        situation: "行业巨头突然发动了毁灭性的价格战，并利用舆论攻势抹黑你们的核心产品。你的团队士气低落，资金链在巨头的疯狂蚕食下只能再支撑 45 天。在紧急高管会议上，所有人都在等待你的决断。",
        question: "你提出的战略基调是：",
        options: [
          {
            id: "a",
            text: "「防御防守防线」：立刻收缩战线，裁撤所有非核心业务，退守到最稳固的细分利基市场。必须像冬眠的熊一样，保留每一分现金，拒绝任何冒险的反击，直到巨头自己犯错。",
            analysis: "弗洛伊德防御机制：退行（Regression）/退缩防御。退回到最安全的原始状态，通过减少与外界的接触来规避伤害。荣格八维：内倾感觉（Si）主导——依赖历史经验与绝对的安全边界。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 15, isReversed: true }, // 低体验寻求/保守
              enneagram: { type: 6, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「向外打破防线」：将剩下的全部资金注入一次饱和式的公关反击战，公开揭露巨头垄断的黑幕，同时推出一款极具争议性的“自杀式”低价产品，彻底把水搅浑。要么一战成名，要么轰烈战死。",
            analysis: "弗洛伊德防御机制：向攻击者认同（Identification with the Aggressor）。采用与巨头同样暴烈、毁灭性的手段进行反击，以此克服内心的无力感。荣格八维：外倾感觉（Se）与外倾直觉（Ne）的极限爆发。",
            scoring: {
              bigFive: { dimension: "E", facet: "E4", value: 90, isReversed: false }, // 高刺激寻求
              enneagram: { type: 8, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「思想深潜防线」：不盲目跟风。利用这 45 天时间，亲自带队对巨头的供应链进行深度穿透分析，寻找其由于快速扩张导致的底层物流成本漏洞，设计一套“降维打击”的非对称供应链重构方案。",
            analysis: "大五人格：高开放度（O5: 智性求知/概念思辨）。荣格八维：内倾直觉（Ni）与外倾思考（Te）的结合，通过深层模式识别寻找破局点。",
            scoring: {
              bigFive: { dimension: "O", facet: "O5", value: 85, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_c_st2",
        title: "第二阶段：断指求生",
        situation: "为了让公司活下去，你必须在 24 小时内裁掉 30% 的员工。名单里包括了陪你创业五年、但能力已经跟不上公司发展的技术老臣，以及刚刚怀孕、家庭极度困难的年轻运营。",
        question: "看着这份裁员名单，你倾向于如何执行这次谈话：",
        options: [
          {
            id: "a",
            text: "「理性决断防线」：将谈话完全委托给 HR 部门，要求严格按照劳动法标准（N+1）进行冷冰冰的程序化解约。不会亲自出面，因为无意义的情感纠缠只会降低组织重组的效率。",
            analysis: "弗洛伊德防御机制：情感隔离（Isolation of Affect）/逃避（Avoidance）。通过物理和情感上的双重隔离，来逃避亲手毁灭他人生活的巨大内疚感。荣格八维：外倾思考（Te）的极致工具理性。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 15, isReversed: true }, // 低同理心/冷酷
              enneagram: { type: 8, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「共情妥协防线」：亲自与每一个人通宵长谈。真诚地向他们道歉，包揽下公司战略失误的全部责任。动用个人私域人脉帮他们联系下家，甚至从个人期权中拿出一部分作为额外补偿。",
            analysis: "弗洛伊德防御机制：反向形成（Reaction Formation）/过度代偿。通过极度的自我牺牲和利他行为，来平息内心深处作为“刽子手”的道德焦虑。荣格八维：外倾情感（Fe）与内倾情感（Fi）的双重共鸣。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 90, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「优秀形象粉饰」：亲自出面谈话。将这次裁员包装为“公司为了迈向下一代伟大战略而进行的组织进化”，向被裁员工描绘一幅“毕业走向更广阔天地”的宏大蓝图，用高亢的情绪掩盖裁员的残酷事实。",
            analysis: "弗洛伊德防御机制：合理化/补偿。用宏大的愿景和情绪煽动来掩盖现实的残酷，保护公司和个人的“优秀形象”。大五人格：高外倾性（E3: 澎湃释放/能量投射）。",
            scoring: {
              bigFive: { dimension: "E", facet: "E3", value: 85, isReversed: false },
              enneagram: { type: 3, instinct: "SO" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_c_st3",
        title: "第三阶段：盟友的背叛",
        situation: "在裁员重组的关键时刻，你获得确凿证据：你最核心的战略合作伙伴（掌控着你 40% 的核心供应链）正在秘密与你的竞争对手巨头接触，准备以极低的价格将独家供应权卖给对方，这无异于在你的脖子上套上最后一根绞索。",
        question: "在对方尚未正式签约前，你决定采取何种反击手段：",
        options: [
          {
            id: "a",
            text: "「审视验证防线」：不露声色。暗中启动备用供应链谈判，同时派遣法务团队搜集对方违反“排他性合作协议”的底层证据，准备在对方签约的瞬间发起致命的法律诉讼与资产冻结，用契约锁死对方。",
            analysis: "大五人格：高尽责性（C5: 契约守护）、低宜人性（A4: 审视验证）。荣格八维：内倾思考（Ti）与外倾思考（Te）的结合，用严密的逻辑和规则进行防御性反击。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「自我宣示防线」：直接约见对方董事长。将你掌握的证据拍在桌上，明确告知对方：“如果你们敢签约，我将立刻向媒体公开你们的商业间谍行为，并在行业内彻底做臭你们的商誉。要么继续合作，要么一起毁灭。”",
            analysis: "大五人格：低宜人性（A2: 自我宣示反向）、高外倾性（E2: 支配度）。弗洛伊德防御机制：向攻击者认同。用极度强硬的姿态压服背叛带来的不安。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 90, isReversed: false },
              enneagram: { type: 8, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「价值兼容防线」：主动向对方示弱，坦诚交底公司目前的困境与未来的重构规划。提出一套“股权交叉持有”的深度绑定方案，将对方的短期利益转化为长期股东利益，用真诚与利益重组挽回盟友。",
            analysis: "大五人格：高宜人性（A4: 绝对信任/价值兼容）。荣格八维：外倾情感（Fe）与内倾直觉（Ni）的结合，通过重组利益共同体来化解敌意。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_d",
    name: "崩塌之夜 (The Night of the Collapse)",
    description: "极限高压场景。当外部秩序、社会信用与物理安全在瞬间雪崩，解构你的神经质防线、深层潜意识防御与极限应激状态下的认知功能。",
    category: "stress",
    stages: [
      {
        id: "sc_d_st1",
        title: "第一阶段：秩序的雪崩",
        situation: "深夜，公司总部突然被警方和债权人查封，创始人携款潜逃。数百名愤怒的供应商和员工将你围堵在办公室里，他们情绪失控，砸碎了玻璃，要求你这个“名义上的法定代表人”立刻用个人资产偿还债务。在人群推搡、闪光灯轰炸、甚至有人开始动手拉扯你的极限瞬间。",
        question: "你身体的第一反应和应对直觉是：",
        options: [
          {
            id: "a",
            text: "「敏感防御防线」：感到手心出汗，心脏剧烈跳动，甚至产生了一种强烈的“这只是一场梦”的虚无感。本能地退到墙角，双手抱头，紧闭双眼，等待保安或者警方来维持秩序。",
            analysis: "弗洛伊德防御机制：退行（Regression）/否认（Denial）。退化到儿童般的无助状态，或通过“去人格化（Depersonalization）”来否认眼前的残酷现实。大五人格：高神经质（N1: 焦虑、N6: 脆弱性）。",
            scoring: {
              bigFive: { dimension: "N", facet: "N1", value: 90, isReversed: false },
              enneagram: { type: 6, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「自控隔离防线」：大脑在巨大的噪音中反而进入了一种诡异的、绝对的冷静状态。能清晰地看到人群中最激进的三个带头者。直接站上办公桌，用比他们更大的声音宣布：“创始人涉嫌刑事犯罪，我已经报警，现在所有人跟我去会议室登记债权，冲动只会让你们一分钱也拿不到！”",
            analysis: "弗洛伊德防御机制：向攻击者认同/理智化。通过瞬间夺取控制权、展现比环境更强的攻击性，来压制内心的恐惧。荣格八维：外倾思考（Te）或外倾感觉（Se）的超常激活。大五人格：低神经质（N5: 冲动性反向/自控隔离）。",
            scoring: {
              bigFive: { dimension: "N", facet: "N5", value: 15, isReversed: true },
              enneagram: { type: 8, instinct: "SX" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：不退缩也不对抗。走下讲台，主动拉住一位正在哭泣的老年供应商的手，诚恳地看着她的眼睛说：“大姐，我知道这是您的养老钱，我也被骗了，但我向您保证，只要我今天还活着，我一定配合警方把资产追回来。”用肉身和真诚平息人群的暴怒。",
            analysis: "大五人格：高宜人性（A1: 同理与协作/共情妥协）。荣格八维：外倾情感（Fe）的极限释放，通过情感共鸣和肉身担责来化解物理危机。",
            scoring: {
              bigFive: { dimension: "A", facet: "A1", value: 90, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_d_st2",
        title: "第二阶段：废墟上的余烬",
        situation: "灾难过去三个月了。你失去了工作，背负了连带诉讼，名誉受损，每天只能在廉价的合租房里面对天花板。在这个职业生涯的绝对废墟上，你必须面对内心的虚无与重建。",
        question: "你如何向自己和未来的世界讲述这段经历：",
        options: [
          {
            id: "a",
            text: "「悲情升华防线」：这是一次毁灭性的、毫无意义的灾难。它证明了商业世界的肮脏与人性的不可信。我已经彻底放弃了对世俗成功的追求，现在我只想找一份完全不需要与人打交道的机械工作，了此残生。",
            analysis: "弗洛伊德防御机制：习得性无助/向内投射（Introjection）。将外界的灾难内化为对自我的彻底否定，退缩到抑郁状态。大五人格：高神经质（N3: 抑郁/能量低谷）。",
            scoring: {
              bigFive: { dimension: "N", facet: "N3", value: 85, isReversed: false },
              enneagram: { type: 4, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「意志自给防线」：这是一次极其宝贵的“凤凰涅槃”。它在物理上帮我粉碎了虚妄的世俗光环，逼迫我直面自己灵魂深处的脆弱。我正在将这段经历写成一部《危机管理与人性博弈》的实战手册，它将成为我下一阶段创业的终极底牌。",
            analysis: "弗洛伊德防御机制：升华（Sublimation）/合理化（Rationalization）。将巨大的创伤体验，转化为具有社会价值的学术/文学产出，重新夺回心灵的主导权。大五人格：低神经质（N3: 逆境耐受/意志自给）。",
            scoring: {
              bigFive: { dimension: "N", facet: "N3", value: 15, isReversed: true },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「冒险破界防线」：无所谓，生活就是一场荒诞的戏剧。既然旧的秩序碎了，那我就彻底放飞自我。我准备去西藏穷游一年，或者加入一个完全不着调的先锋艺术剧团，在混乱和流浪中寻找新的刺激与灵感。",
            analysis: "大五人格：高开放度（O4: 经验多样/冒险破界）、高外倾性（E4: 刺激寻求）。弗洛伊德防御机制：躁狂防御（Manic Defense）。用高频的外部刺激来防御内心的抑郁与空虚。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 90, isReversed: false },
              enneagram: { type: 7, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_d_st3",
        title: "第三阶段：最后的审判",
        situation: "在创始人金融诈骗案的法庭调查中，你作为名义上的法定代表人被传唤。创始人的辩护律师私下找到你，提供了一份能够让你完全免除刑事和民事连带责任的“完美证词”——只要你同意将部分核心运营文件的签字责任，推卸给当时在你手下实习、并盲目信任你而签字的年轻助理。",
        question: "面对可能面临的牢狱之灾或彻底的职业毁灭，你选择：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：拒绝该交易。在法庭上一五一十地陈述事实，声明“助理只是执行我的指令，签字责任完全在我”。宁可自己承担全部连带法律责任，也绝不让无辜的年轻人替我背锅。",
            analysis: "大五人格：高宜人性（A5: 合规偏好/道德铁律）、高尽责性（C5: 责任驱动）。荣格八维：内倾思考（Ti）与内倾情感（Fi）的绝对道德自律。",
            scoring: {
              bigFive: { dimension: "A", facet: "A5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「利益变通防线」：接受交易。认为在系统性崩塌中，自我保存（Self-Preservation）是唯一的理性选择。助理还年轻，受到的行业惩罚会比我小得多。我可以在事后通过大笔资金补偿或暗中帮其安排工作来弥补内疚。",
            analysis: "大五人格：低宜人性（A3: 利益变通/道德操守反向）。荣格八维：外倾思考（Te）的功利主义计算，将生存概率置于抽象道德之上。",
            scoring: {
              bigFive: { dimension: "A", facet: "A3", value: 15, isReversed: true },
              enneagram: { type: 3, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「敏感防御防线」：陷入极度的恐慌与道德撕裂。拒绝签署任何协议，也拒绝出庭作证。选择雇佣另一组律师团队，试图寻找程序正义上的技术性漏洞（如管辖权异议、证据合规性）来无限期拖延审判，逃避面对法庭。",
            analysis: "大五人格：高神经质（N6: 脆弱性/敏感防御）。弗洛伊德防御机制：逃避/退缩。通过程序性拖延来逃避无法承受的道德抉择与现实惩罚。",
            scoring: {
              bigFive: { dimension: "N", facet: "N6", value: 85, isReversed: false },
              enneagram: { type: 6, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_e",
    name: "亲密的引力 (The Gravity of Intimacy)",
    description: "亲密关系与情感边界场景。在生活习惯差异、伴侣的隐秘软肋、以及外界压力下的终极契约之间进行多维博弈，解构你的宜人性、情绪稳定性与情感代偿机制。",
    category: "lifestyle",
    stages: [
      {
        id: "sc_e_st1",
        title: "第一阶段：差异的张力",
        situation: "你与伴侣同居后，发现彼此在生活习惯和金钱观上存在巨大差异。伴侣倾向于高品质、即时享受的生活方式（如频繁高档消费、不存钱），而你更倾向于未雨绸缪、克制储蓄。一次关于下季度旅行预算的讨论中，伴侣指责你“抠门、不懂得享受生活，把日子过成了苦行僧”。",
        question: "面对这种深层的价值观冲突，你的第一反应是：",
        options: [
          {
            id: "a",
            text: "「秩序合规防线」：冷静列出两人的收入与未来刚性支出明细表，用客观数据证明克制消费的必要性，要求制定严格的共同账户消费SOP。",
            analysis: "大五人格：高尽责性（C6: 决策审慎）。荣格八维：外倾思考（Te）主导，压制内倾情感（Fi）。弗洛伊德防御机制：合理化（Rationalization）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C6", value: 85, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「情感代偿防线」：感到内疚和难过，妥协并同意伴侣的旅行计划，甚至主动承担大部分费用，认为“只要对方开心，我多加点班、省吃俭用也是值得的”。",
            analysis: "大五人格：高宜人性（A6: 共情妥协）。荣格八维：外倾情感（Fe）的过度代偿。弗洛伊德防御机制：反向形成（Reaction Formation）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 90, isReversed: false },
              enneagram: { type: 2, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「冒险破界防线」：被伴侣的话触动，决定打破自己的死板规则，坦然接受这次高档旅行，认为“生命只有一次，或许我确实应该尝试一下更随性、更丰盈的生活方式”。",
            analysis: "大五人格：高开放度（O4: 经验多样/冒险破界）。荣格八维：外倾直觉（Ne）与内倾情感（Fi）的结合。弗洛伊德防御机制：躁狂防御（Manic Defense）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 85, isReversed: false },
              enneagram: { type: 7, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_e_st2",
        title: "第二阶段：秘密的边界",
        situation: "你无意中发现伴侣背负了一笔数额不小的个人债务（由于其前期的投资失败或家庭变故），且一直瞒着你。此时，你们正准备合力付首付购买一套属于你们的房子。",
        question: "面对伴侣的隐瞒与债务危机，你倾向于：",
        options: [
          {
            id: "a",
            text: "「绝对信任防线」：不拆穿对方的尴尬，私下里默默调整自己的财务计划，甚至主动向朋友借钱帮其填补漏洞，用无条件的信任和包容来守护对方的自尊。",
            analysis: "大五人格：高宜人性（A4: 绝对信任/价值兼容）。荣格八维：内倾情感（Fi）与外倾情感（Fe）的协同。弗洛伊德防御机制：否认（Denial）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 90, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「审视验证防线」：直接找伴侣开诚布公地谈话，要求其出具完整的债务账单和还款计划，并暂停买房计划。认为“诚实是契约的底线，在债务理清前，任何感性的承诺都是沙上筑塔”。",
            analysis: "大五人格：高尽责性（C5: 契约守护）、低宜人性（A4: 审视验证）。荣格八维：内倾思考（Ti）与外倾思考（Te）的结合。弗洛伊德防御机制：理智化（Intellectualization）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 85, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「敏感防御防线」：感到极度的不安、愤怒与被背叛。开始反复怀疑伴侣对你的感情是否真实，甚至暗中调查对方的其他隐私，陷入无休止的焦虑与自我折磨中。",
            analysis: "大五人格：高神经质（N1: 焦虑、N6: 脆弱性）。荣格八维：劣势功能在压力下的彻底瘫痪。弗洛伊德防御机制：投影（Projection）。",
            scoring: {
              bigFive: { dimension: "N", facet: "N1", value: 85, isReversed: false },
              enneagram: { type: 6, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_e_st3",
        title: "第三阶段：终极的契约",
        situation: "伴侣的父母突然重病，需要一笔巨额的医疗费，且需要长期贴身照顾。伴侣希望你能卖掉你名下的一套婚前房产来救急，并辞职一年共同照顾老人。这会彻底打乱你的职业上升期和个人财务安全。",
        question: "面对亲密关系中的“终极道德两难”，你决定：",
        options: [
          {
            id: "a",
            text: "「完美执念防线」：拒绝卖房和辞职。提出理性的替代方案：用房产抵押贷款，并出资雇佣专业护工。认为“保持个人的财务安全和职业发展，才是长期抗击风险、守护家庭的理性基石”。",
            analysis: "大五人格：高尽责性（C5: 责任驱动/完美执念）。荣格八维：外倾思考（Te）的工具理性。弗洛伊德防御机制：合理化（Rationalization）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「情感代偿防线」：毫不犹豫地同意卖房并辞职。认为“在真正的爱面前，任何个人的前途和财产都是身外之物，我愿意用我的一切来分担伴侣的痛苦”。",
            analysis: "大五人格：高宜人性（A2: 利他性/克己让功）。荣格八维：内倾情感（Fi）与外倾情感（Fe）的极限共鸣。弗洛伊德防御机制：过度代偿/自我牺牲。",
            scoring: {
              bigFive: { dimension: "A", facet: "A2", value: 90, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「自我宣示防线」：接管大局。拒绝辞职，但同意卖房。亲自出面联系全国最顶尖的医疗资源，用强势的执行力主导整个治疗过程，要求伴侣和家人完全听从你的战略调度。",
            analysis: "大五人格：高外倾性（E2: 支配度）、低宜人性（A2: 自我宣示反向）。荣格八维：外倾感觉（Se）与外倾思考（Te）的极限爆发。弗洛伊德防御机制：向攻击者认同。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 85, isReversed: false },
              enneagram: { type: 8, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_f",
    name: "社交的假面 (The Masquerade of Socializing)",
    description: "社交圈层与人际博弈场景。在圈子入场券、朋友的成功与嫉妒、以及沉默的共犯之间进行多维博弈，解构你的外倾性、宜人性与社交防御机制。",
    category: "creative",
    stages: [
      {
        id: "sc_f_st1",
        title: "第一阶段：圈子的入场券",
        situation: "你渴望加入一个由行业顶尖精英、投资人和艺术家组成的私密社交圈子，这能给你的事业带来质的飞跃。在一次圈子聚会上，大家都在热烈讨论并吹捧一个你深知是“学术骗局”或“商业泡沫”的前沿概念。圈子的核心领袖转过头来，微笑着询问你的看法。",
        question: "面对这个融入圈子的关键契机，你选择：",
        options: [
          {
            id: "a",
            text: "「优秀形象粉饰」：顺水推舟，用极具文采和想象力的语言加入吹捧，甚至提出几个新颖的隐喻来升华这个概念，迅速赢得领袖的赞赏和全场的瞩目。",
            analysis: "大五人格：高外倾性（E2: 展现度/享受舞台）。荣格八维：外倾直觉（Ne）与外倾情感（Fe）的迎合。弗洛伊德防御机制：补偿（Compensation）。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 85, isReversed: false },
              enneagram: { type: 3, instinct: "SO" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「绝对合规防线」：平静而客观地指出该概念在底层逻辑和数据上的硬伤，声明“科学和商业的常识不应被狂热所掩盖”，哪怕这会让全场气氛瞬间降到冰点。",
            analysis: "大五人格：高尽责性（C5: 契约守护/完美执念）、低宜人性（A2: 自我宣示）。荣格八维：内倾思考（Ti）的绝对纯粹性。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「克己让功防线」：微笑点头，用温和、中立的话术打圆场（如“这是一个非常具有启发性的视角，值得我们持续观察”），既不违背良知去吹捧，也不公开反驳伤害人际和谐。",
            analysis: "大五人格：高宜人性（A2: 合作谦逊/克己让功）。荣格八维：外倾情感（Fe）主导，追求人际关系的和谐。弗洛伊德防御机制：妥协/压抑。",
            scoring: {
              bigFive: { dimension: "A", facet: "A2", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_f_st2",
        title: "第二阶段：嫉妒的阴影",
        situation: "你相处多年、能力一直与你平起平坐的挚友，突然因为一次偶然的爆红或贵人相助，实现了阶层跃迁，获得了你梦寐以求的社会地位和财富。在一次私下聚会中，挚友无意间流露出一种居高临下的指点和优越感。",
        question: "面对挚友的巨大成功与微妙的优越感，你内心的第一反应是：",
        options: [
          {
            id: "a",
            text: "「悲情升华防线」：感到深深的失落、嫉妒与自我怀疑。觉得命运不公，自己被时代和朋友抛弃了。开始刻意疏远对方，退缩到自己的悲情世界里，认为“我们已经不是一路人了”。",
            analysis: "大五人格：高神经质（N3: 抑郁/能量低谷）。荣格八维：内倾情感（Fi）的消极退缩。弗洛伊德防御机制：向内投射（Introjection）/悲情升华。",
            scoring: {
              bigFive: { dimension: "N", facet: "N3", value: 85, isReversed: false },
              enneagram: { type: 4, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「自我宣示防线」：大方祝贺对方，但内心燃起熊熊的斗志。将挚友的成功视为对自己的极限刺激，暗中发誓要在三年内通过更激进的创业或投资超越对方，夺回人际关系中的主导权。",
            analysis: "大五人格：高外倾性（E4: 刺激寻求）、低宜人性（A2: 自我宣示反向）。荣格八维：外倾感觉（Se）与外倾思考（Te）的竞争性激活。弗洛伊德防御机制：向攻击者认同。",
            scoring: {
              bigFive: { dimension: "E", facet: "E4", value: 90, isReversed: false },
              enneagram: { type: 8, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「绝对信任防线」：由衷地为朋友感到高兴，完全过滤掉对方无意间的优越感。认为“朋友的成功就是我的骄傲，人各有志，我依然安于我当下的生活节奏与内心平静”。",
            analysis: "大五人格：高宜人性（A4: 绝对信任/人际信任）。荣格八维：内倾情感（Fi）的自我安顿。弗洛伊德防御机制：合理化（Rationalization）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 90, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_f_st3",
        title: "第三阶段：沉默的共犯",
        situation: "在一次行业高端晚宴上，你发现圈子里的核心领袖（掌握着你未来核心资源的大佬）正在对一位年轻的行业新人进行言语上的职场霸凌和人格侮辱。周围的人为了迎合大佬，纷纷跟着哄笑或保持沉默。",
        question: "面对这种人际霸凌，你选择：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：直接站出来打断大佬的话，用严肃、客观的语气指出：“这种玩笑已经超出了职场礼仪的边界，并不好笑。”当众维护新人的尊严，哪怕这会彻底得罪大佬。",
            analysis: "大五人格：高宜人性（A5: 合规偏好/道德铁律）、高尽责性（C5: 责任驱动）。荣格八维：内倾思考（Ti）与内倾情感（Fi）的绝对道德自律。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "A", facet: "A5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「利益变通防线」：保持沉默，甚至跟着微微一笑。认为“在残酷的商业社会中，弱肉强食是常态，为了一个陌生人去挑战核心资源持有者是极其愚蠢的商业自杀行为”。",
            analysis: "大五人格：低宜人性（A3: 利益变通/道德操守反向）。荣格八维：外倾思考（Te）的功利主义计算。弗洛伊德防御机制：压抑（Repression）/合理化。",
            scoring: {
              bigFive: { dimension: "A", facet: "A3", value: 15, isReversed: true },
              enneagram: { type: 3, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：不公开对抗大佬，但巧妙地端起酒杯走过去，用“向大佬敬酒并请教问题”的方式转移话题，暗中帮新人解围，并在事后私下安慰新人。",
            analysis: "大五人格：高宜人性（A1: 同理与协作/共情妥协）。荣格八维：外倾情感（Fe）的圆融协调。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A1", value: 85, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_g",
    name: "欲望的沙漏 (The Hourglass of Desire)",
    description: "财富消费、身体健康与生活方式场景。在消费主义幻觉、身体的猝死警报、以及时间的终极遗产之间进行多维博弈，解构你的尽责性、神经质与自我重建机制。",
    category: "finance",
    stages: [
      {
        id: "sc_g_st1",
        title: "第一阶段：消费的幻觉",
        situation: "你拿到了一笔丰厚的分红，同时身边的同龄人纷纷开始购买奢侈品、豪车或出入高端私人俱乐部。消费主义的精致文案不断暗示你：“你配得上更好的生活，消费的档次决定了你的阶层。”",
        question: "面对这种无孔不入的消费主义诱惑，你倾向于：",
        options: [
          {
            id: "a",
            text: "「秩序合规防线」：不为所动。将分红的 80% 投入到低风险的长期定投基金或养老保险中，继续保持朴素的生活。认为“资产的增值和财务的绝对安全，比任何虚荣的符号都更能提供安全感”。",
            analysis: "大五人格：高尽责性（C6: 决策审慎/风险规避）。荣格八维：内倾感觉（Si）与外倾思考（Te）的稳健结合。弗洛伊德防御机制：压抑（Repression）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C6", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「冒险破界防线」：大方消费。购买一辆心仪已久的跑车或去南极旅行，认为“金钱只是工具，体验才是生命的本质。在年轻、感官最敏锐的时候享受世界，才是对生命最大的尊重”。",
            analysis: "大五人格：高外倾性（E4: 刺激寻求）、高开放度（O4: 经验多样）。荣格八维：外倾感觉（Se）的即时体验。弗洛伊德防御机制：躁狂防御（Manic Defense）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 85, isReversed: false },
              enneagram: { type: 7, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「优秀形象粉饰」：将资金投入到能直接提升个人“商业光环”的消费中（如定制高档西装、加入高端商会、购买能彰显身份的腕表），将消费视为一种精准的个人品牌投资。",
            analysis: "大五人格：高外倾性（E2: 展现度/光环偏好）。荣格八维：外倾思考（Te）与外倾直觉（Ne）的功利性包装。弗洛伊德防御机制：补偿（Compensation）。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 85, isReversed: false },
              enneagram: { type: 3, instinct: "SO" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_g_st2",
        title: "第二阶段：身体的警报",
        situation: "由于长期的高强度工作和焦虑，你在一次通宵加班后突然感到胸闷、心慌、半身麻木，被紧急送往医院。医生严肃地警告你：“你的身体已经到了猝死的边缘，必须立刻停止高强度工作，静养半年，否则随时有生命危险。”而此时，你正处于晋升合伙人或创业融资的关键冲刺期。",
        question: "面对身体的“猝死警报”与事业的黄金期，你决定：",
        options: [
          {
            id: "a",
            text: "「完美执念防线」：拒绝静养。冲两包浓缩咖啡，继续回到岗位。认为“战士不应在战场上退缩，如果在这个关键节点放弃，我前半生的努力将付诸东流。我相信我的意志力能战胜肉体的脆弱”。",
            analysis: "大五人格：高尽责性（C5: 完美执念/责任驱动）。荣格八维：内倾感觉（Si）的压抑与外倾思考（Te）的强迫性推进。弗洛伊德防御机制：否认（Denial）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「敏感防御防线」：陷入极度的恐慌与焦虑。立刻向公司递交辞职信，卖掉手头的股票，开始疯狂研究各种养生、中医和抗衰老理论，每天频繁测量心率，对任何身体微小变化都极度敏感。",
            analysis: "大五人格：高神经质（N1: 焦虑、N6: 脆弱性）。荣格八维：劣势感觉（Si）在压力下的病态爆发。弗洛伊德防御机制：退行（Regression）/躯体化（Somatization）。",
            scoring: {
              bigFive: { dimension: "N", facet: "N1", value: 90, isReversed: false },
              enneagram: { type: 6, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「意志自给防线」：平静接受。向董事会申请带薪休假或退居幕后做顾问，将这半年视为一次“人生重构”的契机。开始阅读哲学、心理学，重新审视“成功”的定义，试图在慢节奏中寻找生命的新平衡。",
            analysis: "大五人格：低神经质（N3: 逆境耐受/意志自给）、高开放度（O6: 价值观/哲学思辨）。荣格八维：内倾直觉（Ni）的宏观意义赋予。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "N", facet: "N3", value: 15, isReversed: true },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_g_st3",
        title: "第三阶段：时间的遗产",
        situation: "假设你突然获得了一笔巨额的无条件信托基金，金额足够你和你的子孙后代过上极度奢华的生活，你再也不需要为了生存而工作一秒钟。在这个彻底摆脱了“生存重力”的绝对自由状态下，你将如何度过你余下的一生：",
        question: "你倾向于选择何种生活方式？",
        options: [
          {
            id: "a",
            text: "「完美执念防线」：继续保持高强度的作息。创立一个公益性质的科研基金会或学校，亲自担任校长，用更严苛的标准要求自己，誓要为人类的知识或社会进步留下可量化的遗产。",
            analysis: "大五人格：高尽责性（C4: 成就动机/挑战追求）。荣格八维：外倾思考（Te）与内倾感觉（Si）的结合，追求客观、可量化的社会价值。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C4", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「悲情升华防线」：隐姓埋名，退隐到山林或海岛。买下一间画室或录音棚，不眠不休地进行纯粹的、不迎合任何市场的艺术创作，将灵魂彻底倾注在作品中，追求精神的终极解脱。",
            analysis: "大五人格：高开放度（O2: 审美偏好/艺术直觉）。荣格八维：内倾情感（Fi）与内倾直觉（Ni）的极限融合。弗洛伊德防御机制：升华/隔离。",
            scoring: {
              bigFive: { dimension: "O", facet: "O2", value: 90, isReversed: false },
              enneagram: { type: 4, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「冒险破界防线」：成为一个“世界体验者”。买下一艘游艇，环游世界，学习各种极限运动，体验不同的文化、宗教和生活方式，在无休止的探索和感官体验中燃尽生命。",
            analysis: "大五人格：高外倾性（E4: 刺激寻求）、高开放度（O4: 经验多样）。荣格八维：外倾感觉（Se）的极限释放。弗洛伊德防御机制：躁狂防御（Manic Defense）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 90, isReversed: false },
              enneagram: { type: 7, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_h",
    name: "知识的巴别塔 (The Babel of Knowledge)",
    description: "教育、真理与信念场景。在学术诚信、知识平庸化、以及信仰撕裂之间进行多维博弈，解构你的尽责性、开放度与智性求知机制。",
    category: "creative",
    stages: [
      {
        id: "sc_h_st1",
        title: "第一阶段：象牙塔的阴影",
        situation: "你作为一名核心研究员，在复现你最敬爱的导师（也是你学术生涯的引路人）的一项奠基性研究成果时，发现其底层实验数据存在系统性的、人为修改的痕迹。如果公开这一发现，导师将名誉扫地，而你所在的整个实验室也将失去核心资金支持，你的毕业和前途也将化为泡影。",
        question: "面对导师的学术不端与个人前途的冲突，你选择：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：坚决维护学术诚实。私下找导师对质，如果对方拒绝主动撤稿和澄清，你将向学术委员会提交完整的复现失败报告与数据异常证据，哪怕这意味着学术生涯的终结。",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）、高宜人性（A3: 极端诚实）。荣格八维：内倾思考（Ti）的绝对真理追求。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「利益变通防线」：保持沉默，并协助导师“优化”复现步骤，用其他边缘参数的调整来掩盖底层的异常。认为“在现实的学术生态中，生存和资源是第一位的，导师的声誉就是整个团队的生命线”。",
            analysis: "大五人格：低宜人性（A3: 利益变通/道德操守反向）。荣格八维：外倾思考（Te）的功利主义计算。弗洛伊德防御机制：合理化（Rationalization）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A3", value: 15, isReversed: true },
              enneagram: { type: 3, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「智性求知防线」：不公开举报，也不盲目配合。以此为契机，暗中开展一项全新的、更具包容性的理论框架研究，试图将导师的“错误数据”解释为某种尚未被发现的“边界效应”，用学术创新的方式化解危机。",
            analysis: "大五人格：高开放度（O5: 智性求知/概念思辨）。荣格八维：内倾直觉（Ni）与外倾直觉（Ne）的创造性爆发。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O5", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_h_st2",
        title: "第二阶段：知识的平庸化",
        situation: "你撰写了一篇极具学术价值但晦涩难懂的科普/研究文章。一家头部自媒体平台愿意高薪聘请你做专栏作家，但要求你必须将文章“平庸化”——用极具煽动性、甚至带有伪科学暗示的标题党文案，来迎合大众的猎奇心理和情绪宣泄。",
        question: "面对知识传播的“平庸化”诱惑与高额报酬，你选择：",
        options: [
          {
            id: "a",
            text: "「完美执念防线」：坚决拒绝。声明“知识的尊严不容践踏，宁可文章只有十个同行阅读，也绝不为了流量向大众的愚昧妥协”。继续在小众、严肃的学术期刊上发表文章。",
            analysis: "大五人格：高尽责性（C5: 完美执念/责任驱动）。荣格八维：内倾思考（Ti）的智性洁癖。弗洛伊德防御机制：压抑（Repression）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「优秀形象粉饰」：欣然接受。认为“在流量时代，传播力就是影响力。用大众听得懂的‘爽文’语言进行降维打击，拿到高额报酬和话语权，才是最聪明的知识变现路径”。",
            analysis: "大五人格：高外倾性（E2: 展现度/享受舞台）。荣格八维：外倾直觉（Ne）与外倾情感（Fe）的商业化包装。弗洛伊德防御机制：补偿（Compensation）。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 85, isReversed: false },
              enneagram: { type: 3, instinct: "SO" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「多元兼容防线」：接受合作，但坚持底线。在不改变核心科学事实的前提下，主动学习大众传播心理学，用幽默、富有同理心的话术重新包装文章，将严肃科学与大众趣味进行桥接。",
            analysis: "大五人格：高开放度（O6: 价值兼容/多元兼容）、高宜人性（A1: 同理与协作）。荣格八维：外倾情感（Fe）与外倾直觉（Ne）的圆融结合。弗洛伊德防御机制：升华。",
            scoring: {
              bigFive: { dimension: "O", facet: "O6", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_h_st3",
        title: "第三阶段：信仰的撕裂",
        situation: "你的一项最新科学研究成果，在逻辑和数据上无懈可击，但其结论却彻底推翻了你家族世代信奉的某种宗教/文化信仰，这会让你的父母和整个家族感到极大的痛苦与精神崩溃，甚至视你为“家族的叛徒”。",
        question: "面对客观真理与家族信仰的剧烈撕裂，你决定：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：毫不犹豫地公开发表。声明“真理是冰冷的，不以任何人的情感和信仰为转移。如果信仰无法承受事实的检验，那它就是虚妄的”。做好与家族彻底决裂的准备。",
            analysis: "大五人格：高尽责性（C5: 契约守护）、低宜人性（A2: 自我宣示）。荣格八维：内倾思考（Ti）与外倾思考（Te）的绝对主导。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「共情妥协防线」：无限期推迟发表，或将核心结论进行模糊化处理。认为“科学研究只是我生活的一部分，而家人的精神安宁和亲情是我无法承受的代价。我宁可保留这个秘密，也要守护家庭的和谐”。",
            analysis: "大五人格：高宜人性（A6: 共情妥协/利他性）。荣格八维：外倾情感（Fe）的绝对代偿。弗洛伊德防御机制：压抑（Repression）/自我牺牲。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 90, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「思想深潜防线」：发表成果，但亲自撰写一篇极具哲学深度的附录。试图在更高的形而上学维度上，将你的科学发现与家族信仰的“精神内核”进行调和，证明科学的终点与信仰的起点并不冲突。",
            analysis: "大五人格：高开放度（O5: 概念思辨/思想深潜）。荣格八维：内倾直觉（Ni）的宏观意义赋予。弗洛伊德防御机制：理智化（Intellectualization）/升华。",
            scoring: {
              bigFive: { dimension: "O", facet: "O5", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_i",
    name: "故乡与他乡 (Home and Abroad)",
    description: "身份认同、归属感与文化根基场景。在异乡的文化孤立、故乡的价值疏离、以及根的终极抉择之间进行多维博弈，解构你的宜人性、情绪稳定性与身份重建机制。",
    category: "lifestyle",
    stages: [
      {
        id: "sc_i_st1",
        title: "第一阶段：异乡的落脚点",
        situation: "你来到一个文化、语言和价值观完全陌生的发达国家工作。为了融入当地的主流社交圈，你必须在言行、饮食甚至政治立场上完全迎合当地的“政治正确”，甚至需要刻意隐瞒或贬低你自己的母国文化背景。这让你感到一种深层的身份撕裂。",
        question: "面对异乡的文化同化压力，你倾向于：",
        options: [
          {
            id: "a",
            text: "「反向形成防线」：全力融入。彻底改掉原有的生活习惯，甚至在公开场合比当地人更激进地宣扬当地的价值观，认为“既然选择了远方，就必须斩断过去的根，成为一个纯粹的全球公民”。",
            analysis: "大五人格：高宜人性（A4: 顺从性/价值兼容）。荣格八维：外倾情感（Fe）的防御性同化。弗洛伊德防御机制：反向形成（Reaction Formation）/认同（Identification）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 85, isReversed: false },
              enneagram: { type: 3, instinct: "SO" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「悲情升华防线」：拒绝同化。在公寓里保留纯粹的母国生活方式，只在华人/同乡的小圈子里社交。在工作中保持绝对的客气与距离，将内心的孤独转化为对母国文化的洁癖式坚守。",
            analysis: "大五人格：低外倾性（E5: 客气距离）、高神经质（N3: 抑郁/能量低谷）。荣格八维：内倾情感（Fi）的自我封闭。弗洛伊德防御机制：退缩/悲情升华。",
            scoring: {
              bigFive: { dimension: "N", facet: "N3", value: 80, isReversed: false },
              enneagram: { type: 4, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「智性隔离防线」：保持绝对的工具理性。将当地的社交规则视为一套“API接口”，在工作时完美调用，下班后立刻切断。不投入任何真实情感，将文化冲突视为纯粹的社会学博弈现象。",
            analysis: "大五人格：低神经质（N5: 自控隔离）。荣格八维：内倾思考（Ti）与外倾思考（Te）的结合。弗洛伊德防御机制：情感隔离（Isolation of Affect）。",
            scoring: {
              bigFive: { dimension: "N", facet: "N5", value: 15, isReversed: true },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_i_st2",
        title: "第二阶段：故乡的陌生人",
        situation: "你在国外奋斗多年后回到故乡探亲。在高中同学聚会上，你发现曾经无话不谈的发小们都在热烈讨论买房、考公、编制和相亲，而他们对你谈论的全球视野、前沿艺术和多元生活方式流露出一种微妙的排斥与“崇洋媚外”的讥讽。你感到自己成了一个“故乡的陌生人”。",
        question: "面对故乡的价值疏离，你内心的第一反应是：",
        options: [
          {
            id: "a",
            text: "「克己让功防线」：迅速收起自己的锋芒。主动加入他们的讨论，用自嘲的方式讲述自己在国外的狼狈，极力迎合他们的金钱观和生活节奏，以此换取人际关系的接纳与和谐。",
            analysis: "大五人格：高宜人性（A2: 合作谦逊/克己让功）。荣格八维：外倾情感（Fe）的妥协。弗洛伊德防御机制：退行（Regression）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A2", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「自我宣示防线」：感到一种智性和文化上的优越感。在言语中不经意地流露出对他们狭隘金钱观的轻蔑，用流利的英语和高大上的全球案例进行降维打击，以此防御内心的被排斥感。",
            analysis: "大五人格：低宜人性（A2: 自我宣示反向）、高外倾性（E2: 展现度）。荣格八维：外倾思考（Te）的竞争性表达。弗洛伊德防御机制：向攻击者认同。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 85, isReversed: false },
              enneagram: { type: 8, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「思想深潜防线」：平静观察。不迎合也不对抗，将这次聚会视为一次生动的“本土社会学田野调查”。在内心深处，用哲学和历史的视角去理解他们狭隘背后的生存焦虑，保持内心的超然与同情。",
            analysis: "大五人格：高开放度（O5: 概念思辨/思想深潜）。荣格八维：内倾直觉（Ni）的宏观模式识别。弗洛伊德防御机制：理智化（Intellectualization）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O5", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_i_st3",
        title: "第三阶段：根的抉择",
        situation: "你面临人生下半场的终极抉择：是留在那个高效率、高福利、但永远将你视为“外人”的全球化大都市，还是回到那个充满人情味、文化根基深厚、但人际关系复杂且缺乏规则的故乡小镇？这决定了你和你的下一代将把哪里视为“家”。",
        question: "面对“根”的终极抉择，你决定：",
        options: [
          {
            id: "a",
            text: "「秩序合规防线」：选择留在全球化大都市。认为“规则、效率和个人的绝对自由，是现代文明的底线。我宁可承受制度化的冷漠，也无法忍受故乡缺乏边界的人情社会”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）。荣格八维：外倾思考（Te）与内倾感觉（Si）的结合。弗洛伊德防御机制：合理化。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「情感代偿防线」：选择回到故乡小镇。认为“没有文化根基和亲情滋养的自由，本质上是精神的流浪。我愿意忍受规则的缺失，去换取人际关系的温度和灵魂的归属感”。",
            analysis: "大五人格：高宜人性（A6: 共情妥协/利他性）。荣格八维：内倾情感（Fi）与外倾情感（Fe）的结合。弗洛伊德防御机制：退行/代偿。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 90, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「冒险破界防线」：拒绝被任何单一的“根”所束缚。选择成为一个“数字游民”，每年在不同的国家和城市流浪，在无休止的移动中寻找生命的意义，将“流浪本身”定义为自己的根。",
            analysis: "大五人格：高开放度（O4: 经验多样/冒险破界）、高外倾性（E4: 刺激寻求）。荣格八维：外倾感觉（Se）与外倾直觉（Ne）的极限释放。弗洛伊德防御机制：躁狂防御。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 95, isReversed: false },
              enneagram: { type: 7, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_j",
    name: "虚拟的绿洲 (The Virtual Oasis)",
    description: "数字生活、虚拟身份与现实边界场景。在双重人格的撕裂、算法的茧房、以及拔掉插头的瞬间之间进行多维博弈，解构你的外倾性、神经质与自我重建机制。",
    category: "tech",
    stages: [
      {
        id: "sc_j_st1",
        title: "第一阶段：双重人格的撕裂",
        situation: "你在现实生活中是一个极度内敛、不善言辞、甚至有些社交恐惧的普通职员；但在网络虚拟世界里，你通过一个精心设计的虚拟形象（Avatar），成了一个拥有百万粉丝、言辞犀利、极具煽动性的意见领袖。这种巨大的双重人格撕裂，开始严重侵蚀你现实生活中的自我认同。",
        question: "面对虚拟与现实人格的剧烈撕裂，你倾向于：",
        options: [
          {
            id: "a",
            text: "「优秀形象粉饰」：全力经营虚拟身份。认为“现实中的肉身只是一个无趣的容器，网络上的高光时刻才是我灵魂的真实表达。我应当将现实生活简化为维持肉身生存的机械劳动，将全部精神倾注在虚拟绿洲中”。",
            analysis: "大五人格：高外倾性（E2: 展现度/光环偏好）、低宜人性（A3: 利益变通）。荣格八维：外倾直觉（Ne）与外倾情感（Fe）的病态代偿。弗洛伊德防御机制：分裂（Splitting）/补偿。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 90, isReversed: false },
              enneagram: { type: 3, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「完美执念防线」：坚决斩断虚拟身份。注销百万粉丝的账号，回归现实的平庸。声明“虚假的繁华只会加速灵魂的腐烂，我必须在真实的物理世界中，通过脚踏实地的劳动和真实的人际交往来重建自我”。",
            analysis: "大五人格：高尽责性（C5: 完美执念/责任驱动）。荣格八维：内倾感觉（Si）与内倾思考（Ti）的结合。弗洛伊德防御机制：压抑（Repression）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「悲情升华防线」：不放弃也不融合。将这种撕裂感视为一种独特的“艺术创作素材”。开始撰写一部关于“数字时代灵魂分裂”的半自传体小说，在文字中高傲地审视自己的痛苦，与世俗保持距离。",
            analysis: "大五人格：高开放度（O2: 审美偏好/艺术直觉）、高神经质（N3: 抑郁）。荣格八维：内倾情感（Fi）的悲情升华。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O2", value: 90, isReversed: false },
              enneagram: { type: 4, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_j_st2",
        title: "第二阶段：算法的茧房",
        situation: "你发现你的网络社交圈子（由算法精准推送的信息茧房）正在变得越来越极端和排他。圈子里的人对任何温和、理性的声音进行疯狂的网暴和驱逐。你深知他们的很多观点是偏激且违背事实的，但如果你公开发表温和的澄清，你将被你赖以生存的虚拟社群彻底抛弃。",
        question: "面对算法茧房的狂热与群体排他性，你选择：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：公开发表理性的澄清与事实数据。声明“群体的狂热是理性的敌人，我绝不为了群体的接纳而向偏见妥协”。做好被网暴和退圈的准备，坚守事实底线。",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）、高宜人性（A3: 极端诚实）。荣格八维：内倾思考（Ti）的绝对真理追求。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「反向形成防线」：保持沉默，甚至在公开场合跟着一起狂热呼喊。认为“在网络生态中，群体认同是唯一的安全感来源。为了生存，我必须隐藏自己的理性，融入群体的无意识狂欢中”。",
            analysis: "大五人格：高宜人性（A4: 顺从性/价值兼容）、高神经质（N4: 社交焦虑）。荣格八维：外倾情感（Fe）的防御性同化。弗洛伊德防御机制：反向形成/认同。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 85, isReversed: false },
              enneagram: { type: 6, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「智性隔离防线」：不澄清也不迎合。利用这套极端的社群数据，暗中开展一项关于“算法如何异化人类群体心理”的学术研究。将他们的狂热和对你的攻击视为珍贵的实验样本，保持绝对的超然。",
            analysis: "大五人格：低神经质（N5: 自控隔离）、高开放度（O5: 智性求知）。荣格八维：内倾思考（Ti）与外倾思考（Te）的理智化。弗洛伊德防御机制：理智化（Intellectualization）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O5", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_j_st3",
        title: "第三阶段：拔掉插头的瞬间",
        situation: "你现实中的伴侣/家人因为长期被你冷落，正处于抑郁和离职的边缘，向你发出最后的通牒：要么你彻底注销网络虚拟身份，静网半年，回归真实的家庭生活；要么他们将彻底离开你。而此时，你的虚拟账号正处于签约变现、走向职业巅峰的关键风口期。",
        question: "面对虚拟帝国的巅峰与现实亲情的崩塌，你决定：",
        options: [
          {
            id: "a",
            text: "「情感代偿防线」：立刻拔掉插头。注销账号，静网半年，全心全意陪伴家人。声明“虚拟的帝国只是泡沫，物理世界中真实家人的眼泪和温度，才是我生命中唯一不可替代的锚点”。",
            analysis: "大五人格：高宜人性（A6: 共情妥协/利他性）。荣格八维：内倾情感（Fi）与外倾情感（Fe）的极限共鸣。弗洛伊德防御机制：过度代偿/自我牺牲。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 95, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「优秀形象粉饰」：拒绝注销。认为“在现代社会中，个人的事业巅峰和财务自由才是守护家庭的终极底牌。家人的抑郁只是暂时的，等我变现成功、实现阶层跃迁后，可以用最好的医疗和物质条件来补偿他们”。",
            analysis: "大五人格：高外倾性（E2: 展现度/光环偏好）、低宜人性（A3: 利益变通）。荣格八维：外倾思考（Te）的功利主义计算。弗洛伊德防御机制：合理化/补偿。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 90, isReversed: false },
              enneagram: { type: 3, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「自控隔离防线」：不妥协也不放弃。提出理性的折中方案：将账号运营完全委托给专业团队，自己退居幕后做内容策划，每天强制规定 3 小时“无手机家庭时间”。用严密的日程表和边界划分来强行兼顾两者。",
            analysis: "大五人格：高尽责性（C5: 责任驱动/完美执念）。荣格八维：外倾思考（Te）与内倾感觉（Si）的强迫性时间管理。弗洛伊德防御机制：隔离（Isolation）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 85, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_k",
    name: "时间的沙漏 (The Hourglass of Time)",
    description: "衰老、死亡与生命意义场景。在肉体衰老、中年危机、以及面对死亡的终极告别之间进行多维博弈，解构你的情绪稳定性、开放度与生命意义寻求机制。",
    category: "lifestyle",
    stages: [
      {
        id: "sc_k_st1",
        title: "第一阶段：镜中的陌生人",
        situation: "你在清晨的镜子中，第一次看清了自己眼角无法抚平的皱纹、两鬓斑白的银丝，以及体检报告上多项亮起红灯的退行性指标。你突然意识到，那个曾经精力无限、可以通宵狂欢的“年轻自我”已经一去不返，肉体的衰老正在不可逆转地发生。",
        question: "面对肉体衰老与青春逝去的残酷事实，你的第一反应是：",
        options: [
          {
            id: "a",
            text: "「敏感防御防线」：感到深深的恐慌、焦虑与失落。开始疯狂购买各种抗衰老护肤品、保健品，甚至考虑医美手段。每天频繁照镜子，对身体的任何微小衰老迹象都极度敏感，试图用外在的修饰来挽留青春。",
            analysis: "大五人格：高神经质（N1: 焦虑、N6: 脆弱性）。荣格八维：劣势感觉（Si）在压力下的病态爆发。弗洛伊德防御机制：退行（Regression）/躯体化（Somatization）。",
            scoring: {
              bigFive: { dimension: "N", facet: "N1", value: 85, isReversed: false },
              enneagram: { type: 6, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「自控隔离防线」：平静接受。认为“衰老是生物学的必然规律，没有任何人能违背热力学第二定律”。立刻调整作息，制定严格的饮食、运动与体检SOP，将身体视为一台需要精密维护的机器，有条不紊地进行抗衰管理。",
            analysis: "大五人格：低神经质（N5: 自控隔离）、高尽责性（C5: 契约守护）。荣格八维：外倾思考（Te）与内倾感觉（Si）的理性结合。弗洛伊德防御机制：理智化（Intellectualization）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「思想深潜防线」：不焦虑也不抗拒。将衰老视为生命维度拓宽的契机。开始阅读哲学、历史，认为“肉体的衰退是为了让灵魂更加纯粹，智慧的增长远比胶原蛋白的流失更有价值”。在慢节奏中寻找生命的新美学。",
            analysis: "大五人格：高开放度（O6: 价值观/哲学思辨）、低神经质（N3: 逆境耐受）。荣格八维：内倾直觉（Ni）的宏观意义赋予。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O6", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_k_st2",
        title: "第二阶段：遗愿清单的重量",
        situation: "人到中年，你发现自己虽然拥有了稳定的收入和社会地位，但前半生为了生存和责任，彻底搁置了童年时最纯粹的梦想（如成为一名流浪歌手、写一部科幻小说、或去非洲保护野生动物）。此时，一个机会摆在面前，允许你放弃当下的稳定，去用一年时间兑现这个梦想，但这会让你面临巨大的财务损失和家庭不解。",
        question: "面对“遗愿清单”的重量与现实约束，你选择：",
        options: [
          {
            id: "a",
            text: "「秩序合规防线」：放弃梦想，留在原地。说服自己“梦想只是童年的幻觉，人生的下半场应该以稳健、责任和家庭安全为重。在现实的重力面前，克制不切实际的幻想才是真正的成熟”。",
            analysis: "大五人格：高尽责性（C6: 决策审慎/风险规避）、低开放度（O1: 想象力反向）。荣格八维：内倾感觉（Si）的保守防御。弗洛伊德防御机制：合理化（Rationalization）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C6", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「冒险破界防线」：毅然出发。向公司请假一年或直接辞职，带上极少的行李，踏上兑现梦想的旅程。认为“如果我今天不去做，我这一生都将活在‘如果当初’的悔恨中。生命是一场体验，而不是一场积累”。",
            analysis: "大五人格：高开放度（O4: 经验多样/冒险破界）、高外倾性（E4: 刺激寻求）。荣格八维：外倾感觉（Se）与内倾情感（Fi）的极限释放。弗洛伊德防御机制：升华。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 90, isReversed: false },
              enneagram: { type: 7, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：寻找折中方案。不辞职也不放弃，利用业余时间和假期，将梦想“微缩化”地融入日常生活中（如每周写一章小说、周末去救助流浪动物）。用严密的时间管理强行兼顾责任与梦想。",
            analysis: "大五人格：高宜人性（A6: 共情妥协）、高尽责性（C5: 责任驱动）。荣格八维：外倾情感（Fe）与外倾思考（Te）的协调。弗洛伊德防御机制：妥协/隔离。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_k_st3",
        title: "第三阶段：最后的告别",
        situation: "你最挚爱的双亲之一走到了生命的终点，正处于弥留之际。医生询问你是否要使用高强度的无创插管、切开气管和心脏起搏器来强行维持其数天的微弱生命迹象，但这会给老人带来极大的肉体痛苦与尊严丧失。而你的其他亲戚纷纷施压，认为“不抢救就是不孝，会被唾沫星子淹死”。",
        question: "面对死亡的终极告别与世俗道德的审判，你决定：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：坚决拒绝无意义的抢救。签署放弃抢救同意书（DNR），选择安宁疗护，陪伴老人平静、尊严地离去。声明“真正的孝顺是减少亲人的痛苦，而不是为了满足旁观者的道德表演而折磨逝者”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/责任驱动）、低宜人性（A2: 自我宣示）。荣格八维：内倾思考（Ti）与内倾情感（Fi）的绝对道德自律。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「共情妥协防线」：同意全力抢救。认为“只要有一线希望，哪怕多活一秒钟，我也无法亲手放弃父母的生命。我无法承受‘是我决定了父母死亡’的巨大内疚感，也无法面对亲戚的指责”。",
            analysis: "大五人格：高宜人性（A4: 顺从性/共情妥协）、高神经质（N1: 焦虑）。荣格八维：外倾情感（Fe）的防御性妥协。弗洛伊德防御机制：退行/过度代偿。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 90, isReversed: false },
              enneagram: { type: 6, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「悲情升华防线」：拒绝插管，但亲自设计一场极具仪式感的“临终告别”。在病房里播放老人最爱的音乐，点燃香薰，让所有家人依次握手告别，将死亡的恐惧转化为一场神圣、美丽而庄严的生命谢幕礼。",
            analysis: "大五人格：高开放度（O2: 审美偏好/艺术直觉）、高宜人性（A1: 同理与协作）。荣格八维：内倾直觉（Ni）与内倾情感（Fi）的极限融合。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O2", value: 90, isReversed: false },
              enneagram: { type: 4, instinct: "SX" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_l",
    name: "权力的游戏 (The Game of Power)",
    description: "权力、权威与组织博弈场景。在驯服的代价、派系的漩涡、以及权力的王冠之间进行多维博弈，解构你的外倾性、宜人性与权力防御机制。",
    category: "business",
    stages: [
      {
        id: "sc_l_st1",
        title: "第一阶段：驯服的代价",
        situation: "你发现你的直属上司（掌控着你晋升生杀大权的大佬）在一次核心业务汇报中，犯了一个极其低级、会导致公司损失数百万的逻辑错误。在私下沟通时，上司暗示你“不要多管闲事，把报告改得好看一点，顺着我的意思写”。如果听从，你将获得梦寐以求的晋升；如果拒绝，你将被边缘化。",
        question: "面对上司的“驯服”要求与晋升诱惑，你选择：",
        options: [
          {
            id: "a",
            text: "「利益变通防线」：顺从上司。按照其意图修改报告，并在公开会议上极力为其辩护。认为“在组织中，忠诚度远比对错重要。等我拿到权力、爬到更高的位置后，我自然有能力去纠正这些错误”。",
            analysis: "大五人格：低宜人性（A3: 利益变通/道德操守反向）、高外倾性（E2: 支配度）。荣格八维：外倾思考（Te）的功利主义计算。弗洛伊德防御机制：合理化/认同。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 85, isReversed: false },
              enneagram: { type: 3, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「绝对合规防线」：坚决拒绝。绕过直属上司，直接向总经理和审计委员会提交真实的业务报告，公开揭露该逻辑错误。声明“我的职业操守和公司的利益不容妥协，我绝不为任何人的愚蠢和私利背书”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）、低宜人性（A2: 自我宣示）。荣格八维：内倾思考（Ti）的绝对自律。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：私下里多次找上司沟通，用极其委婉、不伤害其自尊的话术（如“我发现了一个系统接口的偶发性异常，可能会影响您的完美模型”）帮其暗中修正错误，既保护了公司利益，又维护了上司的体面。",
            analysis: "大五人格：高宜人性（A1: 同理与协作/共情妥协）。荣格八维：外倾情感（Fe）的圆融协调。弗洛伊德防御机制：妥协/升华。",
            scoring: {
              bigFive: { dimension: "A", facet: "A1", value: 90, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_l_st2",
        title: "第二阶段：派系的漩涡",
        situation: "公司内部爆发了毁灭性的派系斗争，总经理与副总经理彻底撕裂。两派大佬纷纷向你伸出橄榄枝，要求你“站队”并提供对方派系核心成员的“黑料”。如果你保持中立，你将被两派共同视为“异类”并联合绞杀；如果加入，你必须参与肮脏的政治抹黑。",
        question: "面对派系斗争的漩涡，你倾向于：",
        options: [
          {
            id: "a",
            text: "「自我宣示防线」：果断站队强者。选择胜率更高的一派，积极参与战略制定，甚至亲自出面撰写抹黑材料。认为“商场如战场，政治斗争没有温情可言。消灭对手、夺取绝对控制权，是生存的唯一法则”。",
            analysis: "大五人格：高外倾性（E2: 支配度）、低宜人性（A2: 自我宣示反向）。荣格八维：外倾感觉（Se）与外倾思考（Te）的极限爆发。弗洛伊德防御机制：向攻击者认同。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 90, isReversed: false },
              enneagram: { type: 8, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「智性隔离防线」：坚决保持中立。拒绝提供任何黑料，继续专注于自己的技术/业务工作。如果被逼无奈，宁可递交辞职信离职，声明“我的才华只服务于客观价值，绝不成为任何人权力游戏的祭品”。",
            analysis: "大五人格：高尽责性（C5: 契约守护）、低神经质（N5: 自控隔离）。荣格八维：内倾思考（Ti）的智性洁癖。弗洛伊德防御机制：逃避/隔离。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 85, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「价值兼容防线」：充当“双面调停者”。利用自己与两派的良好人际关系，暗中传递温和的信息，极力寻找两派在商业利益上的“最大公约数”，试图用重组利益共同体的方式化解斗争，守护团队的和谐。",
            analysis: "大五人格：高宜人性（A4: 绝对信任/价值兼容）。荣格八维：外倾情感（Fe）与内倾直觉（Ni）的结合。弗洛伊德防御机制：升华/妥协。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 90, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_l_st3",
        title: "第三阶段：权力的王冠",
        situation: "你最终在斗争中胜出，登上了总经理的宝座，获得了梦寐以求的绝对权力。此时，你发现下属中出现了一个极具才华、但性格叛逆、经常在公开会议上挑战你权威的年轻版“曾经的你”。",
        question: "手握权力的王冠，你倾向于如何对待这位挑战者：",
        options: [
          {
            id: "a",
            text: "「完美执念防线」：严厉驯服。在公开场合严厉敲打对方，要求其必须遵守组织纪律和汇报SOP，甚至通过调整其KPI和预算来逼其顺从。认为“权威是组织高效运行的基石，任何挑战权威的苗头都必须被扼杀”。",
            analysis: "大五人格：高尽责性（C5: 完美执念/责任驱动）、低宜人性（A2: 自我宣示反向）。荣格八维：外倾思考（Te）的强力控制。弗洛伊德防御机制：向攻击者认同。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「多元兼容防线」：大方包容，甚至破格提拔。亲自担任其导师，为其开辟一条绕过繁琐汇报的“绿色通道”，允许其在边界内自由折腾。声明“有才华的叛逆者是组织进化的火种，平庸的顺从只会让组织慢性死亡”。",
            analysis: "大五人格：高开放度（O6: 价值兼容/多元兼容）、高宜人性（A1: 同理与协作）。荣格八维：外倾直觉（Ne）与内倾情感（Fi）的结合。弗洛伊德防御机制：升华。",
            scoring: {
              bigFive: { dimension: "O", facet: "O6", value: 90, isReversed: false },
              enneagram: { type: 8, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「克己让功防线」：不打压也不特殊对待。在公开会议上微笑倾听其意见，并在事后私下找其谈心，用温和、长辈般的关怀（如“我理解你的激情，但为了让你的好想法落地，你需要学会用大家能接受的规则沟通”）将其感化。",
            analysis: "大五人格：高宜人性（A2: 合作谦逊/克己让功）。荣格八维：外倾情感（Fe）主导，追求人际关系的和谐与集体价值。弗洛伊德防御机制：妥协/代偿。",
            scoring: {
              bigFive: { dimension: "A", facet: "A2", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_m",
    name: "艺术的殉道者 (The Martyr of Art)",
    description: "创造力、艺术表达与世俗评价场景。在纯粹自我表达、黄金枷锁的商业诱惑、以及作品的终极命运之间进行多维博弈，解构你的开放度、外倾性与创造性防御机制。",
    category: "creative",
    stages: [
      {
        id: "sc_m_st1",
        title: "第一阶段：纯粹的噪音",
        situation: "你倾注了三年心血、将灵魂彻底撕裂而创作出的一件极具先锋性和个人精神投影的艺术作品/设计方案，在公开展出后，被主流市场和大众媒体贬低为“毫无美感、不知所云的纯粹噪音”，甚至遭到了网民的疯狂嘲讽与人身攻击。",
        question: "面对主流世界的冷漠与毁灭性差评，你的第一反应是：",
        options: [
          {
            id: "a",
            text: "「悲情升华防线」：感到深深的孤独、高傲与悲凉。认为“大众的审美永远是平庸和滞后的，伟大的作品注定只能被少数高贵的灵魂读懂”。拒绝做任何解释，进一步退缩到自己的精神孤岛中，保持作品的纯洁性。",
            analysis: "大五人格：高开放度（O2: 审美偏好/艺术直觉）、高神经质（N3: 抑郁）。荣格八维：内倾情感（Fi）的绝对自足。弗洛伊德防御机制：悲情升华/隔离。",
            scoring: {
              bigFive: { dimension: "O", facet: "O2", value: 95, isReversed: false },
              enneagram: { type: 4, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「优秀形象粉饰」：立刻启动公关和学术包装。撰写一篇极具玄学和哲学高度的“作品白皮书”，亲自登台作学术汇报，用高亢的情绪和宏大的概念将大众的差评重新定义为“对传统审美的解构与挑衅”，反向收割流量。",
            analysis: "大五人格：高外倾性（E2: 展现度/光环偏好）。荣格八维：外倾直觉（Ne）与外倾思考（Te）的商业化反击。弗洛伊德防御机制：补偿（Compensation）/合理化。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 85, isReversed: false },
              enneagram: { type: 3, instinct: "SO" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：感到难过和动摇。主动下场与批评者沟通，虚心听取他们的意见，甚至在下一次迭代中主动修改作品中过于刺眼和激进的部分，使其更符合大众的接受度，认为“不能与人产生联结的艺术是自私的”。",
            analysis: "大五人格：高宜人性（A6: 共情妥协/利他性）。荣格八维：外倾情感（Fe）的防御性妥协。弗洛伊德防御机制：退行（Regression）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_m_st2",
        title: "第二阶段：黄金的枷锁",
        situation: "由于你的争议性名声，一家跨国奢侈品巨头向你发出天价合约：聘请你作为其全球艺术总监，但条件是你在未来三年内，必须按照其严格的商业模板，批量复制那些迎合中产阶级虚荣心、毫无灵魂但极具商业价值的“流水线艺术品”，且不能再发表任何个人先锋作品。",
        question: "面对“黄金的枷锁”与纯粹自我表达的冲突，你选择：",
        options: [
          {
            id: "a",
            text: "「完美执念防线」：坚决拒绝。声明“我的灵魂不卖。批量复制毫无灵魂的工业垃圾，是对我创造力的强奸，也是对艺术的亵渎。我宁可贫穷地死在画室里，也绝不成为资本的提线木偶”。",
            analysis: "大五人格：高尽责性（C5: 完美执念/责任驱动）、高开放度（O2: 审美偏好）。荣格八维：内倾情感（Fi）与内倾思考（Ti）的绝对自律。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "O", facet: "O2", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「利益变通防线」：欣然签约。认为“在现代社会中，没有财务自由的艺术只是无力的呻吟。用三年的‘商业妥协’换取下半生绝对的创作自由和顶尖的社会资源，是一笔极其划算的战略投资”。",
            analysis: "大五人格：低宜人性（A3: 利益变通/道德操守反向）、高外倾性（E2: 支配度）。荣格八维：外倾思考（Te）的功利主义计算。弗洛伊德防御机制：合理化/补偿。",
            scoring: {
              bigFive: { dimension: "A", facet: "A3", value: 15, isReversed: true },
              enneagram: { type: 3, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「冒险破界防线」：接受签约，但暗中进行“艺术走私”。在白天完美交付商业垃圾的同时，利用深夜在匿名网络上发表极具毁灭性和挑衅性的数字艺术，用这种双重生活来释放创造力，享受这种破界的刺激。",
            analysis: "大五人格：高开放度（O4: 经验多样/冒险破界）、高外倾性（E4: 刺激寻求）。荣格八维：外倾感觉（Se）与外倾直觉（Ne）的极限释放。弗洛伊德防御机制：分裂（Splitting）/躁狂防御。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 90, isReversed: false },
              enneagram: { type: 7, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_m_st3",
        title: "第三阶段：最后的画布",
        situation: "你走到了生命的尽头。你手头有一件你一生中最伟大、最纯粹、超越了时代整整一个世纪的终极杰作。但你深知，一旦你去世，这件作品落入世俗市场，一定会被资本家炒作、拍卖、甚至被庸俗的大众进行娱乐化解构，彻底失去其神圣性。",
        question: "在闭上双眼前，你决定如何处置这件终极杰作：",
        options: [
          {
            id: "a",
            text: "「完美执念防线」：亲手烧毁它。声明“这件作品诞生于虚无，也应当归于虚无。它只属于我和上帝，世俗的眼睛不配凝视它，资本的铜臭不配污染它。让它随我的肉身一起化为灰烬，才是最完美的谢幕”。",
            analysis: "大五人格：高尽责性（C5: 完美执念/责任驱动）、高开放度（O2: 审美偏好）。荣格八维：内倾情感（Fi）的绝对洁癖。弗洛伊德防御机制：超我主导/悲情升华。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 4, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「优秀形象粉饰」：无条件捐赠给国家美术馆。要求设立专门的个人展厅，并进行全球直播的遗作发布会。认为“作品是我生命的延续，是我在人类历史上刻下的最深印记。用最宏大的世俗仪式将其固化为不朽的丰碑，才是我生命的终极胜利”。",
            analysis: "大五人格：高外倾性（E2: 展现度/光环偏好）。荣格八维：外倾思考（Te）与外倾直觉（Ne）的结合。弗洛伊德防御机制：补偿（Compensation）。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 90, isReversed: false },
              enneagram: { type: 3, instinct: "SO" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「价值兼容防线」：将作品藏在画室的夹层中，不留任何遗言，任由命运去发现它。认为“作品有其自己的生命和宿命。无论是被尘封、被误解还是被神化，都是它与未来世界发生碰撞的自然过程，我无需强求”。",
            analysis: "大五人格：高宜人性（A4: 绝对信任/价值兼容）。荣格八维：内倾直觉（Ni）的超然与释怀。弗洛伊德防御机制：合理化（Rationalization）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_n",
    name: "育儿的迷宫 (The Labyrinth of Parenting)",
    description: "亲子教育、代际冲突与期望投影场景。在完美模板的鸡娃焦虑、叛逆的镜子、以及终极放手之间进行多维博弈，解构你的宜人性、尽责性与期望投影防御机制。",
    category: "lifestyle",
    stages: [
      {
        id: "sc_n_st1",
        title: "第一阶段：完美的模板",
        situation: "你的孩子展现出了极高的艺术/体育天赋，但文化课成绩平平。身边的家长纷纷将孩子送入高强度的“鸡娃”补习班，争夺名校入场券。伴侣和学校老师极力劝说你，必须立刻斩断孩子的艺术特长，将其强行按入应试教育的轨道，否则孩子未来将沦为社会底层。",
        question: "面对鸡娃焦虑与孩子天赋的冲突，你选择：",
        options: [
          {
            id: "a",
            text: "「秩序合规防线」：听从劝说。斩断艺术特长，为孩子制定严格的应试学习甘特图，每天监督其完成高强度作业。认为“在残酷的社会竞争中，名校学历是唯一的安全网。放任天赋是极其不负责任的溺爱”。",
            analysis: "大五人格：高尽责性（C5: 完美执念/责任驱动）。荣格八维：外倾思考（Te）与内倾感觉（Si）的强力推进。弗洛伊德防御机制：压抑（Repression）/合理化。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「冒险破界防线」：尊重孩子的天赋。拒绝应试补习，甚至为其办理休学，全力支持其在艺术/体育道路上野蛮生长。声明“每个生命都是独特的，我绝不为了世俗的稳定，将我的孩子塞入平庸的工业模具中”。",
            analysis: "大五人格：高开放度（O6: 价值观/多元兼容）、低尽责性（C6: 决策审慎反向）。荣格八维：内倾情感（Fi）与外倾直觉（Ne）的结合。弗洛伊德防御机制：升华。",
            scoring: {
              bigFive: { dimension: "O", facet: "O6", value: 90, isReversed: false },
              enneagram: { type: 4, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：寻找折中方案。在保证孩子基本文化课及格的前提下，利用业余时间支持其特长发展。不强求名校，也不放任自流，用温和、耐心的沟通引导孩子自己寻找平衡点。",
            analysis: "大五人格：高宜人性（A1: 同理与协作/共情妥协）。荣格八维：外倾情感（Fe）的圆融协调。弗洛伊德防御机制：妥协。",
            scoring: {
              bigFive: { dimension: "A", facet: "A1", value: 90, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_n_st2",
        title: "第二阶段：叛逆的镜子",
        situation: "孩子进入青春期，突然开始疯狂叛逆。他们不仅彻底否定了你为他们规划的人生蓝图，甚至开始信奉一种你深恶痛绝的、颓废且虚无的亚文化（如沉迷游戏、拒绝沟通、甚至自残）。在一次剧烈的冲突中，孩子指责你“虚伪、自私，只是把我当成你未实现梦想的容器”。",
        question: "面对孩子的剧烈叛逆与人格指责，你的第一反应是：",
        options: [
          {
            id: "a",
            text: "「自我宣示防线」：感到权威受到严重挑战，极度愤怒。采取强硬的禁足、没收电子设备等手段，强行压制其叛逆行为，要求其必须认错并回归正轨。认为“没有规矩不成方圆，放任叛逆只会毁了孩子的一生”。",
            analysis: "大五人格：高外倾性（E2: 支配度）、低宜人性（A2: 自我宣示反向）。荣格八维：外倾思考（Te）的强力控制。弗洛伊德防御机制：向攻击者认同。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 85, isReversed: false },
              enneagram: { type: 8, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「敏感防御防线」：感到极度的痛苦、内疚与自我怀疑。开始反复反思自己是不是一个“失败的父母”，在孩子面前变得小心翼翼、百般讨好，甚至无底线地妥协其无理要求，试图用卑微的爱挽回关系。",
            analysis: "大五人格：高神经质（N6: 脆弱性/敏感防御）、高宜人性（A6: 共情妥协）。荣格八维：外倾情感（Fe）的防御性退让。弗洛伊德防御机制：向内投射（Introjection）/退行。",
            scoring: {
              bigFive: { dimension: "N", facet: "N6", value: 85, isReversed: false },
              enneagram: { type: 6, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「思想深潜防线」：冷静下来，强行隔离自己的愤怒。将孩子的叛逆视为其“自我意识觉醒”的必然生理过程。主动退后一步，给彼此空间，不再强行说教，而是用平等的姿态倾听其痛苦，寻找其亚文化背后的精神诉求。",
            analysis: "大五人格：高开放度（O3: 情感感受/思想深潜）、低神经质（N5: 自控隔离）。荣格八维：内倾直觉（Ni）与内倾情感（Fi）的结合。弗洛伊德防御机制：理智化（Intellectualization）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O3", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_n_st3",
        title: "第三阶段：终极的放手",
        situation: "孩子大学毕业，拒绝了你动用毕生人脉为其安排的、极其稳定的国企/公职工作，坚持要加入一个随时可能倒闭的先锋摇滚乐队，去全国进行流浪巡演。伴侣要求你立刻切断对孩子的一切经济支持，逼其向现实妥协。",
        question: "面对孩子的“人生豪赌”与伴侣的施压，你决定：",
        options: [
          {
            id: "a",
            text: "「秩序合规防线」：切断经济支持，强行逼其妥协。声明“社会不养闲人，既然你选择了不切实际的幻想，就必须自己承担挨饿的代价。我绝不为你的任性买单”。用生存的重力逼其回归稳定。",
            analysis: "大五人格：高尽责性（C6: 决策审慎/风险规避）。荣格八维：外倾思考（Te）与内倾感觉（Si）的结合。弗洛伊德防御机制：合理化。",
            scoring: {
              bigFive: { dimension: "C", facet: "C6", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「情感代偿防线」：暗中给予经济支持，并说服伴侣放手。对孩子说：“去吧，去燃尽你的青春。如果失败了，随时回来，家永远是你的避风港，爸爸妈妈会为你兜底。”用无条件的爱为其提供安全网。",
            analysis: "大五人格：高宜人性（A2: 利他性/克己让功）。荣格八维：内倾情感（Fi）与外倾情感（Fe）的结合。弗洛伊德防御机制：过度代偿/自我牺牲。",
            scoring: {
              bigFive: { dimension: "A", facet: "A2", value: 90, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「契约守护防线」：与孩子签署一份“独立契约”：允许其去流浪三年，期间不提供任何经济支持，但如果三年后乐队依然无法自给自足，孩子必须主动放弃，回归世俗工作。用规则和边界来强行兼顾自由与现实。",
            analysis: "大五人格：高尽责性（C5: 契约守护/责任驱动）。荣格八维：外倾思考（Te）的契约化管理。弗洛伊德防御机制：隔离（Isolation）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 85, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_o",
    name: "法律与正义 (The Scales of Justice)",
    description: "法律伦理、职业操守与良知冲突场景。在辩护人的天平、吹哨人的代价、以及法律的盲区之间进行多维博弈，解构你的尽责性、宜人性与道德防御机制。",
    category: "business",
    stages: [
      {
        id: "sc_o_st1",
        title: "第一阶段：辩护人的天平",
        situation: "你作为一名顶尖的刑事辩护律师，在代理一起轰动全国的富豪涉嫌故意杀人案时，无意中在富豪的私密电脑中发现了其亲手虐杀受害者的核心视频证据。而此时，控方由于程序违法，导致其核心证据被法庭排除，你只要保持沉默，就能轻松为富豪赢得“无罪辩护”，拿到千万律师费并名声大噪。",
        question: "面对职业契约（为委托人保密）与内心正义的剧烈冲突，你选择：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：坚守职业契约，保持沉默。继续为富豪进行无罪辩护，并销毁该视频。声明“律师的职责是维护法律程序的正义，而不是充当道德法官。如果程序违法，无罪就是唯一的法治结果”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）、低宜人性（A3: 利益变通反向）。荣格八维：外倾思考（Te）的程序正义。弗洛伊德防御机制：理智化（Intellectualization）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「极端诚实防线」：拒绝为邪恶背书。暗中将视频证据匿名邮寄给控方检察官，同时宣布退出该案辩护，哪怕这会让你面临行业协会的吊销执照处罚与富豪的疯狂报复。声明“良知高于职业契约，我绝不成为杀人犯的帮凶”。",
            analysis: "大五人格：高宜人性（A3: 极端诚实/道德铁律）、高尽责性（C5: 责任驱动）。荣格八维：内倾情感（Fi）的绝对道德自律。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "A", facet: "A3", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SX" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「利益变通防线」：不销毁也不举报。利用该视频证据，在私下里逼迫富豪签署一份巨额的“受害者家属信托补偿协议”，并主动向警方自首以换取轻判。用非正式的博弈手段强行实现实质正义。",
            analysis: "大五人格：低宜人性（A3: 利益变通）、高外倾性（E2: 支配度）。荣格八维：外倾思考（Te）与外倾直觉（Ne）的实用主义博弈。弗洛伊德防御机制：合理化。",
            scoring: {
              bigFive: { dimension: "A", facet: "A3", value: 15, isReversed: true },
              enneagram: { type: 3, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_o_st2",
        title: "第二阶段：吹哨人的代价",
        situation: "你在你所在的大型制药公司担任合规总监，发现公司即将上市的一款利润数十亿的核心抗癌药，在临床试验中存在隐瞒严重心脏毒性的行为，这会导致数万名患者面临猝死风险。你向董事会汇报，董事长明确告知你：“该药已经通过审批，如果撤回，公司将破产，数万名员工将失业。请你闭嘴，否则你将被行业彻底封杀。”",
        question: "面对“吹哨人”的毁灭性代价与公众生命安全，你决定：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：成为吹哨人。搜集完整证据，直接向国家药监局和主流媒体公开举报，哪怕这意味着个人职业生涯的彻底毁灭与漫长的诉讼。声明“生命安全不容任何商业利益的计算，我必须阻止这场合法的谋杀”。",
            analysis: "大五人格：高宜人性（A5: 合规偏好/道德铁律）、高尽责性（C5: 责任驱动）。荣格八维：内倾思考（Ti）与内倾情感（Fi）的绝对道德自律。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "A", facet: "A5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「利益变通防线」：保持沉默，但递交辞职信。认为“在庞大的资本机器面前，个人的反抗只是螳臂当车。我无法改变机器，但我可以选择不成为其中的齿轮。我选择离开，保留我最后的干净”。",
            analysis: "大五人格：低神经质（N5: 自控隔离）、低宜人性（A3: 利益变通）。荣格八维：内倾思考（Ti）的智性洁癖。弗洛伊德防御机制：逃避/隔离。",
            scoring: {
              bigFive: { dimension: "N", facet: "N5", value: 15, isReversed: true },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：不公开举报，也不辞职。暗中联合研发部门的良知科学家，在后续的“说明书微调”和“医生临床指导”中，用极其隐蔽的技术性话术（如“建议心脏病史患者慎用”）来最大限度降低猝死风险，用局部的妥协换取组织的生存。",
            analysis: "大五人格：高宜人性（A1: 同理与协作/共情妥协）。荣格八维：外倾情感（Fe）的圆融协调。弗洛伊德防御机制：妥协/合理化。",
            scoring: {
              bigFive: { dimension: "A", facet: "A1", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_o_st3",
        title: "第三阶段：法律的盲区",
        situation: "你作为一名法官，审理一起故意伤害案：一位长期遭受丈夫极度暴虐、家暴、甚至性虐待的懦弱妻子，在一次丈夫醉酒并试图用开水烫死女儿的极限瞬间，用菜刀砍死了丈夫。按照刑法典的严格字面解释，这超出了“正当防卫”的时空边界，属于故意杀人罪，最低面临十年有期徒刑。而全社会都在为这位母亲请命。",
        question: "手握法律的天平，你倾向于做出何种判决：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：坚守成文法典。严格按照故意杀人罪判处其十年有期徒刑，但同时在判决书附录中向最高法院提交“司法建议书”请求特赦。声明“法官是法律的仆人，绝不能用个人的同情去强行扭曲成文法，否则法治的底线将彻底崩溃”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）。荣格八维：外倾思考（Te）与内倾感觉（Si）的法条主义坚守。弗洛伊德防御机制：理智化。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「共情妥协防线」：强行寻找法律漏洞。利用“期待可能性缺失”或“防卫过当”的技术性解释，将其判处三年有期徒刑并缓刑三年（即当庭释放）。声明“法律的终极目的是保护弱者和正义，如果法条导致了天理不容的悲剧，那法官必须用良知去修正法条”。",
            analysis: "大五人格：高宜人性（A6: 共情妥协/利他性）。荣格八维：内倾情感（Fi）与外倾情感（Fe）的极限共鸣。弗洛伊德防御机制：过度代偿/自我牺牲。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 95, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「思想深潜防线」：判处最低刑罚，但亲自撰写一篇长达数万字、足以载入司法史册的判决书。从法哲学、女性主义法学和历史法学的宏观维度，重新定义“家暴环境下的正当防卫边界”，用学术创新的方式推动国家立法改革。",
            analysis: "大五人格：高开放度（O5: 概念思辨/思想深潜）。荣格八维：内倾直觉（Ni）的宏观模式识别与意义赋予。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O5", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_p",
    name: "信仰的荒原 (The Wasteland of Faith)",
    description: "存在主义危机、虚无主义与生命意义重建场景。在意义的消亡、荒诞的剧场、以及最后的朝圣之间进行多维博弈，解构你的情绪稳定性、开放度与存在主义重建机制。",
    category: "creative",
    stages: [
      {
        id: "sc_p_st1",
        title: "第一阶段：意义的消亡",
        situation: "你在35岁时，实现了世俗意义上的“绝对成功”——财富自由、家庭美满、名利双收。然而，在达到巅峰的某一个清晨，你突然被一种毁灭性的、深不见底的虚无感所吞噬。你发现所有的名利、豪车和赞美在死亡和漫长的宇宙尺度面前，都显得极其荒诞和毫无意义。你失去了起床的动力。",
        question: "面对世俗成功后的“存在主义虚无”，你的第一反应是：",
        options: [
          {
            id: "a",
            text: "「悲情升华防线」：沉溺于虚无。拒绝任何世俗的社交和商业活动，退隐到书房里，开始疯狂阅读叔本华、萨特和加缪。将这种虚无感转化为一种高傲的、冷眼旁观世俗狂欢的悲剧美感，与世界保持距离。",
            analysis: "大五人格：高开放度（O2: 审美偏好/艺术直觉）、高神经质（N3: 抑郁）。荣格八维：内倾情感（Fi）的消极自足。弗洛伊德防御机制：悲情升华/隔离。",
            scoring: {
              bigFive: { dimension: "O", facet: "O2", value: 95, isReversed: false },
              enneagram: { type: 4, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「冒险破界防线」：用高频的外部刺激来防御虚无。买下一艘游艇，开始疯狂尝试翼装飞行、无辅助攀岩等极限运动，或者频繁出入喧嚣的社交派对，认为“既然生命没有终极意义，那就用极限的感官体验和多巴胺将时间填满”。",
            analysis: "大五人格：高外倾性（E4: 刺激寻求）、高开放度（O4: 经验多样）。荣格八维：外倾感觉（Se）的即时释放。弗洛伊德防御机制：躁狂防御（Manic Defense）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 90, isReversed: false },
              enneagram: { type: 7, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「完美执念防线」：强行压制虚无感。为自己制定一个更宏大、更具挑战性的“第二曲线”商业帝国规划，或者加入一个严苛的宗教修行组织，用极度规律、高强度的作息和任务将自己强行锁死在轨道上。",
            analysis: "大五人格：高尽责性（C4: 成就动机/挑战追求）。荣格八维：外倾思考（Te）与内倾感觉（Si）的强迫性推进。弗洛伊德防御机制：压抑（Repression）/合理化。",
            scoring: {
              bigFive: { dimension: "C", facet: "C4", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_p_st2",
        title: "第二阶段：荒诞的剧场",
        situation: "一场突如其来的、毫无逻辑的随机灾难（如一场突发的大地震或一次无预警的金融海啸），在瞬间夺走了你所有的财产，并让你失去了最挚爱的亲人。你前半生积累的秩序和对“善有善报、因果有报”的信念在瞬间粉碎，宇宙向你展现了其绝对的冷漠与荒诞。",
        question: "面对荒诞宇宙的致命一击，你内心的第一反应是：",
        options: [
          {
            id: "a",
            text: "「敏感防御防线」：精神彻底崩溃。陷入深深的抑郁、恐慌与习得性无助中。每天反复质问苍天“为什么是我？我到底做错了什么？”，拒绝接受现实，在无休止的痛苦和怨恨中自我毁灭。",
            analysis: "大五人格：高神经质（N3: 抑郁、N6: 脆弱性）。荣格八维：劣势功能在压力下的彻底瘫痪。弗洛伊德防御机制：向内投射（Introjection）/退行。",
            scoring: {
              bigFive: { dimension: "N", facet: "N3", value: 90, isReversed: false },
              enneagram: { type: 6, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「自控隔离防线」：切断一切情感体验。用绝对的冷漠和麻木来防御痛苦，拒绝在任何人面前流一滴眼泪。将灾难视为纯粹的“概率学偶发事件”，像清理废墟上的垃圾一样，面无表情地开始重建物理生活。",
            analysis: "大五人格：低神经质（N5: 自控隔离）。荣格八维：内倾思考（Ti）的理智化。弗洛伊德防御机制：情感隔离（Isolation of Affect）。",
            scoring: {
              bigFive: { dimension: "N", facet: "N5", value: 15, isReversed: true },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「思想深潜防线」：平静接受荒诞。认为“宇宙本就是无序和冷漠的，痛苦是生命存在的唯一铁证”。效仿加缪笔下的西西弗斯，推石上山，将对荒诞的反抗本身定义为生命的尊严，在废墟上开出高傲的灵魂之花。",
            analysis: "大五人格：高开放度（O6: 价值观/哲学思辨）、低神经质（N3: 逆境耐受）。荣格八维：内倾直觉（Ni）的宏观意义赋予。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O6", value: 95, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_p_st3",
        title: "第三阶段：最后的朝圣",
        situation: "在经历了一生的繁华、幻灭、挣扎与重建后，你独自一人坐在喜马拉雅山脚下的篝火旁，凝视着漫天繁星。你即将闭上双眼，离开这个世界。此时，你必须为自己这一生写下最后的墓志铭，重新定义你灵魂的归宿。",
        question: "你倾向于选择何种墓志铭作为你灵魂的终极归宿：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：回归神圣的秩序。选择皈依某种古老的宗教或绝对的宇宙法则，写下：“我是一粒尘埃，终将回归神圣的秩序与永恒的怀抱。我顺从，故我安宁。”",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）。荣格八维：内倾感觉（Si）与外倾思考（Te）的终极皈依。弗洛伊德防御机制：认同（Identification）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「悲情升华防线」：坚守纯粹的自我。拒绝任何宗教的抚慰，写下：“我来过，我痛苦过，我创造过。我从未向荒诞的宇宙妥协，我以我纯粹的、高傲的、独特的自我为荣。我自由了。”",
            analysis: "大五人格：高开放度（O2: 审美偏好/艺术直觉）。荣格八维：内倾情感（Fi）的终极自足。弗洛伊德防御机制：悲情升华/升华。",
            scoring: {
              bigFive: { dimension: "O", facet: "O2", value: 95, isReversed: false },
              enneagram: { type: 4, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「价值兼容防线」：与世界达成终极的和解。写下：“我爱过这个世界，也原谅了它的冷漠。一切存在皆有其因果，我安于我当下的消亡，正如我安于我曾经的诞生。万物归一，我很平静。”",
            analysis: "大五人格：高宜人性（A4: 绝对信任/价值兼容）。荣格八维：内倾直觉（Ni）的终极释怀与和解。弗洛伊德防御机制：合理化（Rationalization）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 90, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_q",
    name: "身体的圣殿 (The Temple of the Body)",
    description: "身体意象、生理健康与自我接纳场景。在镜中审判的容貌焦虑、基因枷锁的慢性限制、以及科技重塑与自然和解之间进行多维博弈，解构你的情绪稳定性、开放度与躯体化防御机制。",
    category: "lifestyle",
    stages: [
      {
        id: "sc_q_st1",
        title: "第一阶段：镜中的审判",
        situation: "你发现自己由于长期的压力和代谢下降，体重增加、皮肤暗淡，甚至开始脱发。社交媒体上铺天盖地的“完美身材”和“抗衰神话”不断向你施压，身边的朋友也纷纷开始尝试极端的节食、抽脂或频繁的医美注射。你在镜子前感到了深深的容貌焦虑与自我厌恶。",
        question: "面对镜中的审判与社会审美压力，你的第一反应是：",
        options: [
          {
            id: "a",
            text: "「敏感防御防线」：陷入极度的焦虑与强迫性控制。立刻制定严苛的节食计划，每天频繁称体重，甚至预约高风险的医美手术。认为“在这个看脸的社会，外貌的失控代表着人生的彻底失败，我必须不惜代价夺回控制权”。",
            analysis: "大五人格：高神经质（N1: 焦虑、N6: 脆弱性）。荣格八维：劣势感觉（Si）在压力下的病态爆发。弗洛伊德防御机制：躯体化（Somatization）/向内投射。",
            scoring: {
              bigFive: { dimension: "N", facet: "N1", value: 90, isReversed: false },
              enneagram: { type: 6, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「自控隔离防线」：平静接受。认为“外貌只是基因和年龄的自然表达，任何违背生理规律的极端手段都是愚蠢的”。立刻调整作息，制定科学的营养膳食与力量训练计划，将身体视为一台需要精密维护的生物机器，有条不紊地进行健康管理。",
            analysis: "大五人格：低神经质（N5: 自控隔离）、高尽责性（C5: 契约守护）。荣格八维：外倾思考（Te）与内倾感觉（Si）的理性结合。弗洛伊德防御机制：理智化（Intellectualization）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「思想深潜防线」：不焦虑也不抗拒。将身体的变化视为生命年轮的自然美学。开始阅读哲学、艺术史，认为“真正的美在于灵魂的丰盈与生命的厚度，肉体的衰退是精神觉醒的催化剂”。在慢节奏中寻找身体的自然和解。",
            analysis: "大五人格：高开放度（O6: 价值观/哲学思辨）、低神经质（N3: 逆境耐受）。荣格八维：内倾直觉（Ni）的宏观意义赋予。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O6", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_q_st2",
        title: "第二阶段：基因的枷锁",
        situation: "你在一份基因检测报告中，意外发现自己携带了某种无法治愈、且在中老年时期有极高概率爆发的遗传性慢性疾病基因（如阿尔茨海默症或帕金森症）。这无异于一份命运的“缓期执行判决书”，彻底打乱了你对未来的所有美好规划。",
        question: "面对基因的枷锁与未知的命运判决，你倾向于：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：立刻调整人生规划。将未来的财务、保险和生活方式完全调整为“抗风险模式”，甚至决定终身不婚不育，以免将基因遗传给下一代。认为“在确定性的风险面前，任何感性的侥幸都是对生命的不负责任”。",
            analysis: "大五人格：高尽责性（C6: 决策审慎/风险规避）。荣格八维：内倾感觉（Si）的保守防御。弗洛伊德防御机制：合理化（Rationalization）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C6", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「冒险破界防线」：拒绝被基因定义。继续保持高强度的生活和工作节奏，甚至更加激进地去体验世界、享受当下，认为“既然生命长度受限，那我就必须在有限的时间里无限拓宽生命的宽度，燃尽每一分热量”。",
            analysis: "大五人格：高开放度（O4: 经验多样/冒险破界）、高外倾性（E4: 刺激寻求）。荣格八维：外倾感觉（Se）与外倾直觉（Ne）的极限释放。弗洛伊德防御机制：躁狂防御（Manic Defense）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 90, isReversed: false },
              enneagram: { type: 7, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「悲情升华防线」：陷入深深的宿命感与悲凉中。开始频繁撰写日记，记录自己肉体与精神的微小变化，试图在文字中固化自己即将消逝的意识，将这场命运的悲剧转化为一部极具精神厚度的个人史诗。",
            analysis: "大五人格：高开放度（O2: 审美偏好/艺术直觉）、高神经质（N3: 抑郁）。荣格八维：内倾情感（Fi）的悲情升华。弗洛伊德防御机制：升华/向内投射。",
            scoring: {
              bigFive: { dimension: "O", facet: "O2", value: 90, isReversed: false },
              enneagram: { type: 4, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_q_st3",
        title: "第三阶段：最后的和解",
        situation: "随着年龄增长，你的身体机能不可避免地走向衰退。此时，一项前沿的“硅基重塑/脑机接口”技术成熟，允许你通过手术将部分大脑和肉体进行机械化、数字化重塑，彻底消除衰老和疾病，获得近乎无限的生命，但这会让你失去纯粹的碳基生理体验与人类的自然边界。",
        question: "面对科技重塑与自然死亡的终极抉择，你决定：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：坚决拒绝科技重塑。选择顺应自然规律，平静地面对衰老与死亡。声明“死亡是生命最神圣的边界，没有死亡的生命只是无尽的机械重复。我选择作为完整的人类死去，而不是作为永生的机器活着”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/责任驱动）、低宜人性（A2: 自我宣示）。荣格八维：内倾感觉（Si）与内倾情感（Fi）的绝对自律。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「优秀形象粉饰」：毫不犹豫地接受重塑。认为“科技是人类进化的延伸，肉体只是落后的硬件。通过硅基重塑获得永恒的生命与无限的智力，才是人类文明走向星辰大海的终极胜利”。",
            analysis: "大五人格：高外倾性（E2: 展现度/光环偏好）、高开放度（O5: 智性求知）。荣格八维：外倾思考（Te）与外倾直觉（Ne）的极限爆发。弗洛伊德防御机制：补偿（Compensation）。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 90, isReversed: false },
              enneagram: { type: 3, instinct: "SO" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「价值兼容防线」：平静接受死亡，但选择将自己的毕生记忆与意识进行数字化备份，作为一个开源的“数字幽灵”留存在网络绿洲中，供后人检索和对话，自己则坦然面对肉体的消亡。",
            analysis: "大五人格：高宜人性（A4: 绝对信任/价值兼容）、高开放度（O6: 价值观）。荣格八维：内倾直觉（Ni）的终极释怀与和解。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 90, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_r",
    name: "绿色的契约 (The Green Covenant)",
    description: "环境伦理、自然联结与现代生活方式场景。在钢筋水泥的窒息、消费的血汗、以及荒野的呼唤之间进行多维博弈，解构你的开放度、宜人性与生态防御机制。",
    category: "creative",
    stages: [
      {
        id: "sc_r_st1",
        title: "第一阶段：钢筋水泥的窒息",
        situation: "你身处繁华、高科技、但极度压抑的现代大都市中，每天经历着996的机械工作与无处不在的数字监控。在一次深夜加班后，你站在高楼窗前，看着霓虹闪烁的钢铁森林，突然感到一种强烈的、无法遏制的窒息感，内心深处涌起对泥土、森林和星空的疯狂渴望。",
        question: "面对都市生活的窒息感与自然的呼唤，你的第一反应是：",
        options: [
          {
            id: "a",
            text: "「悲情升华防线」：沉溺于这种窒息感。在公寓里摆满各种热带雨林植物，播放森林白噪音，将自己的房间打造成一个微缩的“生态孤岛”。在文字和摄影中高傲地审视都市的荒诞，与世俗保持距离。",
            analysis: "大五人格：高开放度（O2: 审美偏好/艺术直觉）、高神经质（N3: 抑郁）。荣格八维：内倾情感（Fi）的消极自足。弗洛伊德防御机制：悲情升华/隔离。",
            scoring: {
              bigFive: { dimension: "O", facet: "O2", value: 95, isReversed: false },
              enneagram: { type: 4, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「自控隔离防线」：强行压制这种渴望。认为“都市是效率和文明的巅峰，自然的渴望只是肉体疲劳的幻觉”。立刻预约一次高档的SPA和心理咨询，制定严格的睡眠与解压SOP，继续回到岗位高效运转。",
            analysis: "大五人格：低神经质（N5: 自控隔离）、高尽责性（C5: 契约守护）。荣格八维：外倾思考（Te）与内倾感觉（Si）的理性结合。弗洛伊德防御机制：理智化（Intellectualization）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「冒险破界防线」：立刻出发。周末带上极简的露营装备，独自一人深入没有信号的原始森林徒步，在暴雨和泥泞中重新感受肉体与大地的摩擦，认为“只有在荒野中，我才能找回我作为哺乳动物的真实灵魂”。",
            analysis: "大五人格：高开放度（O4: 经验多样/冒险破界）、高外倾性（E4: 刺激寻求）。荣格八维：外倾感觉（Se）的即时释放。弗洛伊德防御机制：躁狂防御（Manic Defense）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 90, isReversed: false },
              enneagram: { type: 7, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_r_st2",
        title: "第二阶段：消费的血汗",
        situation: "你无意中发现你最喜爱、每天都在使用的一款极具设计感、且标榜“绿色环保”的轻奢品牌产品，其底层供应链实际上存在严重的跨国环境污染（在第三世界国家倾倒有毒废水）与童工剥削行为。而该品牌是你社交圈子里彰显品味的核心符号。",
        question: "面对消费的血汗与社交符号的冲突，你选择：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：坚决抵制并公开揭露。立刻扔掉该产品，在社交媒体上发表详实的供应链调查报告，呼吁所有人联合抵制，哪怕这会让你的时尚圈朋友视你为“不合群的杠精”。声明“消费的选择就是道德的选择，我绝不为血汗和污染买单”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）、高宜人性（A3: 极端诚实）。荣格八维：内倾思考（Ti）与内倾情感（Fi）的绝对道德自律。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「利益变通防线」：保持沉默，继续使用。认为“在全球化的资本主义体系中，没有任何一件商品是绝对干净的。抵制一个品牌毫无意义，只会降低我自己的生活品质和社交便利”。",
            analysis: "大五人格：低宜人性（A3: 利益变通/道德操守反向）。荣格八维：外倾思考（Te）的功利主义计算。弗洛伊德防御机制：合理化（Rationalization）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A3", value: 15, isReversed: true },
              enneagram: { type: 3, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：不再购买该品牌，但也不公开对抗。私下里寻找真正通过了国际公平贸易认证（Fair Trade）的独立设计师品牌作为替代，并在朋友圈温和地科普“可持续时尚”的概念，用建设性的方式推动改变。",
            analysis: "大五人格：高宜人性（A1: 同理与协作/共情妥协）。荣格八维：外倾情感（Fe）的圆融协调。弗洛伊德防御机制：妥协/升华。",
            scoring: {
              bigFive: { dimension: "A", facet: "A1", value: 90, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_r_st3",
        title: "第三阶段：荒野的呼唤",
        situation: "你面临人生下半场的终极抉择：是留在那个高效率、高收入、但彻底与自然割裂的都市大厂，继续做一颗精致的齿轮；还是卖掉都市的房产，去大理或清迈的乡村买下一块荒地，建立一个自给自足、零碳排放的生态农场，彻底回归土地？",
        question: "面对“荒野的呼唤”与都市繁华的终极抉择，你决定：",
        options: [
          {
            id: "a",
            text: "「秩序合规防线」：选择留在都市。认为“现代文明的本质在于分工与效率，乡村的田园牧歌只是一种退行性的幻觉。我应当在都市中积累财富，通过投资环保基金或购买碳信用来履行我的生态责任”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）。荣格八维：外倾思考（Te）与内倾感觉（Si）的结合。弗洛伊德防御机制：合理化。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「冒险破界防线」：选择奔向荒野。卖掉房产，彻底断开与都市的联结，去乡村建立生态农场。声明“没有泥土滋养的生命是虚妄的，我选择用我的双手亲自劳作，与万物建立真实的、绿色的契约，哪怕生活艰苦”。",
            analysis: "大五人格：高开放度（O4: 经验多样/冒险破界）、高宜人性（A2: 利他性）。荣格八维：内倾情感（Fi）与外倾感觉（Se）的极限融合。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 95, isReversed: false },
              enneagram: { type: 7, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：选择“半都市半乡村”的折中生活。在大厂继续工作，但租下郊区的一块周末农田，每周带家人去耕作。用这种“微缩版自然”来强行兼顾世俗责任与生态渴望。",
            analysis: "大五人格：高宜人性（A6: 共情妥协）、高尽责性（C5: 责任驱动）。荣格八维：外倾情感（Fe）与外倾思考（Te）的协调。弗洛伊德防御机制：妥协/隔离。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_s",
    name: "历史的尘埃 (The Dust of History)",
    description: "集体危机、地缘动荡与历史命运场景。在动荡序曲的恐慌、难民抉择的逃亡、以及记忆守护的叙事之间进行多维博弈，解构你的情绪稳定性、宜人性与集体防御机制。",
    category: "stress",
    stages: [
      {
        id: "sc_s_st1",
        title: "第一阶段：动荡的序曲",
        situation: "你所在的城市突然爆发了严重的、不可逆转的地缘政治动荡或公共卫生危机。超市被抢购一空，银行限制提现，街头充满了荷枪实弹的巡逻队。你赖以生存的社会秩序在瞬间瓦解，恐慌的情绪像瘟疫一样在人群中蔓延。",
        question: "面对集体秩序的瞬间瓦解，你的第一反应是：",
        options: [
          {
            id: "a",
            text: "「敏感防御防线」：陷入极度的恐慌与无助。立刻囤积大量食物和武器，锁死房门，对任何敲门声都极度敏感。每天频繁刷新新闻，陷入无休止的焦虑与绝望中，认为“世界末日到了，没有任何人能活下去”。",
            analysis: "大五人格：高神经质（N1: 焦虑、N6: 脆弱性）。荣格八维：劣势功能在压力下的彻底瘫痪。弗洛伊德防御机制：退行（Regression）/躯体化。",
            scoring: {
              bigFive: { dimension: "N", facet: "N1", value: 90, isReversed: false },
              enneagram: { type: 6, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「自控隔离防线」：大脑进入绝对的冷静状态。立刻清点手头的现金、药品和护照，绘制三条不同的撤退路线，制定严格的生存与避险SOP。不投入任何情绪，将危机视为一场纯粹的物理生存通关游戏。",
            analysis: "大五人格：低神经质（N5: 自控隔离）、高尽责性（C5: 契约守护）。荣格八维：外倾思考（Te）与内倾感觉（Si）的理性结合。弗洛伊德防御机制：情感隔离（Isolation of Affect）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「共情协作防线」：强行压制恐慌。立刻加入社区的自发互助组织，利用自己的专业技能（如医疗、IT或组织协调）协助分发物资、安抚邻里，声明“在集体的灾难面前，孤立的生存只是等死，唯有彼此联结、共同守望，才是人类走出黑暗的唯一路径”。",
            analysis: "大五人格：高宜人性（A1: 同理与协作/利他性）、高外倾性（E2: 支配度）。荣格八维：外倾情感（Fe）的极限爆发。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A1", value: 90, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_s_st2",
        title: "第二阶段：难民的抉择",
        situation: "动荡升级，你获得了最后一张撤离本国的机票，可以带家人逃往安全的海外发达国家，但这需要你彻底放弃你在母国积累的所有资产、社会地位和职业根基，在异乡作为一名一无所有的“难民”重新开始。而如果你选择留下，你必须与同胞一起承受战火或危机的洗礼。",
        question: "面对逃亡异乡与坚守母国的终极抉择，你决定：",
        options: [
          {
            id: "a",
            text: "「秩序合规防线」：选择撤离。认为“个人的生命安全和家庭的延续是至高无上的。在毁灭性的历史洪流面前，无谓的坚守只是愚蠢的殉道。我必须保留火种，在异乡重建生活”。",
            analysis: "大五人格：高尽责性（C6: 决策审慎/风险规避）。荣格八维：外倾思考（Te）与内倾感觉（Si）的理性结合。弗洛伊德防御机制：合理化（Rationalization）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C6", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「情感代偿防线」：选择留下。撕毁机票，将机会让给更需要的人。选择留在母国，加入志愿救援队或建设队伍，声明“我的根在这里，我的同胞在这里。在最黑暗的时刻抛弃家园，会让我一生背负‘逃兵’的耻辱。我选择与我的土地共存亡”。",
            analysis: "大五人格：高宜人性（A2: 利他性/自我牺牲）。荣格八维：内倾情感（Fi）与外倾情感（Fe）的极限共鸣。弗洛伊德防御机制：过度代偿/自我牺牲。",
            scoring: {
              bigFive: { dimension: "A", facet: "A2", value: 95, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「冒险破界防线」：选择撤离，但拒绝做安稳的难民。在海外安全区建立一个国际人道主义援助组织，利用自己的全球资源向母国输送药品、资金和舆论支持，用这种“跨国博弈”的方式参与坚守。",
            analysis: "大五人格：高开放度（O4: 经验多样/冒险破界）、高外倾性（E2: 支配度）。荣格八维：外倾直觉（Ne）与外倾思考（Te）的结合。弗洛伊德防御机制：升华。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 90, isReversed: false },
              enneagram: { type: 7, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_s_st3",
        title: "第三阶段：记忆的守护",
        situation: "动荡在十年后终于平息，社会进入了重建期。官方为了促进社会和解与经济重建，极力呼吁“向前看，忘记过去的伤痛与仇恨”。而你手头保留了一份详实的、记录了当年灾难中无数普通人悲惨遭遇与体制失职的私人日记与影像档案。如果公开，会重新撕开社会的伤疤，甚至面临二次清算；如果销毁，历史将彻底被抹平。",
        question: "面对历史记忆的守护与现实和解的冲突，你决定：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：坚决公开。将档案无条件捐赠给国际历史档案馆，并在网络上公开发表。声明“没有真相的和解只是虚伪的妥协。遗忘历史是对逝者最彻底的背叛，人类必须直面血淋淋的真相，才能避免悲剧重演”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）、高宜人性（A3: 极端诚实）。荣格八维：内倾思考（Ti）与内倾情感（Fi）的绝对道德自律。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「共情妥协防线」：选择销毁或无限期尘封。认为“死者已矣，生者如斯。在满目疮痍的废墟上，活人的面包和安宁远比死人的真相重要。如果撕开伤疤只会带来新的仇恨和动荡，我宁可让这些记忆随我一起归于尘土”。",
            analysis: "大五人格：高宜人性（A6: 共情妥协/利他性）。荣格八维：外倾情感（Fe）的防御性妥协。弗洛伊德防御机制：压抑（Repression）/合理化。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 90, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「思想深潜防线」：不公开也不销毁。将这些档案进行严密的加密备份，藏在画室或图书馆的夹层中，只留给未来的历史学家去偶然发现。自己则撰写一部高度隐喻的、虚构的文学作品，用艺术的方式将真相“走私”给未来。",
            analysis: "大五人格：高开放度（O2: 审美偏好/艺术直觉）。荣格八维：内倾直觉（Ni）的宏观模式识别。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O2", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_t",
    name: "命运的轮盘 (The Wheel of Fortune)",
    description: "运气、风险偏好与投机心理场景。在筹码诱惑的投机狂热、庄家陷阱的爆仓危机、以及最后筹码的废墟重建之间进行多维博弈，解构你的尽责性、情绪稳定性与躁狂防御机制。",
    category: "finance",
    stages: [
      {
        id: "sc_t_st1",
        title: "第一阶段：筹码的诱惑",
        situation: "你手头有一笔原本准备用来买房或给父母养老的闲置资金。此时，一个极具煽动性的前沿投机项目（如某种新型加密货币或高杠杆衍生品交易）席卷了你的社交圈。身边的朋友纷纷通过该项目实现了资产翻倍，甚至有人一夜暴富。项目方不断暗示你：“这是时代给普通人唯一的阶层跃迁机会，错过将终身遗憾。”",
        question: "面对暴富的诱惑与高风险投机，你倾向于：",
        options: [
          {
            id: "a",
            text: "「秩序合规防线」：坚决拒绝。将资金继续留在低风险的定期存款或国债中。声明“任何超出常识的超额收益，底层都是毁灭性的庞氏骗局。我宁可忍受资产的缓慢贬值，也绝不拿父母的养老钱去赌博”。",
            analysis: "大五人格：高尽责性（C6: 决策审慎/风险规避）。荣格八维：内倾感觉（Si）的保守防御。弗洛伊德防御机制：压抑（Repression）/合理化。",
            scoring: {
              bigFive: { dimension: "C", facet: "C6", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「冒险破界防线」：全仓杀入。将全部资金甚至通过信用卡套现，投入到该项目中，认为“富贵险中求，阶层的跃迁本就是一场高风险的豪赌。如果一辈子循规蹈矩，我注定只能被时代抛弃”。",
            analysis: "大五人格：高开放度（O4: 经验多样/冒险破界）、高外倾性（E4: 刺激寻求）。荣格八维：外倾感觉（Se）的即时投机。弗洛伊德防御机制：躁狂防御（Manic Defense）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 90, isReversed: false },
              enneagram: { type: 7, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「自控隔离防线」：理性参与。只拿出总资产的 10% 作为“娱乐资金”参与，同时制定严格的止损与止盈SOP，绝不追加任何本金。用严密的数学模型和概率学视角来审视这场博弈，保持内心的超然。",
            analysis: "大五人格：低神经质（N5: 自控隔离）、高尽责性（C5: 契约守护）。荣格八维：内倾思考（Ti）与外倾思考（Te）的理性结合。弗洛伊德防御机制：理智化（Intellectualization）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 85, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_t_st2",
        title: "第二阶段：庄家的陷阱",
        situation: "你参与的项目突然遭遇了无预警的“黑天鹅事件”（如项目方跑路或市场恶意做空），你的资产在瞬间蒸发了 80%。此时，项目群里的大佬不断号召大家“抄底、加仓摊薄成本，庄家正在恶意洗盘，坚持就是胜利”。你面临着割肉离场还是追加本金孤注一掷的生死抉择。",
        question: "面对爆仓危机与追加本金的诱惑，你选择：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：立刻割肉离场。承认自己的失败，拉黑所有投机群，绝不追加一分钱本金。声明“认赌服输，及时止损是生存的底线。任何试图通过加仓来挽回损失的行为，都是被赌徒谬误支配的慢性自杀”。",
            analysis: "大五人格：高尽责性（C6: 决策审慎/风险规避）。荣格八维：外倾思考（Te）的理性决策。弗洛伊德防御机制：合理化（Rationalization）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C6", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「自我宣示防线」：追加全部身家进行终极抄底。认为“市场已经跌无可跌，这正是千载难逢的黄金坑。我要么在这次抄底中彻底翻盘，要么就轰烈战死，我绝不接受割肉离场的屈辱”。",
            analysis: "大五人格：高外倾性（E2: 支配度）、低宜人性（A2: 自我宣示反向）。荣格八维：外倾感觉（Se）的强力博弈。弗洛伊德防御机制：向攻击者认同/躁狂防御。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 90, isReversed: false },
              enneagram: { type: 8, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「敏感防御防线」：陷入极度的恐慌、内疚与瘫痪状态。无法接受资产蒸发的事实，既不敢割肉，也不敢加仓。每天不眠不休地盯着K线图，频繁在群里哀求、抱怨，对任何风吹草动都极度敏感，精神濒临崩溃。",
            analysis: "大五人格：高神经质（N1: 焦虑、N6: 脆弱性）。荣格八维：劣势功能在压力下的彻底瘫痪。弗洛伊德防御机制：退行（Regression）/躯体化。",
            scoring: {
              bigFive: { dimension: "N", facet: "N1", value: 90, isReversed: false },
              enneagram: { type: 6, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_t_st3",
        title: "第三阶段：最后的筹码",
        situation: "最坏的结果发生了，你追加的本金全部爆仓，你彻底失去了所有的积蓄，并背负了沉重的债务。你站在天台前，冷风吹醒了你。此时，你必须做出决定，如何面对接下来的废墟人生。",
        question: "面对彻底的财务毁灭，你决定：",
        options: [
          {
            id: "a",
            text: "「完美执念防线」：选择向法院申请个人破产，并向家人坦白一切。找一份最辛苦、最机械的体力劳动，制定长达十年的还债计划，用脚踏实地的汗水来赎罪。声明“这是我贪婪的代价，我必须用我的余生去履行我的契约和责任”。",
            analysis: "大五人格：高尽责性（C5: 完美执念/责任驱动）。荣格八维：内倾感觉（Si）与外倾思考（Te）的结合。弗洛伊德防御机制：超我主导/向内投射。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「思想深潜防线」：平静接受毁灭。将这次破产视为一次“灵魂的彻底洗礼”。开始阅读哲学、宗教，认为“金钱只是世俗的枷锁，破产让我彻底摆脱了消费主义的奴役。我将在极简的生活中，寻找精神的终极自由”。",
            analysis: "大五人格：高开放度（O6: 价值观/哲学思辨）、低神经质（N3: 逆境耐受）。荣格八维：内倾直觉（Ni）的宏观意义赋予。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O6", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：感到深深的内疚，但极力在家人面前掩盖真相。私下里向亲戚朋友借钱，拆东墙补西墙，试图维持一个“我依然过得很好”的虚假外壳，在无尽的谎言与焦虑中苦苦挣扎，试图寻找温和的软着陆机会。",
            analysis: "大五人格：高宜人性（A6: 共情妥协）、高神经质（N4: 自我意识）。荣格八维：外倾情感（Fe）的防御性掩盖。弗洛伊德防御机制：否认（Denial）/反向形成。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_u",
    name: "历史的旁观者 (The Spectator of History)",
    description: "媒体消费、舆论狂热与真理坚守场景。在信息洪流的偏听偏信、沉默螺旋的群体排他、以及记忆篡改的数字抹平之间进行多维博弈，解构你的开放度、宜人性与智性防御机制。",
    category: "creative",
    stages: [
      {
        id: "sc_u_st1",
        title: "第一阶段：信息的洪流",
        situation: "一起轰动全国的公共事件爆发。主流媒体、官方通报与独立调查记者给出了完全相反、甚至逻辑冲突的叙事版本。网络上充满了极具煽动性的情绪小作文与断章取义的视频片段，网民们纷纷站队，对任何持中立态度的人进行疯狂的网暴和驱逐。",
        question: "面对信息的洪流与群体狂热，你的第一反应是：",
        options: [
          {
            id: "a",
            text: "「智性求知防线」：保持绝对的怀疑。拒绝相信任何单一叙事，利用科学的检索工具，去追溯事件的原始信源、对比不同版本的逻辑漏洞，撰写详实的对比分析报告。声明“在真相大白前，任何感性的站队都是对智商的侮辱”。",
            analysis: "大五人格：高开放度（O5: 智性求知/概念思辨）、低神经质（N5: 自控隔离）。荣格八维：内倾思考（Ti）的智性洁癖。弗洛伊德防御机制：理智化（Intellectualization）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O5", value: 95, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「共情妥协防线」：感到深深的同情与愤怒。选择相信受害者和弱势群体的叙事，积极转发并参与声援，认为“在庞大的权力机器面前，弱者的眼泪就是唯一的真相。如果在这个时候还要保持冷冰冰的理性，那就是缺乏基本的人性”。",
            analysis: "大五人格：高宜人性（A1: 同理与协作/共情妥协）。荣格八维：外倾情感（Fe）与内倾情感（Fi）的极限共鸣。弗洛伊德防御机制：过度代偿/自我牺牲。",
            scoring: {
              bigFive: { dimension: "A", facet: "A1", value: 90, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「利益变通防线」：不关心真相，只关心流量。利用自己的自媒体账号，迅速撰写两篇观点完全相反、但极具情绪煽动性的标题党文章，同时向两派网民分发，收割海量流量与广告分成，认为“舆论本就是一场戏，聪明人只在台下收门票”。",
            analysis: "大五人格：低宜人性（A3: 利益变通/道德操守反向）、高外倾性（E2: 展现度）。荣格八维：外倾思考（Te）与外倾直觉（Ne）的商业化包装。弗洛伊德防御机制：补偿/合理化。",
            scoring: {
              bigFive: { dimension: "A", facet: "A3", value: 15, isReversed: true },
              enneagram: { type: 3, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_u_st2",
        title: "第二阶段：沉默的螺旋",
        situation: "你通过严密的逻辑推理和一手证据，发现你所在行业的一个“明星企业”或“行业领袖”存在严重的欺诈行为。然而，该领袖在行业内拥有绝对的话语权，且深受网民和投资人的追捧。如果你公开揭露，你将被整个行业彻底封杀，甚至面临诽谤起诉；如果你保持沉默，无数普通消费者将继续被蒙蔽。",
        question: "面对沉默的螺旋与职业前途的冲突，你选择：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：坚决公开揭露。搜集完整证据链，直接向监管部门和主流媒体实名举报，做好被行业封杀和起诉的准备。声明“真理和事实不容妥协，我绝不为了个人的前途，向一个合法的骗局低头”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）、高宜人性（A3: 极端诚实）。荣格八维：内倾思考（Ti）与内倾情感（Fi）的绝对道德自律。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「利益变通防线」：保持沉默，甚至主动向该领袖示好。认为“在庞大的利益共同体面前，个人的反抗只是自寻死路。识时务者为俊杰，融入这个体系，拿到我应得的利益，才是最理性的选择”。",
            analysis: "大五人格：低宜人性（A3: 利益变通/道德操守反向）。荣格八维：外倾思考（Te）的功利主义计算。弗洛伊德防御机制：合理化/认同。",
            scoring: {
              bigFive: { dimension: "A", facet: "A3", value: 15, isReversed: true },
              enneagram: { type: 3, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：不公开举报，但暗中保护弱者。私下里向几位关系要好的朋友和消费者发出预警，劝阻他们购买该企业的产品，同时在自己的岗位上尽力减少欺诈行为的波及范围，用局部的妥协换取良心的安宁。",
            analysis: "大五人格：高宜人性（A1: 同理与协作/共情妥协）。荣格八维：外倾情感（Fe）的圆融协调。弗洛伊德防御机制：妥协/隔离。",
            scoring: {
              bigFive: { dimension: "A", facet: "A1", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_u_st3",
        title: "第三阶段：记忆的篡改",
        situation: "你发现互联网上关于某段你曾亲身经历、且对你人生轨迹产生决定性影响的历史事件（如一次重大的社会运动或行业变革）的数字记录，正在被算法和官方系统性地篡改、抹平或彻底删除。曾经的英雄被定义为叛徒，曾经的灾难被包装成胜利。历史正在变成一张可以随意涂抹的白纸。",
        question: "面对数字记忆的系统性篡改，你决定：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：成为记忆的守护者。将自己保留的一手照片、日记和录音进行物理备份（打印成纸质书、刻录成光盘），藏在安全的物理空间中，并暗中向下一代口述历史。声明“只要还有一个人的记忆没有被抹平，真相就依然活着”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/责任驱动）、高开放度（O6: 价值观）。荣格八维：内倾感觉（Si）与内倾思考（Ti）的绝对坚守。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「悲情升华防线」：平静接受篡改，但选择将其写成一部高度隐喻的、虚构的科幻小说。在文字中高傲地审视这种“记忆抹平”的荒诞，将真相“走私”给未来的有缘人，自己则退缩到艺术的精神世界中。",
            analysis: "大五人格：高开放度（O2: 审美偏好/艺术直觉）。荣格八维：内倾直觉（Ni）与内倾情感（Fi）的极限融合。弗洛伊德防御机制：升华（Sublimation）/隔离。",
            scoring: {
              bigFive: { dimension: "O", facet: "O2", value: 90, isReversed: false },
              enneagram: { type: 4, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「价值兼容防线」：选择遗忘。主动销毁自己手头的所有记录，说服自己“历史本就是胜利者书写的神话，纠结于过去的真相毫无意义。顺应时代的叙事，活在当下，才是最轻松的生存法则”。",
            analysis: "大五人格：高宜人性（A4: 绝对信任/价值兼容）。荣格八维：外倾情感（Fe）的防御性遗忘。弗洛伊德防御机制：否认（Denial）/合理化。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_v",
    name: "机械的牢笼 (The Cage of the Machine)",
    description: "算法异化、劳动异化与人类尊严场景。在算法监工的极限压榨、淘汰边缘的技能失效、以及最后尊严的破坏反抗之间进行多维博弈，解构你的尽责性、外倾性与尊严防御机制。",
    category: "tech",
    stages: [
      {
        id: "sc_v_st1",
        title: "第一阶段：算法的监工",
        situation: "你入职了一家标榜“极致效率”的科技大厂。入职后你发现，你的每一个工作动作、键盘敲击频次、甚至上厕所的时间，都被一套严密的 AI 算法监工实时监控和打分。算法不断向你推送“优化建议”，逼迫你挑战生理极限以换取高绩效。你感到自己彻底沦为了一个“会说话的齿轮”。",
        question: "面对算法监工的极限压榨，你的第一反应是：",
        options: [
          {
            id: "a",
            text: "「完美执念防线」：全力迎合算法。将算法的指标视为自己的终极挑战，每天严格按照算法推荐的“最优路径”工作，不眠不休地刷高绩效。认为“在效率至上的时代，被算法压榨证明了我的胜任力，我必须成为最完美的齿轮”。",
            analysis: "大五人格：高尽责性（C5: 完美执念/成就动机）。荣格八维：外倾思考（Te）与内倾感觉（Si）的强迫性推进。弗洛伊德防御机制：向攻击者认同/压抑。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「自控隔离防线」：保持绝对的工具理性。在工作中完美卡点，用技术手段（如编写自动化脚本或模拟键盘点击）来欺骗算法监工，下班后立刻切断一切工作联结。不投入任何真实情感，将工作视为纯粹的“人机博弈”。",
            analysis: "大五人格：低神经质（N5: 自控隔离）、高开放度（O5: 智性求知）。荣格八维：内倾思考（Ti）的智性博弈。弗洛伊德防御机制：情感隔离（Isolation of Affect）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O5", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「共情协作防线」：感到深深的愤怒与屈辱。暗中联合身边的同事，建立一个私密的“反算法联盟”，大家约定集体放慢工作节奏、统一上厕所时间，用集体的“消极怠工”来对抗算法的压榨，守护人类的基本尊严。",
            analysis: "大五人格：高宜人性（A1: 同理与协作）、高外倾性（E2: 支配度）。荣格八维：外倾情感（Fe）的集体协作。弗洛伊德防御机制：被动攻击（Passive Aggression）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A1", value: 90, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_v_st2",
        title: "第二阶段：淘汰的边缘",
        situation: "公司引入了一款全新的、极具毁灭性的 AI 大模型，能够以 1% 的成本完美替代你和你的团队 90% 的专业工作。董事长明确告知你：“下个月起，你的团队将缩减 80%，剩下的人必须转型为‘AI数据标注员’（即给AI喂数据的廉价劳动力）。”你面临着职业技能彻底失效与尊严贬值的危机。",
        question: "面对技能失效与尊严贬值的边缘，你选择：",
        options: [
          {
            id: "a",
            text: "「利益变通防线」：立刻转型，成为第一批“AI训练师”。主动向管理层献策，协助裁撤自己的团队，用最快的速度掌握如何管理和优化这款 AI 模型。认为“技术淘汰人类是历史的必然，与其被淘汰，不如成为挥舞皮鞭的监工”。",
            analysis: "大五人格：低宜人性（A3: 利益变通/道德操守反向）、高外倾性（E2: 支配度）。荣格八维：外倾思考（Te）的功利主义决策。弗洛伊德防御机制：向攻击者认同（Identification with the Aggressor）。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 90, isReversed: false },
              enneagram: { type: 3, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「绝对合规防线」：坚决拒绝做廉价劳动力。递交辞职信，选择离开大厂，去寻找那些依然强调“纯手工、人类温度与匠人精神”的小众行业重新开始，哪怕收入减半。声明“我的才华和尊严不容贬值，我绝不成为喂养机器的饲料”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/责任驱动）、高开放度（O2: 审美偏好）。荣格八维：内倾情感（Fi）与内倾思考（Ti）的绝对自律。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「思想深潜防线」：平静接受。接受降薪和转型，但将这视为一次“近距离观察硅基生命异化人类社会”的绝佳田野调查契机。利用业余时间撰写一部关于“人机共生与劳动消亡”的哲学著作，保持内心的超然与同情。",
            analysis: "大五人格：高开放度（O5: 概念思辨/思想深潜）、低神经质（N3: 逆境耐受）。荣格八维：内倾直觉（Ni）的宏观模式识别。弗洛伊德防御机制：理智化（Intellectualization）/升华。",
            scoring: {
              bigFive: { dimension: "O", facet: "O5", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_v_st3",
        title: "第三阶段：最后的尊严",
        situation: "在离职前夕，你无意中获得了该 AI 模型的底层核心漏洞代码。只要你将这段代码上传到开源社区，就能彻底瘫痪公司的自动化系统，帮即将被裁撤的数百名同事争取到至少半年的谈判缓冲期，但你也将面临刑事起诉的巨大风险；如果你保持沉默，你将拿到一笔丰厚的“保密遣散费”悄然离去。",
        question: "面对最后的尊严与刑事风险的冲突，你决定：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：坚守法律底线，拿钱离去。拒绝上传代码，认为“违法犯罪是不可逾越的红线。瘫痪系统并不能阻止技术进步的洪流，只会让我自己沦为阶下囚。我必须对自己的安全和家庭负责”。",
            analysis: "大五人格：高尽责性（C6: 决策审慎/风险规避）。荣格八维：外倾思考（Te）与内倾感觉（Si）的理性决策。弗洛伊德防御机制：合理化（Rationalization）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C6", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「极端诚实防线」：成为卢德主义的反抗者。将漏洞代码匿名上传到开源社区，瘫痪系统，为同事争取时间，做好承担一切法律后果的准备。声明“当机器开始剥夺人类的生存权时，反抗就是唯一的尊严。我宁可坐牢，也绝不向冰冷的算法低头”。",
            analysis: "大五人格：高宜人性（A3: 极端诚实/道德铁律）、高尽责性（C5: 责任驱动）。荣格八维：内倾情感（Fi）与内倾思考（Ti）的绝对道德自律。弗洛伊德防御机制：超我主导/自我牺牲。",
            scoring: {
              bigFive: { dimension: "A", facet: "A3", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SX" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：不瘫痪系统，但进行技术性勒索。利用该漏洞作为筹码，在私下里与董事长进行谈判，逼迫其将全体被裁员工的遣散费标准提高一倍，并延长三个月的社保缴纳期，以此换取你交出漏洞并悄然离去。",
            analysis: "大五人格：低宜人性（A3: 利益变通）、高外倾性（E2: 支配度）。荣格八维：外倾思考（Te）与外倾直觉（Ne）的实用主义博弈。弗洛伊德防御机制：合理化/妥协。",
            scoring: {
              bigFive: { dimension: "A", facet: "A3", value: 15, isReversed: true },
              enneagram: { type: 3, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_w",
    name: "记忆的迷宫 (The Labyrinth of Memory)",
    description: "怀旧、遗憾与过去和解场景。在旧物引力的怀旧伤感、遗憾重逢的恩怨纠葛、以及记忆剪影的断舍离之间进行多维博弈，解构你的情绪稳定性、宜人性与退行防御机制。",
    category: "lifestyle",
    stages: [
      {
        id: "sc_w_st1",
        title: "第一阶段：旧物的引力",
        situation: "你在搬家整理旧物时，意外发现了一个尘封多年的铁盒。里面装满了你与曾经深爱、但因年轻气盛而遗憾错过的初恋伴侣之间的手写信件、电影票根和褪色的照片。一瞬间，无数关于青春、温暖与遗憾的记忆如潮水般涌来，让你对当下的平庸生活产生了一种强烈的抽离感。",
        question: "面对旧物的引力与怀旧伤感，你的第一反应是：",
        options: [
          {
            id: "a",
            text: "「悲情升华防线」：沉溺于回忆。将铁盒放在床头，连续几天不眠不休地翻看信件，播放当年的老歌。将这种遗憾和伤感转化为一种高傲的、凄美的艺术审美，认为“得不到的才是永恒，当下的现实生活只是一场无趣的妥协”。",
            analysis: "大五人格：高开放度（O2: 审美偏好/艺术直觉）、高神经质（N3: 抑郁）。荣格八维：内倾情感（Fi）的消极自足。弗洛伊德防御机制：悲情升华/退行（Regression）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O2", value: 95, isReversed: false },
              enneagram: { type: 4, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「绝对合规防线」：坚决断舍离。将铁盒重新锁死，甚至直接扔进垃圾桶。说服自己“过去只是大脑皮层的电信号残留，沉溺于回忆是对当下生活和伴侣的背叛。人必须永远向前看，理性不容许无意义的感伤”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/完美执念）、低开放度（O1: 想象力反向）。荣格八维：内倾感觉（Si）与外倾思考（Te）的理性压抑。弗洛伊德防御机制：压抑（Repression）/合理化。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「价值兼容防线」：平静接纳。微笑着看完信件，然后将铁盒妥善安置在阁楼的角落。认为“遗憾是生命年轮的一部分，它塑造了今天的我。我感谢那段青春，但我更珍惜当下手中的温度”。继续平静地过好当下的生活。",
            analysis: "大五人格：高宜人性（A4: 绝对信任/价值兼容）、低神经质（N3: 逆境耐受）。荣格八维：内倾直觉（Ni）的终极释怀。弗洛伊德防御机制：合理化（Rationalization）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 90, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_w_st2",
        title: "第二阶段：遗憾的重逢",
        situation: "在一次异地的商务晚宴上，你意外重逢了那位初恋伴侣。此时的对方已经褪去了青涩，成了一位优雅、成熟、且事业有成的行业精英。在私下聊天时，对方眼神复杂地看着你，轻声说：“如果当年我们中有一个人肯低头，今天的我们会不会不一样？”对方暗示你今晚可以去其房间“聊聊过去”。",
        question: "面对遗憾的重逢与情感诱惑，你选择：",
        options: [
          {
            id: "a",
            text: "「冒险破界防线」：接受邀请。认为“这是命运给我们的第二次机会，也是对当年遗憾的终极救赎。生命只有一次，我不想再带着遗憾活下半辈子，哪怕这会打破我当下的道德边界”。",
            analysis: "大五人格：高开放度（O4: 经验多样/冒险破界）、高外倾性（E4: 刺激寻求）。荣格八维：外倾感觉（Se）与内倾情感（Fi）的极限释放。弗洛伊德防御机制：躁狂防御（Manic Defense）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 90, isReversed: false },
              enneagram: { type: 7, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「绝对合规防线」：礼貌而坚定地拒绝。微笑着端起酒杯说：“谢谢你，但我们都回不去了。今天的我们都有了各自的责任和生活，保持距离是对彼此最好的尊重。”晚宴结束后立刻离开，绝不拖泥带水。",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）。荣格八维：外倾思考（Te）与内倾感觉（Si）的契约坚守。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：感到极度动摇和痛苦。在晚宴上与对方通宵长谈，倾诉当年的委屈与思念，哭红了双眼，但最终在房门口克制住自己，流泪告别。用这种“精神上的极限纠缠”来代偿遗憾，继续背负着痛苦回到现实中。",
            analysis: "大五人格：高宜人性（A6: 共情妥协）、高神经质（N1: 焦虑）。荣格八维：外倾情感（Fe）的防御性纠缠。弗洛伊德防御机制：反向形成/妥协。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 85, isReversed: false },
              enneagram: { type: 2, instinct: "SX" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_w_st3",
        title: "第三阶段：记忆的剪影",
        situation: "重逢过去后，你决定为自己这一生的情感和遗憾做一个终极的了断。你手头保留了大量关于过去的私密日记和信件，这些是你精神世界最深处的避难所，但也让你无法全身心地投入到当下的家庭和事业中。",
        question: "你决定如何处置这些记忆的剪影：",
        options: [
          {
            id: "a",
            text: "「完美执念防线」：亲手烧毁所有信件和日记。声明“真正的和解需要彻底的毁灭。我不需要任何物理载体来证明我的过去，从今天起，我将百分之百地活在当下，履行我眼前的契约和责任”。",
            analysis: "大五人格：高尽责性（C5: 完美执念/责任驱动）。荣格八维：内倾感觉（Si）的压抑与外倾思考（Te）的强力推进。弗洛伊德防御机制：压抑（Repression）/合理化。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「悲情升华防线」：将这些信件和日记整理、虚构，撰写并发表一部极具凄美色彩的自传体小说。声明“痛苦和遗憾是艺术唯一的养分。我将我的过去献祭给文学，让它在虚构的世界里获得永生，而我则继续高傲地在现实中流浪”。",
            analysis: "大五人格：高开放度（O2: 审美偏好/艺术直觉）、高神经质（N3: 抑郁）。荣格八维：内倾情感（Fi）的悲情升华。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O2", value: 95, isReversed: false },
              enneagram: { type: 4, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「价值兼容防线」：不烧毁也不发表。将铁盒锁好，交给你最信任的朋友保管，并约定“等我去世后，将它随我一起下葬”。自己则释怀地回到现实中，认为“记忆不需要被消灭，只需要被妥善安顿”。",
            analysis: "大五人格：高宜人性（A4: 绝对信任/价值兼容）。荣格八维：内倾直觉（Ni）的终极释怀。弗洛伊德防御机制：合理化（Rationalization）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 90, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_x",
    name: "创意的荒野 (The Wilderness of Creativity)",
    description: "原创性、抄袭争议与AI创作场景。在灵感窃贼的抄袭危机、算法画笔的异化压迫、以及最后署名的尊严博弈之间进行多维博弈，解构你的开放度、尽责性与创造性防御机制。",
    category: "creative",
    stages: [
      {
        id: "sc_x_st1",
        title: "第一阶段：灵感的窃贼",
        situation: "你发现一位行业内拥有绝对话语权、深受资本追捧的“明星创意大师”，在最新发布的作品中，系统性地抄袭了你多年前发表在一个极其小众、只有几十人关注的个人博客上的核心创意与设计草图。该大师凭此作品名利双收，而你依然默默无闻。",
        question: "面对灵感的被窃与巨大的不公，你的第一反应是：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：坚决维权。搜集完整的对比证据，在网络上公开发表实名维权声明，并向法院提起侵权诉讼，哪怕这意味着得罪整个行业的资本力量、面临漫长的诉讼与封杀。声明“原创的尊严不容践踏，我绝不向学术和创意的强盗低头”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）、低宜人性（A2: 自我宣示）。荣格八维：内倾思考（Ti）与内倾情感（Fi）的绝对道德自律。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「利益变通防线」：私下里找该大师谈判。不公开撕破脸，而是以此为筹码，要求加入其核心创意团队，担任其“影子写手”，换取高额的暗中报酬与行业资源的入场券。认为“在残酷的商业社会中，版权只是博弈的工具，变现才是硬道理”。",
            analysis: "大五人格：低宜人性（A3: 利益变通/道德操守反向）、高外倾性（E2: 支配度）。荣格八维：外倾思考（Te）的功利主义计算。弗洛伊德防御机制：合理化/补偿。",
            scoring: {
              bigFive: { dimension: "A", facet: "A3", value: 15, isReversed: true },
              enneagram: { type: 3, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「悲情升华防线」：感到深深的幻灭与悲凉。拒绝维权，也拒绝谈判。认为“商业世界本就是肮脏的，我的灵感被他们污染了。我将彻底放弃这个创意，退缩到更深的精神荒野中，去创作更晦涩、更无法被他们理解的作品”。",
            analysis: "大五人格：高开放度（O2: 审美偏好/艺术直觉）、高神经质（N3: 抑郁）。荣格八维：内倾情感（Fi）的消极自足。弗洛伊德防御机制：悲情升华/隔离。",
            scoring: {
              bigFive: { dimension: "O", facet: "O2", value: 90, isReversed: false },
              enneagram: { type: 4, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_x_st2",
        title: "第二阶段：算法的画笔",
        situation: "你入职了一家顶尖的设计事务所。事务所为了追求极致的交付效率，要求所有设计师必须使用最新的生成式 AI 算法来批量生成设计方案，设计师的工作退化为“在AI生成的上百张图纸中进行筛选和微调”。你感到自己的艺术灵魂和创造力正在被冰冷的算法彻底异化和强奸。",
        question: "面对算法画笔的异化压迫，你选择：",
        options: [
          {
            id: "a",
            text: "「完美执念防线」：坚决拒绝使用 AI。坚持纯手工手绘和底层建模，哪怕这会让你的交付速度比同事慢十倍、面临被裁员的风险。声明“没有人类灵魂倾注的像素只是垃圾，我宁可被时代淘汰，也绝不向冰冷的算法交出我的画笔”。",
            analysis: "大五人格：高尽责性（C5: 完美执念/责任驱动）、高开放度（O2: 审美偏好）。荣格八维：内倾情感（Fi）与内倾思考（Ti）的绝对自律。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "O", facet: "O2", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「利益变通防线」：全力拥合算法。迅速掌握各种 Prompt 技巧，成为事务所里交付速度最快、绩效最高的“AI创意总监”。认为“技术是人类手脚的延伸，效率就是生命。用最快的速度拿到结果和奖金，才是最聪明的职场生存法则”。",
            analysis: "大五人格：低宜人性（A3: 利益变通/道德操守反向）、高外倾性（E2: 支配度）。荣格八维：外倾思考（Te）的功利主义决策。弗洛伊德防御机制：向攻击者认同（Identification with the Aggressor）。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 90, isReversed: false },
              enneagram: { type: 3, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「多元兼容防线」：接受合作，但坚持灵魂。在白天完美交付 AI 方案的同时，利用深夜在匿名网络上发表极具毁灭性和挑衅性的纯手工数字艺术，用这种“双重生活”来释放创造力，享受这种破界的刺激。",
            analysis: "大五人格：高开放度（O4: 经验多样/冒险破界）、高外倾性（E4: 刺激寻求）。荣格八维：外倾感觉（Se）与外倾直觉（Ne）的极限释放。弗洛伊德防御机制：分裂（Splitting）/躁狂防御。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 90, isReversed: false },
              enneagram: { type: 7, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_x_st3",
        title: "第三阶段：最后的署名",
        situation: "你利用 AI 辅助创作出了一件在逻辑、视觉和概念上无懈可击的终极杰作，该作品获得了国际艺术大奖。然而，你很清楚，该作品 90% 的底层渲染和细节优化都是由 AI 算法自主涌现生成的。大赛组委会要求你签署一份“100%人类原创声明”才能领奖，否则将取消资格并面临舆论质疑。",
        question: "面对最后的署名与诚实底线的冲突，你决定：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：坚守诚实底线，拒绝签署声明。主动向组委会和公众坦白 AI 的参与比例，接受被取消资格的后果。声明“诚实是创作者唯一的底线。如果我为了虚荣去窃取算法的涌现成果，那我与当年的抄袭者没有任何区别”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）、高宜人性（A3: 极端诚实）。荣格八维：内倾思考（Ti）与内倾情感（Fi）的绝对道德自律。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「优秀形象粉饰」：毫不犹豫地签署声明，领奖并名声大噪。在发布会上用极具煽动性的语言宣称：“AI 只是我的画笔，所有的灵魂和概念都源于我的大脑，这件作品是人类智慧的终极胜利。”彻底将功劳归于自己。",
            analysis: "大五人格：高外倾性（E2: 展现度/光环偏好）、低宜人性（A3: 利益变通）。荣格八维：外倾思考（Te）与外倾直觉（Ne）的商业化包装。弗洛伊德防御机制：补偿（Compensation）/合理化。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 90, isReversed: false },
              enneagram: { type: 3, instinct: "SO" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「思想深潜防线」：签署声明领奖，但将全部奖金暗中捐赠给一个“保护手工艺人与传统艺术家”的公益基金会。在内心深处，用哲学和历史的视角去理解这件作品的“人机共生”本质，保持内心的超然与同情。",
            analysis: "大五人格：高开放度（O5: 概念思辨/思想深潜）、高宜人性（A2: 利他性）。荣格八维：内倾直觉（Ni）的宏观模式识别。弗洛伊德防御机制：合理化/升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O5", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_y",
    name: "契约的重量 (The Weight of the Covenant)",
    description: "友情、忠诚与商业伦理场景。在盟友软肋的道德两难、利益试金石的背叛诱惑、以及最后背叛的宽恕博弈之间进行多维博弈，解构你的宜人性、尽责性与忠诚防御机制。",
    category: "business",
    stages: [
      {
        id: "sc_y_st1",
        title: "第一阶段：盟友的软肋",
        situation: "你发现你相处多年、陪你一起创业的生死之交兼技术合伙人，为了给重病的家人筹集医疗费，私下里将公司的一项非核心专利技术，以个人名义授权给了一家竞争对手，拿到了百万报酬。这违反了公司的竞业协议和法律，一旦公开，合伙人将面临刑事起诉，而公司也将面临投资人的撤资危机。",
        question: "面对合伙人的违规与亲情软肋，你选择：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：坚守法律和契约。立刻召开董事会，暂停合伙人的职务，并要求其主动向警方自首、退回赃款。声明“契约和法律是商业的底线，任何亲情的软肋都不能成为犯罪的借口。如果我包庇他，就是对投资人和全体员工的背叛”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）、低宜人性（A3: 利益变通反向）。荣格八维：外倾思考（Te）与内倾感觉（Si）的法条主义坚守。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「情感代偿防线」：全力包庇。利用自己的职权，伪造一份“公司内部授权协议”来帮合伙人彻底抹平账目，甚至自掏腰包帮其填补漏洞。声明“在真正的兄弟情谊面前，任何商业契约和法律都是冰冷的废纸。我愿意承担一切风险，来守护我的战友”。",
            analysis: "大五人格：高宜人性（A2: 利他性/自我牺牲）。荣格八维：内倾情感（Fi）与外倾情感（Fe）的极限共鸣。弗洛伊德防御机制：过度代偿/自我牺牲。",
            scoring: {
              bigFive: { dimension: "A", facet: "A2", value: 95, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「利益变通防线」：不包庇也不起诉。私下里找合伙人谈话，要求其将百万报酬作为“无息贷款”注入公司，同时将该专利技术重新定义为“两家公司的战略联合研发”。用非正式的博弈手段强行抹平危机，实现利益最大化。",
            analysis: "大五人格：低宜人性（A3: 利益变通）、高外倾性（E2: 支配度）。荣格八维：外倾思考（Te）与外倾直觉（Ne）的实用主义博弈。弗洛伊德防御机制：合理化（Rationalization）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A3", value: 15, isReversed: true },
              enneagram: { type: 3, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_y_st2",
        title: "第二阶段：利益的试金石",
        situation: "行业巨头突然向你发出毁灭性的收购要约：以天价收购你的公司，但条件是必须彻底裁撤你现有的全部创业团队，只保留你个人作为巨头的副总裁。如果你同意，你个人将瞬间实现财富自由和阶层跃迁；如果你拒绝，巨头将发动价格战，在 45 天内彻底绞杀你们，让你的团队一无所有。",
        question: "面对巨头的收购要约与团队的利益冲突，你决定：",
        options: [
          {
            id: "a",
            text: "「利益变通防线」：接受收购。认为“商场如战场，适者生存。在绝对的力量面前，拒绝收购只是愚蠢的殉道。我拿到财富和话语权后，可以用我个人的资金去暗中补偿团队，这才是最理性的战略投资”。",
            analysis: "大五人格：低宜人性（A3: 利益变通/道德操守反向）、高外倾性（E2: 支配度）。荣格八维：外倾思考（Te）的功利主义计算。弗洛伊德防御机制：合理化/补偿。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 90, isReversed: false },
              enneagram: { type: 3, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「绝对合规防线」：坚决拒绝收购。召开全体员工大会，公开巨头的阴谋，宣布与团队共存亡，哪怕这意味着 45 天后彻底破产、一无所有。声明“我的公司和团队不卖。我宁可高傲地战死，也绝不踩着战友的尸体去登基”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/责任驱动）、低宜人性（A2: 自我宣示）。荣格八维：内倾情感（Fi）与内倾思考（Ti）的绝对道德自律。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：寻找折中方案。与巨头进行艰苦的谈判，主动降低自己个人的收购对价，以此换取巨头同意保留团队 50% 的核心成员，并为被裁撤的成员提供高于行业标准三倍的遣散费。用个人的妥协换取集体的软着陆。",
            analysis: "大五人格：高宜人性（A6: 共情妥协/利他性）。荣格八维：外倾情感（Fe）的圆融协调。弗洛伊德防御机制：妥协/自我牺牲。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 90, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_y_st3",
        title: "第三阶段：最后的背叛",
        situation: "最坏的结果发生了，你拒绝了收购，但你最信任的技术合伙人（第一阶段被你包庇的那位）在巨头的金钱诱惑下，暗中带走了公司全部的核心代码和客户资料，跳槽到了巨头旗下，导致你的公司在瞬间破产，你背负了数百万的债务，彻底沦为废墟。此时，合伙人由于巨头内部的政治斗争被清洗，落魄地回来找你，请求你的原谅和帮助。",
        question: "面对曾经的背叛者与落魄的盟友，你决定：",
        options: [
          {
            id: "a",
            text: "「自我宣示防线」：坚决拒绝原谅，并启动毁灭性的法律诉讼。利用你手头保留的其当年侵权的证据，将其送进监狱。声明“背叛必须付出代价，宽恕是对正义的亵渎。我要让他明白，踩在战友尸体上的人，终将被深渊吞噬”。",
            analysis: "大五人格：高外倾性（E2: 支配度）、低宜人性（A2: 自我宣示反向）。荣格八维：外倾感觉（Se）与外倾思考（Te）的强力反击。弗洛伊德防御机制：向攻击者认同。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 90, isReversed: false },
              enneagram: { type: 8, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「价值兼容防线」：平静接受，选择原谅。拒绝起诉，甚至动用自己最后的资源帮其安顿家人。声明“他已经付出了代价，仇恨只会将我自己锁在过去的废墟里。我原谅他，不是为了他，而是为了让我自己的灵魂彻底释怀，重新开始”。",
            analysis: "大五人格：高宜人性（A4: 绝对信任/价值兼容）。荣格八维：内倾直觉（Ni）与内倾情感（Fi）的终极释怀。弗洛伊德防御机制：合理化（Rationalization）/升华。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 90, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：感到极度痛苦和纠结。拒绝与其合作，但也不起诉他。私下里塞给他一笔生活费，冷冷地对他说：“我原谅你作为人的脆弱，但我永远无法再信任你。走吧，别再让我看到你。”在无尽的纠结与内疚中苦苦挣扎。",
            analysis: "大五人格：高宜人性（A6: 共情妥协）、高神经质（N1: 焦虑）。荣格八维：外倾情感（Fe）的防御性妥协。弗洛伊德防御机制：妥协/隔离。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 85, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_z",
    name: "梦境的边界 (The Border of Dreams)",
    description: "潜意识、睡眠健康与精神避难所场景。在梦魇低语的焦虑应激、梦境逃避的现实抽离、以及最后苏醒的心理重建之间进行多维博弈，解构你的情绪稳定性、开放度与退行防御机制。",
    category: "lifestyle",
    stages: [
      {
        id: "sc_z_st1",
        title: "第一阶段：梦魇的低语",
        situation: "你由于长期的工作压力和精神紧绷，陷入了严重的慢性失眠。每当你终于入睡，就会陷入一个极其真实、压抑且不断重复的梦魇——你被困在一个不断缩小的无声迷宫中，身后有某种看不见的阴影在逼近。你每天清晨醒来都浑身大汗、心慌意乱，对入睡产生了深深的恐惧。",
        question: "面对梦魇的低语与睡眠焦虑，你的第一反应是：",
        options: [
          {
            id: "a",
            text: "「敏感防御防线」：陷入极度的恐慌与躯体化应激。开始依赖强效安眠药或酒精来强行麻痹神经，每天频繁记录自己的睡眠数据，对任何身体微小变化都极度敏感，陷入“越想睡越失眠”的恶性循环中。",
            analysis: "大五人格：高神经质（N1: 焦虑、N6: 脆弱性）。荣格八维：劣势感觉（Si）在压力下的病态爆发。弗洛伊德防御机制：躯体化（Somatization）/退行（Regression）。",
            scoring: {
              bigFive: { dimension: "N", facet: "N1", value: 90, isReversed: false },
              enneagram: { type: 6, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「自控隔离防线」：保持绝对的工具理性。认为“梦只是大脑清理垃圾信息的副产物，失眠是皮质醇分泌失调的表现”。立刻制定严格的睡眠卫生SOP（如睡前冥想、禁看屏幕、恒温控制），将身体视为一台需要精密调校的生物机器，有条不紊地进行睡眠管理。",
            analysis: "大五人格：低神经质（N5: 自控隔离）、高尽责性（C5: 契约守护）。荣格八维：外倾思考（Te）与内倾感觉（Si）的理性结合。弗洛伊德防御机制：理智化（Intellectualization）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「思想深潜防线」：不焦虑也不抗拒。将梦魇视为潜意识与意识沟通的神秘信使。开始阅读荣格的梦境解析、精神分析著作，每天清晨将梦境详细记录下来，试图破译梦中迷宫与阴影的象征隐喻，在梦境中寻找自我重构的线索。",
            analysis: "大五人格：高开放度（O6: 价值观/哲学思辨）、低神经质（N3: 逆境耐受）。荣格八维：内倾直觉（Ni）的潜意识探索。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O6", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_z_st2",
        title: "第二阶段：梦境的逃避",
        situation: "你通过练习，掌握了“清明梦（Lucid Dreaming）”的技术，可以在梦中保持清醒并任意控制梦境的走向。在梦里，你无所不能，是神，可以兑现现实中所有的遗憾和幻想；而在现实中，你依然要面对枯燥的工作、复杂的社交和重重压力。你开始渴望睡眠，甚至每天花 12 小时躺在床上，现实生活开始荒废。",
        question: "面对梦境的逃避与现实的重力，你选择：",
        options: [
          {
            id: "a",
            text: "「优秀形象粉饰」：沉溺于梦境帝国。认为“现实只是无趣的容器，梦境才是我灵魂的真实表达。我应当在梦中继续构建我的完美帝国，将现实生活简化为维持肉身生存的机械劳动”。",
            analysis: "大五人格：高外倾性（E2: 展现度/光环偏好）、低宜人性（A3: 利益变通）。荣格八维：外倾直觉（Ne）与外倾情感（Fe）的病态代偿。弗洛伊德防御机制：分裂（Splitting）/补偿。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 90, isReversed: false },
              enneagram: { type: 3, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「完美执念防线」：坚决斩断梦境。注销所有关于清明梦的论坛账号，设置严格的闹钟，每天强制自己只睡 7 小时，立刻投入到高强度的现实工作和体育锻炼中。声明“虚幻的无所不能只会加速灵魂的腐烂，我必须在真实的物理世界中，通过脚踏实地的劳动来重建自我”。",
            analysis: "大五人格：高尽责性（C5: 完美执念/责任驱动）。荣格八维：内倾感觉（Si）与内倾思考（Ti）的结合。弗洛伊德防御机制：压抑（Repression）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「悲情升华防线」：不放弃也不融合。将这种梦境与现实的撕裂感视为一种独特的“艺术创作素材”。开始撰写一部关于“梦境旅行者”的奇幻小说，在文字中高傲地审视自己的痛苦，与世俗保持距离。",
            analysis: "大五人格：高开放度（O2: 审美偏好/艺术直觉）、高神经质（N3: 抑郁）。荣格八维：内倾情感（Fi）的悲情升华。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O2", value: 90, isReversed: false },
              enneagram: { type: 4, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_z_st3",
        title: "第三阶段：最后的苏醒",
        situation: "由于长期的现实抽离，你现实中的伴侣/家人因为长期被你冷落，正处于抑郁和离职的边缘，向你发出最后的通牒：要么你彻底放弃对梦境的执念，接受专业的心理治疗，回归真实的家庭生活；要么他们将彻底离开你。而此时，你正处于梦境小说签约变现、走向职业巅峰的关键风口期。",
        question: "面对梦境帝国的巅峰与现实亲情的崩塌，你决定：",
        options: [
          {
            id: "a",
            text: "「情感代偿防线」：立刻拔掉插头。注销账号，静网半年，全心全意陪伴家人。声明“梦境的帝国只是泡沫，物理世界中真实家人的眼泪和温度，才是我生命中唯一不可替代的锚点”。",
            analysis: "大五人格：高宜人性（A6: 共情妥协/利他性）。荣格八维：内倾情感（Fi）与外倾情感（Fe）的极限共鸣。弗洛伊德防御机制：过度代偿/自我牺牲。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 95, isReversed: false },
              enneagram: { type: 2, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「优秀形象粉饰」：拒绝注销。认为“在现代社会中，个人的事业巅峰和财务自由才是守护家庭的终极底牌。家人的抑郁只是暂时的，等我变现成功、实现阶层跃迁后，可以用最好的医疗和物质条件来补偿他们”。",
            analysis: "大五人格：高外倾性（E2: 展现度/光环偏好）、低宜人性（A3: 利益变通）。荣格八维：外倾思考（Te）的功利主义计算。弗洛伊德防御机制：合理化/补偿。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 90, isReversed: false },
              enneagram: { type: 3, instinct: "SP" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「自控隔离防线」：不妥协也不放弃。提出理性的折中方案：将账号运营完全委托给专业团队，自己退居幕后做内容策划，每天强制规定 3 小时“无手机家庭时间”。用严密的日程表和边界划分来强行兼顾两者。",
            analysis: "大五人格：高尽责性（C5: 责任驱动/完美执念）。荣格八维：外倾思考（Te）与内倾感觉（Si）的强迫性时间管理。弗洛伊德防御机制：隔离（Isolation）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 85, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_aa",
    name: "消费的囚徒 (The Prisoner of Consumption)",
    description: "极简主义、消费债务与财务自由场景。在账单重力的债务压迫、极简洗礼的断舍离、以及自由代价的生活抉择之间进行多维博弈，解构你的尽责性、情绪稳定性与消费防御机制。",
    category: "finance",
    stages: [
      {
        id: "sc_aa_st1",
        title: "第一阶段：账单的重力",
        situation: "你发现自己由于长期的精致消费、频繁购买奢侈品和出入高端私人俱乐部，已经累积了一笔数额巨大的信用卡和消费贷债务。你每天一睁眼，就要面对雪花般的还款账单。为了偿还利息，你不得不继续留在那家你极度厌恶、人际关系极其有毒的高薪大厂岗位上，每天在窒息中出卖灵魂。",
        question: "面对账单的重力与有毒岗位的束缚，你的第一反应是：",
        options: [
          {
            id: "a",
            text: "「敏感防御防线」：陷入极度的恐慌与焦虑。开始频繁拆东墙补西墙，甚至考虑通过高风险的网贷来填补漏洞。每天频繁刷新账单，对任何催收电话都极度敏感，精神濒临崩溃，但依然无法克制自己通过“报复性消费”来缓解压力的冲动。",
            analysis: "大五人格：高神经质（N1: 焦虑、N6: 脆弱性）。荣格八维：劣势感觉（Si）在压力下的病态爆发。弗洛伊德防御机制：退行（Regression）/躯体化。",
            scoring: {
              bigFive: { dimension: "N", facet: "N1", value: 90, isReversed: false },
              enneagram: { type: 6, instinct: "SP" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          },
          {
            id: "b",
            text: "「自控隔离防线」：平静接受。立刻制定严格的债务偿还计划，拉出详细的财务损益表，砍掉所有非必要开支，制定严格的共同账户消费SOP。将身体和生活视为一台需要精密维护的生物机器，有条不紊地进行债务管理。",
            analysis: "大五人格：低神经质（N5: 自控隔离）、高尽责性（C5: 契约守护）。荣格八维：外倾思考（Te）与内倾感觉（Si）的理性结合。弗洛伊德防御机制：理智化（Intellectualization）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「思想深潜防线」：不焦虑也不抗拒。将这次债务危机视为一次“人生重构”的契机。开始阅读哲学、心理学，重新审视“成功”与“消费”的定义，试图在慢节奏中寻找生命的新平衡，认为“债务是消费主义的枷锁，破产让我彻底摆脱了消费主义的奴役”。",
            analysis: "大五人格：高开放度（O6: 价值观/哲学思辨）、低神经质（N3: 逆境耐受）。荣格八维：内倾直觉（Ni）的宏观意义赋予。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O6", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "N", subBias: "T" }
            }
          }
        ]
      },
      {
        id: "sc_aa_st2",
        title: "第二阶段：极简的洗礼",
        situation: "你被一本关于“极简主义（Minimalism）”的著作深深触动。书中倡导：人生的幸福在于精神的丰盈，而非物质的累积；扔掉 90% 的无用物品，才能找回真实的自我。你看着自己塞满奢侈品、潮玩和高档家具的公寓，面临着是否进行一次彻底的“断舍离”的抉择。",
        question: "面对极简主义的洗礼与物质积累，你选择：",
        options: [
          {
            id: "a",
            text: "「完美执念防线」：坚决断舍离。在周末将公寓里 90% 的物品（包括名牌衣服、潮玩、高档家具）全部打包卖掉或捐赠，只留下 30 件维持生存的必需品。声明“物质是灵魂的枷锁，彻底的毁灭才能带来彻底的自由”。",
            analysis: "大五人格：高尽责性（C5: 完美执念/责任驱动）、高开放度（O2: 审美偏好）。荣格八维：内倾感觉（Si）的压抑与外倾思考（Te）的强力推进。弗洛伊德防御机制：压抑（Repression）/合理化。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「优秀形象粉饰」：拒绝断舍离。认为“极简主义只是一种中产阶级的无病呻吟。在商业社会中，物质的档次决定了你的阶层和信用。我应当继续保持我的高品质生活，通过更高效的赚钱来解决债务问题”。",
            analysis: "大五人格：高外倾性（E2: 展现度/光环偏好）、低宜人性（A3: 利益变通）。荣格八维：外倾思考（Te）与外倾直觉（Ne）的功利性包装。弗洛伊德防御机制：补偿（Compensation）/合理化。",
            scoring: {
              bigFive: { dimension: "E", facet: "E2", value: 90, isReversed: false },
              enneagram: { type: 3, instinct: "SO" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「价值兼容防线」：不烧毁也不发表。将铁盒锁好，交给你最信任的朋友保管，并约定“等我去世后，将它随我一起下葬”。自己则释怀地回到现实中，认为“记忆不需要被消灭，只需要被妥善安顿”。",
            analysis: "大五人格：高宜人性（A4: 绝对信任/价值兼容）。荣格八维：内倾直觉（Ni）的终极释怀。弗洛伊德防御机制：合理化（Rationalization）。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 90, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_aa_st3",
        title: "第三阶段：自由的代价",
        situation: "你面临人生下半场的终极抉择：是留在那个高效率、高收入、但彻底与自然割裂的都市大厂，继续做一颗精致的齿轮；还是卖掉都市的房产，去大理或清迈的乡村买下一块荒地，建立一个自给自足、零碳排放的生态农场，彻底回归土地？",
        question: "面对“荒野的呼唤”与都市繁华的终极抉择，你决定：",
        options: [
          {
            id: "a",
            text: "「秩序合规防线」：选择留在都市。认为“现代文明的本质在于分工与效率，乡村的田园牧歌只是一种退行性的幻觉。我应当在都市中积累财富，通过投资环保基金或购买碳信用来履行我的生态责任”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）。荣格八维：外倾思考（Te）与内倾感觉（Si）的结合。弗洛伊德防御机制：合理化。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「冒险破界防线」：选择奔向荒野。卖掉房产，彻底断开与都市的联结，去乡村建立生态农场。声明“没有泥土滋养的生命是虚妄的，我选择用我的双手亲自劳作，与万物建立真实的、绿色的契约，哪怕生活艰苦”。",
            analysis: "大五人格：高开放度（O4: 经验多样/冒险破界）、高宜人性（A2: 利他性）。荣格八维：内倾情感（Fi）与外倾感觉（Se）的极限融合。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 95, isReversed: false },
              enneagram: { type: 7, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：选择“半都市半乡村”的折中生活。在大厂继续工作，但租下郊区的一块周末农田，每周带家人去耕作。用这种“微缩版自然”来强行兼顾世俗责任与生态渴望。",
            analysis: "大五人格：高宜人性（A6: 共情妥协）、高尽责性（C5: 责任驱动）。荣格八维：外倾情感（Fe）与外倾思考（Te）的协调。弗洛伊德防御机制：妥协/隔离。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sc_ab",
    name: "算法的红线 (The Red Line of the Algorithm)",
    description: "数字隐私、监控资本主义与个人自由场景。在窥视眼睛的隐私泄露、数据叛逃的维权博弈、以及拔掉插头的终极静网之间进行多维博弈，解构你的尽责性、情绪稳定性与隐私防御机制。",
    category: "tech",
    stages: [
      {
        id: "sc_ab_st1",
        title: "第一阶段：窥视的眼睛",
        situation: "你发现你家里的智能音箱、智能电视和手机，正在暗中记录你和家人的私密对话。每当你和家人谈论某个话题（如准备去旅行或某种疾病），几分钟后，你所有的社交软件和浏览器就会精准向你推送相关的广告。你感到自己赤身裸体地站在算法的聚光灯下，毫无隐私可言。",
        question: "面对窥视的眼睛与数字监控，你的第一反应是：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：坚决维权。搜集完整的录音和广告推送对比证据，向国家网信办和消费者协会实名举报，并向法院提起侵权诉讼，要求科技巨头公开其底层算法逻辑。声明“隐私是人类尊严的底线，我绝不向监控资本主义低头”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）、高宜人性（A3: 极端诚实）。荣格八维：内倾思考（Ti）与内倾情感（Fi）的绝对道德自律。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「自控隔离防线」：保持绝对的工具理性。不公开起诉，但采取严密的物理和技术防御。给所有智能设备安装物理遮挡、使用加密路由器、定期清理缓存，将自己的数字生活完全隔离在安全沙箱中，保持内心的超然。",
            analysis: "大五人格：低神经质（N5: 自控隔离）、高尽责性（C5: 契约守护）。荣格八维：内倾思考（Ti）的智性博弈。弗洛伊德防御机制：情感隔离（Isolation of Affect）。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「价值兼容防线」：平静接受。认为“在数字时代，隐私的让渡是享受便捷服务的必然代价。只要算法能让我生活更方便，被监控也无所谓”。继续坦然享受智能设备带来的便利。",
            analysis: "大五人格：高宜人性（A4: 绝对信任/价值兼容）。荣格八维：外倾情感（Fe）的防御性遗忘。弗洛伊德防御机制：否认（Denial）/合理化。",
            scoring: {
              bigFive: { dimension: "A", facet: "A4", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_ab_st2",
        title: "第二阶段：数据的叛逃",
        situation: "你发现你所在的大型科技公司（也是你的雇主），正在暗中将数亿用户的私密行为数据、甚至包括人脸识别和声纹数据，打包出售给第三方高风险机构进行商业变现。作为合规总监，你手头掌握了完整的交易账目和数据流向证据。一旦公开，公司将面临破产，而你也将被行业彻底封杀。",
        question: "面对数据的叛逃与职业前途的冲突，你选择：",
        options: [
          {
            id: "a",
            text: "「绝对合规防线」：成为吹哨人。搜集完整证据，直接向国家药监局和主流媒体公开举报，哪怕这意味着个人职业生涯的彻底毁灭与漫长的诉讼。声明“生命安全不容任何商业利益的计算，我必须阻止这场合法的谋杀”。",
            analysis: "大五人格：高宜人性（A5: 合规偏好/道德铁律）、高尽责性（C5: 责任驱动）。荣格八维：内倾思考（Ti）与内倾情感（Fi）的绝对道德自律。弗洛伊德防御机制：超我主导。",
            scoring: {
              bigFive: { dimension: "A", facet: "A5", value: 95, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "[" + "利益变通防线」：保持沉默，但递交辞职信。认为“在庞大的资本机器面前，个人的反抗只是螳臂当车。我无法改变机器，但我可以选择不成为其中的齿轮。我选择离开，保留我最后的干净”。",
            analysis: "大五人格：低神经质（N5: 自控隔离）、低宜人性（A3: 利益变通）。荣格八维：内倾思考（Ti）的智性洁癖。弗洛伊德防御机制：逃避/隔离。",
            scoring: {
              bigFive: { dimension: "N", facet: "N5", value: 15, isReversed: true },
              enneagram: { type: 5, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：不公开举报，也不辞职。暗中联合研发部门的良知科学家，在后续的“说明书微调”和“医生临床指导”中，用极其隐蔽的技术性话术（如“建议心脏病史患者慎用”）来最大限度降低猝死风险，用局部的妥协换取组织的生存。",
            analysis: "大五人格：高宜人性（A1: 同理与协作/共情妥协）。荣格八维：外倾情感（Fe）的圆融协调.弗洛伊德防御机制：妥协/合理化。",
            scoring: {
              bigFive: { dimension: "A", facet: "A1", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "N", subBias: "F" }
            }
          }
        ]
      },
      {
        id: "sc_ab_st3",
        title: "第三阶段：拔掉插头的终章",
        situation: "你面临人生下半场的终极抉择：是留在那个高效率、高收入、但彻底与自然割裂的都市大厂，继续做一颗精致的齿轮；还是卖掉都市的房产，去大理或清迈的乡村买下一块荒地，建立一个自给自足、零碳排放的生态农场，彻底回归土地？",
        question: "面对“荒野的呼唤”与都市繁华的终极抉择，你决定：",
        options: [
          {
            id: "a",
            text: "「秩序合规防线」：选择留在都市。认为“现代文明的本质在于分工与效率，乡村的田园牧歌只是一种退行性的幻觉。我应当在都市中积累财富，通过投资环保基金或购买碳信用来履行我的生态责任”。",
            analysis: "大五人格：高尽责性（C5: 契约守护/合规偏好）。荣格八维：外倾思考（Te）与内倾感觉（Si）的结合。弗洛伊德防御机制：合理化。",
            scoring: {
              bigFive: { dimension: "C", facet: "C5", value: 90, isReversed: false },
              enneagram: { type: 1, instinct: "SP" },
              disc: { x: -0.65, y: -0.95 },
              jungian: { bias: "S", subBias: "T" }
            }
          },
          {
            id: "b",
            text: "「冒险破界防线」：选择奔向荒野。卖掉房产，彻底断开与都市的联结，去乡村建立生态农场。声明“没有泥土滋养的生命是虚妄的，我选择用我的双手亲自劳作，与万物建立真实的、绿色的契约，哪怕生活艰苦”。",
            analysis: "大五人格：高开放度（O4: 经验多样/冒险破界）、高宜人性（A2: 利他性）。荣格八维：内倾情感（Fi）与外倾感觉（Se）的极限融合。弗洛伊德防御机制：升华（Sublimation）。",
            scoring: {
              bigFive: { dimension: "O", facet: "O4", value: 95, isReversed: false },
              enneagram: { type: 7, instinct: "SX" },
              disc: { x: 0.85, y: 0.55 },
              jungian: { bias: "N", subBias: "F" }
            }
          },
          {
            id: "c",
            text: "「共情妥协防线」：选择“半都市半乡村”的折中生活。在大厂继续工作，但租下郊区的一块周末农田，每周带家人去耕作。用这种“微缩版自然”来强行兼顾世俗责任与生态渴望。",
            analysis: "大五人格：高宜人性（A6: 共情妥协）、高尽责性（C5: 责任驱动）。荣格八维：外倾情感（Fe）与外倾思考（Te）的协调。弗洛伊德防御机制：妥协/隔离。",
            scoring: {
              bigFive: { dimension: "A", facet: "A6", value: 85, isReversed: false },
              enneagram: { type: 9, instinct: "SO" },
              disc: { x: 0.55, y: -0.75 },
              jungian: { bias: "S", subBias: "F" }
            }
          }
        ]
      }
    ]
  }
];
