import React, { useState, useEffect, useCallback } from 'react';
import { TodoItem } from '../../types/Todo';
import TodoHeaderRoo from './components/TodoHeaderRoo';
import TodoMainRoo from './components/TodoMainRoo';
import { Button } from '@roo/roo';
import "./index.css"

function TodoListRoo({KEY}:{KEY:string}) {  
  const [val,setVal] = useState('') // 输入框
  const [list, setList] = useState<TodoItem[]>(()=>JSON.parse(localStorage.getItem(KEY) || '[]')) // 代办列表
  // 状态持久化
  useEffect(()=>{
    localStorage.setItem(KEY, JSON.stringify(list))
  },[list,KEY])
  // 一键清空代办
  const removeAllTodos = useCallback(()=>{
    localStorage.removeItem(KEY)
  },[KEY])

  return (
    <main className="TodoListRoo">
      {/* header */}
      <TodoHeaderRoo val={val} setVal={setVal} list={list} setList={setList}/>
      {/* section */}
      <TodoMainRoo list={list} setList={setList}/>
      {/* <TodoMain
        list={list}
        setList={setList}
        todoType={todoType}
      /> */}
      <Button onClick={()=>removeAllTodos()}>删除所有Todos</Button>
    </main>
  );
}

export default TodoListRoo;