import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
    Lnb,
    Container,
    ModalProvider,
    ModalContainer,
    ToastProvider,
    ToastContainer,
    ErrorBoundary,
    GlobalLoading,
    Logo,
    useInitialize,
    selectAccessToken
} from '@sonhoseong/mfa-lib'
import { authMenuItems, guestMenuItems } from './exposes/lnb-items'
import App from './exposes/App'

const isStandalone = (window as any).__MFA_STANDALONE__ ?? true

function Root() {
    const accessToken = useSelector(selectAccessToken)
    const isAuthenticated = useMemo(() => !!accessToken, [accessToken])
    const { initialized } = useInitialize()

    const lnbItems = useMemo(() => {
        return isAuthenticated ? authMenuItems : guestMenuItems
    }, [isAuthenticated])

    if (isStandalone && !initialized) {
        return null
    }

    if (!isStandalone) {
        return <App />
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
                            <App />
                        </main>
                        <GlobalLoading />
                    </ErrorBoundary>
                </Container>
            </ToastProvider>
        </ModalProvider>
    )
}

export default Root
