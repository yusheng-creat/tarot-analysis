import { SpreadType } from '../types';

export const spreads: SpreadType[] = [
  {
    id: 'single-card',
    name: '单张牌',
    description: '简单直接的日常指导，适合快速获得当下的洞察',
    positions: [
      {
        id: 'main',
        name: '主牌',
        meaning: '当前情况的核心信息和指导',
        x: 50,
        y: 50
      }
    ],
    layout: {
      width: 300,
      height: 200,
      cardSize: {
        width: 120,
        height: 180
      }
    }
  },
  {
    id: 'three-card',
    name: '三张牌',
    description: '过去、现在、未来的时间线分析，了解事情的发展脉络',
    positions: [
      {
        id: 'past',
        name: '过去',
        meaning: '影响当前情况的过去因素和经验',
        x: 20,
        y: 50
      },
      {
        id: 'present',
        name: '现在',
        meaning: '当前的核心情况和需要关注的重点',
        x: 50,
        y: 50
      },
      {
        id: 'future',
        name: '未来',
        meaning: '可能的发展趋势和未来的机会',
        x: 80,
        y: 50
      }
    ],
    layout: {
      width: 500,
      height: 250,
      cardSize: {
        width: 100,
        height: 150
      }
    }
  },
  {
    id: 'celtic-cross',
    name: '凯尔特十字',
    description: '全面深入的人生分析，提供完整的情况洞察和指导',
    positions: [
      {
        id: 'present',
        name: '现在',
        meaning: '当前的核心情况和主要关注点',
        x: 40,
        y: 50
      },
      {
        id: 'challenge',
        name: '挑战',
        meaning: '当前面临的主要挑战或阻碍',
        x: 50,
        y: 50
      },
      {
        id: 'distant-past',
        name: '远因',
        meaning: '深层的根源和远期的影响因素',
        x: 40,
        y: 80
      },
      {
        id: 'recent-past',
        name: '近因',
        meaning: '最近的事件和直接的影响因素',
        x: 25,
        y: 50
      },
      {
        id: 'possible-outcome',
        name: '可能结果',
        meaning: '如果按当前趋势发展的可能结果',
        x: 40,
        y: 20
      },
      {
        id: 'near-future',
        name: '近期',
        meaning: '即将到来的事件和短期发展',
        x: 55,
        y: 50
      },
      {
        id: 'your-approach',
        name: '你的态度',
        meaning: '你对情况的态度和处理方式',
        x: 75,
        y: 80
      },
      {
        id: 'external-influences',
        name: '外在影响',
        meaning: '环境因素和他人对你的影响',
        x: 75,
        y: 65
      },
      {
        id: 'hopes-fears',
        name: '希望与恐惧',
        meaning: '内心深处的希望和担忧',
        x: 75,
        y: 50
      },
      {
        id: 'final-outcome',
        name: '最终结果',
        meaning: '综合所有因素后的最终发展方向',
        x: 75,
        y: 35
      }
    ],
    layout: {
      width: 600,
      height: 400,
      cardSize: {
        width: 80,
        height: 120
      }
    }
  },
  {
    id: 'relationship',
    name: '关系牌阵',
    description: '专门分析人际关系的牌阵，了解双方的想法和关系发展',
    positions: [
      {
        id: 'you',
        name: '你',
        meaning: '你在这段关系中的状态和想法',
        x: 25,
        y: 30
      },
      {
        id: 'them',
        name: '对方',
        meaning: '对方在这段关系中的状态和想法',
        x: 75,
        y: 30
      },
      {
        id: 'relationship',
        name: '关系',
        meaning: '你们之间关系的本质和特点',
        x: 50,
        y: 50
      },
      {
        id: 'challenges',
        name: '挑战',
        meaning: '关系中需要面对的挑战和问题',
        x: 25,
        y: 70
      },
      {
        id: 'strengths',
        name: '优势',
        meaning: '关系中的优势和积极因素',
        x: 75,
        y: 70
      },
      {
        id: 'advice',
        name: '建议',
        meaning: '如何改善和发展这段关系的建议',
        x: 50,
        y: 85
      }
    ],
    layout: {
      width: 500,
      height: 350,
      cardSize: {
        width: 90,
        height: 135
      }
    }
  },
  {
    id: 'decision',
    name: '决策牌阵',
    description: '帮助做出重要决定的牌阵，分析不同选择的后果',
    positions: [
      {
        id: 'situation',
        name: '现状',
        meaning: '当前需要做决定的情况',
        x: 50,
        y: 20
      },
      {
        id: 'option-a',
        name: '选择A',
        meaning: '第一个选择的特点和影响',
        x: 25,
        y: 45
      },
      {
        id: 'option-b',
        name: '选择B',
        meaning: '第二个选择的特点和影响',
        x: 75,
        y: 45
      },
      {
        id: 'outcome-a',
        name: '结果A',
        meaning: '选择A可能带来的结果',
        x: 25,
        y: 70
      },
      {
        id: 'outcome-b',
        name: '结果B',
        meaning: '选择B可能带来的结果',
        x: 75,
        y: 70
      },
      {
        id: 'guidance',
        name: '指导',
        meaning: '做出最佳决定的指导和建议',
        x: 50,
        y: 90
      }
    ],
    layout: {
      width: 500,
      height: 400,
      cardSize: {
        width: 85,
        height: 128
      }
    }
  }
];

// 根据ID获取特定牌阵
export const getSpreadById = (id: string): SpreadType | null => {
  return spreads.find(spread => spread.id === id) || null;
};

// 获取所有可用的牌阵
export const getAllSpreads = (): SpreadType[] => {
  return spreads;
};

// 获取推荐的牌阵（根据复杂程度排序）
export const getRecommendedSpreads = (): SpreadType[] => {
  return [
    spreads.find(s => s.id === 'single-card')!,
    spreads.find(s => s.id === 'three-card')!,
    spreads.find(s => s.id === 'relationship')!,
    spreads.find(s => s.id === 'decision')!,
    spreads.find(s => s.id === 'celtic-cross')!
  ];
};

// 根据牌阵获取所需的牌数
export const getCardCountForSpread = (spreadId: string): number => {
  const spread = getSpreadById(spreadId);
  return spread ? spread.positions.length : 0;
};

// 验证牌阵配置的有效性
export const validateSpread = (spread: SpreadType): boolean => {
  if (!spread.id || !spread.name || !spread.description) {
    return false;
  }
  
  if (!spread.positions || spread.positions.length === 0) {
    return false;
  }
  
  // 检查位置坐标是否在有效范围内
  for (const position of spread.positions) {
    if (position.x < 0 || position.x > 100 || position.y < 0 || position.y > 100) {
      return false;
    }
  }
  
  return true;
};

// 初始化时验证所有牌阵
spreads.forEach(spread => {
  if (!validateSpread(spread)) {
    console.warn(`牌阵配置无效: ${spread.id}`);
  }
});

console.log(`已加载 ${spreads.length} 个牌阵配置`);