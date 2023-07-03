import React, { useState, useEffect } from 'react';
// 引入组件
import TodoHeader from './components/TodoHeader';
import TodoMain from './components/TodoMain';
import TodoFooter from './components/TodoFooter';
// 引入类型
import { TodoStatus } from '../../../types/TodoStatus';
import { Todo } from '../../../types/TodoItem';
// 引入样式
import "./index.css"


function TodoList({KEY}:{KEY:string}) {  
  const [list, setList] = useState<Todo[]>(()=>JSON.parse(localStorage.getItem(KEY) || '[]')) // 代办列表
  const [todoStatus,setTodoStatus] = useState<TodoStatus>('all') 
  // 状态持久化
  useEffect(()=>{
    localStorage.setItem(KEY, JSON.stringify(list))
  },[list,KEY])

  return (
    <main className="todoapp">
      <TodoHeader setList={setList}/>
      <TodoMain list={list} setList={setList} todoStatus={todoStatus} />
      <TodoFooter list={list} setList={setList} todoStatus={todoStatus} setTodoStatus={setTodoStatus}/>
    </main>
  );
}

export default TodoList;
