import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  NavLink,
  Routes,
} from "react-router-dom";
import TodoList from "./pages/Test/TodoList";
import TodoListContext from "./pages/Test/TodoListContext";
import TodoListRoo from "./pages/TodoListRoo";
import { TodoDetail } from "./pages/TodoDetail";
import NotFound from "./pages/NotFound";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoList KEY="normal-1" />,
  },
  {
    path: "/todo-list-useContext",
    element: <TodoListContext KEY="normal-2" />,
  },
  {
    path: "/todo-list-roo",
    element: <TodoListRoo KEY="roo-1"/>,
    // children: [
    //   {
    //     path: "detail",
    //     element: <TodoDetail />,
    //   },
    // ],
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: 'detail',
    element: <TodoDetail />
  }
]);

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
