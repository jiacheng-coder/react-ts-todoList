import React, { useContext } from "react";
import { FieldContext, observer } from "@formily/react";

// observer(实现响应式)
export const FormItem = ({ children }) => {
  const field = useContext(FieldContext) // 
  return (
    <div>
      <div>{field.title}</div>
      {children}
      <div style={{color:'red'}}>{field.selfErrors.join(",")}</div>
    </div>
  )
}
