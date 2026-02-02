import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { BrowserRouter, store, ToastProvider, ModalProvider } from '@sonhoseong/mfa-lib'
import Root from './Root'
import './styles/global.css'

const history = createBrowserHistory()
const isPrd = process.env.NODE_ENV === 'production'
const buildInfo = `${process.env.BUILD_INFO || 'dev'}`

async function start() {
    const rootElement = document.getElementById('root')
    if (!rootElement) throw new Error('Root element not found')

    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <Provider store={store}>
                <ToastProvider>
                    <ModalProvider>
                        <BrowserRouter history={history}>
                            <Root />
                        </BrowserRouter>
                    </ModalProvider>
                </ToastProvider>
            </Provider>
        </React.StrictMode>
    )
}

start()
