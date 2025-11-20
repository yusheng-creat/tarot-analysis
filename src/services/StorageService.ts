import { Reading, TarotState } from '../types';

/**
 * 存储键名常量
 */
const STORAGE_KEYS = {
  READING_HISTORY: 'tarot_reading_history',
  USER_SETTINGS: 'tarot_user_settings',
  APP_VERSION: 'tarot_app_version'
} as const;

/**
 * 当前应用版本
 */
const CURRENT_VERSION = '1.0.0';

/**
 * 存储服务类
 * 负责数据的持久化存储和读取
 */
export class StorageService {
  private static instance: StorageService;

  private constructor() {
    this.initializeStorage();
  }

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  /**
   * 初始化存储
   */
  private initializeStorage(): void {
    try {
      // 检查版本并进行必要的迁移
      this.checkAndMigrateData();
    } catch (error) {
      console.error('存储初始化失败:', error);
    }
  }

  /**
   * 检查数据版本并进行迁移
   */
  private checkAndMigrateData(): void {
    const storedVersion = this.getItem(STORAGE_KEYS.APP_VERSION);
    
    if (!storedVersion) {
      // 首次使用，设置版本
      this.setItem(STORAGE_KEYS.APP_VERSION, CURRENT_VERSION);
    } else if (storedVersion !== CURRENT_VERSION) {
      // 版本不匹配，进行数据迁移
      this.migrateData(storedVersion, CURRENT_VERSION);
      this.setItem(STORAGE_KEYS.APP_VERSION, CURRENT_VERSION);
    }
  }

