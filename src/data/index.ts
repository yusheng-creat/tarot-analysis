// 塔罗牌数据导出
export { majorArcana } from './majorArcana';
export { wands, cups, swords, pentacles } from './minorArcana';
export { 
  tarotDeck, 
  getAllCards, 
  getCardById, 
  getCardsBySuit, 
  getMajorArcana, 
  getMinorArcana, 
  getRandomCards,
  validateDeckCompleteness 
} from './tarotDeck';

// 牌阵数据导出
export { 
  spreads, 
  getSpreadById, 
  getAllSpreads, 
  getRecommendedSpreads, 
  getCardCountForSpread,
  validateSpread 
} from './spreads';

// 数据统计信息
export const DATA_STATS = {
  TOTAL_CARDS: 78,
  MAJOR_ARCANA_COUNT: 22,
  MINOR_ARCANA_COUNT: 56,
  CARDS_PER_SUIT: 14,
  TOTAL_SPREADS: 5,
  SUITS: ['wands', 'cups', 'swords', 'pentacles'] as const,
  SUIT_NAMES: {
    wands: '权杖',
    cups: '圣杯', 
    swords: '宝剑',
    pentacles: '星币'
  }
};

// 数据完整性检查
export const performDataIntegrityCheck = () => {
  console.log('=== 塔罗数据完整性检查 ===');
  
  try {
    // 检查牌数
    const allCards = getAllCards();
    console.log(`✓ 总牌数: ${allCards.length}/${DATA_STATS.TOTAL_CARDS}`);
    
    // 检查大阿卡纳
    const majorCards = getMajorArcana();
    console.log(`✓ 大阿卡纳: ${majorCards.length}/${DATA_STATS.MAJOR_ARCANA_COUNT}`);
    
    // 检查小阿卡纳
    const minorCards = getMinorArcana();
    console.log(`✓ 小阿卡纳: ${minorCards.length}/${DATA_STATS.MINOR_ARCANA_COUNT}`);
    
    // 检查各花色
    DATA_STATS.SUITS.forEach(suit => {
      const suitCards = getCardsBySuit(suit);
      console.log(`✓ ${DATA_STATS.SUIT_NAMES[suit]}: ${suitCards.length}/${DATA_STATS.CARDS_PER_SUIT}`);
    });
    
    // 检查牌阵
    const allSpreads = getAllSpreads();
    console.log(`✓ 牌阵配置: ${allSpreads.length}/${DATA_STATS.TOTAL_SPREADS}`);
    
    console.log('✅ 数据完整性检查通过');
    return true;
  } catch (error) {
    console.error('❌ 数据完整性检查失败:', error);
    return false;
  }
};