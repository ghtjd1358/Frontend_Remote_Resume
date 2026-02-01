import React, { Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RoutesGuestPages, RoutesAuthPages } from '../pages/routes';
import '../styles/global.css';
import '../styles/admin.css';

function App() {
  const accessToken = useSelector((state: any) => state.app?.accessToken);
  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <Suspense fallback="">
      {!isAuthenticated && <RoutesGuestPages />}
      {isAuthenticated && <RoutesAuthPages />}
    </Suspense>
  );
}

export default App;
