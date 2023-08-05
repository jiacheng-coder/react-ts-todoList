import { useParentForm } from "../react";
import { Button } from "antd";

export const Submit = ({ children, onClick, onSubmit, onSubmitSuccess, onSubmitFailed }) => {
  // 获取Form表单
  const form = useParentForm() // 使用 useParentForm 自定义 Hook 获取父表单实例。
  return <Button type="primary" onClick={(e) => { 
    if (onClick) {
      if (onClick(e) === false) {
        alert("重复提交")
        return
      }
    }
    if (onSubmit) {
      form.submit(onSubmit).then(onSubmitSuccess).catch(onSubmitFailed)
    }
   }}>
    {children}
  </Button>;
};
