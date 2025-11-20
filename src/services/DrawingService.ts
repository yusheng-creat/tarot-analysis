import { TarotCard, SpreadType, TarotError, TarotErrorType } from '../types';
import { tarotDataService } from './TarotDataService';

/**
 * 抽牌结果接口
 */
export interface DrawingResult {
  cards: TarotCard[];
  spread: SpreadType;
  timestamp: Date;
  sessionId: string;
}

/**
 * 抽牌配置接口
 */
export interface DrawingConfig {
  spreadId: string;
  allowDuplicates?: boolean;
  forceReversed?: boolean;
  reversedProbability?: number;
}

/**
 * 抽牌服务类
 * 负责塔罗牌的随机抽取和正逆位分配
 */
export class DrawingService {
  private static instance: DrawingService;
  private readonly DEFAULT_REVERSED_PROBABILITY = 0.3; // 30%的逆位概率
  private usedCards: Set<string> = new Set();
  private currentSessionId: string = '';

  private constructor() {
    this.generateNewSession();
  }

  /**
   * 获取服务实例（单例模式）
   */
  public static getInstance(): DrawingService {
    if (!DrawingService.instance) {
      DrawingService.instance = new DrawingService();
    }
    return DrawingService.instance;
  }

  /**
   * 生成新的会话ID
   */
  private generateNewSession(): void {
    this.currentSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.usedCards.clear();
  }

  /**
   * 生成高质量的随机数
   */
  private getSecureRandom(): number {
    // 使用多种随机源提高随机性
    const crypto = Math.random();
    const time = (Date.now() % 1000) / 1000;
    const perf = (typeof performance !== 'undefined' && performance?.now?.() % 1000) / 1000 || Math.random();
    
    // 组合多个随机源
    return (crypto + time + perf) % 1;
  }

  /**
   * Fisher-Yates洗牌算法
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(this.getSecureRandom() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * 决定牌的正逆位
   */
  private determineReversed(
    card: TarotCard, 
    config: DrawingConfig
  ): boolean {
    if (config.forceReversed !== undefined) {
      return config.forceReversed;
    }

    const probability = config.reversedProbability ?? this.DEFAULT_REVERSED_PROBABILITY;
    return this.getSecureRandom() < probability;
  }

  /**
   * 验证抽牌配置
   */
  private validateConfig(config: DrawingConfig): void {
    if (!config.spreadId) {
      throw new Error('牌阵ID不能为空');
    }

    const spread = tarotDataService.getSpreadById(config.spreadId);
    if (!spread) {
      throw new Error(`未找到牌阵: ${config.spreadId}`);
    }

    if (config.reversedProbability !== undefined) {
      if (config.reversedProbability < 0 || config.reversedProbability > 1) {
        throw new Error('逆位概率必须在0-1之间');
      }
    }
  }

  /**
   * 执行抽牌
   */
  public drawCards(config: DrawingConfig): DrawingResult {
    try {
      // 验证配置
      this.validateConfig(config);

      // 获取牌阵信息
      const spread = tarotDataService.getSpreadById(config.spreadId)!;
      const cardCount = spread.positions.length;

      // 获取所有可用的牌
      let availableCards = tarotDataService.getAllCards();

      // 如果不允许重复，排除已使用的牌
      if (!config.allowDuplicates) {
        availableCards = availableCards.filter(card => !this.usedCards.has(card.id));
      }

      // 检查是否有足够的牌
      if (availableCards.length < cardCount) {
        if (!config.allowDuplicates) {
          // 重置会话，允许重新使用所有牌
          this.generateNewSession();
          availableCards = tarotDataService.getAllCards();
        } else {
          throw new Error(`可用牌数不足: 需要${cardCount}张，可用${availableCards.length}张`);
        }
      }

      // 洗牌
      const shuffledCards = this.shuffleArray(availableCards);

      // 抽取指定数量的牌
      const drawnCards = shuffledCards.slice(0, cardCount).map((card, index) => {
        const isReversed = this.determineReversed(card, config);
        
        // 记录已使用的牌
        if (!config.allowDuplicates) {
          this.usedCards.add(card.id);
        }

        return {
          ...card,
          isReversed
        };
      });

      const result: DrawingResult = {
        cards: drawnCards,
        spread,
        timestamp: new Date(),
        sessionId: this.currentSessionId
      };

      console.log(`成功抽取${cardCount}张牌，牌阵: ${spread.name}`);
      return result;

    } catch (error) {
      console.error('抽牌失败:', error);
      throw error;
    }
  }

