import React, { useState, useEffect, useCallback } from 'react';
import { TodoItem } from '../../types/Todo';
import "./index.css"
import TodoHeaderRoo from './components/TodoHeaderRoo';
import TodoMainRoo from './components/TodoMainRoo';
import { Button } from '@roo/roo';
// 引入组件

function TodoListRoo({KEY}:{KEY:string}) {  
  const [val,setVal] = useState('') // 输入框
  const [list, setList] = useState<TodoItem[]>(()=>JSON.parse(localStorage.getItem(KEY) || '[]')) // 代办列表
  const [todoType,setTodoType] = useState<'all'|'completed'|'active'>('all') 
  // 状态持久化
  useEffect(()=>{
    localStorage.setItem(KEY, JSON.stringify(list))
  },[list,KEY])
  // 根据路由显示不同数据, 改变todoType
  const isRouteType = useCallback((route: string): route is 'all' | 'completed' | 'active' => { // 类型保护
    switch (route) {
      case 'all':
      case 'completed':
      case 'active':
        return true;
      default:
        return false;
    }
  }, []);
  window.onhashchange = useCallback(() => {
    const route = window.location.hash.replace(/#\/?/, '');
    if (isRouteType(route)) {
      setTodoType(route);
    }
  }, [isRouteType]);;
  const removeAllTodos = useCallback(()=>{
    localStorage.removeItem(KEY)
    console.log("localStorage",localStorage.getItem(KEY));
    
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