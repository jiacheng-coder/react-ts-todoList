import React, { FC,useMemo } from 'react';
import { Todo } from '../../../../types/Todo';
import TodoItem from './components/TodoItem';

interface Props {
  list: Todo[];
  setList: (val: Array<Todo>) => void;
  todoType: string;
}

const TodoMain:FC<Props> = (props) => {
  const {
    list,
    setList,
    todoType,
  } = props;
  const filterList = useMemo(()=>list.filter(item => {
    if (todoType==='completed') {
      return item.completed===true
    }else if (todoType==='active') {
      return item.completed===false
    } else {
      return item
    }
  }),[todoType,list])

  return (
    <section className="main" v-show="todos.length">
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {filterList.map((todo) => (
          <TodoItem todo={todo} list={list} setList={setList}/>
        ))}
      </ul>
    </section>
  );
}

export default TodoMain;