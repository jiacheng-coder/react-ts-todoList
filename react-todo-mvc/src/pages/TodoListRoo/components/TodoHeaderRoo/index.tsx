import React, { useState, useMemo, useContext, useCallback } from 'react';
import { Radio, Input, DatePicker, Select, Modal, Toast, Icon } from '@roo/roo';
import Form from '@roo/roo/Form';
import Button from '@roo/roo/Button';
import { TodoContext } from '../..';
import "./index.css"
import { TodoStatus } from '../../../../types/TodoStatus';
import Table from '@roo/roo/Table';
import { TodoItem } from '../../../../types/TodoItem';
import { editTypeEnum } from '../../utils/enum';

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
      required: false,
      type: 'string',
    },
    {
      min: 2,
      message: '至少输入2个字符',
    },
  ],
  completed: {
    required: true,
    message: '请勾选完成状态',
  },
  date: {
    required: true,
    message: '请选择完成日期',
    trigger: 'onBlur',
  }
};

const initialFormValue = {
  id: '',
  title: '',
  content: '',
  completed: 0,
  date: ''
};


const TodoHeaderRoo= () => {
  const {filterList, setList, todoStatus, setTodoStatus, editType, setEditType} = useContext(TodoContext)

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
    setFormValue(initialFormValue)
  }

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
    // 编辑
    if (editType===editTypeEnum.EDIT) {
      const {id} = value
      console.log("value:",value)
      setList(preList=>{
        let idx = preList.findIndex(item=>item.id===id)
        const newList = preList.map(item=>{
          if (item.id===id) {
            return {
              id,
              ...value
            }
          }else {
            return item
          }
        })
        return newList
      })
    }
    // 新增
    else if (editType===editTypeEnum.ADD) {
      const todo = {
        ...value,
        id: Date.now(),
      };
      setList(preList=>[...preList,todo])
    } 
    // 查看
    else {
      
    }
    setFormValue(initialFormValue)
    closeModal()
  }
  
  // Main
  const deleteSingleTodo = (todo:TodoItem)=>{
    setList(preList=>preList.filter(item=>item.id!==todo.id))
  }
  const remainNum = useMemo(()=>filterList.length,[filterList])
  const updateTodo = (record:any)=>{
    setEditType(editTypeEnum.EDIT)
    let {completed, ...rest} = record
    setFormValue({
      ...rest,
      completed: completed?1:0
    })
    showModal()
  }
  const columns: any = [
    { prop: 'id', label: 'ID', align: 'center', width: 150},
    { prop: 'title', label: '标题', align: 'center', width: 150},
    { prop: 'content', label: '内容', align: 'center', width: 550},
    { prop: 'date', label: '创建时间', align: 'center', width: 250},
    { prop: 'completed', label: '完成状态', align: 'center', width: 250, 
        render: (text: String) => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {text?"已完成":"未完成"}
          </div>
      )
    },
    {
      prop: '',
      label: '操作',
      width: 200,
      fixed: 'right',
      align: 'center',
      render: (text:any,record:TodoItem) => (
        <>
          <Button type="brand-text" onClick={()=>updateTodo(record)}>编辑</Button>
          <Button type="brand-text" onClick={()=>deleteSingleTodo(record)}>删除</Button>
        </>
      )
    }
  ]

  return (
    <>
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
          <Button onClick={()=>{
            setEditType(editTypeEnum.ADD)            
            showModal()
          }} type='brand'>添加待办</Button>
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
        showCancelButton={false}
        showConfirmButton={false}
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
                    placeholder="请填写具体标题"
                    disabled={editType===editTypeEnum.EDIT}
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
                      <Radio value={0} onChange={(e)=>{
                        handleChange(e.target.value);
                      }}>
                        未完成
                      </Radio>
                      <Radio value={1} onChange={(e)=>{
                        handleChange(e.target.value);
                      }}>
                        已完成
                      </Radio>
                    </RadioGroup>
                  </>
                )}
              </Form.Field>
              <Form.Field name="date" label="日期" required as={(
                <DatePicker
                  clearable={true}
                  format="YYYY-MM-DD"
                  valueOfType="string"
                  placeholder="请选择日期"
                  popupContainer={() =>
                    document.querySelector('#scroll-wrap') || document.querySelector('#root')
                  }
                  />
              )}
              disabled={editType===editTypeEnum.EDIT}
              >
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
    <main className='TodoMainRoo' style={{marginTop:"20px"}}>
    <Table
      rowKey="id"
      border
      hover
      columns={columns}
      data={filterList}
      scrollX={1500}
      scrollY={600}
      pagination={{
          total: remainNum,
          pageSize: 10,
          showJumper: true,
          pageSizeOptions: [10, 20, 30, 50],
          showTotal: total => `共 ${total} 条数据`
        }}
    />
  </main>
  </>
  );
};

export default TodoHeaderRoo;
