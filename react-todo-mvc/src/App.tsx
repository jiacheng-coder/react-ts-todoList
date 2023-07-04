import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoList from "./pages/Test/TodoList";
import TodoListContext from "./pages/Test/TodoListContext";
import TodoListRoo from "./pages/Main";
import { TodoDetail } from "./pages/Main/pages/TodoDetail";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/normal",
    element: <TodoList KEY="normal-1" />,
  },
  {
    path: "/context",
    element: <TodoListContext KEY="normal-2" />,
  },
  {
    path: "/roo",
    element: <TodoListRoo KEY="roo-1" />,
  },
  {
    path: "/detail/:id",
    element: <TodoDetail />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