  /**
   * 数据迁移
   */
  private migrateData(fromVersion: string, toVersion: string): void {
    console.log(`数据迁移: ${fromVersion} -> ${toVersion}`);
    
    try {
      // 示例：如果有旧版本的数据格式，可以在这里转换
      const oldHistory = this.getItem(STORAGE_KEYS.READING_HISTORY);
      if (oldHistory && Array.isArray(oldHistory)) {
        // 确保每个记录都有必要的字段
        const migratedHistory = oldHistory.map((reading: any) => ({
          ...reading,
          // 添加可能缺失的字段
          id: reading.id || `reading_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: reading.timestamp ? new Date(reading.timestamp) : new Date()
        }));
        
        this.setItem(STORAGE_KEYS.READING_HISTORY, migratedHistory);
      }
    } catch (error) {
      console.error('数据迁移失败:', error);
    }
  }

  /**
   * 保存占卜历史记录
   */
  public saveReadingHistory(history: Reading[]): boolean {
    try {
      this.setItem(STORAGE_KEYS.READING_HISTORY, history);
      return true;
    } catch (error) {
      console.error('保存历史记录失败:', error);
      return false;
    }
  }

  /**
   * 加载占卜历史记录
   */
  public loadReadingHistory(): Reading[] {
    try {
      const history = this.getItem(STORAGE_KEYS.READING_HISTORY);
      if (Array.isArray(history)) {
        // 确保日期对象正确反序列化
        return history.map(reading => ({
          ...reading,
          timestamp: new Date(reading.timestamp)
        }));
      }
      return [];
    } catch (error) {
      console.error('加载历史记录失败:', error);
      return [];
    }
  }

  /**
   * 添加单个占卜记录
   */
  public addReading(reading: Reading): boolean {
    try {
      const history = this.loadReadingHistory();
      history.unshift(reading); // 添加到开头
      
      // 限制历史记录数量（可配置）
      const maxHistorySize = 100;
      if (history.length > maxHistorySize) {
        history.splice(maxHistorySize);
      }
      
      return this.saveReadingHistory(history);
    } catch (error) {
      console.error('添加占卜记录失败:', error);
      return false;
    }
  }

  /**
   * 删除单个占卜记录
   */
  public removeReading(readingId: string): boolean {
    try {
      const history = this.loadReadingHistory();
      const filteredHistory = history.filter(reading => reading.id !== readingId);
      return this.saveReadingHistory(filteredHistory);
    } catch (error) {
      console.error('删除占卜记录失败:', error);
      return false;
    }
  }

  /**
   * 清空所有历史记录
   */
  public clearReadingHistory(): boolean {
    try {
      this.removeItem(STORAGE_KEYS.READING_HISTORY);
      return true;
    } catch (error) {
      console.error('清空历史记录失败:', error);
      return false;
    }
  }

  /**
   * 保存用户设置
   */
  public saveUserSettings(settings: TarotState['settings']): boolean {
    try {
      this.setItem(STORAGE_KEYS.USER_SETTINGS, settings);
      return true;
    } catch (error) {
      console.error('保存用户设置失败:', error);
      return false;
    }
  }

  /**
   * 加载用户设置
   */
  public loadUserSettings(): TarotState['settings'] | null {
    try {
      return this.getItem(STORAGE_KEYS.USER_SETTINGS);
    } catch (error) {
      console.error('加载用户设置失败:', error);
      return null;
    }
  }

  /**
   * 导出所有数据
   */
  public exportAllData(): {
    version: string;
    exportDate: string;
    readingHistory: Reading[];
    userSettings: TarotState['settings'] | null;
  } {
    return {
      version: CURRENT_VERSION,
      exportDate: new Date().toISOString(),
      readingHistory: this.loadReadingHistory(),
      userSettings: this.loadUserSettings()
    };
  }

  /**
   * 导入数据
   */
  public importData(data: {
    readingHistory?: Reading[];
    userSettings?: TarotState['settings'];
  }): { success: boolean; errors: string[] } {
    const errors: string[] = [];
    let success = true;

    try {
      // 导入历史记录
      if (data.readingHistory && Array.isArray(data.readingHistory)) {
        const importSuccess = this.saveReadingHistory(data.readingHistory);
        if (!importSuccess) {
          errors.push('历史记录导入失败');
          success = false;
        }
      }

      // 导入用户设置
      if (data.userSettings) {
        const settingsSuccess = this.saveUserSettings(data.userSettings);
        if (!settingsSuccess) {
          errors.push('用户设置导入失败');
          success = false;
        }
      }
    } catch (error) {
      errors.push(`导入过程中发生错误: ${error}`);
      success = false;
    }

    return { success, errors };
  }

  /**
   * 获取存储使用情况
   */
  public getStorageUsage(): {
    used: number;
    total: number;
    percentage: number;
    readingCount: number;
  } {
    try {
      let used = 0;
      
      // 计算已使用的存储空间
      for (const key in localStorage) {
        if (key.startsWith('tarot_')) {
          used += (localStorage[key] || '').length;
        }
      }
      
      // localStorage 通常限制为 5MB
      const total = 5 * 1024 * 1024; // 5MB in bytes
      const percentage = (used / total) * 100;
      const readingCount = this.loadReadingHistory().length;
      
      return {
        used,
        total,
        percentage: Math.round(percentage * 100) / 100,
        readingCount
      };
    } catch (error) {
      console.error('获取存储使用情况失败:', error);
      return {
        used: 0,
        total: 0,
        percentage: 0,
        readingCount: 0
      };
    }
  }

  /**
   * 清理过期数据
   */
  public cleanupExpiredData(maxAge: number = 365): number {
    try {
      const history = this.loadReadingHistory();
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - maxAge);
      
      const filteredHistory = history.filter(reading => 
        new Date(reading.timestamp) > cutoffDate
      );
      
      const removedCount = history.length - filteredHistory.length;
      
      if (removedCount > 0) {
        this.saveReadingHistory(filteredHistory);
      }
      
      return removedCount;
    } catch (error) {
      console.error('清理过期数据失败:', error);
      return 0;
    }
  }

  /**
   * 检查存储是否可用
   */
  public isStorageAvailable(): boolean {
    try {
      const testKey = 'tarot_storage_test';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * 私有方法：设置项目
   */
  private setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      if (error instanceof DOMException && error.code === 22) {
        throw new Error('存储空间不足');
      }
      throw error;
    }
  }

  /**
   * 私有方法：获取项目
   */
  private getItem(key: string): any {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`解析存储项目失败 (${key}):`, error);
      return null;
    }
  }

  /**
   * 私有方法：删除项目
   */
  private removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}

// 导出服务实例
export const storageService = StorageService.getInstance();