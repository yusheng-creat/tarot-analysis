import React, { useState, useCallback, useMemo } from 'react';
import { TarotCard as TarotCardType, SpreadType } from '../types';
import TarotCard from './TarotCard';
import styles from './SpreadLayout.module.css';

export interface SpreadLayoutProps {
  spread: SpreadType;
  cards: TarotCardType[];
  isRevealed?: boolean;
  onCardClick?: (card: TarotCardType, position: number) => void;
  onImageError?: (card: TarotCardType) => void;
  className?: string;
  showCardDetails?: boolean;
  animationEnabled?: boolean;
  cardSize?: 'small' | 'medium' | 'large';
}

/**
 * 牌阵布局组件
 * 根据牌阵配置显示多张塔罗牌的布局
 */
export const SpreadLayout: React.FC<SpreadLayoutProps> = ({
  spread,
  cards,
  isRevealed = false,
  onCardClick,
  onImageError,
  className = '',
  showCardDetails = false,
  animationEnabled = true,
  cardSize = 'medium'
}) => {
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());

  // 处理卡牌点击
  const handleCardClick = useCallback((card: TarotCardType, position: number) => {
    if (onCardClick) {
      onCardClick(card, position);
    }
    
    // 如果不是全部显示，则单独控制每张牌的显示
    if (!isRevealed) {
      setRevealedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(position)) {
          newSet.delete(position);
        } else {
          newSet.add(position);
        }
        return newSet;
      });
    }
  }, [onCardClick, isRevealed]);

  // 获取布局样式
  const getLayoutStyle = useMemo(() => {
    if (!spread?.layout) {
      return {
        width: '300px',
        height: '200px',
        position: 'relative' as const,
        margin: '0 auto'
      };
    }
    
    const { layout } = spread;
    return {
      width: `${layout.width}px`,
      height: `${layout.height}px`,
      position: 'relative' as const,
      margin: '0 auto'
    };
  }, [spread]);

  // 获取牌阵容器类名
  const getContainerClasses = () => {
    const classes = [
      styles.spreadLayout,
      className
    ];

    // 添加牌阵特定样式
    if (spread?.id) {
      const spreadClass = spread.id.replace('-', '');
      if (styles[spreadClass]) {
        classes.push(styles[spreadClass]);
      } else {
        classes.push(styles.defaultSpread);
      }
    } else {
      classes.push(styles.defaultSpread);
    }

    if (animationEnabled) classes.push(styles.animated);
    if (isRevealed) classes.push(styles.allRevealed);

    return classes.filter(Boolean).join(' ');
  };

  // 验证数据完整性
  if (!spread || !cards) {
    return (
      <div className={styles.error}>
        <p>牌阵数据不完整</p>
      </div>
    );
  }

  if (cards.length !== spread.positions.length) {
    return (
      <div className={styles.error}>
        <p>牌数量与牌阵位置不匹配</p>
        <p>需要 {spread.positions.length} 张牌，实际 {cards.length} 张</p>
      </div>
    );
  }

  return (
    <div className={getContainerClasses()}>
      {/* 牌阵标题 */}
      <div className={styles.spreadHeader}>
        <h2 className={styles.spreadName}>{spread.name}</h2>
        <p className={styles.spreadDescription}>{spread.description}</p>
      </div>

      {/* 牌阵布局容器 */}
      <div className={styles.layoutContainer} style={getLayoutStyle}>
        {spread.positions.map((position, index) => {
          const card = cards[index];
          const isCardRevealed = isRevealed || revealedCards.has(index);
          
          return (
            <div
              key={position.id}
              className={styles.cardPosition}
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* 位置标签 */}
              <div className={styles.positionLabel}>
                <span className={styles.positionName}>{position.name}</span>
                <span className={styles.positionMeaning}>{position.meaning}</span>
              </div>

              {/* 塔罗牌 */}
              <TarotCard
                card={card}
                isRevealed={isCardRevealed}
                size={cardSize}
                onClick={(clickedCard) => handleCardClick(clickedCard, index)}
                onImageError={onImageError}
                showDetails={showCardDetails}
                animationDelay={animationEnabled ? index * 200 : 0}
                className={styles.spreadCard}
              />

              {/* 位置指示器 */}
              {!isCardRevealed && (
                <div className={styles.positionIndicator}>
                  <span className={styles.positionNumber}>{index + 1}</span>
                </div>
              )}
            </div>
          );
        })}

        {/* 牌阵装饰元素 */}
        <div className={styles.spreadDecorations}>
          {spread.id === 'celtic-cross' && (
            <>
              <div className={styles.crossLine} />
              <div className={styles.crossLineVertical} />
            </>
          )}
          {spread.id === 'three-card' && (
            <div className={styles.timelineLine} />
          )}
        </div>
      </div>

      {/* 牌阵说明 */}
      <div className={styles.spreadLegend}>
        <h3 className={styles.legendTitle}>牌位说明</h3>
        <div className={styles.legendItems}>
          {spread.positions.map((position, index) => (
            <div key={position.id} className={styles.legendItem}>
              <span className={styles.legendNumber}>{index + 1}</span>
              <span className={styles.legendName}>{position.name}</span>
              <span className={styles.legendMeaning}>{position.meaning}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className={styles.spreadActions}>
        <button
          className={styles.revealAllButton}
          onClick={() => {
            if (revealedCards.size === cards.length) {
              setRevealedCards(new Set());
            } else {
              setRevealedCards(new Set(Array.from({ length: cards.length }, (_, i) => i)));
            }
          }}
          disabled={isRevealed}
        >
          {revealedCards.size === cards.length ? '隐藏所有牌' : '显示所有牌'}
        </button>
      </div>
    </div>
  );
};

export default SpreadLayout;