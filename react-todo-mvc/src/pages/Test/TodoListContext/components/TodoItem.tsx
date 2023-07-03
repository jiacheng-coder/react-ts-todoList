import React, { FC, useCallback, useContext, useState } from 'react';
import { Todo } from '../../../../types/TodoItem';
import { TodoContext } from '..';

interface Props {
  todo: Todo;
}

const TodoItem: FC<Props> = ({ todo }) => {
  const {setList} = useContext(TodoContext)
  const [editedTodo, setEditedTodo] = useState<Todo>(); // 双击出现的输入框
  const [tmpVal, setTmpVal] = useState(''); // 临时存储输入框的内容

  // 完成事项
  const completeSingleTodo = useCallback(() => {
    setList((preList)=>{
      return preList.map((item) => {
        return item.id === todo.id ? { ...item, completed: !item.completed } : item;
      });
    });
  }, [setList, todo.id]);

  // 删除事项
  const removeTodo = useCallback(() => {
    setList(preList=>preList.filter((item) => item.id !== todo.id));
  }, [setList, todo.id]);

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
    setList(preList=>{
      return preList.map((item) => {
        return item.id === todo.id ? { ...item, title: tmpVal } : item;
      });
    });
  }, [tmpVal, setList, todo.id]);

  return (
    <li className={`todo ${(todo === editedTodo) ? 'editing' : ''}`}>
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