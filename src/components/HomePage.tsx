import React, { useState } from 'react';
import { useTarot, useTarotActions } from '../contexts/TarotContext';
import { tarotDataService } from '../services/TarotDataService';
import { drawingService } from '../services/DrawingService';
import styles from './HomePage.module.css';

/**
 * 主页组件
 * 提供牌阵选择、问题输入和开始占卜的功能
 */
export const HomePage: React.FC = () => {
  const { state } = useTarot();
  const actions = useTarotActions();
  const [question, setQuestion] = useState('');

  // 获取所有可用的牌阵
  const spreads = tarotDataService.getSpreads();

  // 处理牌阵选择
  const handleSpreadSelect = (spreadId: string) => {
    const spread = tarotDataService.getSpreadById(spreadId);
    if (spread) {
      actions.setSpread(spread);
    }
  };

  // 开始占卜
  const handleStartReading = async () => {
    if (!state.selectedSpread) {
      actions.setError('请先选择一个牌阵');
      return;
    }

    try {
      actions.setLoading(true);
      actions.setError(null);

      // 抽取卡牌
      const result = drawingService.drawCards({
        spreadId: state.selectedSpread.id,
        allowDuplicates: false
      });

      // 设置问题和开始占卜
      actions.setQuestion(question);
      actions.startReading(state.selectedSpread, result.cards, question);

    } catch (error) {
      actions.setError(error instanceof Error ? error.message : '抽牌失败');
    } finally {
      actions.setLoading(false);
    }
  };

  // 查看历史记录
  const handleViewHistory = () => {
    actions.setView('history');
  };

  return (
    <div className={styles.homePage}>
      {/* 页面标题 */}
      <header className={styles.header}>
        <h1 className={styles.title}>塔罗分析</h1>
        <p className={styles.subtitle}>探索内心的智慧，寻找人生的指引</p>
      </header>

      {/* 主要内容 */}
      <main className={styles.main}>
        {/* 问题输入区域 */}
        <section className={styles.questionSection}>
          <h2 className={styles.sectionTitle}>你的问题</h2>
          <p className={styles.sectionDescription}>
            请输入你想要咨询的问题，或者留空进行一般性的指导占卜
          </p>
          <textarea
            className={styles.questionInput}
            placeholder="例如：我在感情方面应该如何选择？我的事业发展方向是什么？"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            maxLength={200}
          />
          <div className={styles.characterCount}>
            {question.length}/200
          </div>
        </section>

        {/* 牌阵选择区域 */}
        <section className={styles.spreadSection}>
          <h2 className={styles.sectionTitle}>选择牌阵</h2>
          <p className={styles.sectionDescription}>
            不同的牌阵适合不同类型的问题，选择最符合你需求的牌阵
          </p>
          
          <div className={styles.spreadGrid}>
            {spreads.map((spread) => (
              <div
                key={spread.id}
                className={`${styles.spreadCard} ${
                  state.selectedSpread?.id === spread.id ? styles.selected : ''
                }`}
                onClick={() => handleSpreadSelect(spread.id)}
              >
                <div className={styles.spreadIcon}>
                  {getSpreadIcon(spread.id)}
                </div>
                <h3 className={styles.spreadName}>{spread.name}</h3>
                <p className={styles.spreadDescription}>{spread.description}</p>
                <div className={styles.spreadInfo}>
                  <span className={styles.cardCount}>
                    {spread.positions.length} 张牌
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 错误提示 */}
        {state.error && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            {state.error}
          </div>
        )}

        {/* 操作按钮 */}
        <section className={styles.actionSection}>
          <button
            className={styles.startButton}
            onClick={handleStartReading}
            disabled={!state.selectedSpread || state.isLoading}
          >
            {state.isLoading ? (
              <>
                <span className={styles.spinner}></span>
                正在抽牌...
              </>
            ) : (
              <>
                <span className={styles.buttonIcon}>🔮</span>
                开始占卜
              </>
            )}
          </button>

          <button
            className={styles.historyButton}
            onClick={handleViewHistory}
            disabled={state.isLoading}
          >
            <span className={styles.buttonIcon}>📚</span>
            查看历史
          </button>

          <button
            className={styles.settingsButton}
            onClick={() => actions.setView('settings')}
            disabled={state.isLoading}
          >
            <span className={styles.buttonIcon}>⚙️</span>
            应用设置
          </button>
        </section>
      </main>

      {/* 页面底部信息 */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          塔罗牌仅供娱乐和自我反思，不能替代专业建议
        </p>
      </footer>
    </div>
  );
};

// 获取牌阵图标的辅助函数
function getSpreadIcon(spreadId: string): string {
  switch (spreadId) {
    case 'single-card':
      return '🃏';
    case 'three-card':
      return '🎯';
    case 'celtic-cross':
      return '✨';
    case 'relationship':
      return '💕';
    case 'decision':
      return '⚖️';
    default:
      return '🔮';
  }
}

export default HomePage;