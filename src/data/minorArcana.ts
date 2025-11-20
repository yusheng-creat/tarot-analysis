import { TarotCard } from '../types';

// 权杖牌组 (Wands) - 代表火元素，象征创造力、激情、行动
export const wands: TarotCard[] = [
  {
    id: 'minor_wands_1',
    name: '权杖王牌',
    nameEn: 'Ace of Wands',
    suit: 'wands',
    type: 'minor',
    number: 1,
    isReversed: false,
    image: '/images/minor/wands/01-ace-of-wands.jpg',
    keywords: ['新开始', '创造力', '灵感', '潜力', '机会'],
    meaning: {
      upright: '权杖王牌代表新的创意项目、灵感的火花和充满潜力的开始。这是行动和创造的时机。',
      reversed: '逆位可能表示缺乏方向、创意受阻或错过了机会。'
    },
    description: '一只手从云中伸出，握着一根绿叶茂盛的权杖，象征着新的创造力和生命力。'
  },
  {
    id: 'minor_wands_2',
    name: '权杖二',
    nameEn: 'Two of Wands',
    suit: 'wands',
    type: 'minor',
    number: 2,
    isReversed: false,
    image: '/images/minor/wands/02-two-of-wands.jpg',
    keywords: ['规划', '远见', '个人力量', '控制', '未来'],
    meaning: {
      upright: '权杖二代表个人力量、长远规划和对未来的控制。你正在制定重要的人生计划。',
      reversed: '逆位可能表示缺乏规划、恐惧未知或个人力量的滥用。'
    },
    description: '一个人站在城堡上俯瞰世界，手持地球仪，象征着个人力量和对未来的掌控。'
  },
  {
    id: 'minor_wands_3',
    name: '权杖三',
    nameEn: 'Three of Wands',
    suit: 'wands',
    type: 'minor',
    number: 3,
    isReversed: false,
    image: '/images/minor/wands/03-three-of-wands.jpg',
    keywords: ['扩展', '远见', '领导', '贸易', '探索'],
    meaning: {
      upright: '权杖三代表扩展、远见和领导能力。你的计划正在实施，成功在望。',
      reversed: '逆位可能表示缺乏远见、计划延迟或扩展受阻。'
    },
    description: '一个人站在高处眺望远方的船只，象征着扩展和对未来的期待。'
  },
  {
    id: 'minor_wands_4',
    name: '权杖四',
    nameEn: 'Four of Wands',
    suit: 'wands',
    type: 'minor',
    number: 4,
    isReversed: false,
    image: '/images/minor/wands/04-four-of-wands.jpg',
    keywords: ['庆祝', '和谐', '家庭', '稳定', '成就'],
    meaning: {
      upright: '权杖四代表庆祝、和谐和家庭的稳定。这是一个值得庆祝的成就时刻。',
      reversed: '逆位可能表示家庭不和、缺乏稳定或庆祝被推迟。'
    },
    description: '四根权杖形成拱门，人们在下面庆祝，象征着和谐与成就。'
  },
  {
    id: 'minor_wands_5',
    name: '权杖五',
    nameEn: 'Five of Wands',
    suit: 'wands',
    type: 'minor',
    number: 5,
    isReversed: false,
    image: '/images/minor/wands/05-five-of-wands.jpg',
    keywords: ['冲突', '竞争', '挑战', '混乱', '争斗'],
    meaning: {
      upright: '权杖五代表冲突、竞争和挑战。你可能面临激烈的竞争或内部争斗。',
      reversed: '逆位可能表示避免冲突、内在冲突或竞争结束。'
    },
    description: '五个人挥舞权杖互相争斗，象征着竞争和冲突。'
  },
  {
    id: 'minor_wands_6',
    name: '权杖六',
    nameEn: 'Six of Wands',
    suit: 'wands',
    type: 'minor',
    number: 6,
    isReversed: false,
    image: '/images/minor/wands/06-six-of-wands.jpg',
    keywords: ['胜利', '成功', '认可', '领导', '成就'],
    meaning: {
      upright: '权杖六代表胜利、成功和公众认可。你的努力得到了回报和赞赏。',
      reversed: '逆位可能表示失败、缺乏认可或成功被推迟。'
    },
    description: '一个骑马的胜利者，头戴月桂花环，周围是欢呼的人群。'
  },
  {
    id: 'minor_wands_7',
    name: '权杖七',
    nameEn: 'Seven of Wands',
    suit: 'wands',
    type: 'minor',
    number: 7,
    isReversed: false,
    image: '/images/minor/wands/07-seven-of-wands.jpg',
    keywords: ['防御', '坚持', '挑战', '勇气', '立场'],
    meaning: {
      upright: '权杖七代表防御、坚持立场和面对挑战的勇气。你需要为自己的信念而战。',
      reversed: '逆位可能表示放弃、缺乏信心或被压倒。'
    },
    description: '一个人站在高处，用权杖抵御来自下方的攻击，象征着坚持和防御。'
  },
  {
    id: 'minor_wands_8',
    name: '权杖八',
    nameEn: 'Eight of Wands',
    suit: 'wands',
    type: 'minor',
    number: 8,
    isReversed: false,
    image: '/images/minor/wands/08-eight-of-wands.jpg',
    keywords: ['速度', '行动', '进展', '消息', '旅行'],
    meaning: {
      upright: '权杖八代表快速的行动、进展和消息的传递。事情正在快速发展。',
      reversed: '逆位可能表示延迟、缺乏进展或沟通问题。'
    },
    description: '八根权杖快速飞过天空，象征着速度和快速的进展。'
  },
  {
    id: 'minor_wands_9',
    name: '权杖九',
    nameEn: 'Nine of Wands',
    suit: 'wands',
    type: 'minor',
    number: 9,
    isReversed: false,
    image: '/images/minor/wands/09-nine-of-wands.jpg',
    keywords: ['坚韧', '毅力', '防御', '警惕', '最后努力'],
    meaning: {
      upright: '权杖九代表坚韧、毅力和最后的努力。虽然疲惫，但要坚持到最后。',
      reversed: '逆位可能表示放弃、缺乏毅力或过度防御。'
    },
    description: '一个受伤的战士靠着权杖，警惕地守护着自己的阵地。'
  },
  {
    id: 'minor_wands_10',
    name: '权杖十',
    nameEn: 'Ten of Wands',
    suit: 'wands',
    type: 'minor',
    number: 10,
    isReversed: false,
    image: '/images/minor/wands/10-ten-of-wands.jpg',
    keywords: ['负担', '责任', '压力', '完成', '重担'],
    meaning: {
      upright: '权杖十代表沉重的负担、过多的责任和压力。你可能承担了太多。',
      reversed: '逆位可能表示卸下负担、委派责任或寻求帮助。'
    },
    description: '一个人背负着十根沉重的权杖，艰难地向前行走。'
  },
  {
    id: 'minor_wands_11',
    name: '权杖侍从',
    nameEn: 'Page of Wands',
    suit: 'wands',
    type: 'minor',
    number: 11,
    isReversed: false,
    image: '/images/minor/wands/11-page-of-wands.jpg',
    keywords: ['热情', '冒险', '学习', '消息', '探索'],
    meaning: {
      upright: '权杖侍从代表热情、冒险精神和学习的渴望。新的机会和消息即将到来。',
      reversed: '逆位可能表示缺乏方向、鲁莽或坏消息。'
    },
    description: '年轻的侍从手持权杖，充满热情地凝视着远方。'
  },
  {
    id: 'minor_wands_12',
    name: '权杖骑士',
    nameEn: 'Knight of Wands',
    suit: 'wands',
    type: 'minor',
    number: 12,
    isReversed: false,
    image: '/images/minor/wands/12-knight-of-wands.jpg',
    keywords: ['行动', '冲动', '冒险', '热情', '鲁莽'],
    meaning: {
      upright: '权杖骑士代表快速行动、冲动和冒险精神。他充满热情但有时过于鲁莽。',
      reversed: '逆位可能表示鲁莽、缺乏耐心或行动受阻。'
    },
    description: '骑士骑着烈马，手持权杖，准备冲向冒险。'
  },
  {
    id: 'minor_wands_13',
    name: '权杖王后',
    nameEn: 'Queen of Wands',
    suit: 'wands',
    type: 'minor',
    number: 13,
    isReversed: false,
    image: '/images/minor/wands/13-queen-of-wands.jpg',
    keywords: ['自信', '独立', '热情', '创造力', '领导'],
    meaning: {
      upright: '权杖王后代表自信、独立和创造性的领导。她充满热情且具有强大的个人魅力。',
      reversed: '逆位可能表示缺乏自信、嫉妒或滥用权力。'
    },
    description: '王后坐在王座上，手持权杖和向日葵，象征着自信和创造力。'
  },
  {
    id: 'minor_wands_14',
    name: '权杖国王',
    nameEn: 'King of Wands',
    suit: 'wands',
    type: 'minor',
    number: 14,
    isReversed: false,
    image: '/images/minor/wands/14-king-of-wands.jpg',
    keywords: ['领导力', '远见', '企业家精神', '成熟', '权威'],
    meaning: {
      upright: '权杖国王代表成熟的领导者、企业家精神和远见卓识。他是天生的领袖和创新者。',
      reversed: '逆位可能表示专制、缺乏远见或滥用权威。'
    },
    description: '国王坐在王座上，手持权杖，身后有火焰图案，象征着成熟的领导力和创造力。'
  }
];

