import React, { lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { LoginPage, storage } from '@sonhoseong/mfa-lib'
import { RoutePath } from './paths'

const HomePage = lazy(() => import('../home/HomePage'))

// Host에서: '' (빈 문자열), 단독 실행: /resume
const PREFIX = storage.isHostApp() ? '' : '/resume'
// Home path: Host에서는 '/', 단독에서는 '/resume'
const HOME_PATH = PREFIX || '/'

function RoutesGuestPages() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {PREFIX && <Route path={PREFIX} element={<HomePage />} />}
            <Route path={`${PREFIX}/login`} element={<LoginPage appName="이력서" redirectPath="/" />} />
            <Route path={`${PREFIX}/admin/*`} element={<LoginPage appName="이력서" redirectPath="/" />} />
            <Route path="*" element={<HomePage />} />
        </Routes>
    )
}

export { RoutesGuestPages }
