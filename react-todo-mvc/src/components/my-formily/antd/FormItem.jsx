import React, { useContext } from "react";
import { FieldContext } from "@formily/react";

export const FormItem = ({ children }) => {
  const field = useContext(FieldContext);
  // console.log("field", field.component);
  return (
    <div>
      <div>{field.title}</div>
      {children}
      <div>{field.selfErrors.join(",")}</div>
    </div>
  );
};