import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DrawerProvider from './store/DrawerProvider';
import AuthModalProvider from './store/AuthModalProvider';
import {BrowserRouter} from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthModalProvider>
        <DrawerProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </DrawerProvider>
    </AuthModalProvider>
);
