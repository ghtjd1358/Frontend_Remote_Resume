import React, { lazy, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { LoginPage } from '@sonhoseong/mfa-lib'
import { RoutePath } from './paths'

const HomePage = lazy(() => import('../home/HomePage'))

function RoutesGuestPages() {
    return (
        <Suspense fallback="">
            <Routes>
                <Route path={RoutePath.Home} element={<HomePage />} />
                <Route path="/login" element={<LoginPage appName="이력서" redirectPath="/" />} />
                <Route path="/admin/*" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
        </Suspense>
    )
}

export { RoutesGuestPages }
