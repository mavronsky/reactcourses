import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
export { default as Header } from './components/Header/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
