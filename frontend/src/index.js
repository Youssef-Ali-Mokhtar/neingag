import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DrawerProvider from './store/DrawerProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DrawerProvider>
        <App />
    </DrawerProvider>
);
