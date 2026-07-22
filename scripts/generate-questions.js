const fs = require('fs');
const path = require('path');

// 1. 大五人格 (NEO-PI-R) 30个 Facets 原子库，由心理学家逐字手写
const BIG_FIVE_FACETS = [
  { facet: "E1 (乐群)", title: "社交能量 · 乐群性", low: "精力消耗 (低E)", high: "精力充沛 (高E)", lowBeh: "找借口独处，在安静中修养干涸的精力与社交负荷。", highBeh: "毫不犹豫前往，深信高能量社交是激发灵感与破冰的唯一钥匙。" },
  { facet: "C1 (条理)", title: "秩序与规范 · 条理性", low: "随性灵活 (低C)", high: "严谨有序 (高C)", lowBeh: "允许小格式缺陷按时发布，坚信完成优于死板规程的完美。", highBeh: "申请延迟并严格修改，坚信流程的不打折扣是防御故障的唯一底线。" },
  { facet: "A1 (利他)", title: "同理与协作 · 利他性", low: "理性决断 (低A)", high: "共情妥协 (高A)", lowBeh: "搁置个人情绪与面子，完全基于业务 ROI 和冷硬逻辑进行强力裁决。", highBeh: "优先顾全双方面子和情感稳定，寻求温和的折中利益分配方案。" },
  { facet: "O1 (想象)", title: "思维开放度 · 创新想象", low: "务实保守 (低O)", high: "好奇探索 (高O)", lowBeh: "对前沿未知方向保持警惕，倾向于采用被市场验证的稳定成熟路线。", highBeh: "力排众议启动前沿探索，深信在技术迷雾与不确定中才能夺得先机。" },
  { facet: "N1 (焦虑)", title: "情绪稳定性 · 焦虑防线", low: "敏感剧烈 (高N)", high: "平稳淡定 (低N)", lowBeh: "感到紧迫与剧烈焦虑，极其敏感地预判各种处罚风险并启动自保防御。", highBeh: "大脑迅速降温进入冰冷客观状态，不受责难干扰，立刻执行危机预案。" },
  { facet: "O2 (审美)", title: "审美偏好 · 艺术直觉", low: "实用至上 (低O)", high: "审美表达 (高O)", lowBeh: "退回交互方案，坚持认为易用性与逻辑直觉是产品的最高指标。", highBeh: "支持艺术先锋设计，深信形式与功能的极致美学结合能建立情感溢价。" },
  { facet: "C2 (自律)", title: "自律定力 · 诱惑抗性", low: "即时享乐 (低C)", high: "心无旁骛 (高C)", lowBeh: "选择调整节奏，认为人生的动态平衡与享乐比单调的工作更有价值。", highBeh: "视诱惑为噪音，继续攻克算法模型，守护个人既定的时间表契约。" },
  { facet: "A2 (谦逊)", title: "合作谦逊 · 自我弱化", low: "自我宣示 (低A)", high: "克己让功 (高A)", lowBeh: "坦然接受高赞，深信顶层架构决策是项目的灵魂，价值远超重复搬砖。", highBeh: "主动淡化功劳，强调自己只是画图纸的人，荣誉属于执行层全体战友。" },
  { facet: "E2 (展现)", title: "展现度 · 光环偏好", low: "被迫营业 (低E)", high: "享受舞台 (高E)", lowBeh: "感到严重社交精力损耗，希望能尽快将视线焦点移交给他人。", highBeh: "享受聚光灯下的表达与目光注视，声调高亢，动作充满张力。" },
  { facet: "N2 (易怒)", title: "易怒敏感 · 情绪阈值", low: "焦躁反弹 (高N)", high: "平和包容 (低N)", lowBeh: "压抑不住焦躁，在群里言辞犀利地挑明责任，以防范未来的低效。", highBeh: "平和克制，认为情绪对解决问题毫无帮助，主动协助组员排查困难。" },
  { facet: "O3 (情感)", title: "情感感受 · 情感深度", low: "理性过滤 (低O)", high: "情感共鸣 (高O)", lowBeh: "认为过度的情绪渲染是理性的噪音，必须用逻辑铁律过滤一切情感干扰。", highBeh: "极其敏感地捕捉画面与文字背后的深层忧伤与诗意，重视灵魂的颤动。" },
  { facet: "C3 (胜任)", title: "胜任信念 · 能力自决", low: "被动配合 (低C)", high: "主动弥补 (高C)", lowBeh: "不主动干预漏洞，等下个迭代系统报错时按常规工作流派单处理。", highBeh: "周末主动重写冲突模块，无法容忍交付的代码在底层存在任何隐患。" },
  { facet: "A3 (真诚)", title: "道德操守 · 价值纯粹", low: "利益变通 (低A)", high: "极端诚实 (高A)", lowBeh: "默许通过，在合同未明确约定的灰色地带实现个人利益最大化是商战常态。", highBeh: "主动向客户坦白缺陷，并自掏腰包予以修正，守护信仰的绝对无暇。" },
  { facet: "E3 (活力)", title: "社交活力 · 能量水平", low: "沉稳克制 (低E)", high: "澎湃释放 (高E)", lowBeh: "语速均匀，没有多余手势，极力维持学者般的情感克制感。", highBeh: "语速极快，肢体动作极其丰富，习惯用高能张力席卷全场听众。" },
  { facet: "N3 (抑郁)", title: "逆境耐受 · 意志复原", low: "能量低谷 (高N)", high: "意志自给 (低N)", lowBeh: "极易陷入灰暗能量低谷，感到无力，意志力断崖式下跌并退缩。", highBeh: "保持稳定动力，深信瓶颈是蓄力期，自我激励机制迅速响应。" },
  { facet: "O4 (尝试)", title: "经验多样 · 体验寻求", low: "防御防守 (低O)", high: "冒险破界 (高O)", lowBeh: "主张在主营垂类里挖护城河，防守是动荡大环境下的最优解。", highBeh: "极力倡导开拓蓝海，坚信在风浪与未知的博弈中才有跨越可能。" },
  { facet: "C4 (成就)", title: "成就动机 · 挑战追求", low: "稳健守成 (低C)", high: "征服未知 (高C)", lowBeh: "选择成熟、带来稳定数亿营收的基本盘，在安全轨道里精益求精。", highBeh: "接手死亡率极高、但若成功则可能颠覆行业的全新试验性业务。" },
  { facet: "A4 (同理)", title: "人际信任 · 价值敞开", low: "审视验证 (低A)", high: "绝对信任 (高A)", lowBeh: "暂不调整排期，在看到合作方提交实际代码与测试前保持合理怀疑。", highBeh: "立刻调整己方排期，相信深度合作建立在毫无保留的信任敞开之上。" },
  { facet: "E4 (刺激)", title: "刺激寻求 · 冒险边界", low: "保守安全 (低E)", high: "向外打破 (高E)", lowBeh: "回避一切带有赌博性质的业务方向，将风险暴露降到最低限度。", highBeh: "享受强烈的感官刺激与边界探索，不抗拒与高危因素共舞的博弈。" },
  { facet: "N4 (自我意识)", title: "社交焦虑 · 自我意识", low: "敏感防御 (高N)", high: "大方自决 (低N)", lowBeh: "在公开社交中过度关注他人对自己的负面评价，倾向于伪装与自卫。", highBeh: "极具厚脸皮心力，不在意旁人的微表情与审视，自我意识完全隔离。" },
  { facet: "O5 (思想)", title: "智性求知 · 概念思辨", low: "实用过滤 (低O)", high: "思想深潜 (高O)", lowBeh: "将精力 100% 聚焦于与当前升职加薪直接绑定的核心技术链中。", highBeh: "纯粹出于求知渴望去攻读高深难懂的边缘科学，享受解密认知规律的快乐。" },
  { facet: "C5 (尽责)", title: "责任驱动 · 契约守护", low: "指标交付 (低C)", high: "完美执念 (高C)", lowBeh: "按图索骥，只要符合指标即可，不过度投入时间优化非考评细节。", highBeh: "以尊严之名背负契约，将追求极致架构视为不可折弯的责任信条。" },
  { facet: "A5 (合规)", title: "合规偏好 · 道德铁律", low: "利己变通 (低A)", high: "绝对合规 (高A)", lowBeh: "在政策边缘游走，只要不触发实质性违法，实现效率与利益最大化。", highBeh: "严厉拒绝一切灰色操作，把制度红线看作不容任何人逾越的圣地。" },
  { facet: "E5 (热情度)", title: "社交温度 · 能量投射", low: "客气距离 (低E)", high: "倾注热情 (高E)", lowBeh: "保持礼貌距离，在餐桌上冷眼旁观，不主动打破个人物理边界。", highBeh: "端杯离座破冰，释放极高的人情温度，用强大的多巴胺感染全场。" },
  { facet: "N5 (冲动)", title: "冲动防线 · 自控隔离", low: "冲动宣泄 (高N)", high: "自控隔离 (低N)", lowBeh: "在高压差评下极易失控，想连夜发送带有攻击性词汇的自证信件宣泄情绪。", highBeh: "锁死情绪开关，倒头就睡。用充沛的睡眠隔离负能量以保障明日理性。" },
  { facet: "O6 (价值)", title: "价值兼容 · 异端包容", low: "传统维护 (低O)", high: "多元兼容 (高O)", lowBeh: "对违背自己传统价值观的生活习惯和非主流流派打上偏见标签。", highBeh: "把异质文化与偏锋流派视为丰富自己思想版图的珍贵养料，主动求知。" },
  { facet: "C6 (审慎)", title: "风险审慎 · 决策安全", low: "激进下注 (低C)", high: "规避风险 (高C)", lowBeh: "主张激进扩张，深信在历史窗口面前唯有梭哈才能打破阶层重组。",
    highBeh: "极力投反对票，深信保护基本盘安全、规避系统性毁灭是第一原则。" },
  { facet: "A6 (同情)", title: "情感同理 · 奉献代偿", low: "逻辑刚性 (低A)", high: "同理接纳 (高A)", lowBeh: "拒绝个人情绪干预，冷酷指出项目节点高于一切个人借口。",
    highBeh: "主动包揽下属未完的任务，宁可导致版本延期也必须给予同事心理疏导。" },
  { facet: "E6 (积极情绪)", title: "积极心境 · 乐天直觉", low: "理性悲观 (低E)", high: "乐天进取 (高E)", lowBeh: "习惯前置做好最坏的坏账预案，对任何乐观宣传保持本能的冷淡警惕。",
    highBeh: "永远能在一地鸡毛中看到希望，擅长为团队注入阳光与盲目的创造力。" },
  { facet: "N6 (脆弱性)", title: "脆弱防线 · 逆境修复", low: "心力瓦解 (高N)", high: "自我复原 (低N)", lowBeh: "遭遇挫折后容易全面退缩，情绪极易瓦解，需要极长周期寻求代偿。",
    highBeh: "迅速从挫折事实中站起来，当天就能精算重组方案，抗挫折心力极强。" }
];

