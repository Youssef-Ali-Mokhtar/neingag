import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DrawerProvider from './store/DrawerProvider';
import {BrowserRouter} from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DrawerProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </DrawerProvider>
);
