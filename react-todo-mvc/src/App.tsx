import React, { useState, useEffect, useMemo } from 'react';
import { Todo } from './types/Todo';
import Todos from './components/Todos';

function App() {
  const KEY = "react-todos"
  
  // 1.处理输入框
  const [val,setVal] = useState('')
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setVal(e.target.value)
  }

  // 2.处理具体todos列表
  // 2.0 数据准备
  const [editedTodo,setEditedTodo] = useState<Todo>()
  const [tmpVal,setTmpVal] = useState('')
  const [list, setList] = useState<Todo[]>(JSON.parse(localStorage.getItem(KEY) || '[]'))
  // 结合路由实现数据显示切换
  const [visibility,setVisibility] = useState('all') 
  const remaining = useMemo(() => list.filter(item => !item.completed).length, [list]);
  const filterList = useMemo(()=>list.filter(item => {
    if (visibility==='completed') {
      return item.completed===true
    }else if (visibility==='active') {
      return item.completed===false
    } else {
      return item
    }
  }),[list,visibility])
  const removeCompleted = ()=>{
    setList(list.filter(todo=>todo.completed!==true))
  }
  // 2.1 增
  const addTodo = () => {
    if (val!=='') {
      setList([...list,{
        id: Date.now(),
        title: val,
        completed: false
      }])
      setVal('')
    }
  }
  // 2.2 删
  const removeTodo = (todo: Todo)=>{
    const newList = list.filter(item=>item.id!==todo.id)
    setList(newList)
  }
  // 2.3 改
  const completeSingleTodo = (todo:Todo)=>{
    const newList = list.map(item => {
      if (item.title===todo.title){
        return {...item, completed:!item.completed}
      }
      return item
    });
    setList(newList)
  }
  const editTodo = (todo:Todo)=>{
    setTmpVal(todo.title)
    setEditedTodo(todo)
  }
  const updateTodo = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setTmpVal(e.target.value)
  }

  // 3.状态持久化
  useEffect(()=>{
    localStorage.setItem(KEY, JSON.stringify(list))
  },[list])

  // 4.根据路由显示不同数据
  function onHashChange() {
    const route = window.location.hash.replace(/#\/?/, '')
    setVisibility(route)
    console.log("route:",route)
  }
  window.onhashchange = onHashChange

  const handleBlur = (todo:Todo)=>{
    const newList = list.map(item=>{
      if (item.id===todo.id) {
        return {
          ...item,title:tmpVal
        }
      }else {
        return item
      }
    })
    setList(newList)
  }

  return (
    <div>
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
              <li className={`todo ${(todo===editedTodo)?'editing':''}}`}>
              {/* <li className='todo' > */}

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
            <strong>{remaining}</strong>
            <span>{remaining === 1 ? ' item' : ' items'} left</span>
          </span>
          {/* 路由：分类展示 */}
          <ul className="filters">
            <li>
              <a href="#/all" className={visibility === 'all' ? 'selected' : ''}>All</a>
            </li>
            <li>
              <a href="#/active" className={visibility === 'active' ? 'selected' : ''}>Active</a>
            </li>
            <li>
              <a href="#/completed" className={visibility === 'completed' ? 'selected' : ''}>Completed</a>
            </li>
          </ul>
          {/* 清空已完成事项 */}
          <button className="clear-completed" onClick={removeCompleted} style={{ display: list.length > remaining ? '' : 'none' }}>
            Clear completed
          </button>
        </footer>
      </main>
      <main>
        <Todos />
      </main>
    </div>

  );
}

export default App;
