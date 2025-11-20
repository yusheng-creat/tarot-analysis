import React, { useState, useCallback } from 'react';
import { TarotCard as TarotCardType } from '../types';
import styles from './TarotCard.module.css';

export interface TarotCardProps {
  card: TarotCardType;
  isRevealed?: boolean;
  position?: {
    x: number;
    y: number;
  };
  size?: 'small' | 'medium' | 'large';
  onClick?: (card: TarotCardType) => void;
  onImageError?: (card: TarotCardType) => void;
  className?: string;
  showDetails?: boolean;
  animationDelay?: number;
}

/**
 * 塔罗牌组件
 * 显示单张塔罗牌，支持正逆位、翻牌动画、点击交互等功能
 */
export const TarotCard: React.FC<TarotCardProps> = ({
  card,
  isRevealed = false,
  position,
  size = 'medium',
  onClick,
  onImageError,
  className = '',
  showDetails = false,
  animationDelay = 0
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  // 处理卡牌点击
  const handleClick = useCallback(() => {
    if (onClick && !isFlipping) {
      onClick(card);
    }
  }, [onClick, card, isFlipping]);

  // 处理图片加载成功
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  // 处理图片加载失败
  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
    if (onImageError) {
      onImageError(card);
    }
  }, [card, onImageError]);

  // 触发翻牌动画
  const triggerFlip = useCallback(() => {
    if (!isFlipping) {
      setIsFlipping(true);
      setTimeout(() => setIsFlipping(false), 600); // 动画持续时间
    }
  }, [isFlipping]);

  // 获取卡牌样式类名
  const getCardClasses = () => {
    const classes = [
      styles.tarotCard,
      styles[size],
      className
    ];

    if (isRevealed) classes.push(styles.revealed);
    if (card.isReversed) classes.push(styles.reversed);
    if (isFlipping) classes.push(styles.flipping);
    if (onClick) classes.push(styles.clickable);
    if (!imageLoaded && !imageError) classes.push(styles.loading);
    if (imageError) classes.push(styles.error);

    return classes.filter(Boolean).join(' ');
  };

  // 获取位置样式
  const getPositionStyle = () => {
    const style: React.CSSProperties = {};
    
    if (position) {
      style.position = 'absolute';
      style.left = `${position.x}%`;
      style.top = `${position.y}%`;
      style.transform = 'translate(-50%, -50%)';
    }
    
    if (animationDelay > 0) {
      style.animationDelay = `${animationDelay}ms`;
    }
    
    return style;
  };

  // 获取卡牌背面内容
  const renderCardBack = () => (
    <div className={styles.cardBack}>
      <div className={styles.backPattern}>
        <div className={styles.backSymbol}>🔮</div>
        <div className={styles.backText}>TAROT</div>
      </div>
    </div>
  );

  // 获取卡牌正面内容
  const renderCardFront = () => (
    <div className={styles.cardFront}>
      {/* 卡牌图片 */}
      <div className={styles.imageContainer}>
        {!imageError ? (
          <img
            src={card.image}
            alt={card.name}
            className={styles.cardImage}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <div className={styles.placeholderIcon}>🃏</div>
            <div className={styles.placeholderText}>图片加载失败</div>
          </div>
        )}
        
        {/* 加载指示器 */}
        {!imageLoaded && !imageError && (
          <div className={styles.loadingIndicator}>
            <div className={styles.spinner}></div>
          </div>
        )}
      </div>

      {/* 卡牌信息 */}
      <div className={styles.cardInfo}>
        <h3 className={styles.cardName}>{card.name}</h3>
        <p className={styles.cardNameEn}>{card.nameEn}</p>
        
        {/* 逆位指示器 */}
        {card.isReversed && (
          <div className={styles.reversedIndicator}>
            <span className={styles.reversedIcon}>↻</span>
            <span className={styles.reversedText}>逆位</span>
          </div>
        )}

        {/* 详细信息 */}
        {showDetails && (
          <div className={styles.cardDetails}>
            <div className={styles.keywords}>
              {card.keywords.slice(0, 3).map((keyword, index) => (
                <span key={index} className={styles.keyword}>
                  {keyword}
                </span>
              ))}
            </div>
            
            <div className={styles.meaning}>
              <p className={styles.meaningText}>
                {card.isReversed ? card.meaning.reversed : card.meaning.upright}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={getCardClasses()}
      style={getPositionStyle()}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`塔罗牌: ${card.name} ${card.isReversed ? '(逆位)' : '(正位)'}`}
    >
      <div className={styles.cardInner}>
        {isRevealed ? renderCardFront() : renderCardBack()}
      </div>
      
      {/* 卡牌光效 */}
      <div className={styles.cardGlow}></div>
      
      {/* 卡牌阴影 */}
      <div className={styles.cardShadow}></div>
    </div>
  );
};

export default TarotCard;