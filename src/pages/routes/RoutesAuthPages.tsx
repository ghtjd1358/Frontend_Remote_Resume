import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('../home/HomePage'));

function RoutesAuthPages() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resume" element={<HomePage />} />
        </Routes>
    );
}

export { RoutesAuthPages };
