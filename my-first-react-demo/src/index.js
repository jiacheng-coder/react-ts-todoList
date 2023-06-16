import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); // 在进行渲染的工作了，渲染 -->将你写的jsx转换成页面真实dom的工作叫做渲染

requestIdleCallback(()=>{
  const app = document.getElementsByClassName("App")[0]
  console.log("App Dom:",app);
  // app.addEventListener("click",(e)=>{e.stopPropagation()}) // App的父级就是root元素，这里我们组织了真实dom元素的冒泡事件，所以click事件不会冒泡到root上
  // 又因为react 将所有事件委托到root元素的机制，因此页面上所有元素的click事件都不会触发
})
