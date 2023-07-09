import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";
import TodoList from "./pages/Test/TodoList";
import TodoListContext from "./pages/Test/TodoListContext";
import TodoRoo from "./pages/TodoRoo"
import Home from "./pages/TodoRoo/pages/TodoTable";
import TodoItem from "./pages/TodoRoo/pages/TodoCRUD";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/Home";
import Test from "./pages/Test/index"
import Formily from "./pages/Formily";
import "./App.css"

export default function App() {
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
      path: "/formily",
      element: <Formily />,
    },
    {
      path: "/roo",
      element: <TodoRoo />,
      children: [
        {
          path: 'table',
          element: <Home />
        },
        {
          path: ":id",
          element: <TodoItem />,
        },
      ]
    },

    {
      path: "/test",
      element: <Test />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
