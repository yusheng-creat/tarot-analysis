/**
 * 性能监控和优化工具
 */

/**
 * 性能指标接口
 */
export interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  componentCount: number;
  timestamp: number;
}

/**
 * 性能监控类
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics[] = [];
  private observers: ((metrics: PerformanceMetrics) => void)[] = [];

  private constructor() {
    this.initializeMonitoring();
  }

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * 初始化性能监控
   */
  private initializeMonitoring(): void {
    // 监听页面加载性能
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        this.recordLoadMetrics();
      });
    }
  }

  /**
   * 记录页面加载指标
   */
  private recordLoadMetrics(): void {
    if (!performance.timing) return;

    const timing = performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
    
    console.log(`页面加载时间: ${loadTime}ms`);
    console.log(`DOM就绪时间: ${domReady}ms`);
  }

  /**
   * 开始性能测量
   */
  public startMeasure(name: string): void {
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(`${name}-start`);
    }
  }

  /**
   * 结束性能测量
   */
  public endMeasure(name: string): number {
    if (typeof performance !== 'undefined' && performance.mark && performance.measure) {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = performance.getEntriesByName(name)[0];
      return measure ? measure.duration : 0;
    }
    return 0;
  }

  /**
   * 记录组件渲染时间
   */
  public recordRenderTime(componentName: string, renderTime: number): void {
    const metrics: PerformanceMetrics = {
      renderTime,
      memoryUsage: this.getMemoryUsage(),
      componentCount: this.getComponentCount(),
      timestamp: Date.now()
    };

    this.metrics.push(metrics);
    
    // 限制存储的指标数量
    if (this.metrics.length > 100) {
      this.metrics.shift();
    }

    // 通知观察者
    this.observers.forEach(observer => observer(metrics));

    // 在开发环境下输出性能信息
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} 渲染时间: ${renderTime.toFixed(2)}ms`);
    }
  }

  /**
   * 获取内存使用情况
   */
  private getMemoryUsage(): number {
    if (typeof performance !== 'undefined' && (performance as any).memory) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }

  /**
   * 获取组件数量（估算）
   */
  private getComponentCount(): number {
    if (typeof document !== 'undefined') {
      return document.querySelectorAll('[data-reactroot] *').length;
    }
    return 0;
  }

  /**
   * 获取性能指标
   */
  public getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  /**
   * 获取平均渲染时间
   */
  public getAverageRenderTime(): number {
    if (this.metrics.length === 0) return 0;
    
    const total = this.metrics.reduce((sum, metric) => sum + metric.renderTime, 0);
    return total / this.metrics.length;
  }

  /**
   * 添加性能观察者
   */
  public addObserver(observer: (metrics: PerformanceMetrics) => void): void {
    this.observers.push(observer);
  }

  /**
   * 移除性能观察者
   */
  public removeObserver(observer: (metrics: PerformanceMetrics) => void): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  /**
   * 清除所有指标
   */
  public clearMetrics(): void {
    this.metrics = [];
  }
}

/**
 * 性能监控Hook
 */
export const usePerformanceMonitor = () => {
  const monitor = PerformanceMonitor.getInstance();
  
  return {
    startMeasure: monitor.startMeasure.bind(monitor),
    endMeasure: monitor.endMeasure.bind(monitor),
    recordRenderTime: monitor.recordRenderTime.bind(monitor),
    getMetrics: monitor.getMetrics.bind(monitor),
    getAverageRenderTime: monitor.getAverageRenderTime.bind(monitor),
    addObserver: monitor.addObserver.bind(monitor),
    removeObserver: monitor.removeObserver.bind(monitor)
  };
};

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * 懒加载图片
 */
export const lazyLoadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * 检查是否为移动设备
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * 获取设备像素比
 */
export const getDevicePixelRatio = (): number => {
  if (typeof window === 'undefined') return 1;
  return window.devicePixelRatio || 1;
};

/**
 * 预加载关键资源
 */
export const preloadResources = (urls: string[]): Promise<void[]> => {
  const promises = urls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = 'image';
      link.onload = () => resolve();
      link.onerror = reject;
      document.head.appendChild(link);
    });
  });
  
  return Promise.all(promises);
};

/**
 * 内存清理工具
 */
export const cleanupMemory = (): void => {
  // 清理事件监听器
  if (typeof window !== 'undefined') {
    // 触发垃圾回收（仅在支持的浏览器中）
    if ((window as any).gc) {
      (window as any).gc();
    }
  }
};

/**
 * 检查浏览器支持的功能
 */
export const checkBrowserSupport = () => {
  const support = {
    localStorage: typeof Storage !== 'undefined',
    webGL: !!window.WebGLRenderingContext,
    webWorkers: typeof Worker !== 'undefined',
    serviceWorkers: 'serviceWorker' in navigator,
    intersectionObserver: 'IntersectionObserver' in window,
    performanceObserver: 'PerformanceObserver' in window
  };
  
  return support;
};

// 导出性能监控实例
export const performanceMonitor = PerformanceMonitor.getInstance();