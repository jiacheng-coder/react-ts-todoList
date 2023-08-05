import { createForm } from "@formily/core";
import { FormProvider, FormConsumer, Field } from "@formily/react";
import { FormItem, Input, Submit } from "../components/my-formily/antd"; // 实现@formily/antd —— 第三层：组件拓展层

const form = createForm(); // 内核层：创建form对象

// 高阶函数，它接收一个参数equalName，并返回一个新的函数；这个新的函数接收一个参数field。
const createPasswordEqualValidate = (equalName) => (field) => {
  if (
    form.values.confirm_password &&
    field.value &&
    form.values[equalName] !== field.value
  ) {
    field.selfErrors = ["Password does not match"];
  } else {
    field.selfErrors = [];
  }
};

export default () => {
  return (
    <FormProvider form={form}>
      {/* 理解层级：decorator 包裹 component */}
      <Field
        name="name"
        title="Name"
        required
        initialValue=""
        decorator={[FormItem]}
        component={[Input, { placeholder: "Please Input name" }]}
      />
      <Field
        name="password"
        title="Password"
        required
        initialValue=""
        decorator={[FormItem]}
        component={[
          Input,
          { placeholder: "Please Input password~", type: "password" },
        ]}
        reactions={createPasswordEqualValidate("confirm_password")} // field.value就是password的值，form.values[equalName]就是confirm_password的值
      />
      <Field
        name="confirm_password"
        title="Confirm Password"
        required
        initialValue=""
        decorator={[FormItem]}
        component={[
          Input,
          { placeholder: "Please Input password~", type: "password" },
        ]}
        reactions={createPasswordEqualValidate("password")}
      />
      <Submit
        onSubmit={(res) => {
          console.log("res:", res);
        }}
        onSubmitSuccess={() => {
          console.log("omg success");
          alert("Success!");
        }}
        onSubmitFailed={() => {
          console.log("omg failed");
          alert("omg failed!");
        }}
        onClick={(e) => {
          return true;
        }}
      >
        提交
      </Submit>
      <div>
        <FormConsumer>{() => <>Name:{form.values.name}</>}</FormConsumer>
      </div>
    </FormProvider>
  );
};