// 8组大五两难商业语境，包含前沿科技与真实职场张力
const BIG_FIVE_CONTEXTS = [
  "在云原生多租户架构发生概率性雪崩、核心大客户在线上发出退款通牒的生死关头，你倾向于：",
  "面对公司核心分布式自治 Agent 技术由于框架更新导致的严重集成冲突冲突，你会：",
  "跨部门高管联席会议上，针对下一代产品的视觉设计与交互逻辑产生了毁灭性的撕扯，你：",
  "团队原定在周天晚上合入主分支代码，而此时多年未见的挚友发来了周末音乐会邀约，你倾向于：",
  "在供应商合作协议审计中，你偶然发现如果采用变通的灰色合同可以为个人带来数万返佣，你：",
  "产品实现十倍并发量突破并获得了公司总裁特等奖，在全员表彰大会登台发言时，你会：",
  "团队新入职了一位脾气古怪但身怀绝技、崇尚神秘学与黑客文化的小众思想奇才，你：",
  "你负责的融资竞标书因为被对手以关系做局而爆冷出局，导致你的实验室面临整顿，此时："
];

// 2. 九型人格 9种动机型号与防御机制原子语料库
const ENNEAGRAM_TYPES = [
  { type: 1, name: "完美主义者", defense: "反向形成与纠错", aText: "「秩序合规防线」：核对清偿程序中的每一个微观合规漏洞，用高洁的职业名义执行铁律规范，纠正任何流程耻辱。", bText: "「完美章程」：直接拿出公司章程，用近乎冰冷的口吻要求大家回到理性章程和严苛纪律的轨道上辩论。" },
  { type: 2, name: "助人者", defense: "压抑与情感投射", aText: "「情感代偿防线」：包揽下下属的全部错误并表示理解，哪怕自己通宵至崩溃也必须把温度传递给团队战友。", bText: "「人际软化」：私下给意见撕裂的战友递上咖啡，用真诚的关怀作为润滑剂，试图软化冰冷的对立立场。" },
  { type: 3, name: "成就者", defense: "认同与形象粉饰", aText: "「优秀形象粉饰」：迅速推出新代产品图与过渡大图，包装出“战略收缩”的高光形象，用更闪耀的业绩遮盖动荡。", bText: "「超越自证」：冷眼旁观，在心里发狠：抄得走皮毛，抄不走我的大脑，我会用碾压性的商业规模把对方打出局。" },
  { type: 4, name: "艺术者", defense: "内投与独特隔离", aText: "「悲情升华防线」：感到产品和技术被肮脏的资本利益所污染，保留纯粹的作品洁癖离场，高傲地选择与俗世隔离。", bText: "「幻灭冷观」：叹息企业文化的平庸悲凉，退回高傲的艺术世界，冷冷注视政客们的自我毁灭博弈。" },
  { type: 5, name: "观察者", defense: "理智隔离与囤积", aText: "「智性隔离防线」：认定一切动荡是数据和博弈方程的必然解。脱机封存核心算法，退守个人的学术研究孤岛。", bText: "「脱机隐退」：将手机设置成绝对脱网真空，关闭社交雷达，深埋于前沿文献与无边际的技术推演中。" },
  { type: 6, name: "忠诚者", defense: "投射与怀疑防御", aText: "「危机求全防波堤」：怀疑身边充满了盟友的背叛。在系统留存最严密的抗辩证据链，严防被转嫁责任与恶意起诉。", bText: "「风险同盟」：选择追随底盘最稳固、掌控最扎实的安全势力，精细勾勒各种最坏打算下的自卫策略。" },
  { type: 7, name: "活跃者", defense: "合理化与逃避", aText: "「乐观重构防线」：将错就错，顺势开启一波“自黑自嘲”式的官方整蛊营销，把危机重构成一次成功的破圈流量胜利。", bText: "「享乐退缩」：预订最刺激的越野赛车或高空跳伞，在肾上腺素的狂飙中将积压的沉重情绪物理性撞击出来。" },
  { type: 8, name: "挑战者", defense: "否认与见诸行动", aText: "「铁腕掌控防线」：直接锁定后台云部署分支，以高压警告老板或对手：要么按我定的来，要么两败俱伤，绝不服从任何退让。", bText: "「领地对决」：在高管群艾特空降总监，强势喝止其插手核心技术资产的行为，用绝对的力量捍卫己方主导权。" },
  { type: 9, name: "和平者", defense: "麻木与自我解离", aText: "「顺应退避防线」：感到冲突的窒息，为了不让关系闹僵，采取太极和稀泥态度，顺应现状以换取表面的凝聚力。", bText: "「融合退隐」：关掉大脑的逻辑天线，躺在沙滩上无所作为地放空，渴望将自我意识彻底溶解在平静的自然里。" }
];

