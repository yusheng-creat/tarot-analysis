import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TarotCard from '../TarotCard';
import { TarotCard as TarotCardType } from '../../types';

// Mock CSS modules
jest.mock('../TarotCard.module.css', () => ({
  tarotCard: 'tarotCard',
  small: 'small',
  medium: 'medium',
  large: 'large',
  revealed: 'revealed',
  reversed: 'reversed',
  flipping: 'flipping',
  clickable: 'clickable',
  loading: 'loading',
  error: 'error',
  cardInner: 'cardInner',
  cardFront: 'cardFront',
  cardBack: 'cardBack',
  backPattern: 'backPattern',
  backSymbol: 'backSymbol',
  backText: 'backText',
  imageContainer: 'imageContainer',
  cardImage: 'cardImage',
  imagePlaceholder: 'imagePlaceholder',
  placeholderIcon: 'placeholderIcon',
  placeholderText: 'placeholderText',
  loadingIndicator: 'loadingIndicator',
  spinner: 'spinner',
  cardInfo: 'cardInfo',
  cardName: 'cardName',
  cardNameEn: 'cardNameEn',
  reversedIndicator: 'reversedIndicator',
  reversedIcon: 'reversedIcon',
  reversedText: 'reversedText',
  cardDetails: 'cardDetails',
  keywords: 'keywords',
  keyword: 'keyword',
  meaning: 'meaning',
  meaningText: 'meaningText',
  cardGlow: 'cardGlow',
  cardShadow: 'cardShadow'
}));

