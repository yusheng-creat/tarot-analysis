import { StorageService, storageService } from '../StorageService';
import { Reading, TarotCard } from '../../types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: jest.fn((index: number) => Object.keys(store)[index] || null)
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('StorageService', () => {
  let service: StorageService;
  
  // 测试用的占卜记录
  const mockReading: Reading = {
    id: 'test-reading-1',
    timestamp: new Date('2024-01-01T12:00:00Z'),
    question: '测试问题',
    spread: {
      id: 'single-card',
      name: '单张牌',
      description: '测试牌阵',
      positions: [{ id: 'main', name: '主牌', description: '测试位置' }]
    },
    cards: [{
      id: 'fool',
      name: '愚者',
      arcana: 'major',
      number: 0,
      suit: null,
      keywords: ['新开始'],
      uprightMeaning: '新的开始',
      reversedMeaning: '鲁莽行事',
      description: '测试卡牌',
      isReversed: false,
      position: { id: 'main', name: '主牌', description: '测试位置' }
    } as TarotCard],
    cardInterpretations: [{
      card: {
        id: 'fool',
        name: '愚者',
        arcana: 'major',
        number: 0,
        suit: null,
        keywords: ['新开始'],
        uprightMeaning: '新的开始',
        reversedMeaning: '鲁莽行事',
        description: '测试卡牌',
        isReversed: false,
        position: { id: 'main', name: '主牌', description: '测试位置' }
      } as TarotCard,
      interpretation: '测试解读',
      significance: 'high'
    }],
    overallAnalysis: '整体分析',
    advice: '建议'
  };

  const mockSettings = {
    theme: 'dark' as const,
    language: 'zh' as const,
    reversedCardProbability: 0.3,
    autoSave: true,
    soundEnabled: true
  };

  beforeEach(() => {
    // 清空 localStorage
    localStorageMock.clear();
    jest.clearAllMocks();
    
    // 获取服务实例
    service = StorageService.getInstance();
  });

  describe('单例模式', () => {
    it('应该返回同一个实例', () => {
      const instance1 = StorageService.getInstance();
      const instance2 = StorageService.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('存储可用性检查', () => {
    it('应该检测到localStorage可用', () => {
      expect(service.isStorageAvailable()).toBe(true);
    });

    it('应该处理localStorage不可用的情况', () => {
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = jest.fn(() => {
        throw new DOMException('QuotaExceededError');
      });

      expect(service.isStorageAvailable()).toBe(false);

      localStorage.setItem = originalSetItem;
    });
  });

  describe('占卜历史记录管理', () => {
    it('应该保存和加载历史记录', () => {
      const history = [mockReading];
      
      const saveResult = service.saveReadingHistory(history);
      expect(saveResult).toBe(true);
      
      const loadedHistory = service.loadReadingHistory();
      expect(loadedHistory).toHaveLength(1);
      expect(loadedHistory[0].id).toBe(mockReading.id);
      expect(loadedHistory[0].question).toBe(mockReading.question);
    });

    it('应该正确处理日期序列化', () => {
      const history = [mockReading];
      service.saveReadingHistory(history);
      
      const loadedHistory = service.loadReadingHistory();
      expect(loadedHistory[0].timestamp).toBeInstanceOf(Date);
      expect(loadedHistory[0].timestamp.getTime()).toBe(mockReading.timestamp.getTime());
    });

    it('应该在没有历史记录时返回空数组', () => {
      const history = service.loadReadingHistory();
      expect(history).toEqual([]);
    });

    it('应该添加单个占卜记录', () => {
      const addResult = service.addReading(mockReading);
      expect(addResult).toBe(true);
      
      const history = service.loadReadingHistory();
      expect(history).toHaveLength(1);
      expect(history[0].id).toBe(mockReading.id);
    });

    it('应该将新记录添加到开头', () => {
      const reading1 = { ...mockReading, id: 'reading-1' };
      const reading2 = { ...mockReading, id: 'reading-2' };
      
      service.addReading(reading1);
      service.addReading(reading2);
      
      const history = service.loadReadingHistory();
      expect(history[0].id).toBe('reading-2');
      expect(history[1].id).toBe('reading-1');
    });

    it('应该限制历史记录数量', () => {
      // 添加超过限制的记录
      for (let i = 0; i < 105; i++) {
        const reading = { ...mockReading, id: `reading-${i}` };
        service.addReading(reading);
      }
      
      const history = service.loadReadingHistory();
      expect(history.length).toBeLessThanOrEqual(100);
    });

    it('应该删除指定的占卜记录', () => {
      service.addReading(mockReading);
      
      const removeResult = service.removeReading(mockReading.id);
      expect(removeResult).toBe(true);
      
      const history = service.loadReadingHistory();
      expect(history).toHaveLength(0);
    });

    it('应该清空所有历史记录', () => {
      service.addReading(mockReading);
      
      const clearResult = service.clearReadingHistory();
      expect(clearResult).toBe(true);
      
      const history = service.loadReadingHistory();
      expect(history).toHaveLength(0);
    });
  });

  describe('用户设置管理', () => {
    it('应该保存和加载用户设置', () => {
      const saveResult = service.saveUserSettings(mockSettings);
      expect(saveResult).toBe(true);
      
      const loadedSettings = service.loadUserSettings();
      expect(loadedSettings).toEqual(mockSettings);
    });

    it('应该在没有设置时返回null', () => {
      const settings = service.loadUserSettings();
      expect(settings).toBeNull();
    });
  });

  describe('数据导入导出', () => {
    it('应该导出所有数据', () => {
      service.addReading(mockReading);
      service.saveUserSettings(mockSettings);
      
      const exportData = service.exportAllData();
      
      expect(exportData.version).toBeDefined();
      expect(exportData.exportDate).toBeDefined();
      expect(exportData.readingHistory).toHaveLength(1);
      expect(exportData.userSettings).toEqual(mockSettings);
    });

    it('应该导入历史记录', () => {
      const importData = {
        readingHistory: [mockReading]
      };
      
      const result = service.importData(importData);
      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
      
      const history = service.loadReadingHistory();
      expect(history).toHaveLength(1);
    });

    it('应该导入用户设置', () => {
      const importData = {
        userSettings: mockSettings
      };
      
      const result = service.importData(importData);
      expect(result.success).toBe(true);
      
      const settings = service.loadUserSettings();
      expect(settings).toEqual(mockSettings);
    });

    it('应该处理导入错误', () => {
      // Mock localStorage.setItem 抛出错误
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = jest.fn(() => {
        throw new Error('Storage error');
      });

      const importData = {
        readingHistory: [mockReading]
      };
      
      const result = service.importData(importData);
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);

      localStorage.setItem = originalSetItem;
    });
  });

  describe('存储使用情况', () => {
    it('应该计算存储使用情况', () => {
      // 先添加一些数据到localStorage
      localStorage.setItem('tarot_test_data', JSON.stringify({ test: 'data' }));
      service.addReading(mockReading);
      
      const usage = service.getStorageUsage();
      
      expect(usage.used).toBeGreaterThanOrEqual(0);
      expect(usage.total).toBe(5 * 1024 * 1024); // 5MB
      expect(usage.percentage).toBeGreaterThanOrEqual(0);
      expect(usage.readingCount).toBe(1);
    });
  });

  describe('数据清理', () => {
    it('应该清理过期数据', () => {
      const oldReading = {
        ...mockReading,
        id: 'old-reading',
        timestamp: new Date('2020-01-01T12:00:00Z') // 很久以前的记录
      };
      
      const newReading = {
        ...mockReading,
        id: 'new-reading',
        timestamp: new Date() // 当前时间
      };
      
      service.addReading(oldReading);
      service.addReading(newReading);
      
      const removedCount = service.cleanupExpiredData(30); // 清理30天前的数据
      expect(removedCount).toBe(1);
      
      const history = service.loadReadingHistory();
      expect(history).toHaveLength(1);
      expect(history[0].id).toBe('new-reading');
    });
  });

  describe('错误处理', () => {
    it('应该处理JSON解析错误', () => {
      // 直接设置无效的JSON
      localStorage.setItem('tarot_reading_history', 'invalid json');
      
      const history = service.loadReadingHistory();
      expect(history).toEqual([]);
    });

    it('应该处理存储错误', () => {
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = jest.fn(() => {
        throw new Error('Storage error');
      });

      const result = service.saveReadingHistory([mockReading]);
      expect(result).toBe(false);

      localStorage.setItem = originalSetItem;
    });
  });

  describe('数据迁移', () => {
    it('应该处理版本升级', () => {
      // 模拟旧版本数据
      const oldData = [{
        // 缺少id字段的旧格式
        timestamp: '2024-01-01T12:00:00Z',
        question: '旧问题',
        spread: mockReading.spread,
        cards: mockReading.cards,
        cardInterpretations: mockReading.cardInterpretations,
        overallAnalysis: '旧分析',
        advice: '旧建议'
      }];
      
      localStorage.setItem('tarot_reading_history', JSON.stringify(oldData));
      localStorage.setItem('tarot_app_version', '0.9.0');
      
      // 触发迁移逻辑
      service.loadReadingHistory(); // 这会触发迁移检查
      
      const history = service.loadReadingHistory();
      expect(history).toHaveLength(1);
      expect(history[0].timestamp).toBeInstanceOf(Date);
      expect(history[0].question).toBe('旧问题');
    });
  });
});