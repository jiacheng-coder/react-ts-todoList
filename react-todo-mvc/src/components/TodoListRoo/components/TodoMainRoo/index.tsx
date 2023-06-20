import Table from '@roo/roo/Table';
import Button from '@roo/roo/Button';
import { FC } from 'react';
import { TodoItem } from '../../../../types/Todo';

interface Props {
  list: TodoItem[];
  setList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

const TodoMainRoo:FC<Props> = ({list,setList}) =>{
  const columns: any = [
    { prop: 'title', label: '标题', align: 'center', width: 70},
    { prop: 'content', label: '内容', align: 'center', width: 200},
    { prop: 'date', label: '创建时间', align: 'center', width: 100},
    { prop: 'completed', label: '完成状态', align: 'center', width: 100, 
        render: (text: String) => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {text?"已完成":"未完成"}
          </div>
      )
    },
    {
      prop: '',
      label: '操作',
      width: 250,
      fixed: 'right',
      align: 'center',
      render: () => (
          <>
              <Button type="brand-text">编辑</Button>
              <Button type="brand-text">删除</Button>
          </>
      )
    }
  ]
  return (
    <main className='TodoMainRoo' style={{marginTop:"20px"}}>
        <h2>代办汇总</h2>
        <Table
            rowKey="name"
            border
            hover
            columns={columns}
            data={list}
            scrollX={1500}
            scrollY={600}
            pagination={{
                total: 4,
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