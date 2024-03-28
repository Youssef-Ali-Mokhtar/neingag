import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DrawerProvider from './store/DrawerProvider';
import AuthModalProvider from './store/AuthModalProvider';
import AuthProvider from './store/AuthProvider';
import {BrowserRouter} from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <AuthModalProvider>
            <DrawerProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </DrawerProvider>
        </AuthModalProvider>
    </AuthProvider>
);