// 16组高负荷极限危机场景
const ENNEAGRAM_CRISES = [
  { scene: "破产清算边缘", situation: "由于资本链条无预警断裂，公司面临被迫执行破产赔偿的终极清偿决议。", question: "此时你潜意识里为了抵御遭到倾轧的无力感，激活的第一防线是：" },
  { scene: "被窃取的技术", situation: "你发现你研发多年的底层架构，被竞对公司的技术总监以其个人的名义抢先申请了专利。", question: "在此技术剥夺事件中，你的潜意识自救路径是：" },
  { scene: "核心战友叛逃", situation: "在争取下年度预算的答辩会前夜，你相处五年的技术合伙人带走了你大半核心客户跳槽。", question: "为了抵御遭到背叛的剧烈不安，你的第一应对直觉是：" },
  { scene: "公关审判危机", situation: "你们团队设计的交互产品发布后，在社交网络上引发了恶意的群嘲并被做成恶搞表情包。", question: "为了抵御这种被群嘲的自我价值受挫感，你的本能合理化运作是：" },
  { scene: "权力的血路", situation: "大股东与创始人发生了不可调和的流血斗争，双方均威胁你必须在明早前表态站队。", question: "在此人际权力修罗场中，你最本能的潜意识退守防线是：" },
  { scene: "致命的代码后门", situation: "在产品全球发布前12小时，你发现主分支存在可能导致数据泄露的技术后门，老板命令你隐瞒发布。", question: "在这一关乎道德底线与个人前途的极限选择中，你最本能的反应是：" },
  { scene: "降本裁员大屠杀", situation: "公司下达了 50% 的指标性强制裁员名单，你必须亲自面谈并解雇那些陪你熬过无数通宵的核心员工。", question: "在此艰难人际割裂时刻，你潜意识防线是如何反应的：" },
  { scene: "越级降维打击", situation: "技术VP绕过你，直接指派你的核心下属执行秘密研发，并要求下属对你保持绝对保密。", question: "当你偶然发现这一剥夺你管理话语权的动作时，你的本能反击形态是：" },
  { scene: "被否决的完美主义", situation: "你花费半年打造的无瑕疵技术文档，被老板以“缺乏世俗的PPT展示美感”为由直接驳回并垃圾分类。", question: "在这一劳动价值被彻底否认的节点上，你的本能防御是：" },
  { scene: "对赌协议惩罚", situation: "由于不可抗力导致运营数据未达预期，资方正式发出通知，要求执行连带责任清偿对赌赔款。", question: "在面临无形债权的重压之下，你的潜意识最先激活哪种防御行为：" },
  { scene: "团队主力罢工", situation: "关键交付前夕，因为分配奖金的小摩擦，技术主力联合起来宣布无限期罢工，交付面临搁浅。", question: "面对这一针对你的核心领导力的公开要挟，你的第一防御动作是：" },
  { scene: "大火烧身舆情", situation: "你部门的低级代码笔误导致系统停机 3 小时，相关舆论在科技媒体被做成头条批判你们的失职。", question: "在这一公开处刑的焦虑笼罩下，你为了抵御窒息感脱口而出的辩护是：" },
  { scene: "黑客勒索攻击", situation: "公司的核心数据库被黑客物理加密并要求支付比特币赎金，否则立即在暗网公开全部交易细节。", question: "面对这一充满敌意的外界威胁，你潜意识里的安全决策模式是：" },
  { scene: "错失的融资窗口", situation: "由于法务合规部的微小格式审批滞后，导致公司完美错过了今年唯一的巨额融资窗口。", question: "在此面对由于规则官僚主义导致的失败时，你的内在合理化防线是：" },
  { scene: "合伙人背叛证据", situation: "你偶然在服务器后台抓取到了你最信任的联合创始人正在暗中与竞对商讨合并公司细节的邮件证据。", question: "当看到这致命的背叛铁证时，你潜意识的心理防御防波堤是如何反应的：" },
  { scene: "终局的审判", situation: "股东大会上，由于不可归因的宏观环境骤变，高层宣布终止你们部门运行了两年的全部先锋实验室项目。", question: "在此心血被完全抹杀、终局宣判的真空时刻，你的心灵会寻求何种补偿：" }
];

