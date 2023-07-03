import React, { useState, useEffect, createContext } from 'react';
// 引入组件
import TodoHeader from './components/TodoHeader';
import TodoMain from './components/TodoMain';
import TodoFooter from './components/TodoFooter';
// 引入类型
import { TodoStatus } from '../../../types/TodoStatus';
import { Todo } from '../../../types/TodoItem';
// 引入样式
import "./index.css"

// 创建上下文对象
export const TodoContext = createContext({
  list: [] as Todo[],
  todoStatus: '' as TodoStatus,
  setList: (() => {}) as React.Dispatch<React.SetStateAction<Todo[]>>,
  setTodoStatus: (() => {}) as React.Dispatch<React.SetStateAction<TodoStatus>>,
});

function TodoList({KEY}:{KEY:string}) {  
  const [list, setList] = useState<Todo[]>(()=>JSON.parse(localStorage.getItem(KEY) || '[]')) // 代办列表
  const [todoStatus,setTodoStatus] = useState<TodoStatus>('all') 
  // 状态持久化
  useEffect(()=>{
    localStorage.setItem(KEY, JSON.stringify(list))
  },[list,KEY])

  return (
    <TodoContext.Provider value={{list,setList,todoStatus,setTodoStatus}}>
      <main className="todoapp">
        <TodoHeader />
        <TodoMain />
        <TodoFooter />
      </main>
    </TodoContext.Provider>
  );
}

export default TodoList;
