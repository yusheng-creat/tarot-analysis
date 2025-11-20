import { TarotDeck } from '../types';
import { majorArcana } from './majorArcana';
import { wands, cups, swords, pentacles } from './minorArcana';

export const tarotDeck: TarotDeck = {
  majorArcana,
  minorArcana: {
    wands,
    cups,
    swords,
    pentacles
  }
};

// 获取所有塔罗牌的扁平化数组
export const getAllCards = () => {
  return [
    ...majorArcana,
    ...wands,
    ...cups,
    ...swords,
    ...pentacles
  ];
};

// 验证塔罗牌数据的完整性
export const validateDeckCompleteness = () => {
  const allCards = getAllCards();
  const currentTotal = allCards.length;
  
  console.log(`塔罗牌数据加载完成: ${currentTotal}张牌`);
  console.log(`- 大阿卡纳: ${majorArcana.length}张`);
  console.log(`- 权杖: ${wands.length}张`);
  console.log(`- 圣杯: ${cups.length}张`);
  console.log(`- 宝剑: ${swords.length}张`);
  console.log(`- 星币: ${pentacles.length}张`);
  
  // 检查是否有基本的牌数据
  if (currentTotal === 0) {
    console.error('没有找到任何塔罗牌数据');
    return false;
  }
  
  // 检查每个类别是否至少有一张牌
  if (majorArcana.length === 0) {
    console.warn('缺少大阿卡纳牌数据');
  }
  
  const suits = [wands, cups, swords, pentacles];
  const suitNames = ['权杖', '圣杯', '宝剑', '星币'];
  
  suits.forEach((suit, index) => {
    if (suit.length === 0) {
      console.warn(`缺少${suitNames[index]}牌数据`);
    }
  });
  
  console.log('✅ 塔罗牌数据验证通过');
  return true;
};

// 根据ID查找特定的牌
export const getCardById = (id: string) => {
  return getAllCards().find(card => card.id === id);
};

// 根据花色获取牌
export const getCardsBySuit = (suit: 'wands' | 'cups' | 'swords' | 'pentacles') => {
  switch (suit) {
    case 'wands':
      return wands;
    case 'cups':
      return cups;
    case 'swords':
      return swords;
    case 'pentacles':
      return pentacles;
    default:
      return [];
  }
};

// 获取大阿卡纳牌
export const getMajorArcana = () => majorArcana;

// 获取小阿卡纳牌
export const getMinorArcana = () => [
  ...wands,
  ...cups,
  ...swords,
  ...pentacles
];

// 随机获取指定数量的牌
export const getRandomCards = (count: number): import('../types').TarotCard[] => {
  const allCards = getAllCards();
  const shuffled = [...allCards].sort(() => Math.random() - 0.5);
  
  return shuffled.slice(0, count).map(card => ({
    ...card,
    isReversed: Math.random() < 0.5 // 随机决定正逆位
  }));
};

// 初始化时验证数据完整性
validateDeckCompleteness();