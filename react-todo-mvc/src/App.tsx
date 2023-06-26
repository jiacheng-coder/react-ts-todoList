import { NavLink, Routes, Route } from "react-router-dom";
import TodoList from "./pages/TodoList";
import TodoListContext from "./pages/TodoListContext"
import TodoListRoo from "./pages/TodoListRoo";
import NotFound from "./pages/NotFound";
import "./App.css"

export default function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to="todo-list">普通版</NavLink>
        <NavLink to="todo-list-useContext">普通版+useContext</NavLink>
        <NavLink to="todo-list-roo">袋鼠🦘版</NavLink>
      </nav>
      <Routes>
        <Route path="/todo-list" element={<TodoList KEY="normal-1"/>} />
        <Route path="/todo-list-useContext" element={<TodoListContext KEY="normal-2"/>} />
        <Route path="/todo-list-roo" element={<TodoListRoo KEY="roo-1"/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

