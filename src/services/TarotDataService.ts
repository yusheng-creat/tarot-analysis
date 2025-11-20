import { TarotCard, TarotError, TarotErrorType, SpreadType } from '../types';
import { 
  getAllCards, 
  getCardById as getCardByIdFromData, 
  getCardsBySuit, 
  getMajorArcana, 
  getMinorArcana,
  getRandomCards as getRandomCardsFromData,
  validateDeckCompleteness,
  getAllSpreads, 
  getSpreadById as getSpreadByIdFromData, 
  getCardCountForSpread 
} from '../data';

/**
 * 塔罗牌数据服务类
 * 提供塔罗牌数据的访问和操作功能
 */
export class TarotDataService {
  private static instance: TarotDataService;
  private isInitialized: boolean = false;
  private fallbackCards: TarotCard[] = [];

  private constructor() {
    this.initialize();
  }

  /**
   * 获取服务实例（单例模式）
   */
  public static getInstance(): TarotDataService {
    if (!TarotDataService.instance) {
      TarotDataService.instance = new TarotDataService();
    }
    return TarotDataService.instance;
  }

  /**
   * 初始化服务
   */
  private initialize(): void {
    try {
      // 验证数据完整性
      const isValid = validateDeckCompleteness();
      if (!isValid) {
        console.warn('塔罗牌数据不完整，启用备用模式');
        this.initializeFallbackData();
      }
      
      this.isInitialized = true;
      console.log('塔罗牌数据服务初始化成功');
    } catch (error) {
      console.error('塔罗牌数据服务初始化失败:', error);
      this.initializeFallbackData();
      this.isInitialized = true;
    }
  }

  /**
   * 初始化备用数据
   */
  private initializeFallbackData(): void {
    // 创建基本的备用牌数据
    this.fallbackCards = [
      {
        id: 'fallback_fool',
        name: '愚者',
        nameEn: 'The Fool',
        type: 'major',
        number: 0,
        isReversed: false,
        image: '/images/fallback/fool.jpg',
        keywords: ['新开始', '冒险'],
        meaning: {
          upright: '新的开始和冒险的精神',
          reversed: '鲁莽和缺乏计划'
        },
        description: '愚者代表新的开始和纯真的心态'
      }
    ];
  }

  /**
   * 获取所有塔罗牌
   */
  public getAllCards(): TarotCard[] {
    try {
      const cards = getAllCards();
      if (cards.length === 0) {
        throw new Error('没有可用的塔罗牌数据');
      }
      return cards;
    } catch (error) {
      console.error('获取所有塔罗牌失败:', error);
      return this.fallbackCards;
    }
  }

  /**
   * 根据ID获取特定的塔罗牌
   */
  public getCardById(id: string): TarotCard | null {
    try {
      if (!id || typeof id !== 'string') {
        throw new Error('无效的牌ID');
      }

      const card = getCardByIdFromData(id);
      if (!card) {
        console.warn(`未找到ID为 ${id} 的塔罗牌`);
        return null;
      }

      return card;
    } catch (error) {
      console.error(`获取塔罗牌失败 (ID: ${id}):`, error);
      return null;
    }
  }

  /**
   * 根据花色获取塔罗牌
   */
  public getCardsBySuit(suit: 'wands' | 'cups' | 'swords' | 'pentacles'): TarotCard[] {
    try {
      if (!suit || !['wands', 'cups', 'swords', 'pentacles'].includes(suit)) {
        throw new Error('无效的花色');
      }

      const cards = getCardsBySuit(suit);
      if (cards.length === 0) {
        console.warn(`${suit} 花色没有可用的牌`);
      }

      return cards;
    } catch (error) {
      console.error(`获取 ${suit} 花色塔罗牌失败:`, error);
      return [];
    }
  }

  /**
   * 获取大阿卡纳牌
   */
  public getMajorArcana(): TarotCard[] {
    try {
      const cards = getMajorArcana();
      if (cards.length === 0) {
        throw new Error('没有可用的大阿卡纳牌');
      }
      return cards;
    } catch (error) {
      console.error('获取大阿卡纳牌失败:', error);
      return this.fallbackCards;
    }
  }

  /**
   * 获取小阿卡纳牌
   */
  public getMinorArcana(): TarotCard[] {
    try {
      const cards = getMinorArcana();
      if (cards.length === 0) {
        throw new Error('没有可用的小阿卡纳牌');
      }
      return cards;
    } catch (error) {
      console.error('获取小阿卡纳牌失败:', error);
      return [];
    }
  }

