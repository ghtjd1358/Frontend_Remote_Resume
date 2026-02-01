import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '@sonhoseong/mfa-lib';

const HomePage = lazy(() => import('../home/HomePage'));

function RoutesGuestPages() {
    return (
        <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>로딩 중...</div>}>
            <Routes>
                {/* basename="/resume" 적용됨 */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage appName="이력서" redirectPath="/" />} />
                <Route path="/*" element={<HomePage />} />
            </Routes>
        </Suspense>
    );
}

export { RoutesGuestPages };
