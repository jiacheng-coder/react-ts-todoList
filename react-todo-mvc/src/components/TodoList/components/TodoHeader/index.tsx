import React, { useCallback, FC } from 'react';
import { Todo } from '../../../../types/Todo';

interface Props {
  val: string;
  setVal: (val: string) => void;
  list: Todo[];
  setList: (val: Array<Todo>) => void;
}

const TodoHeader: FC<Props> = ({ val, setVal, list, setList }) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  }, [setVal]);
  // 新增事项
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
  },[val,setVal,list,setList])

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
        onKeyDown={(event) => event.key === 'Enter' && addTodo()}
      />
    </header>
  );
};

export default TodoHeader;
