import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { TarotCard, SpreadType, Reading } from '../types';
import { storageService } from '../services/StorageService';

// 应用状态接口
export interface TarotState {
  // 当前视图
  currentView: 'home' | 'reading' | 'history' | 'result' | 'settings';
  
  // 当前占卜会话
  currentReading: Reading | null;
  selectedSpread: SpreadType | null;
  drawnCards: TarotCard[];
  question: string;
  
  // 历史记录
  readingHistory: Reading[];
  
  // UI状态
  isLoading: boolean;
  error: string | null;
  
  // 设置
  settings: {
    theme: 'dark' | 'light';
    language: 'zh' | 'en';
    reversedCardProbability: number;
    autoSave: boolean;
    soundEnabled: boolean;
    cardSize: 'small' | 'medium' | 'large';
    animationsEnabled: boolean;
    autoReveal: boolean;
  };
}

// 动作类型
export type TarotAction =
  | { type: 'SET_VIEW'; payload: TarotState['currentView'] }
  | { type: 'SET_SPREAD'; payload: SpreadType }
  | { type: 'SET_QUESTION'; payload: string }
  | { type: 'SET_DRAWN_CARDS'; payload: TarotCard[] }
  | { type: 'START_READING'; payload: { spread: SpreadType; cards: TarotCard[]; question?: string } }
  | { type: 'COMPLETE_READING'; payload: Reading }
  | { type: 'CLEAR_CURRENT_READING' }
  | { type: 'ADD_TO_HISTORY'; payload: Reading }
  | { type: 'REMOVE_FROM_HISTORY'; payload: string }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<TarotState['settings']> }
  | { type: 'RESET_SETTINGS' }
  | { type: 'RESET_STATE' };

// 默认设置
const defaultSettings: TarotState['settings'] = {
  theme: 'dark',
  language: 'zh',
  reversedCardProbability: 0.3,
  autoSave: true,
  soundEnabled: true,
  cardSize: 'medium',
  animationsEnabled: true,
  autoReveal: false
};

// 初始状态
const initialState: TarotState = {
  currentView: 'home',
  currentReading: null,
  selectedSpread: null,
  drawnCards: [],
  question: '',
  readingHistory: [],
  isLoading: false,
  error: null,
  settings: defaultSettings
};

// Reducer函数
function tarotReducer(state: TarotState, action: TarotAction): TarotState {
  switch (action.type) {
    case 'SET_VIEW':
      return {
        ...state,
        currentView: action.payload,
        error: null
      };

    case 'SET_SPREAD':
      return {
        ...state,
        selectedSpread: action.payload,
        drawnCards: [],
        error: null
      };

    case 'SET_QUESTION':
      return {
        ...state,
        question: action.payload
      };

    case 'SET_DRAWN_CARDS':
      return {
        ...state,
        drawnCards: action.payload
      };

    case 'START_READING':
      return {
        ...state,
        selectedSpread: action.payload.spread,
        drawnCards: action.payload.cards,
        question: action.payload.question || '',
        currentView: 'reading',
        isLoading: false,
        error: null
      };

    case 'COMPLETE_READING':
      return {
        ...state,
        currentReading: action.payload,
        currentView: 'result',
        isLoading: false
      };

    case 'CLEAR_CURRENT_READING':
      return {
        ...state,
        currentReading: null,
        selectedSpread: null,
        drawnCards: [],
        question: '',
        currentView: 'home'
      };

    case 'ADD_TO_HISTORY':
      return {
        ...state,
        readingHistory: [action.payload, ...state.readingHistory]
      };

    case 'REMOVE_FROM_HISTORY':
      return {
        ...state,
        readingHistory: state.readingHistory.filter(reading => reading.id !== action.payload)
      };

    case 'CLEAR_HISTORY':
      return {
        ...state,
        readingHistory: []
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload
        }
      };

    case 'RESET_SETTINGS':
      return {
        ...state,
        settings: defaultSettings
      };

    case 'RESET_STATE':
      return {
        ...initialState,
        readingHistory: state.readingHistory, // 保留历史记录
        settings: state.settings // 保留设置
      };

    default:
      return state;
  }
}

// Context创建
const TarotContext = createContext<{
  state: TarotState;
  dispatch: React.Dispatch<TarotAction>;
} | null>(null);

// Provider组件
export const TarotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(tarotReducer, {
    ...initialState,
    // 从存储中加载初始数据
    readingHistory: storageService.loadReadingHistory(),
    settings: storageService.loadUserSettings() || defaultSettings
  });

  // 监听状态变化并保存到存储
  useEffect(() => {
    storageService.saveReadingHistory(state.readingHistory);
  }, [state.readingHistory]);

  useEffect(() => {
    storageService.saveUserSettings(state.settings);
  }, [state.settings]);

  return (
    <TarotContext.Provider value={{ state, dispatch }}>
      {children}
    </TarotContext.Provider>
  );
};

// Hook for using context
export const useTarot = () => {
  const context = useContext(TarotContext);
  if (!context) {
    throw new Error('useTarot must be used within a TarotProvider');
  }
  return context;
};

// 便捷的action creators
export const useTarotActions = () => {
  const { dispatch } = useTarot();

  return {
    setView: (view: TarotState['currentView']) => 
      dispatch({ type: 'SET_VIEW', payload: view }),
    
    setSpread: (spread: SpreadType) => 
      dispatch({ type: 'SET_SPREAD', payload: spread }),
    
    setQuestion: (question: string) => 
      dispatch({ type: 'SET_QUESTION', payload: question }),
    
    setDrawnCards: (cards: TarotCard[]) => 
      dispatch({ type: 'SET_DRAWN_CARDS', payload: cards }),
    
    startReading: (spread: SpreadType, cards: TarotCard[], question?: string) => 
      dispatch({ type: 'START_READING', payload: { spread, cards, question } }),
    
    completeReading: (reading: Reading) => 
      dispatch({ type: 'COMPLETE_READING', payload: reading }),
    
    clearCurrentReading: () => 
      dispatch({ type: 'CLEAR_CURRENT_READING' }),
    
    addToHistory: (reading: Reading) => 
      dispatch({ type: 'ADD_TO_HISTORY', payload: reading }),
    
    removeFromHistory: (id: string) => 
      dispatch({ type: 'REMOVE_FROM_HISTORY', payload: id }),
    
    clearHistory: () => 
      dispatch({ type: 'CLEAR_HISTORY' }),
    
    setLoading: (loading: boolean) => 
      dispatch({ type: 'SET_LOADING', payload: loading }),
    
    setError: (error: string | null) => 
      dispatch({ type: 'SET_ERROR', payload: error }),
    
    updateSettings: (settings: Partial<TarotState['settings']>) => 
      dispatch({ type: 'UPDATE_SETTINGS', payload: settings }),
    
    resetSettings: () => 
      dispatch({ type: 'RESET_SETTINGS' }),
    
    resetState: () => 
      dispatch({ type: 'RESET_STATE' })
  };
};