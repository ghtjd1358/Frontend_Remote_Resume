import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RoutePath } from './paths';

const HomePage = lazy(() => import('../home/HomePage'));

function RoutesAuthPages() {
    return (
        <Routes>
            <Route path={RoutePath.Home} element={<HomePage />} />
            <Route path={RoutePath.Resume} element={<HomePage />} />
            <Route path="*" element={<Navigate to={RoutePath.Home} replace />} />
        </Routes>
    );
}

export { RoutesAuthPages };
