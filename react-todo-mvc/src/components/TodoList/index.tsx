import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Todo } from '../../types/Todo';
import "./index.css"

function TodoList() {
  const KEY = "react-todos"
  
  // 1.处理输入框
  const [val,setVal] = useState('')
  // 只在组件挂载时创建一次，避免函数不必要的重新创建，从而提高性能。
  const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    console.log("666")
    setVal(e.target.value)
  },[])

  // 2.处理具体todos列表
  // 2.0 数据准备
  const [editedTodo,setEditedTodo] = useState<Todo>()
  const [tmpVal,setTmpVal] = useState('')
  const [list, setList] = useState<Todo[]>(()=>JSON.parse(localStorage.getItem(KEY) || '[]'))
  // 结合路由实现数据显示切换
  const [todoType,setTodoType] = useState<'all'|'completed'|'active'>('all') 
  const remainNum = useMemo(() => list.filter(item => !item.completed).length, [list]);
  const filterList = useMemo(()=>list.filter(item => {
    if (todoType==='completed') {
      return item.completed===true
    }else if (todoType==='active') {
      return item.completed===false
    } else {
      return item
    }
  }),[list,todoType])
  const removeCompleted = useCallback(()=>{
    setList(list.filter(todo=>todo.completed!==true))
  },[list])
  // 2.1 增
  const addTodo = useCallback(() => {
    const trimmedVal = val.trim();
    if (trimmedVal !== '') {
      setList([...list,{
        id: Date.now(),
        title: trimmedVal,
        completed: false
      }])
      setVal('')
    }else {
      alert("输入不能为空！")
    }
  },[val,list])
  // 2.2 删
  const removeTodo = useCallback((todo: Todo)=>{
    const newList = list.filter(item=>item.id!==todo.id)
    setList(newList)
  },[list])
  // 2.3 改
  const completeSingleTodo = useCallback((todo:Todo)=>{
    const newList = list.map(item => {
      return (item.id===todo.id)?{...item,completed:!item.completed}:item
    });
    setList(newList)
  },[list])
  const editTodo = useCallback((todo:Todo)=>{
    setTmpVal(todo.title)
    setEditedTodo(todo)
  },[])
  const updateTodo = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    setTmpVal(e.target.value)
  },[])
  // 3.状态持久化
  useEffect(()=>{
    localStorage.setItem(KEY, JSON.stringify(list))
  },[list])

  // 4.根据路由显示不同数据
  // 类型保护
  const isRouteType = useCallback((route: string): route is 'all' | 'completed' | 'active' => {
    switch (route) {
      case 'all':
      case 'completed':
      case 'active':
        return true;
      default:
        return false;
    }
  }, []);
  
  const onHashChange = useCallback(() => {
    const route = window.location.hash.replace(/#\/?/, '');
    if (isRouteType(route)) {
      setTodoType(route);
    }
  }, [isRouteType]);
  window.onhashchange = onHashChange;

  // 失去焦点时，自动修改list中对应的todo
  const handleBlur = useCallback((todo:Todo)=>{
    const newList = list.map(item=>{
      return (item.id===todo.id)?{...item,title:tmpVal}:item
    })
    setList(newList)
  },[tmpVal,list])

  return (
    <main className="todoapp">
      {/* header */}
      <header className="header">
        <h1>todos</h1>
        <input type="text" placeholder='What needs to be done?' autoFocus className='new-todo' 
          value={val}
          onChange={handleChange}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && addTodo()
        }/>
      </header>
      {/* section */}
      <section className="main" v-show="todos.length">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {filterList.map(todo => (
            <li className={`todo ${(todo===editedTodo)?'editing':''}}`} key={todo.id}>
              {todo===editedTodo 
              ? 
              <input type='text' className='myEdit' value={tmpVal} autoFocus onChange={updateTodo} style={{width:"90%", fontSize:"24px", height:"100%"}} onBlur={()=>handleBlur(todo)}/>
              :
              <div className="view">
                <input type="checkbox" className="toggle" checked={todo.completed} onChange={()=>completeSingleTodo(todo)}/>
                <label onDoubleClick={()=>editTodo(todo)}>{ todo.title }</label>
                <button className="destroy" onClick={()=>removeTodo(todo)}></button>
              </div>
            }
            </li>
          ))}
        </ul>
      </section>
      {/* footer */}
      <footer className="footer" style={{ display: list.length ? '' : 'none' }}>
        <span className="todo-count">
          <strong>{remainNum}</strong>
          <span>{remainNum === 1 ? ' item' : ' items'} left</span>
        </span>
        {/* 路由：分类展示 */}
        <ul className="filters">
          <li>
            <a href="#/all" className={todoType === 'all' ? 'selected' : ''}>All</a>
          </li>
          <li>
            <a href="#/active" className={todoType === 'active' ? 'selected' : ''}>Active</a>
          </li>
          <li>
            <a href="#/completed" className={todoType === 'completed' ? 'selected' : ''}>Completed</a>
          </li>
        </ul>
        {/* 清空已完成事项 */}
        <button className="clear-completed" onClick={removeCompleted} style={{ display: list.length > remainNum ? '' : 'none' }}>
          Clear completed
        </button>
      </footer>
    </main>
  );
}

export default TodoList;
