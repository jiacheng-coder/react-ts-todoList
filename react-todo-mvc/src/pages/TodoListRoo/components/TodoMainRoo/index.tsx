import Table from '@roo/roo/Table';
import Button from '@roo/roo/Button';
import { useMemo,useContext } from 'react';
import { TodoItem } from '../../../../types/TodoItem';
import { TodoContext } from '../..';

const TodoMainRoo= () =>{
  const {filterList,setList} = useContext(TodoContext)
  const deleteSingleTodo = (todo:TodoItem)=>{
    setList(preList=>preList.filter(item=>item.id!==todo.id))
  }
  const remainNum = useMemo(()=>filterList.length,[filterList])
  const columns: any = [
    { prop: 'id', label: 'ID', align: 'center', width: 150},
    { prop: 'title', label: '标题', align: 'center', width: 150},
    { prop: 'content', label: '内容', align: 'center', width: 550},
    { prop: 'date', label: '创建时间', align: 'center', width: 250},
    { prop: 'completed', label: '完成状态', align: 'center', width: 250, 
        render: (text: String) => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {text?"已完成":"未完成"}
          </div>
      )
    },
    {
      prop: '',
      label: '操作',
      width: 200,
      fixed: 'right',
      align: 'center',
      render: (text:any,record:TodoItem) => (
        <>
          <Button type="brand-text">编辑</Button>
          <Button type="brand-text" onClick={()=>deleteSingleTodo(record)}>删除</Button>
        </>
      )
    }
  ]
  return (
    <main className='TodoMainRoo' style={{marginTop:"20px"}}>
      <Table
        rowKey="id"
        border
        hover
        columns={columns}
        data={filterList}
        scrollX={1500}
        scrollY={600}
        pagination={{
            total: remainNum,
            pageSize: 10,
            showJumper: true,
            pageSizeOptions: [10, 20, 30, 50],
            showTotal: total => `共 ${total} 条数据`
          }}
      />
    </main>
);
}
export default TodoMainRoo