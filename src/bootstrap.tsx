import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createAppStore, getStore } from '@sonhoseong/mfa-lib'
import Root from './Root'
import './styles/global.css'

const isStandalone = !window.__REDUX_STORE__
;(window as any).__MFA_STANDALONE__ = isStandalone

const basename = isStandalone ? '/' : '/resume'

let store
if (isStandalone) {
    store = createAppStore()
    window.__REDUX_STORE__ = store as any
} else {
    store = getStore()
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename={basename}>
                <Root />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