  /**
   * 快速抽牌（使用默认配置）
   */
  public quickDraw(spreadId: string): DrawingResult {
    return this.drawCards({ spreadId });
  }

  /**
   * 重新抽牌（重置当前会话）
   */
  public redraw(config: DrawingConfig): DrawingResult {
    this.generateNewSession();
    return this.drawCards(config);
  }

  /**
   * 获取单张随机牌
   */
  public drawSingleCard(): TarotCard {
    const result = this.drawCards({ spreadId: 'single-card' });
    return result.cards[0];
  }

  /**
   * 批量抽牌（用于测试或特殊需求）
   */
  public drawMultiple(count: number, allowDuplicates: boolean = false): TarotCard[] {
    try {
      if (count <= 0 || !Number.isInteger(count)) {
        throw new Error('抽牌数量必须是正整数');
      }

      let availableCards = tarotDataService.getAllCards();
      
      if (!allowDuplicates && count > availableCards.length) {
        throw new Error(`不允许重复时，抽牌数量不能超过总牌数`);
      }

      const shuffledCards = this.shuffleArray(availableCards);
      const drawnCards: TarotCard[] = [];

      for (let i = 0; i < count; i++) {
        let cardIndex: number;
        
        if (allowDuplicates) {
          cardIndex = Math.floor(this.getSecureRandom() * availableCards.length);
        } else {
          cardIndex = i % shuffledCards.length;
        }

        const card = shuffledCards[cardIndex];
        const isReversed = this.getSecureRandom() < this.DEFAULT_REVERSED_PROBABILITY;

        drawnCards.push({
          ...card,
          isReversed
        });
      }

      return drawnCards;

    } catch (error) {
      console.error('批量抽牌失败:', error);
      throw error;
    }
  }

  /**
   * 获取抽牌统计信息
   */
  public getDrawingStats(): {
    sessionId: string;
    usedCardsCount: number;
    remainingCardsCount: number;
    totalCards: number;
  } {
    const totalCards = tarotDataService.getAllCards().length;
    const usedCardsCount = this.usedCards.size;
    const remainingCardsCount = totalCards - usedCardsCount;

    return {
      sessionId: this.currentSessionId,
      usedCardsCount,
      remainingCardsCount,
      totalCards
    };
  }

  /**
   * 重置抽牌会话
   */
  public resetSession(): void {
    this.generateNewSession();
    console.log('抽牌会话已重置');
  }

  /**
   * 测试随机性质量
   */
  public testRandomness(iterations: number = 1000): {
    reversedRate: number;
    cardDistribution: Map<string, number>;
    qualityScore: number;
  } {
    const results = new Map<string, number>();
    let reversedCount = 0;

    for (let i = 0; i < iterations; i++) {
      const card = this.drawSingleCard();
      
      if (card.isReversed) {
        reversedCount++;
      }

      const count = results.get(card.id) || 0;
      results.set(card.id, count + 1);
    }

    const reversedRate = reversedCount / iterations;
    
    // 计算分布均匀性（质量分数）
    const expectedFrequency = iterations / tarotDataService.getAllCards().length;
    let variance = 0;
    
    results.forEach(count => {
      variance += Math.pow(count - expectedFrequency, 2);
    });
    
    const standardDeviation = Math.sqrt(variance / results.size);
    const qualityScore = Math.max(0, 100 - (standardDeviation / expectedFrequency) * 100);

    return {
      reversedRate,
      cardDistribution: results,
      qualityScore: Math.round(qualityScore * 100) / 100
    };
  }

  /**
   * 创建抽牌错误
   */
  public createDrawingError(message: string, details?: any): TarotError {
    return {
      type: TarotErrorType.READING_GENERATION_ERROR,
      message,
      details
    };
  }
}

// 导出服务实例
export const drawingService = DrawingService.getInstance();