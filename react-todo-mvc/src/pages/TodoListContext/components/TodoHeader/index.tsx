import React, { useCallback, useState, useContext} from 'react';
import { TodoContext } from '../../index';

const TodoHeader = () => {
  const { setList } = useContext(TodoContext);
  const [val,setVal] = useState('')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  }, [setVal]);

  const addTodo = useCallback((e) => {
    if (e.key !== 'Enter') {
      return;
    }
  
    const trimmedVal = val.trim();
    if (trimmedVal !== '') {
      setList((preList) => {
        let idx = preList.findIndex(item => item.title === trimmedVal);
        if (idx !== -1) {
          alert("事项重复！");
          return preList;
        }
        return [
          ...preList,
          {
            id: Date.now(),
            title: trimmedVal,
            completed: false,
          },
        ];
      });
      setVal('');
    } else {
      alert("输入不能为空！");
    }
  }, [val, setList]);  

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        type="text"
        placeholder="What needs to do?"
        className="new-todo"
        autoFocus
        value={val}
        onChange={handleChange}
        onKeyDown={addTodo}
      />
    </header>
  );
};

export default TodoHeader;