describe('TarotCard', () => {
  const mockCard: TarotCardType = {
    id: 'major_0',
    name: '愚者',
    nameEn: 'The Fool',
    type: 'major',
    number: 0,
    isReversed: false,
    image: '/images/major/00-fool.jpg',
    keywords: ['新开始', '冒险', '纯真'],
    meaning: {
      upright: '愚者代表新的开始和纯真的心态',
      reversed: '逆位的愚者可能表示鲁莽和缺乏计划'
    },
    description: '愚者是塔罗牌中的第一张牌'
  };

  const mockReversedCard: TarotCardType = {
    ...mockCard,
    isReversed: true
  };

  describe('基本渲染', () => {
    it('应该渲染塔罗牌组件', () => {
      const { container } = render(<TarotCard card={mockCard} />);
      
      const cardElement = container.querySelector('.tarotCard');
      expect(cardElement).toBeInTheDocument();
    });

    it('应该显示卡牌背面当未显示时', () => {
      render(<TarotCard card={mockCard} isRevealed={false} />);
      
      expect(screen.getByText('TAROT')).toBeInTheDocument();
      expect(screen.getByText('🔮')).toBeInTheDocument();
    });

    it('应该显示卡牌正面当显示时', () => {
      render(<TarotCard card={mockCard} isRevealed={true} />);
      
      expect(screen.getByText('愚者')).toBeInTheDocument();
      expect(screen.getByText('The Fool')).toBeInTheDocument();
    });

    it('应该显示逆位指示器当卡牌逆位时', () => {
      render(<TarotCard card={mockReversedCard} isRevealed={true} />);
      
      expect(screen.getByText('逆位')).toBeInTheDocument();
      expect(screen.getByText('↻')).toBeInTheDocument();
    });
  });

  describe('尺寸变体', () => {
    it('应该应用小尺寸样式', () => {
      const { container } = render(<TarotCard card={mockCard} size="small" />);
      
      expect(container.firstChild).toHaveClass('small');
    });

    it('应该应用中等尺寸样式', () => {
      const { container } = render(<TarotCard card={mockCard} size="medium" />);
      
      expect(container.firstChild).toHaveClass('medium');
    });

    it('应该应用大尺寸样式', () => {
      const { container } = render(<TarotCard card={mockCard} size="large" />);
      
      expect(container.firstChild).toHaveClass('large');
    });
  });

  describe('交互功能', () => {
    it('应该在点击时调用onClick回调', () => {
      const handleClick = jest.fn();
      render(<TarotCard card={mockCard} onClick={handleClick} />);
      
      const cardElement = screen.getByRole('button');
      fireEvent.click(cardElement);
      
      expect(handleClick).toHaveBeenCalledWith(mockCard);
    });

    it('应该支持键盘导航', () => {
      const handleClick = jest.fn();
      render(<TarotCard card={mockCard} onClick={handleClick} />);
      
      const cardElement = screen.getByRole('button');
      fireEvent.keyDown(cardElement, { key: 'Enter' });
      
      expect(handleClick).toHaveBeenCalledWith(mockCard);
    });

    it('应该支持空格键触发', () => {
      const handleClick = jest.fn();
      render(<TarotCard card={mockCard} onClick={handleClick} />);
      
      const cardElement = screen.getByRole('button');
      fireEvent.keyDown(cardElement, { key: ' ' });
      
      expect(handleClick).toHaveBeenCalledWith(mockCard);
    });

    it('应该有正确的可访问性属性', () => {
      render(<TarotCard card={mockCard} onClick={jest.fn()} />);
      
      const cardElement = screen.getByRole('button');
      expect(cardElement).toHaveAttribute('aria-label', '塔罗牌: 愚者 (正位)');
      expect(cardElement).toHaveAttribute('tabIndex', '0');
    });

    it('逆位卡牌应该有正确的aria-label', () => {
      render(<TarotCard card={mockReversedCard} onClick={jest.fn()} />);
      
      const cardElement = screen.getByRole('button');
      expect(cardElement).toHaveAttribute('aria-label', '塔罗牌: 愚者 (逆位)');
    });
  });

  describe('图片处理', () => {
    it('应该显示图片加载失败的占位符', async () => {
      const handleImageError = jest.fn();
      render(
        <TarotCard 
          card={mockCard} 
          isRevealed={true} 
          onImageError={handleImageError}
        />
      );
      
      const image = screen.getByRole('img');
      fireEvent.error(image);
      
      await waitFor(() => {
        expect(screen.getByText('图片加载失败')).toBeInTheDocument();
        expect(screen.getByText('🃏')).toBeInTheDocument();
      });
      
      expect(handleImageError).toHaveBeenCalledWith(mockCard);
    });

    it('应该在图片加载成功时隐藏加载指示器', async () => {
      render(<TarotCard card={mockCard} isRevealed={true} />);
      
      const image = screen.getByRole('img');
      fireEvent.load(image);
      
      // 加载指示器应该不存在
      expect(screen.queryByText('spinner')).not.toBeInTheDocument();
    });
  });

  describe('详细信息显示', () => {
    it('应该显示关键词当showDetails为true时', () => {
      render(
        <TarotCard 
          card={mockCard} 
          isRevealed={true} 
          showDetails={true}
        />
      );
      
      expect(screen.getByText('新开始')).toBeInTheDocument();
      expect(screen.getByText('冒险')).toBeInTheDocument();
      expect(screen.getByText('纯真')).toBeInTheDocument();
    });

    it('应该显示正位含义当卡牌正位时', () => {
      render(
        <TarotCard 
          card={mockCard} 
          isRevealed={true} 
          showDetails={true}
        />
      );
      
      expect(screen.getByText('愚者代表新的开始和纯真的心态')).toBeInTheDocument();
    });

    it('应该显示逆位含义当卡牌逆位时', () => {
      render(
        <TarotCard 
          card={mockReversedCard} 
          isRevealed={true} 
          showDetails={true}
        />
      );
      
      expect(screen.getByText('逆位的愚者可能表示鲁莽和缺乏计划')).toBeInTheDocument();
    });

    it('应该限制显示的关键词数量', () => {
      const cardWithManyKeywords: TarotCardType = {
        ...mockCard,
        keywords: ['关键词1', '关键词2', '关键词3', '关键词4', '关键词5']
      };

      render(
        <TarotCard 
          card={cardWithManyKeywords} 
          isRevealed={true} 
          showDetails={true}
        />
      );
      
      // 应该只显示前3个关键词
      expect(screen.getByText('关键词1')).toBeInTheDocument();
      expect(screen.getByText('关键词2')).toBeInTheDocument();
      expect(screen.getByText('关键词3')).toBeInTheDocument();
      expect(screen.queryByText('关键词4')).not.toBeInTheDocument();
      expect(screen.queryByText('关键词5')).not.toBeInTheDocument();
    });
  });

  describe('位置和样式', () => {
    it('应该应用位置样式当提供position时', () => {
      const position = { x: 50, y: 30 };
      const { container } = render(
        <TarotCard card={mockCard} position={position} />
      );
      
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement.style.position).toBe('absolute');
      expect(cardElement.style.left).toBe('50%');
      expect(cardElement.style.top).toBe('30%');
    });

    it('应该应用自定义类名', () => {
      const { container } = render(
        <TarotCard card={mockCard} className="custom-class" />
      );
      
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('应该应用动画延迟', () => {
      const { container } = render(
        <TarotCard card={mockCard} animationDelay={500} />
      );
      
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement.style.animationDelay).toBe('500ms');
    });
  });

  describe('状态样式', () => {
    it('应该应用revealed样式当isRevealed为true时', () => {
      const { container } = render(
        <TarotCard card={mockCard} isRevealed={true} />
      );
      
      expect(container.firstChild).toHaveClass('revealed');
    });

    it('应该应用reversed样式当卡牌逆位时', () => {
      const { container } = render(
        <TarotCard card={mockReversedCard} />
      );
      
      expect(container.firstChild).toHaveClass('reversed');
    });

    it('应该应用clickable样式当提供onClick时', () => {
      const { container } = render(
        <TarotCard card={mockCard} onClick={jest.fn()} />
      );
      
      expect(container.firstChild).toHaveClass('clickable');
    });
  });
});