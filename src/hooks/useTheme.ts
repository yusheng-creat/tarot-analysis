import { useEffect } from 'react';
import { useTarot, useTarotActions } from '../contexts/TarotContext';

/**
 * 主题管理Hook
 * 处理主题切换和系统主题检测
 */
export const useTheme = () => {
  const { state } = useTarot();
  const actions = useTarotActions();

  // 应用主题到DOM
  const applyTheme = (theme: 'dark' | 'light') => {
    const root = document.documentElement;
    
    // 添加过渡类避免闪烁
    root.classList.add('theme-transitioning');
    
    // 设置主题属性
    root.setAttribute('data-theme', theme);
    
    // 移除过渡类
    setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 100);
  };

  // 检测系统主题偏好
  const getSystemTheme = (): 'dark' | 'light' => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark'; // 默认深色主题
  };

  // 切换主题
  const toggleTheme = () => {
    const newTheme = state.settings.theme === 'dark' ? 'light' : 'dark';
    actions.updateSettings({ theme: newTheme });
  };

  // 设置特定主题
  const setTheme = (theme: 'dark' | 'light') => {
    actions.updateSettings({ theme });
  };

  // 监听系统主题变化
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent) => {
        // 只有在用户没有手动设置主题时才跟随系统
        const hasUserPreference = localStorage.getItem('tarot_user_settings');
        if (!hasUserPreference) {
          const systemTheme = e.matches ? 'dark' : 'light';
          actions.updateSettings({ theme: systemTheme });
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [actions]);

  // 应用当前主题
  useEffect(() => {
    applyTheme(state.settings.theme);
  }, [state.settings.theme]);

  // 初始化主题
  useEffect(() => {
    // 如果没有保存的主题设置，使用系统主题
    const savedSettings = localStorage.getItem('tarot_user_settings');
    if (!savedSettings) {
      const systemTheme = getSystemTheme();
      actions.updateSettings({ theme: systemTheme });
    } else {
      // 应用保存的主题
      applyTheme(state.settings.theme);
    }
  }, []);

  return {
    theme: state.settings.theme,
    toggleTheme,
    setTheme,
    systemTheme: getSystemTheme(),
    isDark: state.settings.theme === 'dark',
    isLight: state.settings.theme === 'light'
  };
};