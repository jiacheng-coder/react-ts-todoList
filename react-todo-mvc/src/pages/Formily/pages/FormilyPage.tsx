import { createForm } from "@formily/core";
import { FormProvider, FormConsumer, Field } from "@formily/react";
import {
  // FormItem,
  FormLayout,
  // Input,
  FormButtonGroup,
  Submit,
} from "@formily/antd";
import { FormItem, Input } from "../../../components/my-formily/antd";

const form = createForm();

export default () => {
  return (
    <FormProvider form={form}>
      <FormLayout layout="horizontal">
        <Field
          name="input"
          title="输入框"
          required
          initialValue="Hello world"
          decorator={[FormItem]}
          component={[Input, {placeholder: 'Please Input something~', required:true}]}
        />
      </FormLayout>
      <FormConsumer>
        {() => (
          <div
            style={{
              marginBottom: 20,
              padding: 5,
              border: "1px dashed #666",
            }}
          >
            实时响应：{form.values.input}
          </div>
        )}
      </FormConsumer>
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  );
};
