import React, { createContext, useContext, useEffect, useState } from "react";
import { TodoItem } from "../../types/TodoItem";
import { TodoStatus } from "../../types/TodoStatus";
import { editTypeEnum } from "../../utils/enum";

type Props = {
  children: React.ReactNode;
};

export const TodoContext = createContext({
  list: [] as TodoItem[],
  todoStatus: "all" as TodoStatus,
  editType: editTypeEnum.VIEW as editTypeEnum,
  setEditType: (() => {}) as React.Dispatch<React.SetStateAction<editTypeEnum>>,
  setList: (() => {}) as React.Dispatch<React.SetStateAction<TodoItem[]>>,
  setTodoStatus: (() => {}) as React.Dispatch<React.SetStateAction<TodoStatus>>,
});

export const useTodoContext = () => useContext(TodoContext);

export const MyContextProvider = (props: Props) => {
  // 待办状态: 已完成/未完成
  const [todoStatus, setTodoStatus] = useState<TodoStatus>("all");
  // 待办列表
  const [list, setList] = useState<TodoItem[]>(() =>
    JSON.parse(localStorage.getItem("todo-roo") || "[]")
  );
  // 编辑状态
  const [editType, setEditType] = useState<editTypeEnum>(editTypeEnum.VIEW);
  // 数据持久化
  useEffect(() => {
    localStorage.setItem("todo-roo", JSON.stringify(list));
  }, [list]);

  return (
    <TodoContext.Provider
      value={{
        list,
        setList,
        todoStatus,
        setTodoStatus,
        editType,
        setEditType,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
