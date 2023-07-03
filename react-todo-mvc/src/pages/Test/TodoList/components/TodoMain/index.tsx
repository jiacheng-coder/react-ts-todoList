import React, { FC,useMemo } from 'react';
import TodoItem from '../TodoItem';
import { Todo } from '../../../../../types/TodoItem';
import { TodoStatus } from '../../../../../types/TodoStatus';

interface Props {
  list: Todo[];
  setList: React.Dispatch<React.SetStateAction<Todo[]>>;
  todoStatus: TodoStatus;
}

const TodoMain:FC<Props> = ({
  list,
  setList,
  todoStatus,
}) => {
  const filterList = useMemo(()=>list.filter(item => {
    if (todoStatus==='completed') {
      return item.completed===true
    }else if (todoStatus==='active') {
      return item.completed===false
    } else {
      return item
    }
  }),[todoStatus,list])

  return (
    <section className="main" style={{ display: list.length ? '' : 'none' }}>
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {filterList.map((item) => (
          <TodoItem todo={item} setList={setList} key={item.id}/>
        ))}
      </ul>
    </section>
  );
}

export default TodoMain;