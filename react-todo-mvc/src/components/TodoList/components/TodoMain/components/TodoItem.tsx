import React, { FC, useCallback, useState } from 'react';
import { Todo } from '../../../../../types/Todo';

interface Props {
  todo: Todo;
  list: Todo[]
  setList: (val: Array<Todo>) => void;
}

const TodoItem: FC<Props> = (props) => {
  const { todo, list, setList } = props;
  const [editedTodo, setEditedTodo] = useState<Todo>(); // 双击出现的输入框
  const [tmpVal, setTmpVal] = useState(''); // 临时存储输入框的内容

  // 完成事项
  const completeSingleTodo = useCallback(() => {
    const newList = list.map((item) => {
      return item.id === todo.id ? { ...item, completed: !item.completed } : item;
    });
    setList(newList);
  }, [list, setList, todo.id]);

  // 删除事项
  const removeTodo = useCallback(() => {
    const newList = list.filter((item) => item.id !== todo.id);
    setList(newList);
  }, [list, setList, todo.id]);

  // 编辑事项
  const editTodo = useCallback(() => {
    setTmpVal(todo.title);
    setEditedTodo(todo);
  }, [todo]);

  // 双击后出发输入框，监听change事件并将值写入tmpVal
  const updateTodo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTmpVal(e.target.value);
  }, []);

  // 失去焦点时，自动修改list中对应的todo
  const handleBlur = useCallback(() => {
    const newList = list.map((item) => {
      return item.id === todo.id ? { ...item, title: tmpVal } : item;
    });
    setList(newList);
  }, [tmpVal, list, setList, todo.id]);

  return (
    <li className={`todo ${(todo === editedTodo) ? 'editing' : ''}`} key={todo.id}>
      {todo === editedTodo ? (
        <input
          type="text"
          className="myEdit"
          value={tmpVal}
          autoFocus
          onChange={updateTodo}
          style={{ width: '90%', fontSize: '24px', height: '100%' }}
          onBlur={handleBlur}
        />
      ) : (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            onChange={completeSingleTodo}
          />
          <label onDoubleClick={editTodo}>{todo.title}</label>
          <button className="destroy" onClick={removeTodo} />
        </div>
      )}
    </li>
  );
};

export default TodoItem;