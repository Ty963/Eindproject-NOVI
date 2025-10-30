import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '/src/App.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import '/src/styles/variables.css';
import '/src/styles/global.css';
import '/src/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>
);