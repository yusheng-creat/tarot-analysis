import React, { useState, useMemo } from 'react';
import { useTarot, useTarotActions } from '../contexts/TarotContext';
import { Reading } from '../types';
import TarotCard from './TarotCard';
import styles from './HistoryPage.module.css';

/**
 * 历史记录页面组件
 * 显示用户的占卜历史记录
 */
export const HistoryPage: React.FC = () => {
  const { state } = useTarot();
  const actions = useTarotActions();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'spread'>('date');
  const [filterSpread, setFilterSpread] = useState<string>('all');

  // 过滤和排序历史记录
  const filteredAndSortedHistory = useMemo(() => {
    let filtered = state.readingHistory;

    // 按搜索词过滤
    if (searchTerm) {
      filtered = filtered.filter(reading => 
        reading.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reading.spread.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reading.overallAnalysis.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 按牌阵类型过滤
    if (filterSpread !== 'all') {
      filtered = filtered.filter(reading => reading.spread.id === filterSpread);
    }

    // 排序
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else {
        return a.spread.name.localeCompare(b.spread.name);
      }
    });

    return filtered;
  }, [state.readingHistory, searchTerm, sortBy, filterSpread]);

  // 获取所有使用过的牌阵类型
  const usedSpreads = useMemo(() => {
    const spreads = new Set(state.readingHistory.map(r => r.spread.id));
    return Array.from(spreads);
  }, [state.readingHistory]);

  // 查看详细解读
  const handleViewReading = (reading: Reading) => {
    actions.completeReading(reading);
  };

  // 删除单个记录
  const handleDeleteReading = (readingId: string) => {
    if (window.confirm('确定要删除这条占卜记录吗？')) {
      actions.removeFromHistory(readingId);
    }
  };

  // 清空所有历史记录
  const handleClearHistory = () => {
    if (window.confirm('确定要清空所有历史记录吗？此操作不可恢复。')) {
      actions.clearHistory();
    }
  };

  // 导出历史记录
  const handleExportHistory = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalReadings: state.readingHistory.length,
      readings: state.readingHistory.map(reading => ({
        id: reading.id,
        timestamp: reading.timestamp,
        question: reading.question,
        spreadName: reading.spread.name,
        cards: reading.cards.map(card => ({
          name: card.name,
          isReversed: card.isReversed
        })),
        overallAnalysis: reading.overallAnalysis,
        advice: reading.advice
      }))
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `tarot-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.historyPage}>
      {/* 页面标题 */}
      <header className={styles.header}>
        <h1 className={styles.title}>占卜历史</h1>
        <p className={styles.subtitle}>
          回顾你的塔罗之旅，重新审视过往的指引
        </p>
      </header>

      {/* 统计信息 */}
      <div className={styles.statsSection}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{state.readingHistory.length}</div>
          <div className={styles.statLabel}>总占卜次数</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{usedSpreads.length}</div>
          <div className={styles.statLabel}>使用过的牌阵</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>
            {state.readingHistory.filter(r => r.question).length}
          </div>
          <div className={styles.statLabel}>有问题的占卜</div>
        </div>
      </div>

      {/* 搜索和过滤 */}
      <div className={styles.controlsSection}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="搜索问题、牌阵或解读内容..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>

        <div className={styles.filters}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'spread')}
            className={styles.filterSelect}
          >
            <option value="date">按时间排序</option>
            <option value="spread">按牌阵排序</option>
          </select>

          <select
            value={filterSpread}
            onChange={(e) => setFilterSpread(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">所有牌阵</option>
            <option value="single-card">单张牌</option>
            <option value="three-card">三张牌</option>
            <option value="celtic-cross">凯尔特十字</option>
            <option value="relationship">关系牌阵</option>
            <option value="decision">决策牌阵</option>
          </select>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.exportButton}
            onClick={handleExportHistory}
            disabled={state.readingHistory.length === 0}
          >
            <span className={styles.buttonIcon}>📤</span>
            导出
          </button>
          <button
            className={styles.clearButton}
            onClick={handleClearHistory}
            disabled={state.readingHistory.length === 0}
          >
            <span className={styles.buttonIcon}>🗑️</span>
            清空
          </button>
        </div>
      </div>

      {/* 历史记录列表 */}
      <main className={styles.historyList}>
        {filteredAndSortedHistory.length === 0 ? (
          <div className={styles.emptyState}>
            {state.readingHistory.length === 0 ? (
              <>
                <div className={styles.emptyIcon}>🔮</div>
                <h3 className={styles.emptyTitle}>还没有占卜记录</h3>
                <p className={styles.emptyText}>
                  开始你的第一次塔罗占卜，探索内心的智慧
                </p>
                <button
                  className={styles.startButton}
                  onClick={() => actions.setView('home')}
                >
                  开始占卜
                </button>
              </>
            ) : (
              <>
                <div className={styles.emptyIcon}>🔍</div>
                <h3 className={styles.emptyTitle}>没有找到匹配的记录</h3>
                <p className={styles.emptyText}>
                  尝试调整搜索条件或过滤器
                </p>
              </>
            )}
          </div>
        ) : (
          <div className={styles.readingGrid}>
            {filteredAndSortedHistory.map((reading) => (
              <div key={reading.id} className={styles.readingCard}>
                {/* 卡片头部 */}
                <div className={styles.cardHeader}>
                  <div className={styles.readingInfo}>
                    <h3 className={styles.spreadName}>{reading.spread.name}</h3>
                    <time className={styles.timestamp}>
                      {new Date(reading.timestamp).toLocaleString('zh-CN')}
                    </time>
                  </div>
                  <div className={styles.cardActions}>
                    <button
                      className={styles.viewButton}
                      onClick={() => handleViewReading(reading)}
                      title="查看详细解读"
                    >
                      👁️
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteReading(reading.id)}
                      title="删除记录"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* 问题 */}
                {reading.question && (
                  <div className={styles.question}>
                    <span className={styles.questionLabel}>问题：</span>
                    <span className={styles.questionText}>{reading.question}</span>
                  </div>
                )}

                {/* 卡牌预览 */}
                <div className={styles.cardsPreview}>
                  {reading.cards.slice(0, 3).map((card, index) => (
                    <div key={index} className={styles.previewCard}>
                      <TarotCard
                        card={card}
                        isRevealed={true}
                        size="small"
                        className={styles.miniPreviewCard}
                      />
                    </div>
                  ))}
                  {reading.cards.length > 3 && (
                    <div className={styles.moreCards}>
                      +{reading.cards.length - 3}
                    </div>
                  )}
                </div>

                {/* 解读摘要 */}
                <div className={styles.analysisPreview}>
                  <p className={styles.analysisText}>
                    {reading.overallAnalysis.length > 100
                      ? `${reading.overallAnalysis.substring(0, 100)}...`
                      : reading.overallAnalysis}
                  </p>
                </div>

                {/* 标签 */}
                <div className={styles.tags}>
                  <span className={styles.tag}>{reading.spread.name}</span>
                  {reading.question && <span className={styles.tag}>有问题</span>}
                  {reading.cards.some(c => c.isReversed) && (
                    <span className={styles.tag}>含逆位</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 返回按钮 */}
      <div className={styles.navigationSection}>
        <button
          className={styles.backButton}
          onClick={() => actions.setView('home')}
        >
          <span className={styles.buttonIcon}>🏠</span>
          返回主页
        </button>
      </div>
    </div>
  );
};

export default HistoryPage;