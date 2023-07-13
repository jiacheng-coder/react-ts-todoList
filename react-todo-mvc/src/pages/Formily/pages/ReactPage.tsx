import React from 'react';
import { createForm } from '@formily/core';
import { FormProvider, Field, FormConsumer } from '../components/my-formily/react';
import { FormItem, Input, Submit } from '../components/my-formily/antd';

const form = createForm();

// 高阶函数，它接收一个参数equalName，并返回一个新的函数；这个新的函数接收一个参数field。
const createPasswordEqualValidate = (equalName: string) => (field: any) => {
  if (
    form.values.confirm_password &&
    field.value &&
    form.values[equalName] !== field.value
  ) {
    field.selfErrors = ['Password does not match'];
  } else {
    field.selfErrors = [];
  }
};

const MyForm: React.FC = () => {
  return (
    <FormProvider form={form}>
      <Field
        name="name"
        title="Name"
        required
        initialValue=""
        decorator={[FormItem]}
        component={[Input, { placeholder: 'Please Input name' }]}
      />
      <Field
        name="password"
        title="Password"
        required
        initialValue=""
        decorator={[FormItem]}
        component={[
          Input,
          { placeholder: 'Please Input password~', type: 'password' },
        ]}
        reactions={createPasswordEqualValidate('confirm_password')}
      />
      <Field
        name="confirm_password"
        title="Confirm Password"
        required
        initialValue=""
        decorator={[FormItem]}
        component={[
          Input,
          { placeholder: 'Please Input password~', type: 'password' },
        ]}
        reactions={createPasswordEqualValidate('password')}
      />
      <Submit
        onSubmit={(res: any) => {
          console.log('res:', res);
        }}
        onSubmitSuccess={() => {
          console.log('omg success');
          alert('Success!');
        }}
        onSubmitFailed={() => {
          console.log('omg failed');
          alert('omg failed!');
        }}
        onClick={(e: any) => {
          return true;
        }}
      >
        提交
      </Submit>
      <div>
        <FormConsumer>{(form: any) => form.values.name}</FormConsumer>
      </div>
    </FormProvider>
  );
};

export default MyForm;
