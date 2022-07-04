import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';
import { ProductContextProvider } from './store/product-context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <ProductContextProvider>
        <AuthContextProvider>
            <BrowserRouter><App /></BrowserRouter>
        </AuthContextProvider>
    </ProductContextProvider>
);