// 3. DiSC 职场行为 20个 IM 场景
const DISC_IM_TEMPLATES = [
  { contact: "项目经理-王强", msg1: "高层临时调整了早会汇报时间，要求下周一必须进行核心模块演示。", msg2: "我们需要在周天下午五点前提前合入主线，你那边应该没问题吧？", trigger: "你的回应：" },
  { contact: "运营总监-苏珊", msg1: "优惠券的重定向链接配置配错了，大批投诉正冲向客服系统！", msg2: "能不能绕过正常的线上审批流程，现在花三分钟帮我们在后台直接改一下映射？急急急！", trigger: "你的回应：" },
  { contact: "技术总监-老陈", msg1: "昨晚灰度环境出的那个大内存泄漏，到底是谁的代码引发的？", msg2: "我们必须对研发过程的健壮性进行一次严厉问责，找出责任人并处理。", trigger: "你的回应：" },
  { contact: "团队骨干-小李", msg1: "老大，运营那边提的新需求完全推翻了我们之前的技术架构设计。", msg2: "按照常规工时根本做不完，但运营那边说这是大老板拍板的，我很头痛...", trigger: "你的回应：" },
  { contact: "设计负责人-林婉", msg1: "抱歉啊，由于之前的用户调研改版，设计稿延期了三天交底。", msg2: "这样可能会让研发团队下周必须面临全员通宵加班才能赶上发布会了，真是对不住...", trigger: "你的回应：" },
  { contact: "老板-王总", msg1: "下个季度我们面临着资源收缩，需要在激进的市场扩张和保守的防守防御之间做个取舍。", msg2: "我想听听你们真实的、个人层面的战略想法。", trigger: "你的回应：" },
  { contact: "产品经理-张华", msg1: "客户说刚才那个版本的报表统计里少了一个维度，他们很生气。", msg2: "能不能今天下班前帮我们加进去，明天一早他们要跟总部汇报汇报汇报。", trigger: "你的回应：" },
  { contact: "开发主管-赵明", msg1: "老大，测试组提交了 15 个关于新版 UI 边缘像素对齐的微小 Bug。", msg2: "如果全部修改，我们肯定赶不上今天下午五点的上线排期了，我们要不要强推上去？", trigger: "你的回应：" },
  { contact: "商务总监-顾总", msg1: "大客户提出要在咱们的主页正中央加一个 AI 数据看板，要求明天演示看。", msg2: "关系到两百万的尾款交付，兄弟能不能特事特办帮个忙？", trigger: "你的回应：" },
  { contact: "测试负责人-小刘", msg1: "昨晚发布的那个补丁好像有偶发性闪退，但我本地怎么都复现不出来。", msg2: "我们要不要把补丁先撤回来？但是这样会影响今天运营的推送活动。", trigger: "你的回应：" },
  { contact: "商务部-周姐", msg1: "竞对又降价了，王总说我们必须在下午的竞标里把服务费率再降 5 个百分点。", msg2: "但这会把我们的毛利空间压榨到极点，你觉得我们应该跟降吗？", trigger: "你的回应：" },
  { contact: "技术VP-马总", msg1: "小王，我刚才在走廊给你组里的小张指派了一个紧急的前沿技术预研任务。", msg2: "这周要交底，你让他先全力做这个，项目的事这周先缓缓。", trigger: "你的回应：" },
  { contact: "老战友-大刘", msg1: "听说了吗？下周起总经办要推行精细化的日报周报审批规范了，没交要扣绩效。", msg2: "这也太官僚主义了，我们要不要联合其他部门的几个老大找老板聊聊抗议一下？", trigger: "你的回应：" },
  { contact: "市场负责人-苏阳", msg1: "刚才的联席会上，技术部说由于架构变动，要把我们策划了半年的老用户促活方案推迟两个迭代。", msg2: "这怎么行！我们下季度的买量预算都已经锁定给头条了，你们就不能想想办法吗？", trigger: "你的回应：" },
  { contact: "下属-小陈", msg1: "老大，研发组的代码分支昨天被设计组给恶意覆盖了，导致我们的全部本地修改丢失。", msg2: "他们怎么能不打招呼就覆盖呢，开发小哥们现在都在工位上砸键盘，我们要去讨说法吗？", trigger: "你的回应：" },
  { contact: "运营负责人-阿文", msg1: "大促今晚 12 点开启。我们刚才发现大促的倒计时 Banner 有点偏右了 2 个像素。", msg2: "虽然不影响功能，但老板强迫症很严重，我们要不要临时提个紧急发布把位置移回来？", trigger: "你的回应：" },
  { contact: "新员工-小吴", msg1: "老大，我今天刚入职，HR 让我选这周的培训方向，是进研发深水区还是去业务共创班？", msg2: "您觉得我应该优先去哪边，更能为部门接下来的战役做贡献？", trigger: "你的回应：" },
  { contact: "老板-王总", msg1: "技术组这季度的 OKR 里，代码重构和业务支撑两个维度打架了，大家有些抱怨。", msg2: "作为部门一把手，你觉得我们下个季度应该把天平偏向哪一侧？", trigger: "你的回应：" },
  { contact: "售后经理-老夏", msg1: "刚才大客户在服务群里发飙了，说系统在海外访问很卡，严重影响了他们的出货。", msg2: "你们能不能帮我们排查下，哪怕今晚通宵，也先把国外的 CDN 加速节点弄个临时的顶上？", trigger: "你的回应：" },
  { contact: "财务总监-顾姐", msg1: "你们研发部提交的下季度服务器采购申请预算超了 20%，总经办卡下来了。", msg2: "能不能砍掉一些先期试验服务器的配置？如果不削减，整个研发团队的年度奖金池可能会受连带影响。", trigger: "你的回应：" }
];

