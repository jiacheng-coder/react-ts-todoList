import { FC,useMemo,useCallback } from "react"
import { Todo } from "../../types/Todo";

interface Props {
  list: Array<Todo>;
  setList: (val: Array<Todo>) => void;
  todoType: string;
}

const TodoFooter: FC<Props> = ({ list,setList,todoType }) => {
  const remainNum = useMemo(() => list.filter(item => !item.completed).length, [list]);
  const removeCompleted = useCallback(()=>{
    setList(list.filter(todo=>todo.completed!==true))
  },[list,setList])
  
  return (
    <>
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
    </>
  )
}

export default TodoFooter