// 圣杯牌组 (Cups) - 代表水元素，象征情感、直觉、关系
export const cups: TarotCard[] = [
  {
    id: 'minor_cups_1',
    name: '圣杯王牌',
    nameEn: 'Ace of Cups',
    suit: 'cups',
    type: 'minor',
    number: 1,
    isReversed: false,
    image: '/images/minor/cups/01-ace-of-cups.jpg',
    keywords: ['新感情', '直觉', '精神觉醒', '爱', '创造力'],
    meaning: {
      upright: '圣杯王牌代表新的感情开始、精神觉醒和直觉的开启。爱和创造力正在涌现。',
      reversed: '逆位可能表示情感封闭、错过机会或精神空虚。'
    },
    description: '一只手从云中伸出，握着溢满水的圣杯，鸽子衔着圣饼飞向杯中，象征着精神的恩赐。'
  },
  {
    id: 'minor_cups_2',
    name: '圣杯二',
    nameEn: 'Two of Cups',
    suit: 'cups',
    type: 'minor',
    number: 2,
    isReversed: false,
    image: '/images/minor/cups/02-two-of-cups.jpg',
    keywords: ['伙伴关系', '爱情', '和谐', '连接', '平衡'],
    meaning: {
      upright: '圣杯二代表伙伴关系、爱情和情感的和谐。两个人之间建立了深刻的连接。',
      reversed: '逆位可能表示关系不和、缺乏平衡或情感分离。'
    },
    description: '一男一女举杯相敬，上方有狮鹰头像，象征着爱情和伙伴关系的神圣结合。'
  },
  {
    id: 'minor_cups_3',
    name: '圣杯三',
    nameEn: 'Three of Cups',
    suit: 'cups',
    type: 'minor',
    number: 3,
    isReversed: false,
    image: '/images/minor/cups/03-three-of-cups.jpg',
    keywords: ['友谊', '庆祝', '社交', '团体', '快乐'],
    meaning: {
      upright: '圣杯三代表友谊、庆祝和社交活动。这是与朋友分享快乐的时刻。',
      reversed: '逆位可能表示社交问题、孤立或庆祝被推迟。'
    },
    description: '三个女性举杯庆祝，象征着友谊和集体的快乐。'
  },
  {
    id: 'minor_cups_4',
    name: '圣杯四',
    nameEn: 'Four of Cups',
    suit: 'cups',
    type: 'minor',
    number: 4,
    isReversed: false,
    image: '/images/minor/cups/04-four-of-cups.jpg',
    keywords: ['冷漠', '不满', '机会', '内省', '重新评估'],
    meaning: {
      upright: '圣杯四代表冷漠、对现状的不满和错过的机会。需要重新评估自己的情感状态。',
      reversed: '逆位可能表示重新燃起兴趣、接受机会或走出冷漠。'
    },
    description: '一个人坐在树下，面前有三个杯子，云中伸出手递来第四个杯子，但他似乎没有注意到。'
  },
  {
    id: 'minor_cups_5',
    name: '圣杯五',
    nameEn: 'Five of Cups',
    suit: 'cups',
    type: 'minor',
    number: 5,
    isReversed: false,
    image: '/images/minor/cups/05-five-of-cups.jpg',
    keywords: ['失望', '悲伤', '损失', '遗憾', '哀悼'],
    meaning: {
      upright: '圣杯五代表失望、悲伤和情感上的损失。需要时间来哀悼和治愈。',
      reversed: '逆位可能表示从悲伤中恢复、接受损失或寻找新希望。'
    },
    description: '一个黑衣人凝视着三个倒下的杯子，身后还有两个完好的杯子，象征着在损失中寻找希望。'
  },
  {
    id: 'minor_cups_6',
    name: '圣杯六',
    nameEn: 'Six of Cups',
    suit: 'cups',
    type: 'minor',
    number: 6,
    isReversed: false,
    image: '/images/minor/cups/06-six-of-cups.jpg',
    keywords: ['怀旧', '童年', '纯真', '回忆', '礼物'],
    meaning: {
      upright: '圣杯六代表怀旧、童年回忆和纯真的快乐。过去的美好时光带来慰藉。',
      reversed: '逆位可能表示沉溺于过去、无法前进或童年创伤。'
    },
    description: '一个孩子向另一个孩子赠送装满花朵的杯子，象征着纯真的给予和童年的美好。'
  },
  {
    id: 'minor_cups_7',
    name: '圣杯七',
    nameEn: 'Seven of Cups',
    suit: 'cups',
    type: 'minor',
    number: 7,
    isReversed: false,
    image: '/images/minor/cups/07-seven-of-cups.jpg',
    keywords: ['幻想', '选择', '诱惑', '白日梦', '困惑'],
    meaning: {
      upright: '圣杯七代表幻想、过多的选择和诱惑。需要区分现实和幻象，做出明智的选择。',
      reversed: '逆位可能表示清晰的选择、现实主义或克服诱惑。'
    },
    description: '一个人面对七个杯子，每个杯子中都有不同的幻象，象征着选择的困惑。'
  },
  {
    id: 'minor_cups_8',
    name: '圣杯八',
    nameEn: 'Eight of Cups',
    suit: 'cups',
    type: 'minor',
    number: 8,
    isReversed: false,
    image: '/images/minor/cups/08-eight-of-cups.jpg',
    keywords: ['放弃', '寻找', '精神追求', '离开', '成长'],
    meaning: {
      upright: '圣杯八代表放弃不再满足的事物，寻找更深层的意义和精神成长。',
      reversed: '逆位可能表示恐惧改变、逃避现实或回到过去。'
    },
    description: '一个人离开八个杯子，向山上走去，象征着放弃物质追求更高的精神境界。'
  },
  {
    id: 'minor_cups_9',
    name: '圣杯九',
    nameEn: 'Nine of Cups',
    suit: 'cups',
    type: 'minor',
    number: 9,
    isReversed: false,
    image: '/images/minor/cups/09-nine-of-cups.jpg',
    keywords: ['满足', '愿望成真', '快乐', '成就', '享受'],
    meaning: {
      upright: '圣杯九代表满足、愿望的实现和情感上的成就。这是"许愿牌"，预示着快乐。',
      reversed: '逆位可能表示不满足、贪婪或空虚的成功。'
    },
    description: '一个满足的人坐在九个杯子前，双臂交叉，表情愉悦，象征着愿望的实现。'
  },
  {
    id: 'minor_cups_10',
    name: '圣杯十',
    nameEn: 'Ten of Cups',
    suit: 'cups',
    type: 'minor',
    number: 10,
    isReversed: false,
    image: '/images/minor/cups/10-ten-of-cups.jpg',
    keywords: ['家庭幸福', '和谐', '情感满足', '完美', '祝福'],
    meaning: {
      upright: '圣杯十代表家庭幸福、情感的完满和人际关系的和谐。这是情感上的完美状态。',
      reversed: '逆位可能表示家庭不和、关系破裂或情感空虚。'
    },
    description: '一个幸福的家庭在彩虹下庆祝，十个杯子排列在天空中，象征着完美的情感满足。'
  },
  {
    id: 'minor_cups_11',
    name: '圣杯侍从',
    nameEn: 'Page of Cups',
    suit: 'cups',
    type: 'minor',
    number: 11,
    isReversed: false,
    image: '/images/minor/cups/11-page-of-cups.jpg',
    keywords: ['直觉', '创造力', '情感消息', '艺术', '敏感'],
    meaning: {
      upright: '圣杯侍从代表直觉、创造力和情感上的新消息。他是艺术和灵感的使者。',
      reversed: '逆位可能表示情感不成熟、创意受阻或坏消息。'
    },
    description: '年轻的侍从手持圣杯，杯中跳出一条鱼，象征着直觉和创造力的涌现。'
  },
  {
    id: 'minor_cups_12',
    name: '圣杯骑士',
    nameEn: 'Knight of Cups',
    suit: 'cups',
    type: 'minor',
    number: 12,
    isReversed: false,
    image: '/images/minor/cups/12-knight-of-cups.jpg',
    keywords: ['浪漫', '理想主义', '追求', '情感', '骑士精神'],
    meaning: {
      upright: '圣杯骑士代表浪漫、理想主义和情感的追求。他是爱情和美的追寻者。',
      reversed: '逆位可能表示不切实际、情感波动或失望。'
    },
    description: '骑士骑着白马，手持圣杯，象征着浪漫的追求和理想主义。'
  },
  {
    id: 'minor_cups_13',
    name: '圣杯王后',
    nameEn: 'Queen of Cups',
    suit: 'cups',
    type: 'minor',
    number: 13,
    isReversed: false,
    image: '/images/minor/cups/13-queen-of-cups.jpg',
    keywords: ['直觉', '同情心', '情感智慧', '滋养', '灵性'],
    meaning: {
      upright: '圣杯王后代表直觉、同情心和情感智慧。她是滋养和治愈的象征。',
      reversed: '逆位可能表示情感不稳定、过度敏感或缺乏界限。'
    },
    description: '王后坐在海边的王座上，手持装饰华丽的圣杯，象征着情感的深度和直觉的智慧。'
  },
  {
    id: 'minor_cups_14',
    name: '圣杯国王',
    nameEn: 'King of Cups',
    suit: 'cups',
    type: 'minor',
    number: 14,
    isReversed: false,
    image: '/images/minor/cups/14-king-of-cups.jpg',
    keywords: ['情感成熟', '平衡', '外交', '智慧', '控制'],
    meaning: {
      upright: '圣杯国王代表情感的成熟、平衡的智慧和外交手腕。他能够控制情感而不被情感控制。',
      reversed: '逆位可能表示情感压抑、操控他人或缺乏同情心。'
    },
    description: '国王坐在海上的王座上，手持圣杯，周围波涛汹涌但他保持平静，象征着情感的掌控。'
  }
];

