import React from 'react';
import { useTheme } from '../hooks/useTheme';
import styles from './ThemeToggle.module.css';

/**
 * 主题切换组件
 * 提供深色/浅色主题切换功能
 */
export const ThemeToggle: React.FC<{
  className?: string;
  showLabel?: boolean;
}> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      className={`${styles.themeToggle} ${className}`}
      onClick={toggleTheme}
      aria-label={`切换到${isDark ? '浅色' : '深色'}主题`}
      title={`当前: ${isDark ? '深色' : '浅色'}主题`}
    >
      <div className={styles.toggleContainer}>
        <div className={`${styles.toggleTrack} ${isDark ? styles.dark : styles.light}`}>
          <div className={`${styles.toggleThumb} ${isDark ? styles.thumbDark : styles.thumbLight}`}>
            <span className={styles.toggleIcon}>
              {isDark ? '🌙' : '☀️'}
            </span>
          </div>
        </div>
        {showLabel && (
          <span className={styles.toggleLabel}>
            {isDark ? '深色' : '浅色'}
          </span>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;