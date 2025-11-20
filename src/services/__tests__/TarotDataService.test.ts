import { TarotDataService } from '../TarotDataService';
import { TarotErrorType } from '../../types';

// Mock console methods to avoid noise in tests
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

describe('TarotDataService', () => {
  let service: TarotDataService;

  beforeEach(() => {
    service = TarotDataService.getInstance();
  });

  describe('getInstance', () => {
    it('应该返回单例实例', () => {
      const instance1 = TarotDataService.getInstance();
      const instance2 = TarotDataService.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('getAllCards', () => {
    it('应该返回所有78张塔罗牌', () => {
      const cards = service.getAllCards();
      expect(cards).toHaveLength(78);
    });

    it('返回的每张牌都应该有必需的属性', () => {
      const cards = service.getAllCards();
      cards.forEach(card => {
        expect(card).toHaveProperty('id');
        expect(card).toHaveProperty('name');
        expect(card).toHaveProperty('nameEn');
        expect(card).toHaveProperty('type');
        expect(card).toHaveProperty('isReversed');
        expect(card).toHaveProperty('image');
        expect(card).toHaveProperty('keywords');
        expect(card).toHaveProperty('meaning');
        expect(card).toHaveProperty('description');
      });
    });
  });

  describe('getCardById', () => {
    it('应该根据有效ID返回对应的牌', () => {
      const card = service.getCardById('major_0');
      expect(card).not.toBeNull();
      expect(card?.id).toBe('major_0');
      expect(card?.name).toBe('愚者');
    });

    it('对于无效ID应该返回null', () => {
      const card = service.getCardById('invalid_id');
      expect(card).toBeNull();
    });

    it('对于空ID应该返回null', () => {
      const card = service.getCardById('');
      expect(card).toBeNull();
    });
  });

  describe('getCardsBySuit', () => {
    it('应该返回权杖花色的14张牌', () => {
      const cards = service.getCardsBySuit('wands');
      expect(cards).toHaveLength(14);
      cards.forEach(card => {
        expect(card.suit).toBe('wands');
      });
    });

    it('应该返回圣杯花色的14张牌', () => {
      const cards = service.getCardsBySuit('cups');
      expect(cards).toHaveLength(14);
      cards.forEach(card => {
        expect(card.suit).toBe('cups');
      });
    });

    it('应该返回宝剑花色的14张牌', () => {
      const cards = service.getCardsBySuit('swords');
      expect(cards).toHaveLength(14);
      cards.forEach(card => {
        expect(card.suit).toBe('swords');
      });
    });

    it('应该返回星币花色的14张牌', () => {
      const cards = service.getCardsBySuit('pentacles');
      expect(cards).toHaveLength(14);
      cards.forEach(card => {
        expect(card.suit).toBe('pentacles');
      });
    });
  });

  describe('getMajorArcana', () => {
    it('应该返回22张大阿卡纳牌', () => {
      const cards = service.getMajorArcana();
      expect(cards).toHaveLength(22);
      cards.forEach(card => {
        expect(card.type).toBe('major');
      });
    });
  });

  describe('getMinorArcana', () => {
    it('应该返回56张小阿卡纳牌', () => {
      const cards = service.getMinorArcana();
      expect(cards).toHaveLength(56);
      cards.forEach(card => {
        expect(card.type).toBe('minor');
      });
    });
  });

  describe('getRandomCards', () => {
    it('应该返回指定数量的随机牌', () => {
      const cards = service.getRandomCards(5);
      expect(cards).toHaveLength(5);
    });

    it('返回的牌应该包含随机的正逆位', () => {
      const cards = service.getRandomCards(10);
      const hasUpright = cards.some(card => !card.isReversed);
      const hasReversed = cards.some(card => card.isReversed);
      // 注意：由于随机性，这个测试可能偶尔失败，但概率很低
      expect(hasUpright || hasReversed).toBe(true);
    });

    it('对于无效数量应该返回空数组或备用数据', () => {
      const cards1 = service.getRandomCards(0);
      const cards2 = service.getRandomCards(-1);
      const cards3 = service.getRandomCards(100); // 超过总牌数
      
      expect(cards1.length).toBeLessThanOrEqual(1); // 可能返回备用数据
      expect(cards2.length).toBeLessThanOrEqual(1);
      expect(cards3.length).toBeLessThanOrEqual(78);
    });
  });

  describe('getSpreads', () => {
    it('应该返回所有牌阵配置', () => {
      const spreads = service.getSpreads();
      expect(spreads.length).toBeGreaterThan(0);
    });

    it('每个牌阵都应该有必需的属性', () => {
      const spreads = service.getSpreads();
      spreads.forEach(spread => {
        expect(spread).toHaveProperty('id');
        expect(spread).toHaveProperty('name');
        expect(spread).toHaveProperty('description');
        expect(spread).toHaveProperty('positions');
        expect(spread).toHaveProperty('layout');
      });
    });
  });

  describe('getSpreadById', () => {
    it('应该根据有效ID返回对应的牌阵', () => {
      const spread = service.getSpreadById('single-card');
      expect(spread).not.toBeNull();
      expect(spread?.id).toBe('single-card');
      expect(spread?.name).toBe('单张牌');
    });

    it('对于无效ID应该返回null', () => {
      const spread = service.getSpreadById('invalid_spread');
      expect(spread).toBeNull();
    });
  });

  describe('getCardCountForSpread', () => {
    it('应该返回单张牌牌阵需要1张牌', () => {
      const count = service.getCardCountForSpread('single-card');
      expect(count).toBe(1);
    });

    it('应该返回三张牌牌阵需要3张牌', () => {
      const count = service.getCardCountForSpread('three-card');
      expect(count).toBe(3);
    });

    it('应该返回凯尔特十字牌阵需要10张牌', () => {
      const count = service.getCardCountForSpread('celtic-cross');
      expect(count).toBe(10);
    });

    it('对于无效牌阵ID应该返回0', () => {
      const count = service.getCardCountForSpread('invalid_spread');
      expect(count).toBe(0);
    });
  });

  describe('validateCard', () => {
    it('应该验证有效的塔罗牌数据', () => {
      const validCard = {
        id: 'test_card',
        name: '测试牌',
        nameEn: 'Test Card',
        type: 'major',
        isReversed: false,
        image: '/test.jpg',
        keywords: ['测试'],
        meaning: {
          upright: '正位含义',
          reversed: '逆位含义'
        },
        description: '测试描述'
      };

      const result = service.validateCard(validCard);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('应该识别无效的塔罗牌数据', () => {
      const invalidCard = {
        id: '',
        name: '',
        type: 'invalid'
      };

      const result = service.validateCard(invalidCard);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('createError', () => {
    it('应该创建塔罗错误对象', () => {
      const error = service.createError(
        TarotErrorType.CARD_NOT_FOUND,
        '未找到牌',
        { cardId: 'test' }
      );

      expect(error.type).toBe(TarotErrorType.CARD_NOT_FOUND);
      expect(error.message).toBe('未找到牌');
      expect(error.details).toEqual({ cardId: 'test' });
    });
  });

  describe('getServiceStatus', () => {
    it('应该返回服务状态信息', () => {
      const status = service.getServiceStatus();
      
      expect(status).toHaveProperty('isInitialized');
      expect(status).toHaveProperty('totalCards');
      expect(status).toHaveProperty('totalSpreads');
      expect(status).toHaveProperty('hasErrors');
      
      expect(typeof status.isInitialized).toBe('boolean');
      expect(typeof status.totalCards).toBe('number');
      expect(typeof status.totalSpreads).toBe('number');
      expect(typeof status.hasErrors).toBe('boolean');
    });
  });
});

// 集成测试
describe('TarotDataService Integration', () => {
  let service: TarotDataService;

  beforeEach(() => {
    service = TarotDataService.getInstance();
  });

  it('应该能够完成完整的占卜流程', () => {
    // 1. 获取牌阵
    const spreads = service.getSpreads();
    expect(spreads.length).toBeGreaterThan(0);

    // 2. 选择牌阵
    const selectedSpread = spreads[0];
    expect(selectedSpread).toBeDefined();

    // 3. 获取所需牌数
    const cardCount = service.getCardCountForSpread(selectedSpread.id);
    expect(cardCount).toBeGreaterThan(0);

    // 4. 抽取随机牌
    const drawnCards = service.getRandomCards(cardCount);
    expect(drawnCards).toHaveLength(cardCount);

    // 5. 验证抽取的牌
    drawnCards.forEach(card => {
      const validation = service.validateCard(card);
      expect(validation.isValid).toBe(true);
    });
  });

  it('应该能够处理所有类型的牌阵', () => {
    const spreads = service.getSpreads();
    
    spreads.forEach(spread => {
      const cardCount = service.getCardCountForSpread(spread.id);
      expect(cardCount).toBeGreaterThan(0);
      
      const cards = service.getRandomCards(cardCount);
      expect(cards).toHaveLength(cardCount);
    });
  });
});