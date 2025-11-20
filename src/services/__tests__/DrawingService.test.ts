import { DrawingService, DrawingConfig } from '../DrawingService';
import { tarotDataService } from '../TarotDataService';

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

describe('DrawingService', () => {
  let service: DrawingService;

  beforeEach(() => {
    service = DrawingService.getInstance();
    service.resetSession();
  });

  describe('getInstance', () => {
    it('应该返回单例实例', () => {
      const instance1 = DrawingService.getInstance();
      const instance2 = DrawingService.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('drawCards', () => {
    it('应该能够抽取单张牌', () => {
      const config: DrawingConfig = { spreadId: 'single-card' };
      const result = service.drawCards(config);

      expect(result.cards).toHaveLength(1);
      expect(result.spread.id).toBe('single-card');
      expect(result.timestamp).toBeInstanceOf(Date);
      expect(result.sessionId).toBeTruthy();
    });

    it('应该能够抽取三张牌', () => {
      const config: DrawingConfig = { spreadId: 'three-card' };
      const result = service.drawCards(config);

      expect(result.cards).toHaveLength(3);
      expect(result.spread.id).toBe('three-card');
    });

    it('应该能够抽取凯尔特十字牌阵的10张牌', () => {
      const config: DrawingConfig = { spreadId: 'celtic-cross' };
      const result = service.drawCards(config);

      expect(result.cards).toHaveLength(10);
      expect(result.spread.id).toBe('celtic-cross');
    });

    it('抽取的牌应该有正逆位信息', () => {
      const config: DrawingConfig = { spreadId: 'three-card' };
      const result = service.drawCards(config);

      result.cards.forEach(card => {
        expect(typeof card.isReversed).toBe('boolean');
      });
    });

    it('应该能够强制设置正位', () => {
      const config: DrawingConfig = { 
        spreadId: 'three-card',
        forceReversed: false
      };
      const result = service.drawCards(config);

      result.cards.forEach(card => {
        expect(card.isReversed).toBe(false);
      });
    });

    it('应该能够强制设置逆位', () => {
      const config: DrawingConfig = { 
        spreadId: 'three-card',
        forceReversed: true
      };
      const result = service.drawCards(config);

      result.cards.forEach(card => {
        expect(card.isReversed).toBe(true);
      });
    });

    it('应该能够自定义逆位概率', () => {
      const config: DrawingConfig = { 
        spreadId: 'single-card',
        reversedProbability: 0
      };
      
      // 抽取多张牌测试概率
      const results = [];
      for (let i = 0; i < 10; i++) {
        service.resetSession();
        const result = service.drawCards(config);
        results.push(result.cards[0].isReversed);
      }

      // 概率为0时，所有牌都应该是正位
      expect(results.every(isReversed => !isReversed)).toBe(true);
    });

    it('对于无效的牌阵ID应该抛出错误', () => {
      const config: DrawingConfig = { spreadId: 'invalid-spread' };
      
      expect(() => {
        service.drawCards(config);
      }).toThrow();
    });

    it('对于无效的逆位概率应该抛出错误', () => {
      const config: DrawingConfig = { 
        spreadId: 'single-card',
        reversedProbability: 1.5
      };
      
      expect(() => {
        service.drawCards(config);
      }).toThrow();
    });
  });

  describe('quickDraw', () => {
    it('应该能够快速抽取单张牌', () => {
      const result = service.quickDraw('single-card');
      
      expect(result.cards).toHaveLength(1);
      expect(result.spread.id).toBe('single-card');
    });

    it('应该能够快速抽取三张牌', () => {
      const result = service.quickDraw('three-card');
      
      expect(result.cards).toHaveLength(3);
      expect(result.spread.id).toBe('three-card');
    });
  });

  describe('redraw', () => {
    it('应该能够重新抽牌', () => {
      const config: DrawingConfig = { spreadId: 'single-card' };
      
      const result1 = service.drawCards(config);
      const result2 = service.redraw(config);

      expect(result1.sessionId).not.toBe(result2.sessionId);
    });
  });

  describe('drawSingleCard', () => {
    it('应该返回单张牌', () => {
      const card = service.drawSingleCard();
      
      expect(card).toBeDefined();
      expect(card.id).toBeTruthy();
      expect(typeof card.isReversed).toBe('boolean');
    });
  });

  describe('drawMultiple', () => {
    it('应该能够批量抽牌', () => {
      const cards = service.drawMultiple(5);
      
      expect(cards).toHaveLength(5);
      cards.forEach(card => {
        expect(card.id).toBeTruthy();
        expect(typeof card.isReversed).toBe('boolean');
      });
    });

    it('不允许重复时应该抽取不同的牌', () => {
      const cards = service.drawMultiple(5, false);
      const cardIds = cards.map(card => card.id);
      const uniqueIds = new Set(cardIds);
      
      expect(uniqueIds.size).toBe(5);
    });

    it('允许重复时可能抽取相同的牌', () => {
      const cards = service.drawMultiple(100, true);
      
      expect(cards).toHaveLength(100);
      // 不检查重复，因为允许重复
    });

    it('对于无效数量应该抛出错误', () => {
      expect(() => {
        service.drawMultiple(0);
      }).toThrow();

      expect(() => {
        service.drawMultiple(-1);
      }).toThrow();

      expect(() => {
        service.drawMultiple(1.5);
      }).toThrow();
    });

    it('不允许重复且数量超过总牌数时应该抛出错误', () => {
      const totalCards = tarotDataService.getAllCards().length;
      
      expect(() => {
        service.drawMultiple(totalCards + 1, false);
      }).toThrow();
    });
  });

  describe('getDrawingStats', () => {
    it('应该返回正确的统计信息', () => {
      const stats1 = service.getDrawingStats();
      expect(stats1.usedCardsCount).toBe(0);
      expect(stats1.totalCards).toBe(78);
      expect(stats1.remainingCardsCount).toBe(78);

      // 抽取一些牌
      service.drawCards({ spreadId: 'three-card' });
      
      const stats2 = service.getDrawingStats();
      expect(stats2.usedCardsCount).toBe(3);
      expect(stats2.remainingCardsCount).toBe(75);
    });
  });

  describe('resetSession', () => {
    it('应该重置会话状态', () => {
      // 抽取一些牌
      service.drawCards({ spreadId: 'three-card' });
      
      const statsBefore = service.getDrawingStats();
      expect(statsBefore.usedCardsCount).toBe(3);

      // 重置会话
      service.resetSession();
      
      const statsAfter = service.getDrawingStats();
      expect(statsAfter.usedCardsCount).toBe(0);
      expect(statsAfter.sessionId).not.toBe(statsBefore.sessionId);
    });
  });

  describe('testRandomness', () => {
    it('应该返回随机性测试结果', () => {
      const result = service.testRandomness(100);
      
      expect(result.reversedRate).toBeGreaterThanOrEqual(0);
      expect(result.reversedRate).toBeLessThanOrEqual(1);
      expect(result.cardDistribution).toBeInstanceOf(Map);
      expect(result.qualityScore).toBeGreaterThanOrEqual(0);
      expect(result.qualityScore).toBeLessThanOrEqual(100);
    });

    it('逆位率应该接近默认概率', () => {
      const result = service.testRandomness(1000);
      
      // 允许一定的误差范围（±10%）
      expect(result.reversedRate).toBeGreaterThan(0.2);
      expect(result.reversedRate).toBeLessThan(0.4);
    });
  });

  describe('createDrawingError', () => {
    it('应该创建抽牌错误对象', () => {
      const error = service.createDrawingError('测试错误', { test: true });
      
      expect(error.message).toBe('测试错误');
      expect(error.details).toEqual({ test: true });
      expect(error.type).toBeDefined();
    });
  });

  describe('防重复机制', () => {
    it('默认情况下不应该抽取重复的牌', () => {
      const config: DrawingConfig = { 
        spreadId: 'three-card',
        allowDuplicates: false
      };
      
      const result = service.drawCards(config);
      const cardIds = result.cards.map(card => card.id);
      const uniqueIds = new Set(cardIds);
      
      expect(uniqueIds.size).toBe(3);
    });

    it('允许重复时可能抽取相同的牌', () => {
      const config: DrawingConfig = { 
        spreadId: 'three-card',
        allowDuplicates: true
      };
      
      const result = service.drawCards(config);
      
      // 只检查是否成功抽取，不检查重复
      expect(result.cards).toHaveLength(3);
    });
  });

  describe('边界情况', () => {
    it('应该处理空牌阵ID', () => {
      const config: DrawingConfig = { spreadId: '' };
      
      expect(() => {
        service.drawCards(config);
      }).toThrow();
    });

    it('应该处理极端的逆位概率', () => {
      const config1: DrawingConfig = { 
        spreadId: 'single-card',
        reversedProbability: 0
      };
      
      const config2: DrawingConfig = { 
        spreadId: 'single-card',
        reversedProbability: 1
      };
      
      const result1 = service.drawCards(config1);
      const result2 = service.drawCards(config2);
      
      expect(result1.cards[0].isReversed).toBe(false);
      expect(result2.cards[0].isReversed).toBe(true);
    });
  });
});

// 集成测试
describe('DrawingService Integration', () => {
  let service: DrawingService;

  beforeEach(() => {
    service = DrawingService.getInstance();
    service.resetSession();
  });

  it('应该能够完成完整的抽牌流程', () => {
    // 1. 获取可用牌阵
    const spreads = tarotDataService.getSpreads();
    expect(spreads.length).toBeGreaterThan(0);

    // 2. 为每个牌阵抽牌
    spreads.forEach(spread => {
      const result = service.drawCards({ spreadId: spread.id });
      
      expect(result.cards.length).toBe(spread.positions.length);
      expect(result.spread.id).toBe(spread.id);
      
      // 验证每张牌的完整性
      result.cards.forEach(card => {
        expect(card.id).toBeTruthy();
        expect(card.name).toBeTruthy();
        expect(typeof card.isReversed).toBe('boolean');
      });
    });
  });

  it('应该能够处理连续抽牌', () => {
    const results = [];
    
    // 连续抽取多次
    for (let i = 0; i < 5; i++) {
      const result = service.drawCards({ spreadId: 'single-card' });
      results.push(result);
    }

    // 验证每次抽牌都成功
    expect(results).toHaveLength(5);
    results.forEach(result => {
      expect(result.cards).toHaveLength(1);
      expect(result.sessionId).toBeTruthy();
    });

    // 验证会话ID相同（同一会话）
    const sessionIds = results.map(r => r.sessionId);
    const uniqueSessionIds = new Set(sessionIds);
    expect(uniqueSessionIds.size).toBe(1);
  });

  it('应该能够处理会话重置', () => {
    // 第一次抽牌
    const result1 = service.drawCards({ spreadId: 'single-card' });
    const sessionId1 = result1.sessionId;

    // 重置会话
    service.resetSession();

    // 第二次抽牌
    const result2 = service.drawCards({ spreadId: 'single-card' });
    const sessionId2 = result2.sessionId;

    expect(sessionId1).not.toBe(sessionId2);
  });
});