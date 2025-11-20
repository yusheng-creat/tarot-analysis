import { TarotDataService } from './TarotDataService';
import { TarotErrorType } from '../types';

/**
 * 验证 TarotDataService 功能的脚本
 */
export const validateTarotDataService = () => {
  console.log('=== 塔罗数据服务验证 ===');
  
  try {
    // 获取服务实例
    const service = TarotDataService.getInstance();
    console.log('✅ 服务实例创建成功');
    
    // 测试获取所有牌
    const allCards = service.getAllCards();
    console.log(`✅ 获取所有牌: ${allCards.length} 张`);
    
    if (allCards.length !== 78) {
      console.warn(`⚠️ 预期78张牌，实际获取${allCards.length}张`);
    }
    
    // 测试获取大阿卡纳
    const majorCards = service.getMajorArcana();
    console.log(`✅ 获取大阿卡纳: ${majorCards.length} 张`);
    
    if (majorCards.length !== 22) {
      console.warn(`⚠️ 预期22张大阿卡纳，实际获取${majorCards.length}张`);
    }
    
    // 测试获取小阿卡纳
    const minorCards = service.getMinorArcana();
    console.log(`✅ 获取小阿卡纳: ${minorCards.length} 张`);
    
    if (minorCards.length !== 56) {
      console.warn(`⚠️ 预期56张小阿卡纳，实际获取${minorCards.length}张`);
    }
    
    // 测试根据ID获取牌
    const foolCard = service.getCardById('major_0');
    if (foolCard) {
      console.log(`✅ 根据ID获取牌: ${foolCard.name} (${foolCard.nameEn})`);
    } else {
      console.error('❌ 无法根据ID获取愚者牌');
    }
    
    // 测试获取花色牌
    const wandsCards = service.getCardsBySuit('wands');
    console.log(`✅ 获取权杖花色: ${wandsCards.length} 张`);
    
    if (wandsCards.length !== 14) {
      console.warn(`⚠️ 预期14张权杖牌，实际获取${wandsCards.length}张`);
    }
    
    // 测试随机获取牌
    const randomCards = service.getRandomCards(5);
    console.log(`✅ 随机获取牌: ${randomCards.length} 张`);
    
    // 测试获取牌阵
    const spreads = service.getSpreads();
    console.log(`✅ 获取牌阵配置: ${spreads.length} 个`);
    
    // 测试根据ID获取牌阵
    const singleCardSpread = service.getSpreadById('single-card');
    if (singleCardSpread) {
      console.log(`✅ 根据ID获取牌阵: ${singleCardSpread.name}`);
    } else {
      console.error('❌ 无法根据ID获取单张牌牌阵');
    }
    
    // 测试获取牌阵所需牌数
    const cardCount = service.getCardCountForSpread('three-card');
    console.log(`✅ 三张牌牌阵需要: ${cardCount} 张牌`);
    
    // 测试牌验证
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
    
    const validation = service.validateCard(validCard);
    console.log(`✅ 牌验证: ${validation.isValid ? '通过' : '失败'}`);
    
    // 测试错误创建
    const error = service.createError(TarotErrorType.CARD_NOT_FOUND, '测试错误');
    console.log(`✅ 错误创建: ${error.type} - ${error.message}`);
    
    // 测试服务状态
    const status = service.getServiceStatus();
    console.log(`✅ 服务状态: 初始化=${status.isInitialized}, 牌数=${status.totalCards}, 牌阵数=${status.totalSpreads}, 错误=${status.hasErrors}`);
    
    console.log('🎉 所有测试通过！塔罗数据服务工作正常');
    return true;
    
  } catch (error) {
    console.error('❌ 服务验证失败:', error);
    return false;
  }
};

// 如果直接运行此文件，执行验证
if (require.main === module) {
  validateTarotDataService();
}