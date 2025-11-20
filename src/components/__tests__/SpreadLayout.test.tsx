import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpreadLayout from '../SpreadLayout';
import { TarotCard as TarotCardType, SpreadType } from '../../types';

// Mock CSS modules
jest.mock('../SpreadLayout.module.css', () => ({
  spreadLayout: 'spreadLayout',
  defaultSpread: 'defaultSpread',
  animated: 'animated',
  allRevealed: 'allRevealed',
  spreadHeader: 'spreadHeader',
  spreadName: 'spreadName',
  spreadDescription: 'spreadDescription',
  layoutContainer: 'layoutContainer',
  cardPosition: 'cardPosition',
  positionLabel: 'positionLabel',
  positionName: 'positionName',
  positionMeaning: 'positionMeaning',
  positionIndicator: 'positionIndicator',
  positionNumber: 'positionNumber',
  spreadCard: 'spreadCard',
  spreadDecorations: 'spreadDecorations',
  crossLine: 'crossLine',
  crossLineVertical: 'crossLineVertical',
  timelineLine: 'timelineLine',
  spreadLegend: 'spreadLegend',
  legendTitle: 'legendTitle',
  legendItems: 'legendItems',
  legendItem: 'legendItem',
  legendNumber: 'legendNumber',
  legendName: 'legendName',
  legendMeaning: 'legendMeaning',
  spreadActions: 'spreadActions',
  revealAllButton: 'revealAllButton',
  error: 'error',
  singlecard: 'singlecard',
  threecard: 'threecard',
  celticcross: 'celticcross'
}));

// Mock TarotCard component
jest.mock('../TarotCard', () => {
  return function MockTarotCard({ card, isRevealed, onClick, size }: any) {
    return (
      <div 
        data-testid={`tarot-card-${card.id}`}
        data-revealed={isRevealed}
        data-size={size}
        onClick={() => onClick && onClick(card)}
      >
        {card.name}
      </div>
    );
  };
});

