import React, { useState, useEffect, createContext, useMemo } from 'react';
import TodoHeaderRoo from './components/TodoHeaderRoo';
import TodoMainRoo from './components/TodoMainRoo';
import { TodoItem } from '../../types/TodoItem';
import { TodoStatus } from '../../types/TodoStatus';
import "./index.css"
import { editTypeEnum } from './utils/enum';

export const TodoContext = createContext({
  list: [] as TodoItem[],
  filterList: [] as TodoItem[],
  todoStatus: '' as TodoStatus,
  editType: 0 as editTypeEnum,
  setEditType: (() => {}) as React.Dispatch<React.SetStateAction<editTypeEnum>>,
  setList: (() => {}) as React.Dispatch<React.SetStateAction<TodoItem[]>>,
  setTodoStatus: (() => {}) as React.Dispatch<React.SetStateAction<TodoStatus>>,
});

const mockData = Array.from({ length: 10 }).map((_, index) => ({
  id: String(index + 1),
  title: '干饭',
  content: '吃火锅,我吃吃吃吃吃!!!干饭人干饭魂!!!',
  date: '1970-01-02',
  completed: (index % 2 === 0) ? true : false,
}));


function TodoListRoo({KEY}:{KEY:string}) {  
  // 待办状态
  const [todoStatus,setTodoStatus] = useState<TodoStatus>('all') 
  // 待办列表
  const [list, setList] = useState<TodoItem[]>(() => JSON.parse(localStorage.getItem(KEY)||'')||[])// 代办列表
  // 展示列表：过滤后
  const filterList = useMemo(()=>{
    if (todoStatus==='all') {
      return list
    }else if (todoStatus==='active') {
      return list.filter(item=>item.completed===false)
    }else {
      return list.filter(item=>item.completed===true)
    }
  },[list,todoStatus])
  // 编辑状态
  const [editType,setEditType] = useState<editTypeEnum>(0)

  useEffect(()=>{
    localStorage.setItem(KEY, JSON.stringify(list))
  },[list,KEY])

  return (
    <TodoContext.Provider value={{list, setList, filterList, todoStatus, setTodoStatus, editType, setEditType}}>
      <main className="TodoListRoo">
        <TodoHeaderRoo />
        {/* <TodoMainRoo /> */}
      </main>
    </TodoContext.Provider>
  );
}

export default TodoListRoo;