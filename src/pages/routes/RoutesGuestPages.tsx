import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('../home/HomePage'));

function RoutesGuestPages() {
    return (
        <Routes>
            {/* Host에서 "/" 경로로 매핑됨 - 모든 하위 경로 처리 */}
            <Route path="/" element={<HomePage />} />
            <Route path="/resume" element={<HomePage />} />
            {/* catch-all 제거 - Host가 다른 경로 처리하도록 */}
        </Routes>
    );
}

export { RoutesGuestPages };
