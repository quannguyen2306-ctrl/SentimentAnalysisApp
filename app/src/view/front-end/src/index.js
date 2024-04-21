import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
const clientId = "785528627749-fj4i6u8v6tpbm59t8ib72gkctvtc7bfh.apps.googleusercontent.com";

root.render(
    <GoogleOAuthProvider clientId={clientId}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </GoogleOAuthProvider>
);
