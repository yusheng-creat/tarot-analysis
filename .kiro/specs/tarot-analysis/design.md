# 塔罗分析设计文档

## 概述

塔罗分析系统是一个基于Web的塔罗牌占卜应用，采用现代前端技术栈构建。系统将提供完整的塔罗牌数据库、多种牌阵布局、智能解读算法和用户友好的交互界面。

## 架构

### 整体架构
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   前端界面层     │    │   业务逻辑层     │    │   数据存储层     │
│                │    │                │    │                │
│ - React组件     │◄──►│ - 抽牌算法      │◄──►│ - 塔罗牌数据     │
│ - 状态管理      │    │ - 解读引擎      │    │ - 用户记录      │
│ - 路由管理      │    │ - 牌阵逻辑      │    │ - 本地存储      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 技术栈
- **前端框架**: React + TypeScript
- **状态管理**: React Context + useReducer
- **样式**: CSS Modules + CSS动画
- **数据存储**: LocalStorage (历史记录)
- **构建工具**: Vite
- **部署**: 静态网站托管

## 组件和接口

### 核心组件结构

#### 1. 应用主组件 (App)
```typescript
interface AppState {
  currentView: 'home' | 'reading' | 'history';
  currentReading: TarotReading | null;
  history: TarotReading[];
}
```

#### 2. 塔罗牌组件 (TarotCard)
```typescript
interface TarotCardProps {
  card: TarotCard;
  isRevealed: boolean;
  position: CardPosition;
  onClick?: () => void;
}

interface TarotCard {
  id: string;
  name: string;
  nameEn: string;
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  type: 'major' | 'minor';
  number?: number;
  isReversed: boolean;
  image: string;
  keywords: string[];
  meaning: {
    upright: string;
    reversed: string;
  };
  description: string;
}
```

#### 3. 牌阵组件 (SpreadLayout)
```typescript
interface SpreadLayoutProps {
  spread: SpreadType;
  cards: TarotCard[];
  onCardClick: (index: number) => void;
}

interface SpreadType {
  id: string;
  name: string;
  description: string;
  positions: CardPosition[];
  layout: LayoutConfig;
}

interface CardPosition {
  id: string;
  name: string;
  meaning: string;
  x: number;
  y: number;
}
```

#### 4. 解读引擎 (ReadingEngine)
```typescript
interface ReadingEngine {
  generateReading(cards: TarotCard[], spread: SpreadType, question?: string): Reading;
  interpretCard(card: TarotCard, position: CardPosition): CardInterpretation;
  analyzeCardCombinations(cards: TarotCard[]): CombinationAnalysis;
}

interface Reading {
  id: string;
  timestamp: Date;
  question?: string;
  spread: SpreadType;
  cards: TarotCard[];
  interpretations: CardInterpretation[];
  overallAnalysis: string;
  advice: string;
}
```

### 服务接口

#### 1. 塔罗牌数据服务 (TarotDataService)
```typescript
interface TarotDataService {
  getAllCards(): TarotCard[];
  getCardById(id: string): TarotCard | null;
  getRandomCards(count: number): TarotCard[];
  getSpreads(): SpreadType[];
  getSpreadById(id: string): SpreadType | null;
}
```

#### 2. 历史记录服务 (HistoryService)
```typescript
interface HistoryService {
  saveReading(reading: Reading): void;
  getReadings(): Reading[];
  deleteReading(id: string): void;
  clearHistory(): void;
}
```

## 数据模型

### 塔罗牌数据结构
塔罗牌数据将以JSON格式存储，包含完整的78张牌信息：

```typescript
interface TarotDeck {
  majorArcana: TarotCard[];  // 22张大阿卡纳
  minorArcana: {
    wands: TarotCard[];      // 14张权杖牌
    cups: TarotCard[];       // 14张圣杯牌
    swords: TarotCard[];     // 14张宝剑牌
    pentacles: TarotCard[];  // 14张星币牌
  };
}
```

### 牌阵配置
预定义的牌阵布局配置：

```typescript
const SPREADS: SpreadType[] = [
  {
    id: 'single-card',
    name: '单张牌',
    description: '简单直接的日常指导',
    positions: [
      { id: 'main', name: '主牌', meaning: '当前情况的核心信息', x: 50, y: 50 }
    ]
  },
  {
    id: 'three-card',
    name: '三张牌',
    description: '过去、现在、未来的时间线分析',
    positions: [
      { id: 'past', name: '过去', meaning: '影响当前情况的过去因素', x: 25, y: 50 },
      { id: 'present', name: '现在', meaning: '当前的核心情况', x: 50, y: 50 },
      { id: 'future', name: '未来', meaning: '可能的发展趋势', x: 75, y: 50 }
    ]
  },
  {
    id: 'celtic-cross',
    name: '凯尔特十字',
    description: '全面深入的人生分析',
    positions: [
      // 10个位置的详细配置...
    ]
  }
];
```

## 错误处理

### 错误类型定义
```typescript
enum TarotErrorType {
  CARD_NOT_FOUND = 'CARD_NOT_FOUND',
  SPREAD_NOT_FOUND = 'SPREAD_NOT_FOUND',
  INVALID_CARD_COUNT = 'INVALID_CARD_COUNT',
  STORAGE_ERROR = 'STORAGE_ERROR',
  READING_GENERATION_ERROR = 'READING_GENERATION_ERROR'
}

interface TarotError {
  type: TarotErrorType;
  message: string;
  details?: any;
}
```

### 错误处理策略
1. **数据加载错误**: 提供默认的备用数据，确保应用基本功能可用
2. **存储错误**: 优雅降级，在内存中临时保存数据
3. **解读生成错误**: 提供基础的牌面含义作为备选
4. **用户输入错误**: 实时验证和友好的错误提示

## 测试策略

### 单元测试
- **塔罗牌数据服务**: 测试牌面数据的完整性和正确性
- **抽牌算法**: 测试随机性和正逆位分配
- **解读引擎**: 测试解读生成的逻辑和质量
- **历史记录服务**: 测试数据的保存和检索

### 集成测试
- **完整占卜流程**: 从选择牌阵到生成解读的端到端测试
- **数据持久化**: 测试历史记录的保存和恢复
- **错误恢复**: 测试各种错误情况下的系统行为

### 用户体验测试
- **响应式设计**: 在不同设备尺寸下的界面测试
- **交互动画**: 抽牌和翻牌动画的流畅性测试
- **可访问性**: 键盘导航和屏幕阅读器兼容性测试

### 性能测试
- **初始加载时间**: 塔罗牌数据和图片的加载优化
- **内存使用**: 长时间使用后的内存泄漏检测
- **动画性能**: 复杂牌阵布局的渲染性能

## 用户界面设计

### 视觉风格
- **主题色彩**: 深紫色系配合金色装饰，营造神秘氛围
- **字体选择**: 优雅的衬线字体用于标题，无衬线字体用于正文
- **图标设计**: 简洁的线条图标，符合塔罗主题

### 交互设计
- **抽牌动画**: 平滑的卡牌翻转和移动效果
- **触觉反馈**: 移动设备上的震动反馈
- **声音效果**: 可选的背景音乐和音效

### 响应式布局
- **桌面端**: 横向布局，充分利用屏幕空间
- **平板端**: 适中的卡牌大小，保持可读性
- **手机端**: 纵向堆叠布局，优化触摸操作