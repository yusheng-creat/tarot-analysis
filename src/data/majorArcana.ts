import { TarotCard } from '../types';

export const majorArcana: TarotCard[] = [
  {
    id: 'major_0',
    name: '愚者',
    nameEn: 'The Fool',
    type: 'major',
    number: 0,
    isReversed: false,
    image: '/images/major/00-fool.jpg',
    keywords: ['新开始', '冒险', '纯真', '自发性', '信仰之跃'],
    meaning: {
      upright: '愚者代表新的开始、纯真的心态和对未知的勇敢探索。这是一张充满希望和可能性的牌，暗示着你正站在人生新阶段的起点。',
      reversed: '逆位的愚者可能表示鲁莽、缺乏计划或过度天真。需要更加谨慎地考虑行动的后果。'
    },
    description: '愚者是塔罗牌中的第一张牌，象征着人生旅程的开始。他背着简单的行囊，怀着纯真的心踏上未知的道路。'
  },
  {
    id: 'major_1',
    name: '魔术师',
    nameEn: 'The Magician',
    type: 'major',
    number: 1,
    isReversed: false,
    image: '/images/major/01-magician.jpg',
    keywords: ['意志力', '创造力', '技能', '专注', '显化'],
    meaning: {
      upright: '魔术师代表强大的意志力和创造能力。你拥有实现目标所需的所有工具和技能，关键在于如何运用它们。',
      reversed: '逆位的魔术师可能表示缺乏专注、滥用权力或技能被误用。需要重新审视自己的动机和方法。'
    },
    description: '魔术师举起权杖，桌上摆放着四大元素的象征物，代表他掌握了物质和精神世界的力量。'
  },
  {
    id: 'major_2',
    name: '女祭司',
    nameEn: 'The High Priestess',
    type: 'major',
    number: 2,
    isReversed: false,
    image: '/images/major/02-high-priestess.jpg',
    keywords: ['直觉', '内在智慧', '神秘', '潜意识', '灵性'],
    meaning: {
      upright: '女祭司代表内在的智慧和直觉力量。她提醒你要倾听内心的声音，相信自己的直觉判断。',
      reversed: '逆位的女祭司可能表示与直觉失去联系，过度依赖理性思维，或者忽视内在的声音。'
    },
    description: '女祭司坐在神殿的门前，身后是象征知识和神秘的帷幕，她是连接意识与潜意识的桥梁。'
  },
  {
    id: 'major_3',
    name: '皇后',
    nameEn: 'The Empress',
    type: 'major',
    number: 3,
    isReversed: false,
    image: '/images/major/03-empress.jpg',
    keywords: ['丰饶', '母性', '创造', '自然', '滋养'],
    meaning: {
      upright: '皇后代表丰饶、母性的力量和创造性的能量。她象征着滋养、成长和自然的丰盛。',
      reversed: '逆位的皇后可能表示创造力受阻、过度依赖他人或忽视自我照顾。'
    },
    description: '皇后坐在自然环境中，周围是丰收的象征，她代表着母性的滋养力量和自然的丰饶。'
  },
  {
    id: 'major_4',
    name: '皇帝',
    nameEn: 'The Emperor',
    type: 'major',
    number: 4,
    isReversed: false,
    image: '/images/major/04-emperor.jpg',
    keywords: ['权威', '结构', '控制', '稳定', '领导'],
    meaning: {
      upright: '皇帝代表权威、结构和稳定的力量。他象征着领导能力、组织性和对秩序的建立。',
      reversed: '逆位的皇帝可能表示专制、缺乏控制或权威的滥用。'
    },
    description: '皇帝坐在石制王座上，手持权杖，象征着世俗权力和稳定的统治。'
  },
  {
    id: 'major_5',
    name: '教皇',
    nameEn: 'The Hierophant',
    type: 'major',
    number: 5,
    isReversed: false,
    image: '/images/major/05-hierophant.jpg',
    keywords: ['传统', '精神指导', '教育', '信仰', '道德'],
    meaning: {
      upright: '教皇代表传统智慧、精神指导和道德教育。他是连接天地的桥梁，传授神圣的知识。',
      reversed: '逆位的教皇可能表示反叛传统、缺乏精神指导或道德困惑。'
    },
    description: '教皇坐在神圣的宝座上，手持权杖，面前跪着两个信徒，象征着精神权威和传统教导。'
  },
  {
    id: 'major_6',
    name: '恋人',
    nameEn: 'The Lovers',
    type: 'major',
    number: 6,
    isReversed: false,
    image: '/images/major/06-lovers.jpg',
    keywords: ['爱情', '选择', '和谐', '关系', '价值观'],
    meaning: {
      upright: '恋人代表爱情、重要的选择和价值观的和谐。这张牌强调关系中的平衡和相互理解。',
      reversed: '逆位的恋人可能表示关系不和、错误的选择或价值观冲突。'
    },
    description: '一对恋人站在天使的祝福下，象征着神圣的结合和重要的人生选择。'
  },
  {
    id: 'major_7',
    name: '战车',
    nameEn: 'The Chariot',
    type: 'major',
    number: 7,
    isReversed: false,
    image: '/images/major/07-chariot.jpg',
    keywords: ['胜利', '意志力', '控制', '前进', '决心'],
    meaning: {
      upright: '战车代表胜利、强大的意志力和前进的动力。通过自律和决心，你将克服障碍。',
      reversed: '逆位的战车可能表示缺乏方向、失去控制或内在冲突。'
    },
    description: '战士驾驶着由两匹不同颜色的狮身人面兽拉着的战车，象征着通过意志力控制对立的力量。'
  },
  {
    id: 'major_8',
    name: '力量',
    nameEn: 'Strength',
    type: 'major',
    number: 8,
    isReversed: false,
    image: '/images/major/08-strength.jpg',
    keywords: ['内在力量', '勇气', '耐心', '温柔', '自控'],
    meaning: {
      upright: '力量代表内在的力量、勇气和温柔的控制。真正的力量来自于内心的平静和自我掌控。',
      reversed: '逆位的力量可能表示缺乏自信、内在恐惧或失去自控。'
    },
    description: '一位女性温柔地抚摸着狮子，象征着通过爱和耐心驯服野性的力量。'
  },
  {
    id: 'major_9',
    name: '隐士',
    nameEn: 'The Hermit',
    type: 'major',
    number: 9,
    isReversed: false,
    image: '/images/major/09-hermit.jpg',
    keywords: ['内省', '寻找', '智慧', '指导', '孤独'],
    meaning: {
      upright: '隐士代表内省、寻找内在智慧和精神指导。这是一个需要独处和深度思考的时期。',
      reversed: '逆位的隐士可能表示孤立、拒绝指导或迷失方向。'
    },
    description: '隐士手持明灯站在山顶，为迷路的人指引方向，象征着智慧的指导和内在的光明。'
  },
  {
    id: 'major_10',
    name: '命运之轮',
    nameEn: 'Wheel of Fortune',
    type: 'major',
    number: 10,
    isReversed: false,
    image: '/images/major/10-wheel-of-fortune.jpg',
    keywords: ['命运', '变化', '循环', '机会', '转折'],
    meaning: {
      upright: '命运之轮代表命运的转变、生命的循环和新机会的到来。变化是不可避免的，要学会适应。',
      reversed: '逆位的命运之轮可能表示坏运气、抗拒变化或错过机会。'
    },
    description: '一个巨大的轮子在天空中转动，上面有各种神秘符号，象征着命运的变迁和生命的循环。'
  },
  {
    id: 'major_11',
    name: '正义',
    nameEn: 'Justice',
    type: 'major',
    number: 11,
    isReversed: false,
    image: '/images/major/11-justice.jpg',
    keywords: ['公正', '平衡', '真相', '法律', '因果'],
    meaning: {
      upright: '正义代表公正、平衡和真相的显现。你的行为将得到应有的回报，因果循环正在运作。',
      reversed: '逆位的正义可能表示不公、偏见或逃避责任。'
    },
    description: '正义女神坐在宝座上，一手持剑一手持天平，象征着公正的判断和平衡的智慧。'
  },
  {
    id: 'major_12',
    name: '倒吊人',
    nameEn: 'The Hanged Man',
    type: 'major',
    number: 12,
    isReversed: false,
    image: '/images/major/12-hanged-man.jpg',
    keywords: ['牺牲', '等待', '新视角', '暂停', '启示'],
    meaning: {
      upright: '倒吊人代表必要的牺牲、等待的智慧和从新角度看问题。有时停下来比继续前进更重要。',
      reversed: '逆位的倒吊人可能表示无谓的牺牲、拖延或拒绝改变视角。'
    },
    description: '一个人倒挂在树上，但表情平静，头部散发光芒，象征着通过牺牲获得的启示。'
  },
  {
    id: 'major_13',
    name: '死神',
    nameEn: 'Death',
    type: 'major',
    number: 13,
    isReversed: false,
    image: '/images/major/13-death.jpg',
    keywords: ['转变', '结束', '重生', '释放', '新开始'],
    meaning: {
      upright: '死神代表重大的转变、旧事物的结束和新生命的开始。这是必要的变化，不要恐惧。',
      reversed: '逆位的死神可能表示抗拒变化、停滞不前或恐惧转变。'
    },
    description: '死神骑着白马，手持黑旗，象征着不可避免的转变和生命的循环。'
  },
  {
    id: 'major_14',
    name: '节制',
    nameEn: 'Temperance',
    type: 'major',
    number: 14,
    isReversed: false,
    image: '/images/major/14-temperance.jpg',
    keywords: ['平衡', '调和', '耐心', '治愈', '中庸'],
    meaning: {
      upright: '节制代表平衡、调和对立的力量和耐心的治愈过程。通过中庸之道找到和谐。',
      reversed: '逆位的节制可能表示失衡、极端或缺乏耐心。'
    },
    description: '天使站在水边，将水从一个杯子倒入另一个杯子，象征着平衡和调和的艺术。'
  },
  {
    id: 'major_15',
    name: '恶魔',
    nameEn: 'The Devil',
    type: 'major',
    number: 15,
    isReversed: false,
    image: '/images/major/15-devil.jpg',
    keywords: ['束缚', '诱惑', '物质主义', '成瘾', '阴影'],
    meaning: {
      upright: '恶魔代表束缚、诱惑和对物质的过度依赖。你可能被自己的欲望或恐惧所困。',
      reversed: '逆位的恶魔表示从束缚中解脱、克服诱惑或面对阴影自我。'
    },
    description: '恶魔坐在宝座上，面前是被链条束缚的男女，但链条很松，象征着自我施加的限制。'
  },
  {
    id: 'major_16',
    name: '塔',
    nameEn: 'The Tower',
    type: 'major',
    number: 16,
    isReversed: false,
    image: '/images/major/16-tower.jpg',
    keywords: ['突变', '破坏', '启示', '解放', '觉醒'],
    meaning: {
      upright: '塔代表突然的变化、旧结构的崩塌和痛苦但必要的启示。破坏是为了重建。',
      reversed: '逆位的塔可能表示避免灾难、内在转变或渐进的变化。'
    },
    description: '高塔被闪电击中，人们从塔上坠落，象征着突然的觉醒和旧观念的崩塌。'
  },
  {
    id: 'major_17',
    name: '星星',
    nameEn: 'The Star',
    type: 'major',
    number: 17,
    isReversed: false,
    image: '/images/major/17-star.jpg',
    keywords: ['希望', '灵感', '治愈', '指导', '信仰'],
    meaning: {
      upright: '星星代表希望、灵感和精神的指导。在黑暗之后，光明和治愈正在到来。',
      reversed: '逆位的星星可能表示失去希望、缺乏信仰或精神迷茫。'
    },
    description: '一位女性在星空下向池塘倒水，象征着希望的光芒和精神的滋养。'
  },
  {
    id: 'major_18',
    name: '月亮',
    nameEn: 'The Moon',
    type: 'major',
    number: 18,
    isReversed: false,
    image: '/images/major/18-moon.jpg',
    keywords: ['幻象', '直觉', '潜意识', '恐惧', '神秘'],
    meaning: {
      upright: '月亮代表幻象、潜意识的力量和内在的恐惧。要相信直觉，但要小心被欺骗。',
      reversed: '逆位的月亮可能表示幻象消散、克服恐惧或真相显现。'
    },
    description: '月亮照耀着神秘的景象，狼和狗对月嚎叫，象征着野性和驯化的本能。'
  },
  {
    id: 'major_19',
    name: '太阳',
    nameEn: 'The Sun',
    type: 'major',
    number: 19,
    isReversed: false,
    image: '/images/major/19-sun.jpg',
    keywords: ['成功', '快乐', '活力', '真相', '启蒙'],
    meaning: {
      upright: '太阳代表成功、快乐和生命的活力。这是最积极的牌之一，预示着光明的未来。',
      reversed: '逆位的太阳可能表示延迟的成功、缺乏活力或过度自信。'
    },
    description: '太阳照耀着快乐的孩子，象征着纯真的喜悦和生命的活力。'
  },
  {
    id: 'major_20',
    name: '审判',
    nameEn: 'Judgement',
    type: 'major',
    number: 20,
    isReversed: false,
    image: '/images/major/20-judgement.jpg',
    keywords: ['重生', '觉醒', '宽恕', '救赎', '新生'],
    meaning: {
      upright: '审判代表精神的重生、内在的觉醒和过去的救赎。这是一个新开始的召唤。',
      reversed: '逆位的审判可能表示自我怀疑、拒绝改变或错过机会。'
    },
    description: '天使吹响号角，死者从坟墓中复活，象征着精神的重生和最终的觉醒。'
  },
  {
    id: 'major_21',
    name: '世界',
    nameEn: 'The World',
    type: 'major',
    number: 21,
    isReversed: false,
    image: '/images/major/21-world.jpg',
    keywords: ['完成', '成就', '圆满', '整合', '成功'],
    meaning: {
      upright: '世界代表完成、成就和人生的圆满。你已经达到了一个重要的里程碑，获得了成功。',
      reversed: '逆位的世界可能表示未完成的目标、缺乏成就感，或者成功被延迟。'
    },
    description: '一个舞者在月桂花环中央，四个角落是四大元素的象征，代表着完美的平衡和成就。'
  }
];