describe('SpreadLayout', () => {
  const mockCards: TarotCardType[] = [
    {
      id: 'major_0',
      name: '愚者',
      nameEn: 'The Fool',
      type: 'major',
      number: 0,
      isReversed: false,
      image: '/images/major/00-fool.jpg',
      keywords: ['新开始', '冒险'],
      meaning: {
        upright: '正位含义',
        reversed: '逆位含义'
      },
      description: '描述'
    },
    {
      id: 'major_1',
      name: '魔术师',
      nameEn: 'The Magician',
      type: 'major',
      number: 1,
      isReversed: false,
      image: '/images/major/01-magician.jpg',
      keywords: ['意志力', '创造力'],
      meaning: {
        upright: '正位含义',
        reversed: '逆位含义'
      },
      description: '描述'
    },
    {
      id: 'major_2',
      name: '女祭司',
      nameEn: 'The High Priestess',
      type: 'major',
      number: 2,
      isReversed: false,
      image: '/images/major/02-high-priestess.jpg',
      keywords: ['直觉', '智慧'],
      meaning: {
        upright: '正位含义',
        reversed: '逆位含义'
      },
      description: '描述'
    }
  ];

  const mockSingleCardSpread: SpreadType = {
    id: 'single-card',
    name: '单张牌',
    description: '简单直接的日常指导',
    positions: [
      {
        id: 'main',
        name: '主牌',
        meaning: '当前情况的核心信息',
        x: 50,
        y: 50
      }
    ],
    layout: {
      width: 300,
      height: 200,
      cardSize: {
        width: 120,
        height: 180
      }
    }
  };

  const mockThreeCardSpread: SpreadType = {
    id: 'three-card',
    name: '三张牌',
    description: '过去、现在、未来的时间线分析',
    positions: [
      {
        id: 'past',
        name: '过去',
        meaning: '影响当前情况的过去因素',
        x: 25,
        y: 50
      },
      {
        id: 'present',
        name: '现在',
        meaning: '当前的核心情况',
        x: 50,
        y: 50
      },
      {
        id: 'future',
        name: '未来',
        meaning: '可能的发展趋势',
        x: 75,
        y: 50
      }
    ],
    layout: {
      width: 500,
      height: 250,
      cardSize: {
        width: 100,
        height: 150
      }
    }
  };

  describe('基本渲染', () => {
    it('应该渲染牌阵布局组件', () => {
      render(
        <SpreadLayout 
          spread={mockSingleCardSpread} 
          cards={[mockCards[0]]} 
        />
      );
      
      expect(screen.getByText('单张牌')).toBeInTheDocument();
      expect(screen.getByText('简单直接的日常指导')).toBeInTheDocument();
    });

    it('应该显示所有卡牌', () => {
      render(
        <SpreadLayout 
          spread={mockThreeCardSpread} 
          cards={mockCards} 
        />
      );
      
      expect(screen.getByTestId('tarot-card-major_0')).toBeInTheDocument();
      expect(screen.getByTestId('tarot-card-major_1')).toBeInTheDocument();
      expect(screen.getByTestId('tarot-card-major_2')).toBeInTheDocument();
    });

    it('应该显示牌位说明', () => {
      render(
        <SpreadLayout 
          spread={mockThreeCardSpread} 
          cards={mockCards} 
        />
      );
      
      expect(screen.getByText('牌位说明')).toBeInTheDocument();
      expect(screen.getAllByText('过去')).toHaveLength(2); // 位置标签和图例中各一个
      expect(screen.getAllByText('现在')).toHaveLength(2);
      expect(screen.getAllByText('未来')).toHaveLength(2);
    });

    it('应该显示位置含义', () => {
      render(
        <SpreadLayout 
          spread={mockThreeCardSpread} 
          cards={mockCards} 
        />
      );
      
      expect(screen.getAllByText('影响当前情况的过去因素')).toHaveLength(2);
      expect(screen.getAllByText('当前的核心情况')).toHaveLength(2);
      expect(screen.getAllByText('可能的发展趋势')).toHaveLength(2);
    });
  });

  describe('错误处理', () => {
    it('应该显示错误当牌阵数据缺失时', () => {
      render(
        <SpreadLayout 
          spread={null as any} 
          cards={mockCards} 
        />
      );
      
      expect(screen.getByText('牌阵数据不完整')).toBeInTheDocument();
    });

    it('应该显示错误当卡牌数据缺失时', () => {
      render(
        <SpreadLayout 
          spread={mockThreeCardSpread} 
          cards={null as any} 
        />
      );
      
      expect(screen.getByText('牌阵数据不完整')).toBeInTheDocument();
    });

    it('应该显示错误当卡牌数量不匹配时', () => {
      render(
        <SpreadLayout 
          spread={mockThreeCardSpread} 
          cards={[mockCards[0]]} // 只有1张牌，但需要3张
        />
      );
      
      expect(screen.getByText('牌数量与牌阵位置不匹配')).toBeInTheDocument();
      expect(screen.getByText('需要 3 张牌，实际 1 张')).toBeInTheDocument();
    });
  });

  describe('卡牌显示状态', () => {
    it('应该根据isRevealed属性显示卡牌', () => {
      render(
        <SpreadLayout 
          spread={mockSingleCardSpread} 
          cards={[mockCards[0]]} 
          isRevealed={true}
        />
      );
      
      const card = screen.getByTestId('tarot-card-major_0');
      expect(card).toHaveAttribute('data-revealed', 'true');
    });

    it('应该默认隐藏卡牌', () => {
      render(
        <SpreadLayout 
          spread={mockSingleCardSpread} 
          cards={[mockCards[0]]} 
        />
      );
      
      const card = screen.getByTestId('tarot-card-major_0');
      expect(card).toHaveAttribute('data-revealed', 'false');
    });
  });

  describe('交互功能', () => {
    it('应该在点击卡牌时调用onCardClick回调', () => {
      const handleCardClick = jest.fn();
      render(
        <SpreadLayout 
          spread={mockSingleCardSpread} 
          cards={[mockCards[0]]} 
          onCardClick={handleCardClick}
        />
      );
      
      const card = screen.getByTestId('tarot-card-major_0');
      fireEvent.click(card);
      
      expect(handleCardClick).toHaveBeenCalledWith(mockCards[0], 0);
    });

    it('应该能够单独显示/隐藏卡牌', () => {
      render(
        <SpreadLayout 
          spread={mockSingleCardSpread} 
          cards={[mockCards[0]]} 
        />
      );
      
      const card = screen.getByTestId('tarot-card-major_0');
      
      // 初始状态应该是隐藏的
      expect(card).toHaveAttribute('data-revealed', 'false');
      
      // 点击后应该显示
      fireEvent.click(card);
      expect(card).toHaveAttribute('data-revealed', 'true');
      
      // 再次点击应该隐藏
      fireEvent.click(card);
      expect(card).toHaveAttribute('data-revealed', 'false');
    });

    it('应该有显示所有牌的按钮', () => {
      render(
        <SpreadLayout 
          spread={mockThreeCardSpread} 
          cards={mockCards} 
        />
      );
      
      const revealButton = screen.getByText('显示所有牌');
      expect(revealButton).toBeInTheDocument();
    });

    it('应该能够显示所有牌', () => {
      render(
        <SpreadLayout 
          spread={mockThreeCardSpread} 
          cards={mockCards} 
        />
      );
      
      const revealButton = screen.getByText('显示所有牌');
      fireEvent.click(revealButton);
      
      // 所有卡牌都应该显示
      expect(screen.getByTestId('tarot-card-major_0')).toHaveAttribute('data-revealed', 'true');
      expect(screen.getByTestId('tarot-card-major_1')).toHaveAttribute('data-revealed', 'true');
      expect(screen.getByTestId('tarot-card-major_2')).toHaveAttribute('data-revealed', 'true');
      
      // 按钮文字应该改变
      expect(screen.getByText('隐藏所有牌')).toBeInTheDocument();
    });

    it('应该能够隐藏所有牌', () => {
      render(
        <SpreadLayout 
          spread={mockThreeCardSpread} 
          cards={mockCards} 
        />
      );
      
      const revealButton = screen.getByText('显示所有牌');
      
      // 先显示所有牌
      fireEvent.click(revealButton);
      
      // 验证所有牌都显示了
      expect(screen.getByTestId('tarot-card-major_0')).toHaveAttribute('data-revealed', 'true');
      expect(screen.getByTestId('tarot-card-major_1')).toHaveAttribute('data-revealed', 'true');
      expect(screen.getByTestId('tarot-card-major_2')).toHaveAttribute('data-revealed', 'true');
      
      // 再隐藏所有牌
      const hideButton = screen.getByText('隐藏所有牌');
      fireEvent.click(hideButton);
      
      // 所有卡牌都应该隐藏
      expect(screen.getByTestId('tarot-card-major_0')).toHaveAttribute('data-revealed', 'false');
      expect(screen.getByTestId('tarot-card-major_1')).toHaveAttribute('data-revealed', 'false');
      expect(screen.getByTestId('tarot-card-major_2')).toHaveAttribute('data-revealed', 'false');
    });
  });

  describe('属性配置', () => {
    it('应该传递cardSize属性给TarotCard', () => {
      render(
        <SpreadLayout 
          spread={mockSingleCardSpread} 
          cards={[mockCards[0]]} 
          cardSize="large"
        />
      );
      
      const card = screen.getByTestId('tarot-card-major_0');
      expect(card).toHaveAttribute('data-size', 'large');
    });

    it('应该应用自定义类名', () => {
      const { container } = render(
        <SpreadLayout 
          spread={mockSingleCardSpread} 
          cards={[mockCards[0]]} 
          className="custom-class"
        />
      );
      
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('应该在isRevealed为true时禁用显示按钮', () => {
      render(
        <SpreadLayout 
          spread={mockSingleCardSpread} 
          cards={[mockCards[0]]} 
          isRevealed={true}
        />
      );
      
      const revealButton = screen.getByText('显示所有牌');
      expect(revealButton).toBeDisabled();
    });
  });

  describe('布局样式', () => {
    it('应该应用正确的布局尺寸', () => {
      const { container } = render(
        <SpreadLayout 
          spread={mockThreeCardSpread} 
          cards={mockCards} 
        />
      );
      
      const layoutContainer = container.querySelector('.layoutContainer');
      expect(layoutContainer).toHaveStyle({
        width: '500px',
        height: '250px'
      });
    });

    it('应该为single-card牌阵应用特定样式', () => {
      const { container } = render(
        <SpreadLayout 
          spread={mockSingleCardSpread} 
          cards={[mockCards[0]]} 
        />
      );
      
      expect(container.firstChild).toHaveClass('singlecard');
    });

    it('应该为three-card牌阵应用特定样式', () => {
      const { container } = render(
        <SpreadLayout 
          spread={mockThreeCardSpread} 
          cards={mockCards} 
        />
      );
      
      expect(container.firstChild).toHaveClass('threecard');
    });

    it('应该在启用动画时应用动画类', () => {
      const { container } = render(
        <SpreadLayout 
          spread={mockSingleCardSpread} 
          cards={[mockCards[0]]} 
          animationEnabled={true}
        />
      );
      
      expect(container.firstChild).toHaveClass('animated');
    });

    it('应该在禁用动画时不应用动画类', () => {
      const { container } = render(
        <SpreadLayout 
          spread={mockSingleCardSpread} 
          cards={[mockCards[0]]} 
          animationEnabled={false}
        />
      );
      
      expect(container.firstChild).not.toHaveClass('animated');
    });
  });

  describe('图片错误处理', () => {
    it('应该传递onImageError回调给TarotCard', () => {
      const handleImageError = jest.fn();
      render(
        <SpreadLayout 
          spread={mockSingleCardSpread} 
          cards={[mockCards[0]]} 
          onImageError={handleImageError}
        />
      );
      
      // 这里我们只能验证组件正确渲染，实际的错误处理由TarotCard组件负责
      expect(screen.getByTestId('tarot-card-major_0')).toBeInTheDocument();
    });
  });

  describe('牌位指示器', () => {
    it('应该显示位置编号', () => {
      render(
        <SpreadLayout 
          spread={mockThreeCardSpread} 
          cards={mockCards} 
        />
      );
      
      // 在位置指示器和图例中都应该显示位置编号
      expect(screen.getAllByText('1')).toHaveLength(2); // 位置指示器和图例中各一个
      expect(screen.getAllByText('2')).toHaveLength(2);
      expect(screen.getAllByText('3')).toHaveLength(2);
    });
  });
});