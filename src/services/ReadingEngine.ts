import { TarotCard, SpreadType, Reading, CardInterpretation } from '../types';

/**
 * 牌面组合分析结果
 */
export interface CombinationAnalysis {
  theme: string;
  energy: 'positive' | 'negative' | 'neutral' | 'mixed';
  keyInsights: string[];
  warnings?: string[];
  opportunities?: string[];
}

/**
 * 解读配置
 */
export interface ReadingConfig {
  includeReversed: boolean;
  focusOnQuestion: boolean;
  detailLevel: 'basic' | 'detailed' | 'comprehensive';
  language: 'zh' | 'en';
}

/**
 * 塔罗解读引擎
 * 提供智能化的牌面解读和分析功能
 */
export class ReadingEngine {
  private static instance: ReadingEngine;

  private constructor() {}

  public static getInstance(): ReadingEngine {
    if (!ReadingEngine.instance) {
      ReadingEngine.instance = new ReadingEngine();
    }
    return ReadingEngine.instance;
  }

  /**
   * 生成完整的塔罗解读
   */
  public generateReading(
    cards: TarotCard[],
    spread: SpreadType,
    question?: string,
    config: ReadingConfig = {
      includeReversed: true,
      focusOnQuestion: true,
      detailLevel: 'detailed',
      language: 'zh'
    }
  ): Reading {
    try {
      // 验证输入参数
      if (!cards || cards.length === 0) {
        throw new Error('卡牌数组不能为空');
      }

      if (!spread || !spread.positions) {
        throw new Error('牌阵配置无效');
      }

      if (cards.length !== spread.positions.length) {
        throw new Error(`卡牌数量(${cards.length})与牌阵位置数量(${spread.positions.length})不匹配`);
      }

      // 生成解读ID
      const readingId = this.generateReadingId();

      // 为每张牌生成解读
      const interpretations = cards.map((card, index) => 
        this.interpretCard(card, spread.positions[index], question, config)
      );

      // 分析牌面组合
      const combinationAnalysis = this.analyzeCardCombinations(cards, spread, question);

      // 生成整体分析
      const overallAnalysis = this.generateOverallAnalysis(
        cards, 
        spread, 
        combinationAnalysis, 
        question, 
        config
      );

      // 生成建议
      const advice = this.generateAdvice(cards, spread, combinationAnalysis, question, config);

      return {
        id: readingId,
        timestamp: new Date(),
        question,
        spread,
        cards,
        interpretations,
        overallAnalysis,
        advice
      };

    } catch (error) {
      console.error('生成解读失败:', error);
      throw new Error('解读生成过程中发生错误');
    }
  }

  /**
   * 解读单张牌
   */
  public interpretCard(
    card: TarotCard,
    position: SpreadType['positions'][0],
    question?: string,
    config: ReadingConfig = {
      includeReversed: true,
      focusOnQuestion: true,
      detailLevel: 'detailed',
      language: 'zh'
    }
  ): CardInterpretation {
    const baseInterpretation = card.isReversed ? card.meaning.reversed : card.meaning.upright;
    
    // 结合牌位含义进行解读
    const positionContext = this.getPositionContext(position, card, question);
    
    // 生成详细解读
    const detailedInterpretation = this.generateDetailedInterpretation(
      card, 
      position, 
      baseInterpretation, 
      positionContext,
      config
    );

    // 提取关键信息
    const keyMessages = this.extractKeyMessages(card, position, question);

    return {
      card,
      position,
      interpretation: detailedInterpretation,
      keyMessages,
      energy: this.analyzeCardEnergy(card),
      relevanceToQuestion: question ? this.analyzeRelevanceToQuestion(card, question) : undefined
    };
  }

  /**
   * 分析牌面组合
   */
  public analyzeCardCombinations(
    cards: TarotCard[],
    spread: SpreadType,
    question?: string
  ): CombinationAnalysis {
    // 分析整体能量
    const overallEnergy = this.analyzeOverallEnergy(cards);
    
    // 识别主题
    const theme = this.identifyTheme(cards, spread, question);
    
    // 提取关键洞察
    const keyInsights = this.extractCombinationInsights(cards, spread);
    
    // 识别警告和机会
    const warnings = this.identifyWarnings(cards);
    const opportunities = this.identifyOpportunities(cards);

    return {
      theme,
      energy: overallEnergy,
      keyInsights,
      warnings: warnings.length > 0 ? warnings : undefined,
      opportunities: opportunities.length > 0 ? opportunities : undefined
    };
  }

