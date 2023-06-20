import React, { FC, useState } from 'react';
import { TodoItem } from '../../../../types/Todo';
import { CheckBox, Input, Panel, DatePicker } from '@roo/roo';
import Form from '@roo/roo/Form';
import Button from '@roo/roo/Button';
import { v4 as uuid } from 'uuid';

const rules = {
  title: {
    required: true,
    message: '标题必填哦',
    trigger: 'onBlur',
  },
  content: [
    {
      required: true,
      type: 'string',
      message: '代办内容不能为空哦',
    },
    {
      min: 2,
      message: '至少输入2个字符',
    },
  ],
};

interface Props {
  val: string;
  setVal: (val: string) => void;
  list: TodoItem[];
  setList: (val: Array<TodoItem>) => void;
}

const initialFormValue = {
  title: '',
  content: '',
  completed: false,
  date: ''
};

const TodoHeaderRoo: FC<Props> = ({ val, setVal, list, setList }) => {
  const [formValue, setFormValue] = useState(initialFormValue);

  const handleChangeField = (title: string, value: any) => {
    setFormValue({
      ...formValue,
      [title]: value,
    });
  };

  return (
    <header>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Todos</h1>
      <Panel title="添加代办" bordered collapsable defaultCollapsed={false}
      >
        <Form
          value={formValue}
          rules={rules}
          onSubmit={(value, errors) => {
            const todo = {
              ...value,
              date: Date.now(),
              id: uuid(),
            };
            let idx = list.findIndex(item=>item.id===todo.id)
            if (idx===-1) {
              setList([...list,todo])
            }else {
              const newList = list.map(item=>{
                return (item.id===todo.id)?{...todo}:item
              })
              setList(newList)
            }
          }}
          onReset={()=>{
            setFormValue(initialFormValue)
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
                    placeholder="标题"
                    autoFocus
                  />
                )}
              </Form.Field>
              <Form.Field label="内容" name="content" required>
                {({ value, handleChange }: any) => (
                  <Input value={value} onChange={handleChange} />
                )}
              </Form.Field>
              <Form.Field label="状态" name="completed" required>
                {({ value, handleChange }: any) => (
                  <>
                    <CheckBox value={value} onChange={handleChange}>已完成</CheckBox>
                    <CheckBox value={value} onChange={handleChange}>未完成</CheckBox>
                  </>
                )}
              </Form.Field>
              <Form.Field name="date" label="日期" as={(
                  <DatePicker
                  clearable={true}
                  format="YYYY-MM-DD"
                  valueOfType="string"
                  placeholder="请选择日期"
                  popupContainer={() =>
                    document.querySelector('#scroll-wrap') || document.querySelector('#root')
                  }
                  />
              )}>
              </Form.Field>
              <Form.Field>
                <Button onClick={submitForm}>确认</Button>
                <Button onClick={resetForm} type='brand'>清空</Button>
              </Form.Field>
            </form>
          )}
        </Form>
      </Panel>
    </header>
  );
};

export default TodoHeaderRoo;
