import { useMemo, useCallback, useContext, MouseEvent } from "react";
import { TodoStatus } from "../../../../../types/TodoStatus";
import './index.css'
import { TodoContext } from "../..";

const TodoFooter= () => {
  const { list, setList, todoStatus, setTodoStatus } = useContext(TodoContext)
  const remainNum = useMemo(() => list.filter(item => !item.completed).length, [list]);
  const removeCompleted = useCallback(() => {
    setList((preList) => {
      return preList.filter(todo => todo.completed !== true)
    })
  }, [setList]);

  // 采用事件委托的方式
  const handleClick = useCallback((e: MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLAnchorElement;
    const status = target.getAttribute('data-status');
    if (status) {
      setTodoStatus(status as TodoStatus)
    }
  }, [setTodoStatus]);

  return (
    <>
      <footer className="footer" style={{ display: list.length ? '' : 'none', height: '40px' }}>
        <span className="todo-count">
          <strong>{remainNum}</strong>
          <span>{remainNum === 1 ? ' item' : ' items'} left</span>
        </span>

        <ul className="filters" onClick={handleClick}>
          <li>
            <a href="#/all" data-status="all" className={todoStatus === 'all' ? 'selected' : ''}>All</a>
          </li>
          <li>
            <a href="#/active" data-status="active" className={todoStatus === 'active' ? 'selected' : ''}>Active</a>
          </li>
          <li>
            <a href="#/completed" data-status="completed" className={todoStatus === 'completed' ? 'selected' : ''}>Completed</a>
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

export default TodoFooter;
