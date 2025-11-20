import { ReadingEngine } from '../ReadingEngine';
import { TarotCard, SpreadType } from '../../types';

// Mock console methods
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

beforeAll(() => {
  console.log = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
});

describe('ReadingEngine', () => {
  let engine: ReadingEngine;

  beforeEach(() => {
    engine = ReadingEngine.getInstance();
  });

  const mockCard: TarotCard = {
    id: 'major_0',
    name: '愚者',
    nameEn: 'The Fool',
    type: 'major',
    number: 0,
    isReversed: false,
    image: '/images/major/00-fool.jpg',
    keywords: ['新开始', '冒险', '纯真'],
    meaning: {
      upright: '愚者代表新的开始和纯真的心态',
      reversed: '逆位的愚者可能表示鲁莽和缺乏计划'
    },
    description: '愚者是塔罗牌中的第一张牌'
  };

  const mockReversedCard: TarotCard = {
    ...mockCard,
    id: 'major_1',
    name: '魔术师',
    nameEn: 'The Magician',
    isReversed: true,
    keywords: ['意志力', '创造力', '技能'],
    meaning: {
      upright: '魔术师代表强大的意志力和创造能力',
      reversed: '逆位的魔术师可能表示缺乏专注或滥用权力'
    }
  };

  const mockSpread: SpreadType = {
    id: 'three-card',
    name: '三张牌',
    description: '过去、现在、未来的时间线分析',
    positions: [
      {
        id: 'past',
        name: '过去',
        meaning: '影响当前情况的过去因素',
        x: 25,
        y: 50
      },
      {
        id: 'present',
        name: '现在',
        meaning: '当前的核心情况',
        x: 50,
        y: 50
      },
      {
        id: 'future',
        name: '未来',
        meaning: '可能的发展趋势',
        x: 75,
        y: 50
      }
    ],
    layout: {
      width: 500,
      height: 250,
      cardSize: { width: 100, height: 150 }
    }
  };

  describe('getInstance', () => {
    it('应该返回单例实例', () => {
      const instance1 = ReadingEngine.getInstance();
      const instance2 = ReadingEngine.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('interpretCard', () => {
    it('应该为正位牌生成解读', () => {
      const interpretation = engine.interpretCard(mockCard, mockSpread.positions[0]);

      expect(interpretation.card).toBe(mockCard);
      expect(interpretation.position).toBe(mockSpread.positions[0]);
      expect(interpretation.interpretation).toContain('愚者');
      expect(interpretation.interpretation).toContain('过去');
      expect(interpretation.keyMessages).toBeInstanceOf(Array);
      expect(interpretation.keyMessages.length).toBeGreaterThan(0);
      expect(interpretation.energy).toBeDefined();
    });

    it('应该为逆位牌生成不同的解读', () => {
      const interpretation = engine.interpretCard(mockReversedCard, mockSpread.positions[1]);

      expect(interpretation.interpretation).toContain('逆位');
      expect(interpretation.interpretation).toContain(mockReversedCard.meaning.reversed);
      expect(interpretation.keyMessages.some(msg => msg.includes('内在阻碍'))).toBe(true);
    });

    it('应该结合问题生成相关性分析', () => {
      const question = '我的事业发展如何？';
      const interpretation = engine.interpretCard(mockCard, mockSpread.positions[0], question);

      expect(interpretation.relevanceToQuestion).toBeDefined();
      expect(interpretation.relevanceToQuestion).toBeGreaterThanOrEqual(0);
      expect(interpretation.relevanceToQuestion).toBeLessThanOrEqual(1);
    });

    it('应该分析牌的能量', () => {
      const interpretation = engine.interpretCard(mockCard, mockSpread.positions[0]);

      expect(['positive', 'negative', 'neutral']).toContain(interpretation.energy);
    });
  });

  describe('analyzeCardCombinations', () => {
    const mockCards = [mockCard, mockReversedCard, mockCard];

    it('应该分析牌面组合', () => {
      const analysis = engine.analyzeCardCombinations(mockCards, mockSpread);

      expect(analysis.theme).toBeDefined();
      expect(analysis.energy).toBeDefined();
      expect(['positive', 'negative', 'neutral', 'mixed']).toContain(analysis.energy);
      expect(analysis.keyInsights).toBeInstanceOf(Array);
      expect(analysis.keyInsights.length).toBeGreaterThan(0);
    });

    it('应该识别警告和机会', () => {
      const analysis = engine.analyzeCardCombinations(mockCards, mockSpread);

      if (analysis.warnings) {
        expect(analysis.warnings).toBeInstanceOf(Array);
      }
      if (analysis.opportunities) {
        expect(analysis.opportunities).toBeInstanceOf(Array);
      }
    });

    it('应该基于问题调整分析', () => {
      const question = '我应该如何处理感情问题？';
      const analysis = engine.analyzeCardCombinations(mockCards, mockSpread, question);

      expect(analysis.theme).toBeDefined();
      expect(typeof analysis.theme).toBe('string');
    });
  });

  describe('generateReading', () => {
    const mockCards = [mockCard, mockReversedCard, mockCard];

    it('应该生成完整的占卜解读', () => {
      const reading = engine.generateReading(mockCards, mockSpread);

      expect(reading.id).toBeDefined();
      expect(reading.timestamp).toBeInstanceOf(Date);
      expect(reading.spread).toBe(mockSpread);
      expect(reading.cards).toBe(mockCards);
      expect(reading.interpretations).toHaveLength(3);
      expect(reading.overallAnalysis).toBeDefined();
      expect(reading.advice).toBeDefined();
    });

    it('应该包含问题在解读中', () => {
      const question = '我的未来会如何？';
      const reading = engine.generateReading(mockCards, mockSpread, question);

      expect(reading.question).toBe(question);
      expect(reading.overallAnalysis).toContain(question);
    });

    it('应该为每张牌生成解读', () => {
      const reading = engine.generateReading(mockCards, mockSpread);

      expect(reading.interpretations).toHaveLength(mockCards.length);
      reading.interpretations.forEach((interpretation, index) => {
        expect(interpretation.card).toBe(mockCards[index]);
        expect(interpretation.position).toBe(mockSpread.positions[index]);
        expect(interpretation.interpretation).toBeDefined();
        expect(interpretation.keyMessages).toBeInstanceOf(Array);
      });
    });

    it('应该生成有意义的整体分析', () => {
      const reading = engine.generateReading(mockCards, mockSpread);

      expect(reading.overallAnalysis).toBeDefined();
      expect(reading.overallAnalysis.length).toBeGreaterThan(50);
      expect(reading.overallAnalysis).toContain(mockSpread.name);
    });

    it('应该生成实用的建议', () => {
      const reading = engine.generateReading(mockCards, mockSpread);

      expect(reading.advice).toBeDefined();
      expect(reading.advice.length).toBeGreaterThan(50);
      expect(reading.advice).toContain('建议');
    });

    it('应该处理不同的配置选项', () => {
      const config = {
        includeReversed: true,
        focusOnQuestion: true,
        detailLevel: 'comprehensive' as const,
        language: 'zh' as const
      };

      const reading = engine.generateReading(mockCards, mockSpread, undefined, config);

      expect(reading).toBeDefined();
      expect(reading.interpretations.length).toBe(mockCards.length);
    });
  });

  describe('错误处理', () => {
    it('应该处理空牌数组', () => {
      expect(() => {
        engine.generateReading([], mockSpread);
      }).toThrow();
    });

    it('应该处理牌数与位置不匹配', () => {
      const mismatchedCards = [mockCard]; // 只有1张牌，但牌阵需要3张

      expect(() => {
        engine.generateReading(mismatchedCards, mockSpread);
      }).toThrow();
    });
  });

  describe('特殊牌面组合', () => {
    it('应该识别大阿卡纳占主导的情况', () => {
      const majorCards = [
        { ...mockCard, name: '愚者', type: 'major' as const },
        { ...mockCard, name: '魔术师', type: 'major' as const },
        { ...mockCard, name: '女祭司', type: 'major' as const }
      ];

      const analysis = engine.analyzeCardCombinations(majorCards, mockSpread);
      expect(analysis.keyInsights.some(insight => 
        insight.includes('重要的人生课题')
      )).toBe(true);
    });

    it('应该识别逆位牌较多的情况', () => {
      const reversedCards = [
        { ...mockCard, isReversed: true },
        { ...mockCard, isReversed: true },
        { ...mockCard, isReversed: false }
      ];

      const analysis = engine.analyzeCardCombinations(reversedCards, mockSpread);
      expect(analysis.keyInsights.some(insight => 
        insight.includes('内省') || insight.includes('反思')
      )).toBe(true);
    });
  });

  describe('能量分析', () => {
    it('应该正确分析正面能量', () => {
      const positiveCards = [
        { ...mockCard, name: '太阳' },
        { ...mockCard, name: '星星' },
        { ...mockCard, name: '世界' }
      ];

      const analysis = engine.analyzeCardCombinations(positiveCards, mockSpread);
      expect(['positive', 'mixed']).toContain(analysis.energy);
    });

    it('应该正确分析负面能量', () => {
      const negativeCards = [
        { ...mockCard, name: '塔' },
        { ...mockCard, name: '死神' },
        { ...mockCard, name: '恶魔' }
      ];

      const analysis = engine.analyzeCardCombinations(negativeCards, mockSpread);
      expect(['negative', 'mixed']).toContain(analysis.energy);
    });
  });

  describe('主题识别', () => {
    it('应该基于花色识别主题', () => {
      const cupsCards = [
        { ...mockCard, suit: 'cups' as const, type: 'minor' as const },
        { ...mockCard, suit: 'cups' as const, type: 'minor' as const },
        { ...mockCard, suit: 'wands' as const, type: 'minor' as const }
      ];

      const analysis = engine.analyzeCardCombinations(cupsCards, mockSpread);
      expect(analysis.theme).toContain('情感');
    });
  });
});