// 宝剑牌组 (Swords) - 代表风元素，象征思想、沟通、冲突
export const swords: TarotCard[] = [
  {
    id: 'minor_swords_1',
    name: '宝剑王牌',
    nameEn: 'Ace of Swords',
    suit: 'swords',
    type: 'minor',
    number: 1,
    isReversed: false,
    image: '/images/minor/swords/01-ace-of-swords.jpg',
    keywords: ['新想法', '清晰', '真相', '突破', '智力'],
    meaning: {
      upright: '宝剑王牌代表新的想法、清晰的思维和真相的显现。这是智力突破和新认知的开始。',
      reversed: '逆位可能表示思维混乱、缺乏清晰度或错误的想法。'
    },
    description: '一只手从云中伸出，握着一把双刃剑，剑尖戴着王冠，象征着智力的力量和真相。'
  },
  {
    id: 'minor_swords_2',
    name: '宝剑二',
    nameEn: 'Two of Swords',
    suit: 'swords',
    type: 'minor',
    number: 2,
    isReversed: false,
    image: '/images/minor/swords/02-two-of-swords.jpg',
    keywords: ['选择', '平衡', '僵局', '决策', '困惑'],
    meaning: {
      upright: '宝剑二代表困难的选择、内心的冲突和需要做出的重要决策。',
      reversed: '逆位可能表示决策混乱、偏见或逃避选择。'
    },
    description: '一个蒙眼的女性双手持剑交叉在胸前，象征着内心的平衡和困难的选择。'
  },
  {
    id: 'minor_swords_3',
    name: '宝剑三',
    nameEn: 'Three of Swords',
    suit: 'swords',
    type: 'minor',
    number: 3,
    isReversed: false,
    image: '/images/minor/swords/03-three-of-swords.jpg',
    keywords: ['心碎', '悲伤', '背叛', '痛苦', '分离'],
    meaning: {
      upright: '宝剑三代表心碎、情感痛苦和背叛的伤害。这是一个需要治愈的时期。',
      reversed: '逆位可能表示从痛苦中恢复、宽恕或治愈开始。'
    },
    description: '三把剑刺穿一颗红心，乌云密布，象征着深刻的情感痛苦。'
  },
  {
    id: 'minor_swords_4',
    name: '宝剑四',
    nameEn: 'Four of Swords',
    suit: 'swords',
    type: 'minor',
    number: 4,
    isReversed: false,
    image: '/images/minor/swords/04-four-of-swords.jpg',
    keywords: ['休息', '冥想', '恢复', '平静', '反思'],
    meaning: {
      upright: '宝剑四代表休息、冥想和精神的恢复。这是一个需要静养和反思的时期。',
      reversed: '逆位可能表示不安、焦虑或无法休息。'
    },
    description: '一个人平躺在石棺上，三把剑悬在上方，一把剑在身下，象征着平静的休息。'
  },
  {
    id: 'minor_swords_5',
    name: '宝剑五',
    nameEn: 'Five of Swords',
    suit: 'swords',
    type: 'minor',
    number: 5,
    isReversed: false,
    image: '/images/minor/swords/05-five-of-swords.jpg',
    keywords: ['冲突', '失败', '羞辱', '背叛', '胜负'],
    meaning: {
      upright: '宝剑五代表冲突、失败和不光彩的胜利。有时胜利的代价太高。',
      reversed: '逆位可能表示和解、学习教训或避免冲突。'
    },
    description: '一个人收集散落的剑，其他人沮丧地离开，象征着冲突后的胜负。'
  },
  {
    id: 'minor_swords_6',
    name: '宝剑六',
    nameEn: 'Six of Swords',
    suit: 'swords',
    type: 'minor',
    number: 6,
    isReversed: false,
    image: '/images/minor/swords/06-six-of-swords.jpg',
    keywords: ['过渡', '旅行', '离开', '平静', '前进'],
    meaning: {
      upright: '宝剑六代表过渡、从困难中走出和向平静水域前进。',
      reversed: '逆位可能表示停滞、无法前进或抗拒改变。'
    },
    description: '一艘船载着乘客和六把剑渡过平静的水面，象征着从动荡走向平静。'
  },
  {
    id: 'minor_swords_7',
    name: '宝剑七',
    nameEn: 'Seven of Swords',
    suit: 'swords',
    type: 'minor',
    number: 7,
    isReversed: false,
    image: '/images/minor/swords/07-seven-of-swords.jpg',
    keywords: ['欺骗', '策略', '偷窃', '狡猾', '逃避'],
    meaning: {
      upright: '宝剑七代表欺骗、策略和不诚实的行为。需要小心他人的欺骗。',
      reversed: '逆位可能表示诚实、坦白或被发现的欺骗。'
    },
    description: '一个人偷偷拿走五把剑，留下两把，象征着狡猾和欺骗。'
  },
  {
    id: 'minor_swords_8',
    name: '宝剑八',
    nameEn: 'Eight of Swords',
    suit: 'swords',
    type: 'minor',
    number: 8,
    isReversed: false,
    image: '/images/minor/swords/08-eight-of-swords.jpg',
    keywords: ['束缚', '限制', '困境', '无助', '受困'],
    meaning: {
      upright: '宝剑八代表感到被束缚、限制和无助。但束缚往往是自我施加的。',
      reversed: '逆位可能表示解脱、自由或克服限制。'
    },
    description: '一个蒙眼绑手的女性被八把剑围绕，但脚下的路是通畅的，象征着自我限制。'
  },
  {
    id: 'minor_swords_9',
    name: '宝剑九',
    nameEn: 'Nine of Swords',
    suit: 'swords',
    type: 'minor',
    number: 9,
    isReversed: false,
    image: '/images/minor/swords/09-nine-of-swords.jpg',
    keywords: ['焦虑', '噩梦', '恐惧', '绝望', '痛苦'],
    meaning: {
      upright: '宝剑九代表深度的焦虑、噩梦和精神痛苦。恐惧往往比现实更可怕。',
      reversed: '逆位可能表示希望、治愈或走出黑暗。'
    },
    description: '一个人在床上痛苦地坐起，九把剑悬在墙上，象征着内心的恐惧和焦虑。'
  },
  {
    id: 'minor_swords_10',
    name: '宝剑十',
    nameEn: 'Ten of Swords',
    suit: 'swords',
    type: 'minor',
    number: 10,
    isReversed: false,
    image: '/images/minor/swords/10-ten-of-swords.jpg',
    keywords: ['结束', '背叛', '痛苦', '失败', '重生'],
    meaning: {
      upright: '宝剑十代表痛苦的结束、彻底的失败，但也是新开始的前奏。',
      reversed: '逆位可能表示恢复、重生或从失败中学习。'
    },
    description: '一个人被十把剑刺中倒地，但远方的太阳正在升起，象征着痛苦的结束和新的开始。'
  },
  {
    id: 'minor_swords_11',
    name: '宝剑侍从',
    nameEn: 'Page of Swords',
    suit: 'swords',
    type: 'minor',
    number: 11,
    isReversed: false,
    image: '/images/minor/swords/11-page-of-swords.jpg',
    keywords: ['好奇', '学习', '消息', '警觉', '思考'],
    meaning: {
      upright: '宝剑侍从代表好奇心、学习的渴望和新的想法。他是知识的追求者。',
      reversed: '逆位可能表示八卦、恶意或缺乏专注。'
    },
    description: '年轻的侍从高举宝剑，警觉地环顾四周，象征着好奇心和学习的态度。'
  },
  {
    id: 'minor_swords_12',
    name: '宝剑骑士',
    nameEn: 'Knight of Swords',
    suit: 'swords',
    type: 'minor',
    number: 12,
    isReversed: false,
    image: '/images/minor/swords/12-knight-of-swords.jpg',
    keywords: ['行动', '冲动', '勇敢', '鲁莽', '直接'],
    meaning: {
      upright: '宝剑骑士代表快速行动、勇敢但有时鲁莽的行为。他直接而果断。',
      reversed: '逆位可能表示鲁莽、缺乏计划或行动受阻。'
    },
    description: '骑士骑着白马疾驰，高举宝剑，象征着勇敢和直接的行动。'
  },
  {
    id: 'minor_swords_13',
    name: '宝剑王后',
    nameEn: 'Queen of Swords',
    suit: 'swords',
    type: 'minor',
    number: 13,
    isReversed: false,
    image: '/images/minor/swords/13-queen-of-swords.jpg',
    keywords: ['智慧', '独立', '清晰', '公正', '直接'],
    meaning: {
      upright: '宝剑王后代表智慧、独立和清晰的判断。她是理性和公正的象征。',
      reversed: '逆位可能表示冷酷、偏见或情感封闭。'
    },
    description: '王后坐在王座上，右手持剑，左手伸出，象征着智慧的判断和公正。'
  },
  {
    id: 'minor_swords_14',
    name: '宝剑国王',
    nameEn: 'King of Swords',
    suit: 'swords',
    type: 'minor',
    number: 14,
    isReversed: false,
    image: '/images/minor/swords/14-king-of-swords.jpg',
    keywords: ['权威', '智力', '公正', '决断', '领导'],
    meaning: {
      upright: '宝剑国王代表智力权威、公正的领导和果断的决策。他是理性思维的典范。',
      reversed: '逆位可能表示滥用权力、缺乏同情心或过度严厉。'
    },
    description: '国王坐在王座上，右手持剑，表情严肃，象征着理性的权威和公正的统治。'
  }
];

