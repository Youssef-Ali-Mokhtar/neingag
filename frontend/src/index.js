import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DrawerProvider from './store/DrawerProvider';
import AuthModalProvider from './store/AuthModalProvider';
import AuthProvider from './store/AuthProvider';
import NoteProvider from './store/NoteProvider';
import {BrowserRouter} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <NoteProvider>
        <AuthProvider>
            <AuthModalProvider>
                <DrawerProvider>
                    <BrowserRouter basename='/neingag'>
                        <App />
                    </BrowserRouter>
                </DrawerProvider>
            </AuthModalProvider>
        </AuthProvider>
    </NoteProvider>
);
