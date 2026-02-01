/**
 * Root Component - KOMCA 패턴
 *
 * 앱의 최상위 레이아웃 컴포넌트
 * - ModalContainer, ToastContainer, ErrorBoundary, GlobalLoading
 * - useInitialize 훅으로 초기화
 * - Lnb, Header 컴포넌트 (내부에서 navigate, logout 처리)
 */

import React, { Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Lnb,
  Header,
  Container,
  ModalProvider,
  ModalContainer,
  ToastProvider,
  ToastContainer,
  ErrorBoundary,
  GlobalLoading,
  Logo,
  useInitialize
} from '@sonhoseong/mfa-lib';
import { authMenuItems, guestMenuItems, gnbItems } from './exposes/lnb-items';
import App from './exposes/App';

function Root() {
  const accessToken = useSelector((state: any) => state.app?.accessToken);
  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  // 초기화 훅
  const { initialized } = useInitialize();

  // 메뉴 아이템 (인증 상태에 따라)
  const lnbItems = useMemo(() => {
    return isAuthenticated ? authMenuItems : guestMenuItems;
  }, [isAuthenticated]);

  // 초기화 전 로딩
  if (!initialized) {
    return null;
  }

  return (
    <ModalProvider>
      <ToastProvider>
        <ModalContainer />
        <ToastContainer />
        <Container>
          <ErrorBoundary>
            {isAuthenticated && <Lnb lnbItems={lnbItems} logo={<Logo customSize={36} />} />}
            <main className="main-content">
              {isAuthenticated && <Header gnbItems={gnbItems} logo={<Logo customSize={32} />} />}
              <App />
            </main>
            <GlobalLoading />
          </ErrorBoundary>
        </Container>
      </ToastProvider>
    </ModalProvider>
  );
}

export default Root;
