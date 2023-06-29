// import { useState } from "react";
// import {
//   Form,
//   Input,
//   Radio,
//   DatePicker,
//   Button,
//   Toast
// } from "@roo/roo"; // 请根据实际情况导入相应的组件库

// const {Textarea} = Input
// const RadioGroup = Radio.ButtonGroup;

// export default function TodoForm() {
//   const initialFormValue = {
//     id: '',
//     title: '',
//     content: '',
//     completed: 0,
//     date: ''
//   };
//   const [formValue, setFormValue] = useState(initialFormValue);
//   const [editType, setEditType] = useState(false); // 假设 editType 的初始值为 false
//   const rules = {}; // 添加缺失的 rules 对象
//   const handleChangeField = (title: string, value: any) => {
//     setFormValue({
//       ...formValue,
//       [title]: value,
//     });
//   }; 
//   const showError = (message:any) => {
//     Toast.open({
//       title: '添加失败',
//       children: `${message}!`,
//       theme: 'light',
//       // icon: <Icon name="times-circle-o" />
//     });
//   }

//   const handleSubmit = (value:any, errors:any) => {
//     if (errors) {
//       showError(errors[0].message)
//       return
//     }
//     const todo = {
//       ...value,
//       id: Date.now(),
//     };
//     setList(preList=>[...preList,todo])
//     setFormValue(initialFormValue)
//     closeModal()
//   }

//   return (
//     <Form
//       value={formValue}
//       rules={rules}
//       onSubmit={handleSubmit}
//       onReset={() => {
//         setFormValue(initialFormValue);
//       }}
//       onChange={(name, value) => {
//         handleChangeField(name as string, value);
//       }}
//       cols={{
//         label: { span: 2 },
//         field: { span: 8 },
//       }}
//     >
//       {({ values, errors, submitForm, resetForm }) => (
//         <form>
//           <Form.Field label="标题" name="title" required>
//             {({ value, handleChange, handleBlur }: any) => (
//               <Input
//                 value={value}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 placeholder="请填写具体标题"
//               />
//             )}
//           </Form.Field>
//           <Form.Field label="内容" name="content">
//             {({ value, handleChange }: any) => (
//               <Textarea
//                 placeholder="请填写具体要完成的内容！"
//                 statistics
//                 maxLength={40}
//                 resize="horizontal"
//                 rows={5}
//                 cols={40}
//                 value={value}
//                 onChange={handleChange}
//               />
//             )}
//           </Form.Field>
//           <Form.Field label="状态" name="completed" required>
//             {({ value, handleChange }: any) => (
//               <>
//                 <RadioGroup value={value}>
//                   <Radio
//                     disabled={!editType}
//                     value={0}
//                     onChange={(e) => {
//                       handleChange(e.target.value);
//                     }}
//                   >
//                     未完成
//                   </Radio>
//                   <Radio
//                     disabled={!editType}
//                     value={1}
//                     onChange={(e) => {
//                       handleChange(e.target.value);
//                     }}
//                   >
//                     已完成
//                   </Radio>
//                 </RadioGroup>
//               </>
//             )}
//           </Form.Field>
//           <Form.Field
//             name="date"
//             label="日期"
//             required
//             as={
//               <DatePicker
//                 clearable={true}
//                 format="YYYY-MM-DD"
//                 valueOfType="string"
//                 placeholder="请选择日期"
//                 popupContainer={() =>
//                   document.querySelector("#scroll-wrap") ||
//                   document.querySelector("#root")
//                 }
//               />
//             }
//           ></Form.Field>
//           <Form.Field>
//             <Button onClick={submitForm}>确认</Button>
//             <Button onClick={resetForm} type="brand">
//               清空
//             </Button>
//           </Form.Field>
//         </form>
//       )}
//     </Form>
//   );
// }

export {}