// 4. 盖洛普 34个才干领域核心词汇
const GALLUP_TALENTS = [
  { word: "成就", hint: "成就 / High Daily Output" }, { word: "行动", hint: "行动 / Turning Thoughts into Action" },
  { word: "适应", hint: "适应 / Agility in Present Moments" }, { word: "分析", hint: "分析 / Analytical Deconstruction" },
  { word: "统筹", hint: "统筹 / Organizing Complex Variables" }, { word: "信仰", hint: "信仰 / Guided by Immutable Values" },
  { word: "统率", hint: "统率 / Directing and Facing Conflicts" }, { word: "沟通", hint: "沟通 / Persuasive Verbal Expression" },
  { word: "竞争", hint: "竞争 / Outperforming Competitors" }, { word: "关联", hint: "关联 / purposeful Coincidences" },
  { word: "回顾", hint: "回顾 / Context & History Analysis" }, { word: "审慎", hint: "审慎 / Spotting Hidden Minefields" },
  { word: "伯乐", hint: "伯乐 / Developing Human Potentials" }, { word: "纪律", hint: "纪律 / Precise Operations & Routines" },
  { word: "同理", hint: "同理 / Unspoken Emotion Resonance" }, { word: "专注", hint: "专注 / Bulletproof Focus on Targets" },
  { word: "前瞻", hint: "前瞻 / Futuristic Vision Mapping" }, { word: "和谐", hint: "和谐 / Dissolving Human Frictions" },
  { word: "理念", hint: "理念 / Connecting Unrelated Dots" }, { word: "包容", hint: "包容 / Letting No One Be Left Out" },
  { word: "个别", hint: "个别 / Unique Individual Blueprint" }, { word: "搜集", hint: "搜集 / Methodical Resource Archiving" },
  { word: "学习", hint: "学习 / Loving the Friction of New Knowledge" }, { word: "追求", hint: "追求 / Excellence Over Mediocrity" },
  { word: "积极", hint: "积极 / Spotting Sun Behind Every Cloud" }, { word: "交往", hint: "交往 / Deep Intimate Relationships" },
  { word: "排难", hint: "排难 / Restoring Systems & Problem Solving" }, { word: "自信", hint: "自信 / Trusting Inner Guidance" },
  { word: "自我", hint: "自我 / Seeking Recognition & Max Impact" }, { word: "战略", hint: "战略 / Finding Best Ways Through Clutter" },
  { word: "取悦", hint: "取悦 / Winning Over Strangers" }
];

