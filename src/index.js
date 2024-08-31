// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.css';


const rootElement = document.getElementById('root');

// Create a root using createRoot
const root = createRoot(rootElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
