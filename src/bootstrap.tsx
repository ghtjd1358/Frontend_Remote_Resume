import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import { Header } from './components/layout';
import './global.css';

/**
 * MFA Bootstrap 패턴
 *
 * Host에서 실행: window.__REDUX_STORE__ 사용 (Host가 생성한 store)
 * 단독 실행: fallback store 생성 (개발/테스트용)
 */

declare global {
  interface Window {
    __REDUX_STORE__?: ReturnType<typeof configureStore>;
  }
}

// 단독 실행용 fallback store (Host 없이 개발할 때만 사용)
const createFallbackStore = () =>
  configureStore({
    reducer: {
      app: (state = { user: null, isAuthenticated: false, isLoading: false }) => state,
    },
  });

// Host의 store 사용, 없으면 fallback
const getStore = () => window.__REDUX_STORE__ ?? createFallbackStore();
const isStandalone = !window.__REDUX_STORE__;

// Root 컴포넌트
const Root: React.FC = () => {
  useEffect(() => {
    if (isStandalone) {
      document.body.classList.add('has-header');
    }
    return () => {
      document.body.classList.remove('has-header');
    };
  }, []);

  return (
    <>
      <Header isStandalone={isStandalone} />
      <App />
    </>
  );
};

// 렌더링
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={getStore()}>
      <Root />
    </Provider>
  </React.StrictMode>
);

console.log(`✅ Remote1 App: ${isStandalone ? 'Standalone' : 'In Host'}`);
