import React, { useContext } from "react";
import { FieldContext, observer } from "@formily/react";

// observer(实现响应式) -> FormItem -> Field
export const FormItem = observer(({ children }) => {
  const field = useContext(FieldContext);
  return (
    <div>
      <div>{field.title}</div>
      {children}
      <div>{field.selfErrors.join(",")}</div>
    </div>
  );
})