  /**
   * 生成解读ID
   */
  private generateReadingId(): string {
    return `reading_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 获取牌位上下文
   */
  private getPositionContext(
    position: SpreadType['positions'][0],
    card: TarotCard,
    question?: string
  ): string {
    const positionMeaning = position.meaning;
    const cardType = card.type === 'major' ? '大阿卡纳' : '小阿卡纳';
    const orientation = card.isReversed ? '逆位' : '正位';

    return `在"${position.name}"位置上，${cardType}牌${card.name}以${orientation}出现，代表${positionMeaning}。`;
  }

  /**
   * 生成详细解读
   */
  private generateDetailedInterpretation(
    card: TarotCard,
    position: SpreadType['positions'][0],
    baseInterpretation: string,
    positionContext: string,
    config: ReadingConfig
  ): string {
    let interpretation = positionContext + '\n\n';
    
    interpretation += `${card.name}的核心含义：${baseInterpretation}\n\n`;
    
    // 添加关键词解释
    const relevantKeywords = card.keywords.slice(0, 3);
    interpretation += `关键概念：${relevantKeywords.join('、')}。`;
    
    if (config.detailLevel === 'comprehensive') {
      interpretation += `\n\n${card.description}`;
    }

    // 结合牌位进行深度分析
    interpretation += this.generatePositionSpecificInsight(card, position);

    return interpretation;
  }

  /**
   * 生成牌位特定洞察
   */
  private generatePositionSpecificInsight(
    card: TarotCard,
    position: SpreadType['positions'][0]
  ): string {
    const insights = [];

    // 根据牌位ID提供特定建议
    switch (position.id) {
      case 'past':
        insights.push(`这张牌揭示了影响当前情况的重要过去经历。`);
        break;
      case 'present':
        insights.push(`这是当前最需要关注的核心议题。`);
        break;
      case 'future':
        insights.push(`这预示着可能的发展方向和未来趋势。`);
        break;
      case 'challenge':
        insights.push(`这代表你需要面对和克服的主要挑战。`);
        break;
      case 'advice':
        insights.push(`这是宇宙给你的重要指导和建议。`);
        break;
      default:
        insights.push(`在这个位置上，这张牌为你提供了重要的指引。`);
    }

    // 根据牌的类型添加特定洞察
    if (card.type === 'major') {
      insights.push(`作为大阿卡纳牌，${card.name}代表着重要的人生课题和精神成长机会。`);
    } else {
      insights.push(`作为小阿卡纳牌，${card.name}关注的是日常生活中的具体事务和实际行动。`);
    }

    // 逆位特殊提示
    if (card.isReversed) {
      insights.push(`逆位出现提醒你需要内省，或者表示能量被阻塞，需要特别关注。`);
    }

    return '\n\n' + insights.join(' ');
  }

  /**
   * 提取关键信息
   */
  private extractKeyMessages(
    card: TarotCard,
    position: SpreadType['positions'][0],
    question?: string
  ): string[] {
    const messages = [];

    // 基于牌面的核心信息
    if (card.isReversed) {
      messages.push(`需要关注内在阻碍或反思${card.keywords[0]}`);
    } else {
      messages.push(`拥抱${card.keywords[0]}的力量`);
    }

    // 基于位置的信息
    if (position.id === 'challenge') {
      messages.push('这是成长的机会');
    } else if (position.id === 'advice') {
      messages.push('重要的指导方向');
    }

    // 基于牌的数字能量（如果是小阿卡纳）
    if (card.type === 'minor' && card.number !== undefined) {
      const numerologyMessage = this.getNumerologyMessage(card.number);
      if (numerologyMessage) {
        messages.push(numerologyMessage);
      }
    }

    return messages;
  }

  /**
   * 分析牌的能量
   */
  private analyzeCardEnergy(card: TarotCard): 'positive' | 'negative' | 'neutral' {
    // 基于牌名和关键词的简单能量分析
    const positiveCards = ['太阳', '星星', '世界', '力量', '魔术师', '皇后'];
    const negativeCards = ['塔', '死神', '恶魔', '倒吊人'];
    
    if (positiveCards.includes(card.name)) {
      return card.isReversed ? 'neutral' : 'positive';
    }
    
    if (negativeCards.includes(card.name)) {
      return card.isReversed ? 'neutral' : 'negative';
    }
    
    return 'neutral';
  }

  /**
   * 分析与问题的相关性
   */
  private analyzeRelevanceToQuestion(card: TarotCard, question: string): number {
    // 简单的关键词匹配分析
    const questionLower = question.toLowerCase();
    const cardKeywords = card.keywords.map(k => k.toLowerCase());
    
    let relevance = 0.5; // 基础相关性
    
    // 检查关键词匹配
    cardKeywords.forEach(keyword => {
      if (questionLower.includes(keyword)) {
        relevance += 0.2;
      }
    });
    
    // 检查主题匹配
    if (questionLower.includes('爱情') || questionLower.includes('感情')) {
      if (card.suit === 'cups' || ['恋人', '皇后', '皇帝'].includes(card.name)) {
        relevance += 0.3;
      }
    }
    
    if (questionLower.includes('事业') || questionLower.includes('工作')) {
      if (card.suit === 'pentacles' || card.suit === 'wands') {
        relevance += 0.3;
      }
    }
    
    return Math.min(relevance, 1.0);
  }

  /**
   * 分析整体能量
   */
  private analyzeOverallEnergy(cards: TarotCard[]): 'positive' | 'negative' | 'neutral' | 'mixed' {
    const energies = cards.map(card => this.analyzeCardEnergy(card));
    const positiveCount = energies.filter(e => e === 'positive').length;
    const negativeCount = energies.filter(e => e === 'negative').length;
    
    if (positiveCount > negativeCount * 2) return 'positive';
    if (negativeCount > positiveCount * 2) return 'negative';
    if (positiveCount > 0 && negativeCount > 0) return 'mixed';
    return 'neutral';
  }

  /**
   * 识别主题
   */
  private identifyTheme(cards: TarotCard[], spread: SpreadType, question?: string): string {
    // 分析花色分布
    const suits = cards.filter(c => c.suit).map(c => c.suit);
    const suitCounts = suits.reduce((acc, suit) => {
      acc[suit!] = (acc[suit!] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const dominantSuit = Object.entries(suitCounts).sort(([,a], [,b]) => b - a)[0]?.[0];

    // 基于主导花色确定主题
    switch (dominantSuit) {
      case 'cups':
        return '情感与关系';
      case 'wands':
        return '行动与创造';
      case 'swords':
        return '思考与沟通';
      case 'pentacles':
        return '物质与实践';
      default:
        return '人生成长与转变';
    }
  }

  /**
   * 提取组合洞察
   */
  private extractCombinationInsights(cards: TarotCard[], spread: SpreadType): string[] {
    const insights = [];

    // 分析大阿卡纳的比例
    const majorCount = cards.filter(c => c.type === 'major').length;
    if (majorCount > cards.length / 2) {
      insights.push('这次占卜涉及重要的人生课题和精神成长');
    }

    // 分析逆位牌的比例
    const reversedCount = cards.filter(c => c.isReversed).length;
    if (reversedCount > cards.length / 2) {
      insights.push('需要更多的内省和反思，关注内在的阻碍');
    }

    // 特殊牌面组合
    const cardNames = cards.map(c => c.name);
    if (cardNames.includes('死神') && cardNames.includes('太阳')) {
      insights.push('重大转变后将迎来新的开始和希望');
    }

    if (cardNames.includes('恋人') && cardNames.includes('世界')) {
      insights.push('关系或选择将带来圆满的结果');
    }

    return insights;
  }

  /**
   * 识别警告
   */
  private identifyWarnings(cards: TarotCard[]): string[] {
    const warnings = [];
    const cardNames = cards.map(c => c.name);

    if (cardNames.includes('塔')) {
      warnings.push('可能面临突然的变化，需要做好心理准备');
    }

    if (cardNames.includes('恶魔')) {
      warnings.push('注意不要被诱惑或负面情绪所困');
    }

    const reversedMajor = cards.filter(c => c.type === 'major' && c.isReversed);
    if (reversedMajor.length > 2) {
      warnings.push('重要的人生课题可能被忽视，需要重新审视');
    }

    return warnings;
  }

  /**
   * 识别机会
   */
  private identifyOpportunities(cards: TarotCard[]): string[] {
    const opportunities = [];
    const cardNames = cards.map(c => c.name);

    if (cardNames.includes('魔术师')) {
      opportunities.push('拥有实现目标的所有工具和能力');
    }

    if (cardNames.includes('星星')) {
      opportunities.push('希望和灵感将指引前进的方向');
    }

    if (cardNames.includes('权杖王牌') || cardNames.includes('星币王牌')) {
      opportunities.push('新的开始和机会正在显现');
    }

    return opportunities;
  }

  /**
   * 生成整体分析
   */
  private generateOverallAnalysis(
    cards: TarotCard[],
    spread: SpreadType,
    combination: CombinationAnalysis,
    question?: string,
    config: ReadingConfig
  ): string {
    let analysis = `这次${spread.name}占卜为你揭示了关于"${combination.theme}"的重要信息。\n\n`;

    // 整体能量分析
    switch (combination.energy) {
      case 'positive':
        analysis += '整体能量积极向上，预示着良好的发展前景。';
        break;
      case 'negative':
        analysis += '当前面临一些挑战，但这也是成长和转变的机会。';
        break;
      case 'mixed':
        analysis += '能量呈现复杂的混合状态，需要平衡不同的因素。';
        break;
      default:
        analysis += '能量相对平稳，适合深入思考和稳步前进。';
    }

    analysis += '\n\n';

    // 关键洞察
    if (combination.keyInsights.length > 0) {
      analysis += '关键洞察：\n';
      combination.keyInsights.forEach((insight, index) => {
        analysis += `${index + 1}. ${insight}\n`;
      });
    }

    // 针对问题的特殊分析
    if (question) {
      analysis += `\n针对你的问题"${question}"，牌面显示了多层面的指导和建议。`;
    }

    return analysis;
  }

  /**
   * 生成建议
   */
  private generateAdvice(
    cards: TarotCard[],
    spread: SpreadType,
    combination: CombinationAnalysis,
    question?: string,
    config: ReadingConfig
  ): string {
    let advice = '基于这次占卜的结果，以下是给你的建议：\n\n';

    // 基于整体能量的建议
    switch (combination.energy) {
      case 'positive':
        advice += '• 抓住当前的积极机会，勇敢地向前迈进\n';
        break;
      case 'negative':
        advice += '• 保持耐心，将挑战视为成长的机会\n';
        break;
      case 'mixed':
        advice += '• 保持平衡，既要积极行动也要谨慎思考\n';
        break;
      default:
        advice += '• 保持内心的平静，倾听直觉的声音\n';
    }

    // 基于主题的建议
    switch (combination.theme) {
      case '情感与关系':
        advice += '• 在人际关系中保持真诚和开放的心态\n';
        break;
      case '行动与创造':
        advice += '• 将想法付诸行动，发挥你的创造力\n';
        break;
      case '思考与沟通':
        advice += '• 清晰地表达想法，理性地分析问题\n';
        break;
      case '物质与实践':
        advice += '• 关注实际行动和物质层面的建设\n';
        break;
    }

    // 警告和机会
    if (combination.warnings) {
      advice += '\n需要注意的方面：\n';
      combination.warnings.forEach(warning => {
        advice += `• ${warning}\n`;
      });
    }

    if (combination.opportunities) {
      advice += '\n可以把握的机会：\n';
      combination.opportunities.forEach(opportunity => {
        advice += `• ${opportunity}\n`;
      });
    }

    advice += '\n记住，塔罗牌提供的是指导和启发，最终的选择权始终在你手中。相信自己的直觉，勇敢地走向属于你的道路。';

    return advice;
  }

  /**
   * 获取数字能量信息
   */
  private getNumerologyMessage(number: number): string | null {
    const numerologyMessages: Record<number, string> = {
      1: '新开始的能量',
      2: '平衡与合作',
      3: '创造与表达',
      4: '稳定与建设',
      5: '变化与自由',
      6: '和谐与责任',
      7: '精神与反思',
      8: '成就与力量',
      9: '完成与智慧',
      10: '循环与转变'
    };

    return numerologyMessages[number] || null;
  }
}

// 导出服务实例
export const readingEngine = ReadingEngine.getInstance();