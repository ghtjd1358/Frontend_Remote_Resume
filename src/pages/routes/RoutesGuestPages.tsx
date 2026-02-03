import React, { lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { LoginPage, storage } from '@sonhoseong/mfa-lib'
import { RoutePath } from './paths'

const HomePage = lazy(() => import('../home/HomePage'))

// 단독 실행: /resume/... , Host에서: /platform/resume/...
const PREFIX = storage.isHostApp() ? '/platform/resume' : '/resume'

function RoutesGuestPages() {
    return (
        <Routes>
            <Route path={PREFIX} element={<HomePage />} />
            <Route path={`${PREFIX}/login`} element={<LoginPage appName="이력서" redirectPath={PREFIX} />} />
            <Route path={`${PREFIX}/admin/*`} element={<Navigate to={`${PREFIX}/login`} replace />} />
        </Routes>
    )
}

export { RoutesGuestPages }
