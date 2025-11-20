import React from 'react';
import { TarotProvider, useTarot } from './contexts/TarotContext';
import HomePage from './components/HomePage';
import ReadingPage from './components/ReadingPage';
import ReadingResultPage from './components/ReadingResultPage';
import HistoryPage from './components/HistoryPage';
import SettingsPage from './components/SettingsPage';
import { useTheme } from './hooks/useTheme';
import './styles/globals.css';

// 主应用路由组件
const AppRouter: React.FC = () => {
  const { state } = useTarot();

  switch (state.currentView) {
    case 'home':
      return <HomePage />;
    case 'reading':
      return <ReadingPage />;
    case 'history':
      return <HistoryPage />;
    case 'settings':
      return <SettingsPage />;
    case 'result':
      return <ReadingResultPage />;
    default:
      return <HomePage />;
  }
};

// 主应用组件
function App() {
  return (
    <TarotProvider>
      <div className="app">
        <AppRouter />
      </div>
    </TarotProvider>
  );
}

export default App;