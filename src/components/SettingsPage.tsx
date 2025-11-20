import React, { useState } from 'react';
import { useTarot, useTarotActions } from '../contexts/TarotContext';
import { storageService } from '../services/StorageService';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';
import styles from './SettingsPage.module.css';

/**
 * 设置页面组件
 * 允许用户配置应用偏好和管理数据
 */
export const SettingsPage: React.FC = () => {
  const { state } = useTarot();
  const actions = useTarotActions();
  const [activeTab, setActiveTab] = useState<'general' | 'data' | 'about'>('general');
  const [importFile, setImportFile] = useState<File | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState<string | null>(null);

  // 获取存储使用情况
  const storageUsage = storageService.getStorageUsage();

  // 处理设置更改
  const handleSettingChange = (key: keyof typeof state.settings, value: any) => {
    actions.updateSettings({ [key]: value });
  };

  // 导出数据
  const handleExportData = () => {
    const exportData = storageService.exportAllData();
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `tarot-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 导入数据
  const handleImportData = async () => {
    if (!importFile) return;

    try {
      const text = await importFile.text();
      const data = JSON.parse(text);
      
      const result = storageService.importData(data);
      
      if (result.success) {
        alert('数据导入成功！页面将刷新以应用更改。');
        window.location.reload();
      } else {
        alert(`导入失败：${result.errors.join(', ')}`);
      }
    } catch (error) {
      alert('导入失败：文件格式无效');
    }
    
    setImportFile(null);
  };

  // 清理过期数据
  const handleCleanupData = () => {
    const removedCount = storageService.cleanupExpiredData(365);
    alert(`已清理 ${removedCount} 条过期记录`);
    setShowConfirmDialog(null);
  };

  // 重置所有设置
  const handleResetSettings = () => {
    actions.resetSettings();
    alert('设置已重置为默认值');
    setShowConfirmDialog(null);
  };

  // 清空所有数据
  const handleClearAllData = () => {
    storageService.clearReadingHistory();
    actions.resetSettings();
    alert('所有数据已清空！页面将刷新。');
    window.location.reload();
  };

  return (
    <div className={styles.settingsPage}>
      {/* 页面标题 */}
      <header className={styles.header}>
        <h1 className={styles.title}>应用设置</h1>
        <p className={styles.subtitle}>
          个性化你的塔罗体验，管理数据和偏好
        </p>
      </header>

      {/* 标签页导航 */}
      <nav className={styles.tabNav}>
        <button
          className={`${styles.tabButton} ${activeTab === 'general' ? styles.active : ''}`}
          onClick={() => setActiveTab('general')}
        >
          <span className={styles.tabIcon}>⚙️</span>
          常规设置
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'data' ? styles.active : ''}`}
          onClick={() => setActiveTab('data')}
        >
          <span className={styles.tabIcon}>💾</span>
          数据管理
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'about' ? styles.active : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <span className={styles.tabIcon}>ℹ️</span>
          关于应用
        </button>
      </nav>

      {/* 标签页内容 */}
      <main className={styles.tabContent}>
        {/* 常规设置 */}
        {activeTab === 'general' && (
          <div className={styles.settingsSection}>
            <h2 className={styles.sectionTitle}>界面设置</h2>
            
            <div className={styles.settingGroup}>
              <div className={styles.settingLabel}>
                <span className={styles.labelText}>主题</span>
                <ThemeToggle showLabel={true} />
              </div>
              <p className={styles.settingDescription}>
                选择你喜欢的界面主题，支持深色和浅色模式
              </p>
            </div>

            <div className={styles.settingGroup}>
              <label className={styles.settingLabel}>
                <span className={styles.labelText}>语言</span>
                <select
                  value={state.settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className={styles.settingSelect}
                >
                  <option value="zh">中文</option>
                  <option value="en">English</option>
                </select>
              </label>
              <p className={styles.settingDescription}>
                选择应用界面语言
              </p>
            </div>

            <h2 className={styles.sectionTitle}>占卜设置</h2>

            <div className={styles.settingGroup}>
              <label className={styles.settingLabel}>
                <span className={styles.labelText}>逆位牌概率</span>
                <div className={styles.sliderContainer}>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={state.settings.reversedCardProbability}
                    onChange={(e) => handleSettingChange('reversedCardProbability', parseFloat(e.target.value))}
                    className={styles.settingSlider}
                  />
                  <span className={styles.sliderValue}>
                    {Math.round(state.settings.reversedCardProbability * 100)}%
                  </span>
                </div>
              </label>
              <p className={styles.settingDescription}>
                调整抽到逆位牌的概率
              </p>
            </div>

            <div className={styles.settingGroup}>
              <label className={styles.settingLabel}>
                <input
                  type="checkbox"
                  checked={state.settings.autoSave}
                  onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                  className={styles.settingCheckbox}
                />
                <span className={styles.labelText}>自动保存</span>
              </label>
              <p className={styles.settingDescription}>
                自动保存占卜结果到历史记录
              </p>
            </div>

            <div className={styles.settingGroup}>
              <label className={styles.settingLabel}>
                <input
                  type="checkbox"
                  checked={state.settings.soundEnabled}
                  onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                  className={styles.settingCheckbox}
                />
                <span className={styles.labelText}>音效</span>
              </label>
              <p className={styles.settingDescription}>
                启用翻牌和界面音效
              </p>
            </div>

            <div className={styles.actionGroup}>
              <button
                className={styles.resetButton}
                onClick={() => setShowConfirmDialog('reset')}
              >
                <span className={styles.buttonIcon}>🔄</span>
                重置设置
              </button>
            </div>
          </div>
        )}

        {/* 数据管理 */}
        {activeTab === 'data' && (
          <div className={styles.settingsSection}>
            <h2 className={styles.sectionTitle}>存储使用情况</h2>
            
            <div className={styles.storageInfo}>
              <div className={styles.storageStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>占卜记录</span>
                  <span className={styles.statValue}>{storageUsage.readingCount}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>存储使用</span>
                  <span className={styles.statValue}>
                    {(storageUsage.used / 1024).toFixed(1)} KB
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>使用率</span>
                  <span className={styles.statValue}>{storageUsage.percentage}%</span>
                </div>
              </div>
              
              <div className={styles.storageBar}>
                <div 
                  className={styles.storageProgress}
                  style={{ width: `${Math.min(storageUsage.percentage, 100)}%` }}
                />
              </div>
            </div>

            <h2 className={styles.sectionTitle}>数据备份</h2>

            <div className={styles.actionGroup}>
              <button
                className={styles.exportButton}
                onClick={handleExportData}
              >
                <span className={styles.buttonIcon}>📤</span>
                导出数据
              </button>
              <p className={styles.actionDescription}>
                将所有占卜记录和设置导出为JSON文件
              </p>
            </div>

            <div className={styles.actionGroup}>
              <div className={styles.importSection}>
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                  className={styles.fileInput}
                  id="import-file"
                />
                <label htmlFor="import-file" className={styles.fileLabel}>
                  <span className={styles.buttonIcon}>📁</span>
                  选择备份文件
                </label>
                {importFile && (
                  <button
                    className={styles.importButton}
                    onClick={handleImportData}
                  >
                    <span className={styles.buttonIcon}>📥</span>
                    导入数据
                  </button>
                )}
              </div>
              <p className={styles.actionDescription}>
                从备份文件恢复数据（将覆盖现有数据）
              </p>
            </div>

            <h2 className={styles.sectionTitle}>数据清理</h2>

            <div className={styles.actionGroup}>
              <button
                className={styles.cleanupButton}
                onClick={() => setShowConfirmDialog('cleanup')}
              >
                <span className={styles.buttonIcon}>🧹</span>
                清理过期数据
              </button>
              <p className={styles.actionDescription}>
                删除一年前的占卜记录
              </p>
            </div>

            <div className={styles.actionGroup}>
              <button
                className={styles.dangerButton}
                onClick={() => setShowConfirmDialog('clear')}
              >
                <span className={styles.buttonIcon}>🗑️</span>
                清空所有数据
              </button>
              <p className={styles.actionDescription}>
                永久删除所有占卜记录和设置（不可恢复）
              </p>
            </div>
          </div>
        )}

        {/* 关于应用 */}
        {activeTab === 'about' && (
          <div className={styles.settingsSection}>
            <div className={styles.aboutSection}>
              <div className={styles.appInfo}>
                <h2 className={styles.appName}>塔罗分析</h2>
                <p className={styles.appVersion}>版本 1.0.0</p>
                <p className={styles.appDescription}>
                  一个现代化的数字塔罗占卜应用，提供专业的塔罗牌解读和分析。
                  基于传统塔罗智慧，结合现代技术，为你带来准确而深刻的指引。
                </p>
              </div>

              <div className={styles.features}>
                <h3 className={styles.featuresTitle}>主要功能</h3>
                <ul className={styles.featuresList}>
                  <li>✨ 完整的78张塔罗牌数据库</li>
                  <li>🎯 5种经典牌阵布局</li>
                  <li>🧠 智能化牌面解读</li>
                  <li>📱 响应式设计，支持移动端</li>
                  <li>💾 本地数据存储和备份</li>
                  <li>🔍 强大的历史记录搜索</li>
                  <li>🎨 优雅的用户界面</li>
                  <li>♿ 无障碍访问支持</li>
                </ul>
              </div>

              <div className={styles.techInfo}>
                <h3 className={styles.techTitle}>技术信息</h3>
                <div className={styles.techGrid}>
                  <div className={styles.techItem}>
                    <span className={styles.techLabel}>前端框架</span>
                    <span className={styles.techValue}>React 18</span>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techLabel}>开发语言</span>
                    <span className={styles.techValue}>TypeScript</span>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techLabel}>构建工具</span>
                    <span className={styles.techValue}>Vite</span>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techLabel}>样式方案</span>
                    <span className={styles.techValue}>CSS Modules</span>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techLabel}>测试框架</span>
                    <span className={styles.techValue}>Jest</span>
                  </div>
                  <div className={styles.techItem}>
                    <span className={styles.techLabel}>数据存储</span>
                    <span className={styles.techValue}>LocalStorage</span>
                  </div>
                </div>
              </div>

              <div className={styles.disclaimer}>
                <h3 className={styles.disclaimerTitle}>免责声明</h3>
                <p className={styles.disclaimerText}>
                  本应用仅供娱乐和自我反思使用。塔罗占卜结果不应作为重要决策的唯一依据。
                  请理性对待占卜结果，并结合实际情况做出判断。
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 确认对话框 */}
      {showConfirmDialog && (
        <div className={styles.overlay}>
          <div className={styles.confirmDialog}>
            <h3 className={styles.dialogTitle}>
              {showConfirmDialog === 'reset' && '重置设置'}
              {showConfirmDialog === 'cleanup' && '清理过期数据'}
              {showConfirmDialog === 'clear' && '清空所有数据'}
            </h3>
            <p className={styles.dialogMessage}>
              {showConfirmDialog === 'reset' && '确定要将所有设置重置为默认值吗？'}
              {showConfirmDialog === 'cleanup' && '确定要删除一年前的占卜记录吗？'}
              {showConfirmDialog === 'clear' && '确定要永久删除所有数据吗？此操作不可恢复！'}
            </p>
            <div className={styles.dialogActions}>
              <button
                className={styles.cancelButton}
                onClick={() => setShowConfirmDialog(null)}
              >
                取消
              </button>
              <button
                className={styles.confirmButton}
                onClick={() => {
                  if (showConfirmDialog === 'reset') handleResetSettings();
                  if (showConfirmDialog === 'cleanup') handleCleanupData();
                  if (showConfirmDialog === 'clear') handleClearAllData();
                }}
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}

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

export default SettingsPage;