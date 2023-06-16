import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); // 在进行渲染的工作了，渲染 -->将你写的jsx转换成页面真实dom的工作叫做渲染