  /**
   * 随机获取指定数量的塔罗牌
   */
  public getRandomCards(count: number): TarotCard[] {
    try {
      if (!count || count <= 0 || !Number.isInteger(count)) {
        throw new Error('无效的牌数量');
      }

      const totalCards = this.getAllCards().length;
      if (count > totalCards) {
        throw new Error(`请求的牌数量 (${count}) 超过了可用牌数 (${totalCards})`);
      }

      const randomCards = getRandomCardsFromData(count);
      if (randomCards.length !== count) {
        console.warn(`期望获取 ${count} 张牌，实际获取 ${randomCards.length} 张`);
      }

      return randomCards;
    } catch (error) {
      console.error(`随机获取塔罗牌失败 (数量: ${count}):`, error);
      
      // 返回备用数据
      const fallbackCount = Math.min(count, this.fallbackCards.length);
      return this.fallbackCards.slice(0, fallbackCount);
    }
  }

  /**
   * 获取所有牌阵配置
   */
  public getSpreads(): SpreadType[] {
    try {
      const spreads = getAllSpreads();
      if (spreads.length === 0) {
        throw new Error('没有可用的牌阵配置');
      }
      return spreads;
    } catch (error) {
      console.error('获取牌阵配置失败:', error);
      return [];
    }
  }

  /**
   * 根据ID获取特定的牌阵配置
   */
  public getSpreadById(id: string): SpreadType | null {
    try {
      if (!id || typeof id !== 'string') {
        throw new Error('无效的牌阵ID');
      }

      const spread = getSpreadByIdFromData(id);
      if (!spread) {
        console.warn(`未找到ID为 ${id} 的牌阵配置`);
        return null;
      }

      return spread;
    } catch (error) {
      console.error(`获取牌阵配置失败 (ID: ${id}):`, error);
      return null;
    }
  }

  /**
   * 获取牌阵所需的牌数
   */
  public getCardCountForSpread(spreadId: string): number {
    try {
      const count = getCardCountForSpread(spreadId);
      if (count === 0) {
        console.warn(`牌阵 ${spreadId} 不需要牌或配置无效`);
      }
      return count;
    } catch (error) {
      console.error(`获取牌阵所需牌数失败 (ID: ${spreadId}):`, error);
      return 0;
    }
  }

  /**
   * 验证塔罗牌数据
   */
  public validateCard(card: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!card || typeof card !== 'object') {
      return { isValid: false, errors: ['牌数据必须是对象'] };
    }

    // 基本字段验证
    if (!card.id || typeof card.id !== 'string') {
      errors.push('牌必须有有效的字符串ID');
    }

    if (!card.name || typeof card.name !== 'string') {
      errors.push('牌必须有有效的中文名称');
    }

    if (!card.nameEn || typeof card.nameEn !== 'string') {
      errors.push('牌必须有有效的英文名称');
    }

    if (!['major', 'minor'].includes(card.type)) {
      errors.push('牌类型必须是 "major" 或 "minor"');
    }

    if (typeof card.isReversed !== 'boolean') {
      errors.push('isReversed 必须是布尔值');
    }

    if (!card.image || typeof card.image !== 'string') {
      errors.push('牌必须有有效的图片路径');
    }

    if (!Array.isArray(card.keywords)) {
      errors.push('关键词必须是数组');
    }

    if (!card.meaning || typeof card.meaning !== 'object' ||
        typeof card.meaning.upright !== 'string' ||
        typeof card.meaning.reversed !== 'string') {
      errors.push('牌必须有有效的正位和逆位含义');
    }

    if (!card.description || typeof card.description !== 'string') {
      errors.push('牌必须有有效的描述');
    }

    return { isValid: errors.length === 0, errors };
  }

  /**
   * 创建塔罗错误对象
   */
  public createError(type: TarotErrorType, message: string, details?: any): TarotError {
    return {
      type,
      message,
      details
    };
  }

  /**
   * 获取服务状态
   */
  public getServiceStatus(): {
    isInitialized: boolean;
    totalCards: number;
    totalSpreads: number;
    hasErrors: boolean;
  } {
    try {
      const totalCards = this.getAllCards().length;
      const totalSpreads = this.getSpreads().length;
      
      return {
        isInitialized: this.isInitialized,
        totalCards,
        totalSpreads,
        hasErrors: totalCards === 0 || totalSpreads === 0
      };
    } catch (error) {
      return {
        isInitialized: this.isInitialized,
        totalCards: 0,
        totalSpreads: 0,
        hasErrors: true
      };
    }
  }

  /**
   * 重新初始化服务
   */
  public reinitialize(): void {
    this.isInitialized = false;
    this.fallbackCards = [];
    this.initialize();
  }
}

// 导出服务实例
export const tarotDataService = TarotDataService.getInstance();