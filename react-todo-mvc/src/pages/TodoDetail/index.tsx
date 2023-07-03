import { useParams } from "react-router-dom";
import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { TodoContext } from "../TodoListRoo";
import { editTypeEnum } from "../TodoListRoo/utils/enum";
import { Radio, Input, DatePicker, Button, Form, Toast, Icon } from "@roo/roo";
import { useNavigate } from 'react-router';

const { Textarea } = Input;
const RadioGroup = Radio.ButtonGroup;
const initialFormValue = {
  id: "",
  title: "",
  content: "",
  completed: true,
  date: "",
};
const rules = {
  title: {
    required: true,
    message: "标题必填哦",
    trigger: "onBlur",
  },
  content: [
    {
      required: false,
      type: "string",
    },
  ],
  completed: {
    required: true,
    message: "请勾选完成状态",
  },
  date: {
    required: true,
    message: "请选择完成日期",
    trigger: "onBlur",
  },
};

export const TodoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { list, setList, editType } = useContext(TodoContext);
  const [formValue, setFormValue] = useState(initialFormValue);
  const navigate = useNavigate()
  const handleChangeField = (title: string, value: any) => {
    setFormValue({
      ...formValue,
      [title]: value,
    });
  };
  const showError = (message: any) => {
    Toast.open({
      title: "添加失败",
      children: `${message}!`,
      theme: "light",
      icon: <Icon name="times-circle-o" />,
    });
  };
  const handleSubmit = (value: any, errors: any) => {
    if (errors) {
      showError(errors[0].message);
      return;
    }
    // 编辑
    if (editType === editTypeEnum.EDIT) {
      const { id } = value;
      console.log("value:", value);
      setList((preList) => {
        let idx = preList.findIndex((item) => item.id === id);
        const newList = preList.map((item) => {
          if (item.id === id) {
            return {
              id,
              ...value,
            };
          } else {
            return item;
          }
        });
        return newList;
      });
    }
    // 新增
    else if (editType === editTypeEnum.ADD) {
      const todo = {
        ...value,
        id: Date.now(),
      };
      setList((preList) => [...preList, todo]);
    }
    // 查看
    else {
    }
    setFormValue(initialFormValue);
    navigate('/todo-list-roo')
  };
  let todo = initialFormValue;
  // if (editType === editTypeEnum.ADD) {
  // } else if (editType === editTypeEnum.EDIT) {
  //   todo =
  //     useMemo(() => list.find((item) => item.id === id), [id, list]) ||
  //     initialFormValue;
  // } else {
  //   todo =
  //     useMemo(() => list.find((item) => item.id === id), [id, list]) ||
  //     initialFormValue;
  // }

  return (
    <>
      <h1>添加事项</h1>
      <Form
        value={formValue}
        rules={rules}
        onSubmit={handleSubmit}
        onReset={() => {
          setFormValue(initialFormValue);
        }}
        onChange={(name, value) => {
          handleChangeField(name as string, value);
        }}
        cols={{
          label: { span: 2 },
          field: { span: 8 },
        }}
      >
        {({ values, errors, submitForm, resetForm }) => (
          <form>
            <Form.Field label="标题" name="title" required>
              {({ value, handleChange, handleBlur }: any) => (
                <Input
                  value={value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="请填写具体标题"
                  disabled={editType === editTypeEnum.EDIT}
                />
              )}
            </Form.Field>
            <Form.Field label="内容" name="content">
              {({ value, handleChange }: any) => (
                <Textarea
                  placeholder="请填写具体要完成的内容！"
                  statistics
                  maxLength={40}
                  resize="horizontal"
                  rows={5}
                  cols={40}
                  value={value}
                  onChange={handleChange}
                />
              )}
            </Form.Field>
            <Form.Field label="状态" name="completed" required>
              {({ value, handleChange }: any) => (
                <>
                  <RadioGroup value={value}>
                    <Radio
                      value={0}
                      onChange={(e) => {
                        handleChange(e.target.value);
                      }}
                    >
                      未完成
                    </Radio>
                    <Radio
                      value={1}
                      onChange={(e) => {
                        handleChange(e.target.value);
                      }}
                    >
                      已完成
                    </Radio>
                  </RadioGroup>
                </>
              )}
            </Form.Field>
            <Form.Field
              name="date"
              label="日期"
              required
              as={
                <DatePicker
                  clearable={true}
                  format="YYYY-MM-DD"
                  valueOfType="string"
                  placeholder="请选择日期"
                  popupContainer={() =>
                    document.querySelector("#scroll-wrap") ||
                    document.querySelector("#root")
                  }
                />
              }
              disabled={editType === editTypeEnum.EDIT}
            ></Form.Field>
            <Form.Field>
              <Button onClick={submitForm}>确认</Button>
              <Button onClick={resetForm} type="brand">
                清空
              </Button>
            </Form.Field>
          </form>
        )}
      </Form>
    </>
  );
};
