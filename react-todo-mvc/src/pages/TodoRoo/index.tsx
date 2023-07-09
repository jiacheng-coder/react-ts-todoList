import { Outlet } from "react-router";
import { MyContextProvider } from "./MyContextProvider";
import "./index.css";

function TodoListRoo() {
  return (
    <MyContextProvider>
      <main className="TodoListRoo">
        <Outlet />
      </main>
    </MyContextProvider>
  );
}

export default TodoListRoo;
