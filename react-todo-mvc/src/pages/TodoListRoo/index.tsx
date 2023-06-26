import React, { useState, useEffect } from 'react';
import { TodoItem } from '../../types/TodoItem';
import TodoHeaderRoo from './components/TodoHeaderRoo';
import TodoMainRoo from './components/TodoMainRoo';
import "./index.css"

function TodoListRoo({KEY}:{KEY:string}) {  
  const [val,setVal] = useState('') // 输入框
  const [list, setList] = useState<TodoItem[]>(()=>JSON.parse(localStorage.getItem(KEY) || '[]')) // 代办列表
  // 状态持久化
  useEffect(()=>{
    localStorage.setItem(KEY, JSON.stringify(list))
  },[list,KEY])

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
      {/* <Button onClick={removeAllTodos}>删除所有Todos</Button> */}
    </main>
  );
}

export default TodoListRoo;