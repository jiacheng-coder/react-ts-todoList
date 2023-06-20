import React, { useState, useEffect, useCallback } from 'react';
import { Todo } from '../../types/Todo';
import "./index.css"
// 引入组件
import TodoHeader from './components/TodoHeader';
import TodoMain from './components/TodoMain';
import TodoFooter from './components/TodoFooter';

function TodoList({KEY}:{KEY:string}) {  
  const [val,setVal] = useState('') // 输入框
  const [list, setList] = useState<Todo[]>(()=>JSON.parse(localStorage.getItem(KEY) || '[]')) // 代办列表
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

  return (
    <main className="todoapp">
      {/* header */}
      <TodoHeader val={val} setVal={setVal} list={list} setList={setList}/>
      {/* section */}
      <TodoMain
        list={list}
        setList={setList}
        todoType={todoType}
      />
      {/* footer */}
      <TodoFooter list={list} setList={setList} todoType={todoType}/>
    </main>
  );
}

export default TodoList;
