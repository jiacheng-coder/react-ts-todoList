import React, { useState, useEffect, createContext } from 'react';
import { TodoItem } from '../../types/TodoItem';
import { TodoStatus } from '../../types/TodoStatus';
import "./index.css"
import { editTypeEnum } from '../../utils/enum';
import { Outlet } from 'react-router';

export const TodoContext = createContext({
  list: [] as TodoItem[],
  todoStatus: 'all' as TodoStatus,
  editType: editTypeEnum.VIEW as editTypeEnum, // 枚举大写开头
  setEditType: (() => {}) as React.Dispatch<React.SetStateAction<editTypeEnum>>,
  setList: (() => {}) as React.Dispatch<React.SetStateAction<TodoItem[]>>,
  setTodoStatus: (() => {}) as React.Dispatch<React.SetStateAction<TodoStatus>>,
});

function TodoListRoo({KEY}:{KEY:string}) {  
  // 待办状态
  const [todoStatus,setTodoStatus] = useState<TodoStatus>('all') 
  // 待办列表
  const [list, setList] = useState<TodoItem[]>(() => JSON.parse(localStorage.getItem(KEY)||'[]')) // 代办列表
  // 编辑状态
  const [editType,setEditType] = useState<editTypeEnum>(editTypeEnum.VIEW)

  useEffect(()=>{
    localStorage.setItem(KEY, JSON.stringify(list))
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