import React, { useState, useMemo, useContext, useCallback } from "react";
import { Input, Button, Select, Icon, Table, Switch } from "@roo/roo";
// Context
import { TodoContext, useTodoContext } from "../../MyContextProvider";
// types && enums
import { TodoStatus } from "../../../../types/TodoStatus";
import { TodoItem } from "../../../../types/TodoItem";
import { editTypeEnum } from "../../../../utils/enum";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const { list, setList, todoStatus, setTodoStatus, setEditType } = useTodoContext();
  const [searchStatus, setSearchStatus] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const handleTitleChange = useCallback((e: any) => {
    setTitle(e.target.value);
  },[])
  // 展示列表
  const displayList = useMemo(() => {
    const tmpList = list;
    if (searchStatus) {
      return tmpList.filter((item) => item.title === title);
    }
    if (todoStatus === "all") {
      return tmpList;
    } else if (todoStatus === "active") {
      return tmpList.filter((item) => item.completed === false);
    } else {
      return tmpList.filter((item) => item.completed === true);
    }
  }, [list, todoStatus, searchStatus, title]);
  // 剩余数据量
  const remainNum = useMemo(() => displayList.length, [displayList]);
  // 切换完成状态
  const handleTodoStatusChange = (status: TodoStatus) => {
    setTodoStatus(status);
  }
  // 搜索
  const searchTodos = useCallback(() => {
    setSearchStatus(true);
  },[])
  // 重置搜索状态
  const resetSearchStatus = useCallback(() => {
    setSearchStatus(false);
    setTitle("");
    setTodoStatus('all')
  },[])
  // 新增
  const addTodo = useCallback(() => {
    setEditType(editTypeEnum.ADD)
    navigate("/roo/0");
  },[])
  // 删除
  const deleteSingleTodo = useCallback((todo: TodoItem) => {
    setList((preList) => preList.filter((item) => item.id !== todo.id));
  },[])
  // 编辑
  const editTodo = (record: any) => {
    setEditType(editTypeEnum.EDIT)
    navigate(`/roo/${record.id}`, {
      state: { record, editType: editTypeEnum.EDIT },
    });
  };
  // 查看
  const viewTodo = (record: any) => {
    setEditType(editTypeEnum.VIEW)
    navigate(`/roo/${record.id}`, {
      state: { record, editType: editTypeEnum.VIEW },
    });
  };
  // Table配置
  const columns: any = useMemo(()=>[
    { prop: "id", label: "ID", align: "center", width: 150 },
    { prop: "title", label: "标题", align: "center", width: 150 },
    { prop: "content", label: "内容", align: "center", width: 550 },
    { prop: "date", label: "创建时间", align: "center", width: 250 },
    {
      prop: "completed",
      label: "完成状态",
      align: "center",
      width: 250,
      render: (completed: any, record: any) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Switch
            checked={record.completed}
            offText={<Icon name="close" />}
            onText={<Icon name="check" />}
            onChange={() => {
              setList((preList) =>
                preList.map((item) => {
                  if (item.id === record.id) {
                    return {
                      ...item,
                      completed: !completed,
                    };
                  }
                  return item;
                })
              );
            }}
          />
        </div>
      ),
    },
    {
      prop: "",
      label: "操作",
      width: 300,
      fixed: "right",
      align: "center",
      render: (text: any, record: TodoItem) => (
        <>
          <Button type="brand-text" onClick={() => viewTodo(record)}>
            查看
          </Button>
          <Button type="brand-text" onClick={() => editTodo(record)}>
            编辑
          </Button>
          <Button type="brand-text" onClick={() => deleteSingleTodo(record)}>
            删除
          </Button>
        </>
      ),
    },
  ],[])

  return (
    <>
      {/* 1.header */}
      <header className="todo-header-roo">
        <h1>待办汇总</h1>
        <section>
          <div className="left">
            <text>待办标题: </text>
            <Input
              placeholder="请输入待办标题"
              value={title}
              onChange={(e) => handleTitleChange(e)}
            />
            <text style={{ marginLeft: "20px" }}>待办状态:</text>
            <Select
              options={[
                { value: "all", label: "全部" },
                { value: "completed", label: "已完成" },
                { value: "active", label: "未完成" },
              ]}
              value={todoStatus}
              onChange={handleTodoStatusChange}
            />
            <Button style={{ marginLeft: "20px" }} onClick={searchTodos}>
              查询
            </Button>
            <Button
              type="hollow"
              style={{ marginLeft: "20px" }}
              onClick={resetSearchStatus}
            >
              重置
            </Button>
          </div>
          <div className="right">
            <Button onClick={addTodo} type="brand">
              添加待办
            </Button>
          </div>
        </section>
      </header>
      {/* 2.main */}
      <main className="TodoMainRoo" style={{ marginTop: "20px" }}>
        <Table
          rowKey="id"
          border
          hover
          columns={columns}
          data={displayList}
          scrollX={1500}
          scrollY={600}
          pagination={{
            total: remainNum,
            pageSize: 10,
            showJumper: true,
            pageSizeOptions: [10, 20, 30, 50],
            showTotal: (total) => `共 ${total} 条数据`,
          }}
        />
      </main>
    </>
  );
};