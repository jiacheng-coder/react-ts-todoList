// 导入 React 的 memo 函数和自定义的 useObserver 钩子
import { memo } from "react";
import { useObserver } from "./hooks";

// observer 是一个高阶组件，它接收一个组件作为参数
export default function observer(component) {
  // WrappedComponent 是一个新的组件，它使用 useObserver 钩子
  // 当观察到的数据发生变化时，重新渲染传入的组件
  const WrappedComponent = (props) => {
    return useObserver(() => component({ ...props }));
  };

  // 使用 React 的 memo 函数对 WrappedComponent 进行优化
  // memo 函数会记住 WrappedComponent 的渲染结果，当 props 没有发生变化时，不会重新渲染
  const memoComponent = memo(WrappedComponent);

  // 返回优化后的组件
  return memoComponent;
}
