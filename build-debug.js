import { build } from 'vite';
import react from '@vitejs/plugin-react';

async function buildApp() {
  try {
    console.log('🔨 开始构建...');
    
    await build({
      plugins: [react()],
      base: process.env.NODE_ENV === 'production' ? '/tarot-analysis/' : '/',
      build: {
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
            },
          },
        },
      },
      logLevel: 'info'
    });
    
    console.log('✅ 构建成功！');
  } catch (error) {
    console.error('❌ 构建失败:', error);
    process.exit(1);
  }
}

buildApp();