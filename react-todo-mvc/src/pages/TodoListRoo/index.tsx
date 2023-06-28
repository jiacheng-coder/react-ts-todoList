import React, { useState, useEffect, createContext, useMemo } from 'react';
import TodoHeaderRoo from './components/TodoHeaderRoo';
import TodoMainRoo from './components/TodoMainRoo';
import { TodoItem } from '../../types/TodoItem';
import { TodoStatus } from '../../types/TodoStatus';
import "./index.css"

export const TodoContext = createContext({
  list: [] as TodoItem[],
  filterList: [] as TodoItem[],
  todoStatus: '' as TodoStatus,
  setList: (() => {}) as React.Dispatch<React.SetStateAction<TodoItem[]>>,
  setTodoStatus: (() => {}) as React.Dispatch<React.SetStateAction<TodoStatus>>,
});

const mockData: TodoItem[] = Array.from({ length: 10 }).map((_, index) => ({
  id: String(index + 1),
  title: '干饭',
  content: '吃火锅,我吃吃吃吃吃!!!干饭人干饭魂!!!',
  date: 2023,
  completed: (index % 2 === 0) ? true : false,
}));


function TodoListRoo({KEY}:{KEY:string}) {  
  const [todoStatus,setTodoStatus] = useState<TodoStatus>('all') 
  // const [list, setList] = useState<TodoItem[]>(()=>JSON.parse(localStorage.getItem(KEY) || '[]')) // 代办列表
  const [list, setList] = useState<TodoItem[]>(()=>mockData || '[]') // 代办列表
  const filterList = useMemo(()=>{
    if (todoStatus==='all') {
      return list
    }else if (todoStatus==='active') {
      return list.filter(item=>item.completed===false)
    }else {
      return list.filter(item=>item.completed===true)
    }
  },[list,todoStatus])
  // 状态持久化
  useEffect(()=>{
    localStorage.setItem(KEY, JSON.stringify(list))
  },[list,KEY])

  return (
    <TodoContext.Provider value={{list, setList, filterList, todoStatus, setTodoStatus}}>
      <main className="TodoListRoo">
        <TodoHeaderRoo />
        <TodoMainRoo />
      </main>
    </TodoContext.Provider>
  );
}

export default TodoListRoo;