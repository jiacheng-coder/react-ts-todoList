import React, { useState, useContext, useCallback } from 'react';
import { Radio, Input, DatePicker, Select, Modal, Toast, Icon } from '@roo/roo';
import Form from '@roo/roo/Form';
import Button from '@roo/roo/Button';
import { TodoContext } from '../..';
import "./index.css"
import { TodoStatus } from '../../../../types/TodoStatus';

const { Textarea } = Input;
const RadioGroup = Radio.ButtonGroup;

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

const initialFormValue = {
  id: '',
  title: '',
  content: '',
  completed: 0,
  date: ''
};

const TodoHeaderRoo= () => {
  const {setList,todoStatus,setTodoStatus} = useContext(TodoContext)
  const [formValue, setFormValue] = useState(initialFormValue);

  const showModal = useCallback(()=>{
    setVisible(preVisible=>!preVisible)
  },[])

  const handleChangeField = (title: string, value: any) => {
    setFormValue({
      ...formValue,
      [title]: value,
    });
  };

  const handleTodoStatusChange = useCallback((status:TodoStatus)=>{
    setTodoStatus(status)
  },[setTodoStatus])

  const searchTodos = ()=>{

  }

  const resetTodos = ()=>{

  }

  const [visible,setVisible] = useState(false)
  const closeModal = ()=>{
    setVisible(preVisible=>!preVisible)
  }

  const [editType,setEditType] = useState(true)

  const showError = (message:any) => {
    Toast.open({
      title: '添加失败',
      children: `${message}!`,
      theme: 'light',
      icon: <Icon name="times-circle-o" />
    });
  }

  const handleSubmit = (value:any, errors:any) => {
    if (errors) {
      showError(errors[0].message)
      return
    }
    const todo = {
      ...value,
      id: Date.now(),
    };
    setList(preList=>[...preList,todo])
  }

  return (
    <header className='todo-header-roo'>
      <h2>代办汇总</h2>
      <section>
        <div className='left'>
          <text>待办标题: </text>
          <Input placeholder='请输入待办标题'/>
          <text style={{marginLeft:'20px'}}>待办状态:</text>
          <Select
            options={
              [
                { value: 'all', label: '全部' },
                { value: 'completed', label: '已完成', },
                { value: 'active', label: '未完成', },
              ]
            }
            value={todoStatus}
            onChange={handleTodoStatusChange}
          />
          <Button style={{marginLeft:'20px'}} onClick={searchTodos}>查询</Button>
          <Button type='hollow' style={{marginLeft:'20px'}} onClick={resetTodos}>重置</Button>
        </div>
        <div className='right'>
          <Button onClick={showModal} type='brand'>添加待办</Button>
        </div>
      </section>
      <Modal
        title="添加待办事项"
        visible={visible}
        keyboard
        size='lg'
        lazy
        onCancel={closeModal}
        onConfirm={closeModal}
      >
        <Form
          value={formValue}
          rules={rules}
          onSubmit={handleSubmit}
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
                  <Textarea
                    placeholder="可控制大小调整和文本统计"
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
                    <RadioGroup value={value} defaultValue="默认">
                      <Radio disabled={!editType} value={0} onChange={(e)=>{
                        const {value} = e.target;
                        handleChange(value);
                      }}>
                        未完成
                      </Radio>
                      <Radio disabled={!editType} value={1} onChange={(e)=>{
                        const {value} = e.target;
                        handleChange(value);
                      }}>
                        已完成
                      </Radio>
                    </RadioGroup>
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
      </Modal>
    </header>
  );
};

export default TodoHeaderRoo;
