/**
 * Bootstrap - KOMCA 패턴
 *
 * 앱 부팅 및 초기화 담당
 *
 * - Host에서 실행: window.__REDUX_STORE__ 사용 (Host가 생성한 store)
 * - 단독 실행: 자체 store 생성 (개발/테스트용)
 *
 * MFA Routing:
 * - 단독 실행: /resume, /admin/skills
 * - Host 내: /resume/admin/skills (basename="/resume")
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createAppStore, getStore, storage } from '@sonhoseong/mfa-lib';
import Root from './Root';
import './styles/global.css';

// 단독 실행 여부 확인
const isStandalone = !window.__REDUX_STORE__;

// MFA basename 설정
// - 단독 실행: "/resume" (localhost:5001/resume)
// - Host 내 실행: "/resume" (localhost:5000/resume)
const basename = '/resume';

// Store 가져오기 또는 생성
let store;
if (isStandalone) {
    // 단독 실행: 자체 store 생성
    store = createAppStore();
    console.log('[Remote1] Bootstrap: Standalone mode - Created own store');
} else {
    // Host 내에서 실행: Host의 store 사용
    store = getStore();
    console.log('[Remote1] Bootstrap: Running in Host - Using shared store');
}

console.log('[Remote1] Basename:', basename);

// DOM 마운트
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename={basename}>
                <Root />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
