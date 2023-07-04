import React, { useState, useEffect, createContext } from 'react';
import Home from './pages/Home';
import { TodoItem } from '../../types/TodoItem';
import { TodoStatus } from '../../types/TodoStatus';
import "./index.css"
import { editTypeEnum } from './utils/enum';

export const TodoContext = createContext({
  list: [] as TodoItem[],
  // filterList: [] as TodoItem[],
  todoStatus: '' as TodoStatus,
  editType: 0 as editTypeEnum,
  setEditType: (() => {}) as React.Dispatch<React.SetStateAction<editTypeEnum>>,
  setList: (() => {}) as React.Dispatch<React.SetStateAction<TodoItem[]>>,
  setTodoStatus: (() => {}) as React.Dispatch<React.SetStateAction<TodoStatus>>,
});

const mockData:any = []
for (let i = 1; i <= 10; i++) {
  const year = Math.floor(Math.random() * 10) + 2010;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  const date = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

  const todo: TodoItem = {
    id: i.toString(),
    title: `Todo ${i}`,
    content: `Content ${i}`,
    completed: Math.random() < 0.5,
    date: date
  };
  mockData.push(todo);
}

// const mockData = Array.from({ length: 10 }).map((_, index) => ({
//   id: String(index + 1),
//   title: '干饭',
//   content: '吃火锅,我吃吃吃吃吃!!!干饭人干饭魂!!!',
//   date: '1970-01-02',
//   completed: (index % 2 === 0) ? true : false,
// }));


function TodoListRoo({KEY}:{KEY:string}) {  
  // 待办状态
  const [todoStatus,setTodoStatus] = useState<TodoStatus>('all') 
  // 待办列表
  // const [list, setList] = useState<TodoItem[]>(() => JSON.parse(localStorage.getItem(KEY)||'')||[])// 代办列表
  const [list, setList] = useState<TodoItem[]>(() => mockData)// 代办列表

  // 编辑状态
  const [editType,setEditType] = useState<editTypeEnum>(0)

  useEffect(()=>{
    localStorage.setItem(KEY, JSON.stringify(list))
  },[list,KEY])

  return (
    <TodoContext.Provider value={{list, setList, todoStatus, setTodoStatus, editType, setEditType}}>
      <main className="TodoListRoo">
        <Home />
        {/* <TodoMainRoo /> */}
      </main>
    </TodoContext.Provider>
  );
}

export default TodoListRoo;