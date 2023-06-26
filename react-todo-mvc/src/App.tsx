import { NavLink, Routes, Route } from "react-router-dom";
import TodoList from "./pages/TodoList";
import TodoListRoo from "./pages/TodoListRoo";
import NotFound from "./pages/NotFound";
import "./App.css"

export default function App() {
  return (
    <div className="App">
      <nav>
        {/* <NavLink to="">首页</NavLink> */}
        <NavLink to="todo-list">普通版</NavLink>
        <NavLink to="todo-list-roo">袋鼠🦘版</NavLink>
      </nav>
      <Routes>
        <Route path="/todo-list" element={<TodoList KEY="test-1"/>} />
        <Route path="/todo-list-roo" element={<TodoListRoo KEY="todo-2"/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

