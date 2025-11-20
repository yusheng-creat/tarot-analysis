import React, { useState, useEffect } from 'react';
import { useTarot, useTarotActions } from '../contexts/TarotContext';
import SpreadLayout from './SpreadLayout';
import { TarotCard } from '../types';
import styles from './ReadingPage.module.css';

/**
 * 占卜进行页面组件
 * 显示牌阵和卡牌，处理卡牌翻开交互
 */
export const ReadingPage: React.FC = () => {
  const { state } = useTarot();
  const actions = useTarotActions();
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
  const [allRevealed, setAllRevealed] = useState(false);

  // 如果没有选择牌阵或抽取卡牌，返回主页
  useEffect(() => {
    if (!state.selectedSpread || !state.drawnCards.length) {
      actions.setView('home');
    }
  }, [state.selectedSpread, state.drawnCards, actions]);

  // 处理卡牌点击
  const handleCardClick = (card: TarotCard, position: number) => {
    if (allRevealed) return;

    setRevealedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(position)) {
        newSet.delete(position);
      } else {
        newSet.add(position);
      }
      return newSet;
    });
  };

  // 显示所有卡牌
  const handleRevealAll = () => {
    if (!state.drawnCards.length) return;

    setRevealedCards(new Set(Array.from({ length: state.drawnCards.length }, (_, i) => i)));
    setAllRevealed(true);
  };

  // 隐藏所有卡牌
  const handleHideAll = () => {
    setRevealedCards(new Set());
    setAllRevealed(false);
  };

  // 完成占卜，进入结果页面
  const handleCompleteReading = async () => {
    if (!state.selectedSpread || !state.drawnCards.length) return;

    try {
      actions.setLoading(true);
      
      // 使用解读引擎生成完整的解读
      const { readingEngine } = await import('../services/ReadingEngine');
      const reading = readingEngine.generateReading(
        state.drawnCards,
        state.selectedSpread,
        state.question
      );

      actions.completeReading(reading);
      actions.addToHistory(reading);
    } catch (error) {
      console.error('生成解读失败:', error);
      actions.setError('解读生成失败，请重试');
    } finally {
      actions.setLoading(false);
    }
  };

  // 重新开始
  const handleRestart = () => {
    actions.clearCurrentReading();
  };

  // 返回主页
  const handleBackToHome = () => {
    actions.setView('home');
  };

  if (!state.selectedSpread || !state.drawnCards.length) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>正在加载占卜...</p>
      </div>
    );
  }

  const isCardRevealed = (index: number) => allRevealed || revealedCards.has(index);
  const allCardsRevealed = revealedCards.size === state.drawnCards.length || allRevealed;

  return (
    <div className={styles.readingPage}>
      {/* 页面标题 */}
      <header className={styles.header}>
        <h1 className={styles.title}>塔罗占卜</h1>
        {state.question && (
          <div className={styles.questionDisplay}>
            <span className={styles.questionLabel}>你的问题：</span>
            <span className={styles.questionText}>{state.question}</span>
          </div>
        )}
      </header>

      {/* 占卜进度 */}
      <div className={styles.progressSection}>
        <div className={styles.progressInfo}>
          <span className={styles.spreadName}>{state.selectedSpread.name}</span>
          <span className={styles.cardProgress}>
            {revealedCards.size} / {state.drawnCards.length} 张牌已翻开
          </span>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ 
              width: `${(revealedCards.size / state.drawnCards.length) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* 牌阵布局 */}
      <main className={styles.main}>
        <SpreadLayout
          spread={state.selectedSpread}
          cards={state.drawnCards.map((card, index) => ({
            ...card,
            // 只有被翻开的卡牌才显示
          }))}
          onCardClick={handleCardClick}
          cardSize={state.settings.cardSize}
          animationEnabled={state.settings.animationsEnabled}
          className={styles.spreadLayout}
        />

        {/* 操作提示 */}
        {!allCardsRevealed && (
          <div className={styles.instructionBox}>
            <p className={styles.instructionText}>
              点击卡牌来翻开它们，或者点击"显示所有牌"来一次性查看所有结果
            </p>
          </div>
        )}
      </main>

      {/* 操作按钮 */}
      <div className={styles.actionSection}>
        <div className={styles.primaryActions}>
          {!allCardsRevealed ? (
            <button
              className={styles.revealButton}
              onClick={handleRevealAll}
            >
              <span className={styles.buttonIcon}>👁️</span>
              显示所有牌
            </button>
          ) : (
            <button
              className={styles.hideButton}
              onClick={handleHideAll}
            >
              <span className={styles.buttonIcon}>🙈</span>
              隐藏所有牌
            </button>
          )}

          {allCardsRevealed && (
            <button
              className={styles.completeButton}
              onClick={handleCompleteReading}
            >
              <span className={styles.buttonIcon}>✨</span>
              查看详细解读
            </button>
          )}
        </div>

        <div className={styles.secondaryActions}>
          <button
            className={styles.restartButton}
            onClick={handleRestart}
          >
            <span className={styles.buttonIcon}>🔄</span>
            重新开始
          </button>

          <button
            className={styles.backButton}
            onClick={handleBackToHome}
          >
            <span className={styles.buttonIcon}>🏠</span>
            返回主页
          </button>
        </div>
      </div>

      {/* 卡牌详情显示 */}
      {revealedCards.size > 0 && (
        <div className={styles.cardDetails}>
          <h3 className={styles.detailsTitle}>已翻开的卡牌</h3>
          <div className={styles.cardList}>
            {Array.from(revealedCards).map(index => {
              const card = state.drawnCards[index];
              const position = state.selectedSpread!.positions[index];
              
              return (
                <div key={index} className={styles.cardDetail}>
                  <div className={styles.cardHeader}>
                    <span className={styles.positionName}>{position.name}</span>
                    <span className={styles.cardName}>
                      {card.name} {card.isReversed ? '(逆位)' : '(正位)'}
                    </span>
                  </div>
                  <p className={styles.cardMeaning}>
                    {card.isReversed ? card.meaning.reversed : card.meaning.upright}
                  </p>
                  <div className={styles.cardKeywords}>
                    {card.keywords.slice(0, 3).map((keyword, i) => (
                      <span key={i} className={styles.keyword}>
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingPage;