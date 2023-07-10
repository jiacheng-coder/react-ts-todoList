import { useParentForm } from "@formily/react";
import { Button } from "antd";
import React from "react";

export const Submit = ({ children, onClick, onSubmit, onSubmitSuccess, onSubmitFailed }) => {
  // 获取Form表单
  const form = useParentForm()
  return <Button onClick={(e) => { 
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
