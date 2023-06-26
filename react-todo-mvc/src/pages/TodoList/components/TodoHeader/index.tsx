import React, { useCallback, useState, FC } from 'react';
import { Todo } from '../../../../types/TodoItems';

interface Props {
  setList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoHeader: FC<Props> = ({ setList }) => {
  const [val,setVal] = useState('')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  }, [setVal]);

  const addTodo = useCallback((e) => {
    if (e.key!=='Enter') {
      return 
    }
    // Enter 才执行下面的操作
    const trimmedVal = val.trim();
    if (trimmedVal !== '') {
      setList((preList)=>{
        return [...preList,{
          id: Date.now(),
          title: trimmedVal,
          completed: false
        }]
      })
      setVal('')
    }else {
      alert("输入不能为空！")
    }
  },[val,setList])

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        type="text"
        placeholder="What needs to be done?"
        autoFocus
        className="new-todo"
        value={val}
        onChange={handleChange}
        onKeyDown={addTodo}
      />
    </header>
  );
};

export default TodoHeader;