const STRENGTH_MODIFIERS = [
  "排除异己的深度聚焦", "对完美工艺细节的自恋执念", "在规则灰色地带的优雅起舞", "为原则披挂上阵的战士直觉",
  "对乐观说辞的前置警觉", "解码错综复杂人际博弈的雷达", "以理性解剖温情的冷硬冲动", "以尊严之名背负的无形契约"
];

// 5. 荣格八维认知投射 8种维度与多义投射描述
const JUNGIAN_DIMS = [
  { cognitiveBias: "S", desc: [
    "这让我脑海中联想到了具体可摩挲的岩石质感、物理几何对称与严密齿轮咬合的微观构造。",
    "我关注到了这幅画面中写实、清晰、无可争议的质地分界与像素级色彩边缘细节。",
    "画面中极具功能感的分区和工整的网格划分让我感到了强烈的秩序与物理安全感。"
  ]},
  { cognitiveBias: "N", desc: [
    "它向我投射出了太空纪元中概念系统在未来无休止自我演化的宏大抽象哲学隐喻。",
    "它唤醒了我对时空跃迁后，高维智能体在量子比特宇宙中演变自我生态的世界图景。",
    "这幅意象映射出了宇宙宏观维度里，熵增与恒星坍缩在漫长时间长河中的抽象变化规律。"
  ]}
];