// 星币牌组 (Pentacles) - 代表土元素，象征物质、金钱、实用
export const pentacles: TarotCard[] = [
  {
    id: 'minor_pentacles_1',
    name: '星币王牌',
    nameEn: 'Ace of Pentacles',
    suit: 'pentacles',
    type: 'minor',
    number: 1,
    isReversed: false,
    image: '/images/minor/pentacles/01-ace-of-pentacles.jpg',
    keywords: ['新机会', '繁荣', '物质开始', '投资', '潜力'],
    meaning: {
      upright: '星币王牌代表新的物质机会、繁荣的开始和投资的潜力。这是财务成功的种子。',
      reversed: '逆位可能表示错过机会、财务不稳定或缺乏实用性。'
    },
    description: '一只手从云中伸出，握着一枚金色的星币，下方是美丽的花园，象征着物质繁荣的开始。'
  },
  {
    id: 'minor_pentacles_2',
    name: '星币二',
    nameEn: 'Two of Pentacles',
    suit: 'pentacles',
    type: 'minor',
    number: 2,
    isReversed: false,
    image: '/images/minor/pentacles/02-two-of-pentacles.jpg',
    keywords: ['平衡', '适应', '灵活', '多任务', '变化'],
    meaning: {
      upright: '星币二代表平衡多个责任、适应变化和灵活处理事务的能力。',
      reversed: '逆位可能表示失衡、过度承担或无法适应变化。'
    },
    description: '一个人手持两枚星币，在无穷符号中保持平衡，象征着灵活性和适应能力。'
  },
  {
    id: 'minor_pentacles_3',
    name: '星币三',
    nameEn: 'Three of Pentacles',
    suit: 'pentacles',
    type: 'minor',
    number: 3,
    isReversed: false,
    image: '/images/minor/pentacles/03-three-of-pentacles.jpg',
    keywords: ['合作', '团队', '技能', '学习', '建设'],
    meaning: {
      upright: '星币三代表团队合作、技能学习和共同建设。通过合作实现更大的成就。',
      reversed: '逆位可能表示缺乏合作、技能不足或团队冲突。'
    },
    description: '工匠们在教堂中合作建设，象征着团队协作和技能的结合。'
  },
  {
    id: 'minor_pentacles_4',
    name: '星币四',
    nameEn: 'Four of Pentacles',
    suit: 'pentacles',
    type: 'minor',
    number: 4,
    isReversed: false,
    image: '/images/minor/pentacles/04-four-of-pentacles.jpg',
    keywords: ['保守', '控制', '安全', '贪婪', '稳定'],
    meaning: {
      upright: '星币四代表对财富的控制、保守的态度和对安全的渴望。有时可能过于吝啬。',
      reversed: '逆位可能表示慷慨、释放控制或财务自由。'
    },
    description: '一个人紧紧抱着四枚星币，象征着对物质的控制和保护。'
  },
  {
    id: 'minor_pentacles_5',
    name: '星币五',
    nameEn: 'Five of Pentacles',
    suit: 'pentacles',
    type: 'minor',
    number: 5,
    isReversed: false,
    image: '/images/minor/pentacles/05-five-of-pentacles.jpg',
    keywords: ['贫困', '困难', '排斥', '需要', '精神贫乏'],
    meaning: {
      upright: '星币五代表物质困难、感到被排斥和精神上的贫乏。但帮助往往就在身边。',
      reversed: '逆位可能表示恢复、接受帮助或走出困境。'
    },
    description: '两个贫困的人在雪中经过教堂，象征着困难时期和寻求帮助。'
  },
  {
    id: 'minor_pentacles_6',
    name: '星币六',
    nameEn: 'Six of Pentacles',
    suit: 'pentacles',
    type: 'minor',
    number: 6,
    isReversed: false,
    image: '/images/minor/pentacles/06-six-of-pentacles.jpg',
    keywords: ['慷慨', '分享', '公平', '互助', '平衡'],
    meaning: {
      upright: '星币六代表慷慨的给予、公平的分享和互相帮助。财富的流动带来平衡。',
      reversed: '逆位可能表示不公平、自私或施舍的不当动机。'
    },
    description: '一个富人向穷人分发金币，手持天平，象征着公平的给予和接受。'
  },
  {
    id: 'minor_pentacles_7',
    name: '星币七',
    nameEn: 'Seven of Pentacles',
    suit: 'pentacles',
    type: 'minor',
    number: 7,
    isReversed: false,
    image: '/images/minor/pentacles/07-seven-of-pentacles.jpg',
    keywords: ['评估', '耐心', '投资', '等待', '收获'],
    meaning: {
      upright: '星币七代表评估进展、耐心等待和长期投资的回报。需要时间来看到结果。',
      reversed: '逆位可能表示缺乏耐心、急于求成或投资失败。'
    },
    description: '一个农夫靠着锄头，凝视着长满星币的植物，象征着耐心等待收获。'
  },
  {
    id: 'minor_pentacles_8',
    name: '星币八',
    nameEn: 'Eight of Pentacles',
    suit: 'pentacles',
    type: 'minor',
    number: 8,
    isReversed: false,
    image: '/images/minor/pentacles/08-eight-of-pentacles.jpg',
    keywords: ['技艺', '专注', '学习', '完善', '勤奋'],
    meaning: {
      upright: '星币八代表专注于技艺、勤奋学习和追求完美。通过努力提升技能。',
      reversed: '逆位可能表示缺乏专注、技能停滞或完美主义。'
    },
    description: '一个工匠专心致志地雕刻星币，象征着对技艺的专注和追求完美。'
  },
  {
    id: 'minor_pentacles_9',
    name: '星币九',
    nameEn: 'Nine of Pentacles',
    suit: 'pentacles',
    type: 'minor',
    number: 9,
    isReversed: false,
    image: '/images/minor/pentacles/09-nine-of-pentacles.jpg',
    keywords: ['独立', '成功', '享受', '自给自足', '奢华'],
    meaning: {
      upright: '星币九代表独立的成功、享受成果和自给自足的生活。这是个人成就的体现。',
      reversed: '逆位可能表示依赖他人、财务不安全或空虚的成功。'
    },
    description: '一位优雅的女性在花园中享受成功，手上停着一只鹰，象征着独立和成就。'
  },
  {
    id: 'minor_pentacles_10',
    name: '星币十',
    nameEn: 'Ten of Pentacles',
    suit: 'pentacles',
    type: 'minor',
    number: 10,
    isReversed: false,
    image: '/images/minor/pentacles/10-ten-of-pentacles.jpg',
    keywords: ['财富', '传承', '家族', '稳定', '成就'],
    meaning: {
      upright: '星币十代表财富的积累、家族传承和长期的稳定。这是物质成功的顶峰。',
      reversed: '逆位可能表示财务损失、家族问题或传承中断。'
    },
    description: '一个富裕的家族聚集在拱门下，十枚星币装饰着场景，象征着财富和传承。'
  },
  {
    id: 'minor_pentacles_11',
    name: '星币侍从',
    nameEn: 'Page of Pentacles',
    suit: 'pentacles',
    type: 'minor',
    number: 11,
    isReversed: false,
    image: '/images/minor/pentacles/11-page-of-pentacles.jpg',
    keywords: ['学习', '实用', '机会', '新开始', '专注'],
    meaning: {
      upright: '星币侍从代表学习新技能、实用的机会和专注的态度。他是勤奋学习的象征。',
      reversed: '逆位可能表示缺乏专注、错过机会或不切实际。'
    },
    description: '年轻的侍从专心地凝视着手中的星币，象征着学习和专注的态度。'
  },
  {
    id: 'minor_pentacles_12',
    name: '星币骑士',
    nameEn: 'Knight of Pentacles',
    suit: 'pentacles',
    type: 'minor',
    number: 12,
    isReversed: false,
    image: '/images/minor/pentacles/12-knight-of-pentacles.jpg',
    keywords: ['勤奋', '可靠', '耐心', '实用', '坚持'],
    meaning: {
      upright: '星币骑士代表勤奋工作、可靠的性格和耐心的坚持。他是稳重和实用的象征。',
      reversed: '逆位可能表示懒惰、不可靠或过度谨慎。'
    },
    description: '骑士骑着沉稳的马，手持星币，象征着勤奋和可靠的品质。'
  },
  {
    id: 'minor_pentacles_13',
    name: '星币王后',
    nameEn: 'Queen of Pentacles',
    suit: 'pentacles',
    type: 'minor',
    number: 13,
    isReversed: false,
    image: '/images/minor/pentacles/13-queen-of-pentacles.jpg',
    keywords: ['滋养', '实用', '慷慨', '安全', '丰盛'],
    meaning: {
      upright: '星币王后代表滋养他人、实用的智慧和慷慨的分享。她创造安全和丰盛的环境。',
      reversed: '逆位可能表示自私、物质主义或忽视他人需要。'
    },
    description: '王后坐在花园中的王座上，手持星币，周围是丰收的象征，代表着滋养和丰盛。'
  },
  {
    id: 'minor_pentacles_14',
    name: '星币国王',
    nameEn: 'King of Pentacles',
    suit: 'pentacles',
    type: 'minor',
    number: 14,
    isReversed: false,
    image: '/images/minor/pentacles/14-king-of-pentacles.jpg',
    keywords: ['成功', '领导', '慷慨', '可靠', '成就'],
    meaning: {
      upright: '星币国王代表物质成功、可靠的领导和慷慨的分享。他是商业和财务的典范。',
      reversed: '逆位可能表示贪婪、不可靠或滥用财富。'
    },
    description: '国王坐在装饰华丽的王座上，手持星币，周围是葡萄和丰收的象征，代表着成功和慷慨。'
  }
];