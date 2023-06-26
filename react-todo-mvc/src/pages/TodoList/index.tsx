import React, { useState, useEffect } from 'react';
import { Todo } from '../../types/TodoItems';
import "./index.css"
// 引入组件
import TodoHeader from './components/TodoHeader';
import TodoMain from './components/TodoMain';
import TodoFooter from './components/TodoFooter';
// 引入类型
import { TodoStatus } from '../../types/TodoStatus';

function TodoList({KEY}:{KEY:string}) {  
  const [list, setList] = useState<Todo[]>(()=>JSON.parse(localStorage.getItem(KEY) || '[]')) // 代办列表
  const [todoType,setTodoType] = useState<TodoStatus>('all') 
  // 状态持久化
  useEffect(()=>{
    localStorage.setItem(KEY, JSON.stringify(list))
  },[list,KEY])
  
  // useEffect
  useEffect(() => {
    const handleHashChange = () => {
      const route = window.location.hash.replace(/#\/?/, '');
      if (route === 'all' || route === 'completed' || route === 'active') {
        setTodoType(route);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <main className="todoapp">
      <TodoHeader setList={setList}/>
      <TodoMain
        list={list}
        setList={setList}
        todoType={todoType}
      />
      <TodoFooter list={list} setList={setList} todoType={todoType}/>
    </main>
  );
}

export default TodoList;
