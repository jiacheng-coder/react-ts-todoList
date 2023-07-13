import { useEffect, useRef } from "react";
import { Tracker } from "@formily/reactive";
import useForceUpdate from '../../../../../hooks/useForceUpdate';

export function useObserver(view) {
  const forceUpdate = useForceUpdate()
  
  // 创建一个可变的 ref 对象，并将其初始值设为 null
  const trackerRef = useRef(null);
  
  // 在 trackerRef.current 为 null 时，创建一个新的 Tracker 实例
  if (!trackerRef.current) {
    trackerRef.current = new Tracker(() => {
      forceUpdate();
    });
  }
  
  // 在组件卸载时，清理 trackerRef.current，防止内存泄漏
  useEffect(() => {
    return () => {
      if (trackerRef.current) {
        trackerRef.current.dispose();
        trackerRef.current = null;
      }
    };
  }, []);
  
  // 开始追踪视图函数 view 的依赖，并返回其结果
  return trackerRef.current.track(view);
}