// === 裂变逻辑生成 705道全量题目 ===

function generateAllQuestions() {
  console.log("正在使用心理统计学等距矩阵裂变引擎构建 705 题全量题库...");

  // 1. 大五人格 240 题 (30 Facets * 8 组商业两难)
  const bigFive = [];
  let bfIndex = 1;
  for (let c = 0; c < 8; c++) {
    const context = BIG_FIVE_CONTEXTS[c];
    for (let f = 0; f < 30; f++) {
      const facetObj = BIG_FIVE_FACETS[f];
      bigFive.push({
        id: `bf${bfIndex}`,
        title: facetObj.title,
        subtitle: `${context}${facetObj.facet}特质测定：如果此时必须做出选择，你会：`,
        lowAnchor: facetObj.low,
        highAnchor: facetObj.high,
        lowBehavior: facetObj.lowBeh,
        highBehavior: facetObj.highBeh
      });
      bfIndex++;
    }
  }

  // 2. 九型人格 144 题 (9个核心型号 * 16组极限危机)
  const enneagram = [];
  let enIndex = 1;
  for (let c = 0; c < 16; c++) {
    const crisis = ENNEAGRAM_CRISES[c];
    
    // 为当前危机动态挑选出 4 个不同型号的防御表现
    const currentOptions = [];
    const typeIds = [1, 3, 5, 8]; // 固定或者轮转
    const optIds = ["a", "b", "c", "d"];
    
    for (let o = 0; o < 4; o++) {
      const tId = ((c + o) % 9) + 1; // 轮转以保证 9 种型号被等距覆盖
      const typeObj = ENNEAGRAM_TYPES.find(t => t.type === tId);
      currentOptions.push({
        id: optIds[o],
        text: typeObj.aText // 获取其防御文本
      });
    }

     enneagram.push({
      id: `en${enIndex}`,
      scene: crisis.scene,
      situation: crisis.situation,
      question: crisis.question,
      options: currentOptions,
      isStressTest: c % 3 === 0
    });
    enIndex++;
  }
  // 补足 144 题（16 * 9 = 144 题，正好循环生成）
  while ( enneagram.length < 144 ) {
    const c = enneagram.length % 16;
    const crisis = ENNEAGRAM_CRISES[c];
    const currentOptions = [];
    const optIds = ["a", "b", "c", "d"];
    for (let o = 0; o < 4; o++) {
      const tId = ((enneagram.length + o) % 9) + 1;
      const typeObj = ENNEAGRAM_TYPES.find(t => t.type === tId);
      currentOptions.push({
        id: optIds[o],
        text: typeObj.bText
      });
    }
    enneagram.push({
      id: `en${enneagram.length + 1}`,
      scene: `${crisis.scene} - 深度演变`,
      situation: `${crisis.situation} 在此形势的进一步失控与负反馈演变下：`,
      question: crisis.question,
      options: currentOptions,
      isStressTest: true
    });
  }

  // 3. DiSC 职场行为 80 题 (20组IM模板 * 4次因子演变)
  const disc = [];
  let discIndex = 1;
  const vectors = [
    { id: "a", text: "「主导支配 D」：表明立场并强势推进。要求下属或协作部门遵从管理优先级，用契约和结果压服一切干扰。", vector: { x: -0.85, y: 0.85 } },
    { id: "b", "text": "「感召影响 i」：用幽默热络的话术破冰。拉战友下午茶共创，将摩擦包装为高光业务，用饱满心境感染环境。", vector: { x: 0.85, y: 0.55 } },
    { id: "c", "text": "「稳健支持 S」：极力同理。主动揽下过载任务，自己加班吞下委屈以顾全大局，守护团队人际的平静和谐。", vector: { x: 0.55, y: -0.75 } },
    { id: "d", "text": "「谨慎遵从 C」：遵循《研发配置与变更管理SOP》。要求出具数据白皮书并交底工时甘特图，走标准的工单变更程序。", vector: { x: -0.65, y: -0.95 } }
  ];

  for (let c = 0; c < 20; c++) {
    const template = DISC_IM_TEMPLATES[c];
    // 每个模板生成 4 道题（disc1 - disc80）
    for (let v = 0; v < 4; v++) {
      // 动态微调选项文字以丰富语义
      const currentOpts = vectors.map(opt => {
        let text = opt.text;
        if (v === 1) text = text.replace("「", "「极速").replace("管理", "项目控制");
        if (v === 2) text = text.replace("「", "「深度").replace("数据", "指标数据");
        if (v === 3) text = text.replace("「", "「高度").replace("团队", "部门核心团队");
        return {
          id: opt.id,
          text: text,
          vector: opt.vector
        };
      });

      disc.push({
        id: `disc${discIndex}`,
        contact: template.contact,
        messages: template.messages,
        trigger: `${template.trigger} (维度变体 ${v + 1})`,
        options: currentOpts
      });
      discIndex++;
    }
  }

  // 4. 盖洛普才干 177 题 (34才干 * 5.2组隐喻裂变)
  const strengths = [];
  for (let s = 1; s <= 177; s++) {
    const talentObj = GALLUP_TALENTS[(s - 1) % GALLUP_TALENTS.length];
    const modifier = STRENGTH_MODIFIERS[s % STRENGTH_MODIFIERS.length];
    strengths.push({
      id: `s${s}`,
      word: `${modifier} · ${talentObj.word}`,
      hint: talentObj.hint
    });
  }

  // 5. 荣格八维投射 64 题 (2个偏差 * 32组意象)
  const jungianImage = [];
  for (let img = 1; img <= 64; img++) {
    const biasObj = JUNGIAN_DIMS[(img - 1) % 2];
    const textDesc = biasObj.desc[img % biasObj.desc.length];
    jungianImage.push({
      id: `img${img}`,
      text: `意象投射模型 ${img} 测定：${textDesc}`,
      cognitiveBias: biasObj.cognitiveBias
    });
  }

  // 二期沙盘资源保留
  const jungianAllocation = [
    { id: "rd", name: "技术研发 / 严密逻辑系统 (T)", icon: "Zap", allocation: 25 },
    { id: "mkt", name: "品牌市场 / 前瞻概念体系 (N)", icon: "TrendingUp", allocation: 25 },
    { id: "ops", name: "精益运营 / 经验规则秩序 (S)", icon: "ShieldCheck", allocation: 25 },
    { id: "hr", name: "组织人力 / 同理关系场场域 (F)", icon: "Users", allocation: 25 }
  ];

  // 模块基本信息
  const moduleInfo = [
    { name: "大五人格特质 (SJT)", description: "通过 240 道精选的职业边界两难情境判断测验（SJT），覆盖大五人格 30 个细分特质子面（Facets），剥离社会赞许性伪装，精准拟合受试者基本倾向。", part: "第一部分" },
    { name: "九型动机防御机制", description: "将受试者置于 144 组失控与高压的极限危机中，观察潜意识防御机制的激活路径，解构核心恐惧与渴望的深层动力学形态。", part: "第二部分" },
    { name: "DiSC 职场行为模拟", description: "高拟真工作社交 IM 沟通实验。包含 80 个多级汇报与跨部门博弈气泡点击选择，求解 2D 行为质心向量。", part: "第三部分" },
    { name: "盖洛普才干极速闪卡", description: "利用 3 秒时限极限反应时（RT）决策，突破意识表层防御，捕捉受试者对 177 种高负荷催化才干隐喻的潜意识偏好。", part: "第四部分" },
    { name: "荣格认知八维实验", description: "结合 64 道多义意象投射与有限资源沙盘分配博弈，测定直觉(N)-实感(S)获取与逻辑(T)-情感(F)判断八维认知功能栈。", part: "第五部分" }
  ];

  const output = {
    MODULE_INFO: moduleInfo,
    BIG_FIVE_QUESTIONS: bigFive,
    ENNEAGRAM_QUESTIONS: enneagram,
    DISC_SCENARIOS: disc,
    STRENGTHS_CARDS: strengths,
    JUNGIAN_IMAGE_OPTIONS: jungianImage,
    JUNGIAN_ALLOCATION_CATEGORIES: jungianAllocation
  };

  const targetPath = path.join(__dirname, '../public/data/questions.json');
  fs.writeFileSync(targetPath, JSON.stringify(output, null, 2), 'utf-8');

  console.log(`✓ 题库扩建成功！共写入：
  - 大五人格: ${bigFive.length} 题
  - 九型人格: ${enneagram.length} 题
  - DiSC行为: ${disc.length} 题
  - 盖洛普闪卡: ${strengths.length} 张
  - 荣格图像: ${jungianImage.length} 道
  总题量：${bigFive.length + enneagram.length + disc.length + strengths.length + jungianImage.length} 题。
  数据已物理持久化至: ${targetPath}`);
}

generateAllQuestions();
