import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { TodoContext, useTodoContext } from "../../MyContextProvider";
import { editTypeEnum } from "../../../../utils/enum";
import {
  Input,
  DatePicker,
  Button,
  Form,
  Toast,
  Icon,
  Switch,
} from "@roo/roo";
import { useLocation, useNavigate } from "react-router";
import {v4 as uuid} from 'uuid'

const { Textarea } = Input;
const rules = {
  title: {
    required: true,
    message: "标题必填哦",
    trigger: "onBlur",
  },
  content: [
    {
      required: true,
      type: "string",
      message: "内容不能为空",
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
const showError = (message: string) => {
  Toast.open({
    title: "添加失败!",
    children: `${message}`,
    theme: "light",
    icon: <Icon name="times-circle-o" />,
  });
};
const emptyFormValue = {
  id: "",
  title: "",
  content: "",
  completed: false,
  date: "",
};

export default function TodoCRUD() {
  const navigate = useNavigate();
  const { setList, editType } = useTodoContext();
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();

  const [formValue, setFormValue] = useState(() => {
    let initialFormValue = emptyFormValue
    if ([editTypeEnum.EDIT, editTypeEnum.VIEW].includes(editType)) {
      const { record } = state
      initialFormValue = {
        id: id as string,
        title: record.title,
        content: record.content,
        completed: record.completed,
        date: record.date,
      };
    }
    return initialFormValue
  });

  const handleChangeField = (title: string, value: any) => {
    setFormValue({
      ...formValue,
      [title]: value,
    });
  };

  const handleSubmit = (todo: any, errors: any) => {
    if (errors) { // 错误处理
      showError(errors[0].message);
      return;
    }
    if (editType === editTypeEnum.ADD) {
      setList(preList => [...preList, {
        ...todo,
        id: uuid()
      }])
    }else if (editType === editTypeEnum.EDIT) {
      setList(preList => {
        return preList.map(item => item.id === id ? todo : item)
      })
    }  
    navigate("/roo/table");
    // navigate("/roo/table", {state: todo});
  };

  return (
    <div className="detailContainer">
      <h1>待办详情</h1>
      <Form
        value={formValue}
        rules={rules}
        onSubmit={handleSubmit}
        onReset={() => {
          setFormValue(emptyFormValue);
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
                  disabled={[editTypeEnum.VIEW, editTypeEnum.EDIT].includes(editType)}
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
                  disabled={editType === editTypeEnum.VIEW}
                />
              )}
            </Form.Field>
            <Form.Field label="状态" name="completed" required>
              {({ value, handleChange }: any) => (
                <>
                  <Switch
                    checked={value}
                    offText={<Icon name="close" />}
                    onText={<Icon name="check" />}
                    onChange={handleChange}
                    disabled={editType === editTypeEnum.VIEW}
                  />
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
              disabled={[editTypeEnum.VIEW, editTypeEnum.EDIT].includes(editType)}
            ></Form.Field>
            <Form.Field>
              { editType === editTypeEnum.VIEW 
              ? <Button onClick={ () => navigate('/roo/table')} type="brand">返回</Button>
              : <>
                  <Button onClick={submitForm}>确认</Button>
                  <Button onClick={resetForm} type="brand">
                    清空
                  </Button>
                </> 
              }
            </Form.Field>
          </form>
        )}
      </Form>
    </div>
  );
};
