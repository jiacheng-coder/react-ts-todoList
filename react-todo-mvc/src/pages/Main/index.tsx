import React, { useState, useEffect, createContext } from 'react';
import Home from './Home';
import { TodoItem } from '../../types/TodoItem';
import { TodoStatus } from '../../types/TodoStatus';
import "./index.css"
import { editTypeEnum } from '../../utils/enum';
import { Outlet } from 'react-router';

export const TodoContext = createContext({
  list: [] as TodoItem[],
  todoStatus: '' as TodoStatus,
  editType: 0 as editTypeEnum,
  setEditType: (() => {}) as React.Dispatch<React.SetStateAction<editTypeEnum>>,
  setList: (() => {}) as React.Dispatch<React.SetStateAction<TodoItem[]>>,
  setTodoStatus: (() => {}) as React.Dispatch<React.SetStateAction<TodoStatus>>,
});

const mockData:TodoItem[] = Array.from({ length: 10 }).map((_, index) => ({
  id: String(index + 1),
  title: String(index + 1) + '_title',
  content: '吃火锅,我吃吃吃吃吃!!!干饭人干饭魂!!!',
  date: '1970-01-02',
  completed: (index % 2 === 0) ? true : false,
}));

function TodoListRoo({KEY}:{KEY:string}) {  
  // 待办状态
  const [todoStatus,setTodoStatus] = useState<TodoStatus>('all') 
  // 待办列表
  const [list, setList] = useState<TodoItem[]>(() => JSON.parse(localStorage.getItem(KEY)||'')||[]) // 代办列表

  // 编辑状态
  const [editType,setEditType] = useState<editTypeEnum>(0)

  useEffect(()=>{
    localStorage.setItem(KEY, JSON.stringify(list))
    console.log("list is changed!")
  },[list,KEY])

  return (
    <TodoContext.Provider value={{list, setList, todoStatus, setTodoStatus, editType, setEditType}}>
      <main className="TodoListRoo">
        <Outlet />
      </main>
    </TodoContext.Provider>
  );
}

export default TodoListRoo;