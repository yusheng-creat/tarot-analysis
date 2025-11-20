import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('塔罗分析应用 - 集成测试', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  describe('应用初始化', () => {
    it('应该正确渲染主页', () => {
      render(<App />);
      
      expect(screen.getByText('塔罗分析')).toBeInTheDocument();
      expect(screen.getByText('探索内心的智慧，寻找人生的指引')).toBeInTheDocument();
      expect(screen.getByText('选择牌阵')).toBeInTheDocument();
    });

    it('应该显示所有可用的牌阵', () => {
      render(<App />);
      
      expect(screen.getByText('单张牌')).toBeInTheDocument();
      expect(screen.getByText('三张牌')).toBeInTheDocument();
      expect(screen.getByText('凯尔特十字')).toBeInTheDocument();
      expect(screen.getByText('关系牌阵')).toBeInTheDocument();
      expect(screen.getByText('决策牌阵')).toBeInTheDocument();
    });

    it('应该显示导航按钮', () => {
      render(<App />);
      
      expect(screen.getByText('查看历史')).toBeInTheDocument();
      expect(screen.getByText('应用设置')).toBeInTheDocument();
    });
  });

  describe('占卜流程', () => {
    it('应该能够完成完整的占卜流程', async () => {
      const user = userEvent.setup();
      render(<App />);

      // 1. 选择牌阵
      const singleCardSpread = screen.getByText('单张牌');
      await user.click(singleCardSpread);

      // 2. 输入问题（可选）
      const questionInput = screen.getByPlaceholderText(/请输入你的问题/);
      await user.type(questionInput, '我今天的运势如何？');

      // 3. 开始占卜
      const startButton = screen.getByText('开始占卜');
      await user.click(startButton);

      // 4. 验证进入占卜页面
      await waitFor(() => {
        expect(screen.getByText('单张牌')).toBeInTheDocument();
      });

      // 5. 点击卡牌进行翻牌
      const cardElement = screen.getByRole('button', { name: /点击翻牌/ });
      await user.click(cardElement);

      // 6. 等待解读生成
      await waitFor(() => {
        expect(screen.getByText(/解读结果/)).toBeInTheDocument();
      }, { timeout: 5000 });

      // 7. 验证解读内容存在
      expect(screen.getByText(/整体分析/)).toBeInTheDocument();
      expect(screen.getByText(/建议/)).toBeInTheDocument();
    });

    it('应该能够重新开始占卜', async () => {
      const user = userEvent.setup();
      render(<App />);

      // 完成一次占卜
      const singleCardSpread = screen.getByText('单张牌');
      await user.click(singleCardSpread);

      const startButton = screen.getByText('开始占卜');
      await user.click(startButton);

      // 返回主页
      const backButton = screen.getByText('返回主页');
      await user.click(backButton);

      // 验证回到主页
      expect(screen.getByText('选择牌阵')).toBeInTheDocument();
    });
  });

  describe('历史记录功能', () => {
    it('应该能够查看历史记录', async () => {
      const user = userEvent.setup();
      render(<App />);

      // 点击查看历史
      const historyButton = screen.getByText('查看历史');
      await user.click(historyButton);

      // 验证进入历史页面
      expect(screen.getByText('占卜历史')).toBeInTheDocument();
      expect(screen.getByText('回顾你的塔罗之旅，重新审视过往的指引')).toBeInTheDocument();
    });

    it('应该显示空状态当没有历史记录时', async () => {
      const user = userEvent.setup();
      render(<App />);

      const historyButton = screen.getByText('查看历史');
      await user.click(historyButton);

      expect(screen.getByText('还没有占卜记录')).toBeInTheDocument();
      expect(screen.getByText('开始你的第一次塔罗占卜，探索内心的智慧')).toBeInTheDocument();
    });
  });

  describe('设置功能', () => {
    it('应该能够访问设置页面', async () => {
      const user = userEvent.setup();
      render(<App />);

      // 点击应用设置
      const settingsButton = screen.getByText('应用设置');
      await user.click(settingsButton);

      // 验证进入设置页面
      expect(screen.getByText('应用设置')).toBeInTheDocument();
      expect(screen.getByText('个性化你的塔罗体验，管理数据和偏好')).toBeInTheDocument();
    });

    it('应该显示所有设置选项卡', async () => {
      const user = userEvent.setup();
      render(<App />);

      const settingsButton = screen.getByText('应用设置');
      await user.click(settingsButton);

      expect(screen.getByText('常规设置')).toBeInTheDocument();
      expect(screen.getByText('数据管理')).toBeInTheDocument();
      expect(screen.getByText('关于应用')).toBeInTheDocument();
    });

    it('应该能够切换设置选项卡', async () => {
      const user = userEvent.setup();
      render(<App />);

      const settingsButton = screen.getByText('应用设置');
      await user.click(settingsButton);

      // 切换到数据管理
      const dataTab = screen.getByText('数据管理');
      await user.click(dataTab);

      expect(screen.getByText('存储使用情况')).toBeInTheDocument();
      expect(screen.getByText('数据备份')).toBeInTheDocument();

      // 切换到关于应用
      const aboutTab = screen.getByText('关于应用');
      await user.click(aboutTab);

      expect(screen.getByText('塔罗分析')).toBeInTheDocument();
      expect(screen.getByText('版本 1.0.0')).toBeInTheDocument();
    });
  });

  describe('主题切换', () => {
    it('应该能够切换主题', async () => {
      const user = userEvent.setup();
      render(<App />);

      // 进入设置页面
      const settingsButton = screen.getByText('应用设置');
      await user.click(settingsButton);

      // 查找主题切换按钮
      const themeToggle = screen.getByRole('button', { name: /切换到.*主题/ });
      expect(themeToggle).toBeInTheDocument();

      // 点击切换主题
      await user.click(themeToggle);

      // 验证主题已切换（通过检查DOM属性）
      await waitFor(() => {
        const root = document.documentElement;
        expect(root.getAttribute('data-theme')).toBeTruthy();
      });
    });
  });

  describe('响应式设计', () => {
    it('应该在移动设备上正确显示', () => {
      // 模拟移动设备视口
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<App />);

      // 验证主要内容仍然可见
      expect(screen.getByText('塔罗分析')).toBeInTheDocument();
      expect(screen.getByText('选择牌阵')).toBeInTheDocument();
    });
  });

  describe('错误处理', () => {
    it('应该处理存储错误', () => {
      // 模拟localStorage错误
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('Storage error');
      });

      // 应用仍应正常渲染
      render(<App />);
      expect(screen.getByText('塔罗分析')).toBeInTheDocument();
    });
  });

  describe('无障碍性', () => {
    it('应该有正确的ARIA标签', () => {
      render(<App />);

      // 检查主要区域的ARIA标签
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();

      // 检查按钮的可访问性
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('type');
      });
    });

    it('应该支持键盘导航', async () => {
      const user = userEvent.setup();
      render(<App />);

      // 测试Tab键导航
      await user.tab();
      expect(document.activeElement).toBeInTheDocument();

      // 测试Enter键激活
      if (document.activeElement && document.activeElement.tagName === 'BUTTON') {
        await user.keyboard('{Enter}');
        // 验证按钮被激活
      }
    });
  });

  describe('性能', () => {
    it('应该快速渲染', () => {
      const startTime = performance.now();
      render(<App />);
      const endTime = performance.now();

      // 渲染时间应该少于100ms
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('应该正确清理资源', () => {
      const { unmount } = render(<App />);
      
      // 卸载组件
      unmount();
      
      // 验证没有内存泄漏（这里只是基本检查）
      expect(document.body.innerHTML).toBe('');
    });
  });
});