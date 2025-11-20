import React, { useState } from 'react';
import { useTarot, useTarotActions } from '../contexts/TarotContext';
import TarotCard from './TarotCard';
import { readingEngine } from '../services/ReadingEngine';
import styles from './ReadingResultPage.module.css';

/**
 * 占卜结果详情页面
 * 显示完整的解读分析和建议
 */
export const ReadingResultPage: React.FC = () => {
  const { state } = useTarot();
  const actions = useTarotActions();
  const [activeTab, setActiveTab] = useState<'overview' | 'cards' | 'analysis'>('overview');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // 如果没有当前解读，生成一个
  const reading = state.currentReading || (
    state.selectedSpread && state.drawnCards.length > 0
      ? readingEngine.generateReading(state.drawnCards, state.selectedSpread, state.question)
      : null
  );

  if (!reading) {
    return (
      <div className={styles.errorContainer}>
        <h2>没有找到占卜结果</h2>
        <p>请先进行一次占卜</p>
        <button 
          className={styles.backButton}
          onClick={() => actions.setView('home')}
        >
          返回主页
        </button>
      </div>
    );
  }

  // 处理卡牌展开/收起
  const handleCardToggle = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  // 保存到历史记录
  const handleSaveReading = () => {
    actions.addToHistory(reading);
    // 显示保存成功的提示
    alert('占卜结果已保存到历史记录');
  };

  // 重新开始占卜
  const handleNewReading = () => {
    actions.clearCurrentReading();
  };

  // 分享结果（简单的文本分享）
  const handleShareReading = () => {
    const shareText = `我的塔罗占卜结果：\n\n${reading.question ? `问题：${reading.question}\n\n` : ''}牌阵：${reading.spread.name}\n\n整体分析：${reading.overallAnalysis.substring(0, 100)}...\n\n来自塔罗分析应用`;
    
    if (navigator.share) {
      navigator.share({
        title: '塔罗占卜结果',
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert('结果已复制到剪贴板');
      });
    }
  };

  return (
    <div className={styles.resultPage}>
      {/* 页面标题 */}
      <header className={styles.header}>
        <h1 className={styles.title}>占卜结果</h1>
        {reading.question && (
          <div className={styles.questionDisplay}>
            <span className={styles.questionLabel}>你的问题：</span>
            <span className={styles.questionText}>{reading.question}</span>
          </div>
        )}
        <div className={styles.readingInfo}>
          <span className={styles.spreadName}>{reading.spread.name}</span>
          <span className={styles.timestamp}>
            {reading.timestamp.toLocaleString('zh-CN')}
          </span>
        </div>
      </header>

      {/* 标签页导航 */}
      <nav className={styles.tabNavigation}>
        <button
          className={`${styles.tabButton} ${activeTab === 'overview' ? styles.active : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <span className={styles.tabIcon}>📋</span>
          总览
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'cards' ? styles.active : ''}`}
          onClick={() => setActiveTab('cards')}
        >
          <span className={styles.tabIcon}>🃏</span>
          牌面详解
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'analysis' ? styles.active : ''}`}
          onClick={() => setActiveTab('analysis')}
        >
          <span className={styles.tabIcon}>🔮</span>
          深度分析
        </button>
      </nav>

      {/* 内容区域 */}
      <main className={styles.content}>
        {/* 总览标签页 */}
        {activeTab === 'overview' && (
          <div className={styles.overviewTab}>
            {/* 牌阵预览 */}
            <section className={styles.spreadPreview}>
              <h2 className={styles.sectionTitle}>牌阵布局</h2>
              <div className={styles.miniSpread}>
                {reading.cards.map((card, index) => (
                  <div key={index} className={styles.miniCardContainer}>
                    <TarotCard
                      card={card}
                      isRevealed={true}
                      size="small"
                      onClick={() => handleCardToggle(index)}
                      className={styles.miniCard}
                    />
                    <div className={styles.positionLabel}>
                      {reading.spread.positions[index].name}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 整体分析 */}
            <section className={styles.overallSection}>
              <h2 className={styles.sectionTitle}>整体分析</h2>
              <div className={styles.analysisContent}>
                <p className={styles.analysisText}>{reading.overallAnalysis}</p>
              </div>
            </section>

            {/* 建议 */}
            <section className={styles.adviceSection}>
              <h2 className={styles.sectionTitle}>指导建议</h2>
              <div className={styles.adviceContent}>
                <pre className={styles.adviceText}>{reading.advice}</pre>
              </div>
            </section>
          </div>
        )}

        {/* 牌面详解标签页 */}
        {activeTab === 'cards' && (
          <div className={styles.cardsTab}>
            {reading.interpretations.map((interpretation, index) => (
              <div key={index} className={styles.cardInterpretation}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardPreview}>
                    <TarotCard
                      card={interpretation.card}
                      isRevealed={true}
                      size="small"
                      className={styles.interpretationCard}
                    />
                  </div>
                  <div className={styles.cardBasicInfo}>
                    <h3 className={styles.cardTitle}>
                      {interpretation.position.name} - {interpretation.card.name}
                      {interpretation.card.isReversed ? ' (逆位)' : ' (正位)'}
                    </h3>
                    <p className={styles.positionMeaning}>
                      {interpretation.position.meaning}
                    </p>
                    <div className={styles.cardEnergy}>
                      能量：
                      <span className={`${styles.energyBadge} ${styles[interpretation.energy]}`}>
                        {interpretation.energy === 'positive' ? '积极' : 
                         interpretation.energy === 'negative' ? '挑战' : '中性'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.interpretationContent}>
                  <div className={styles.interpretationText}>
                    <p>{interpretation.interpretation}</p>
                  </div>

                  {interpretation.keyMessages.length > 0 && (
                    <div className={styles.keyMessages}>
                      <h4 className={styles.keyMessagesTitle}>关键信息</h4>
                      <ul className={styles.messagesList}>
                        {interpretation.keyMessages.map((message, msgIndex) => (
                          <li key={msgIndex} className={styles.messageItem}>
                            {message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {interpretation.relevanceToQuestion !== undefined && (
                    <div className={styles.relevanceScore}>
                      <span className={styles.relevanceLabel}>与问题相关性：</span>
                      <div className={styles.relevanceBar}>
                        <div 
                          className={styles.relevanceFill}
                          style={{ width: `${interpretation.relevanceToQuestion * 100}%` }}
                        />
                      </div>
                      <span className={styles.relevancePercent}>
                        {Math.round(interpretation.relevanceToQuestion * 100)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 深度分析标签页 */}
        {activeTab === 'analysis' && (
          <div className={styles.analysisTab}>
            <section className={styles.combinationAnalysis}>
              <h2 className={styles.sectionTitle}>牌面组合分析</h2>
              
              {/* 这里可以添加更深入的分析内容 */}
              <div className={styles.analysisGrid}>
                <div className={styles.analysisCard}>
                  <h3 className={styles.analysisCardTitle}>能量分布</h3>
                  <div className={styles.energyDistribution}>
                    {/* 简单的能量分析可视化 */}
                    <div className={styles.energyStats}>
                      <div className={styles.energyStat}>
                        <span className={styles.energyLabel}>积极能量</span>
                        <span className={styles.energyCount}>
                          {reading.interpretations.filter(i => i.energy === 'positive').length}
                        </span>
                      </div>
                      <div className={styles.energyStat}>
                        <span className={styles.energyLabel}>挑战能量</span>
                        <span className={styles.energyCount}>
                          {reading.interpretations.filter(i => i.energy === 'negative').length}
                        </span>
                      </div>
                      <div className={styles.energyStat}>
                        <span className={styles.energyLabel}>中性能量</span>
                        <span className={styles.energyCount}>
                          {reading.interpretations.filter(i => i.energy === 'neutral').length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.analysisCard}>
                  <h3 className={styles.analysisCardTitle}>牌面类型</h3>
                  <div className={styles.cardTypes}>
                    <div className={styles.typeStat}>
                      <span className={styles.typeLabel}>大阿卡纳</span>
                      <span className={styles.typeCount}>
                        {reading.cards.filter(c => c.type === 'major').length}
                      </span>
                    </div>
                    <div className={styles.typeStat}>
                      <span className={styles.typeLabel}>小阿卡纳</span>
                      <span className={styles.typeCount}>
                        {reading.cards.filter(c => c.type === 'minor').length}
                      </span>
                    </div>
                    <div className={styles.typeStat}>
                      <span className={styles.typeLabel}>逆位牌</span>
                      <span className={styles.typeCount}>
                        {reading.cards.filter(c => c.isReversed).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.detailedAnalysis}>
                <h3 className={styles.analysisSubtitle}>详细解读</h3>
                <p className={styles.detailedText}>
                  这次占卜显示了复杂而丰富的信息层次。通过分析牌面组合、能量分布和象征意义，
                  我们可以看到宇宙为你提供的指导方向。每张牌都不是孤立存在的，它们相互呼应，
                  共同构成了一个完整的故事和指导体系。
                </p>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* 操作按钮 */}
      <div className={styles.actionSection}>
        <div className={styles.primaryActions}>
          <button
            className={styles.saveButton}
            onClick={handleSaveReading}
          >
            <span className={styles.buttonIcon}>💾</span>
            保存结果
          </button>
          <button
            className={styles.shareButton}
            onClick={handleShareReading}
          >
            <span className={styles.buttonIcon}>📤</span>
            分享结果
          </button>
        </div>
        <div className={styles.secondaryActions}>
          <button
            className={styles.newReadingButton}
            onClick={handleNewReading}
          >
            <span className={styles.buttonIcon}>🔄</span>
            重新占卜
          </button>
          <button
            className={styles.backHomeButton}
            onClick={() => actions.setView('home')}
          >
            <span className={styles.buttonIcon}>🏠</span>
            返回主页
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadingResultPage;