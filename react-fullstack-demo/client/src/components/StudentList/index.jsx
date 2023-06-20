import { getStudentList } from '../../request';
import { useState,useEffect, useCallback } from 'react';
import StudentItem from './components/StudentItem';
import useRequestLoadingDispatch from '../../hooks/useRequestLoadingDispatcher';
import useWindowScrollWatcher from '../../hooks/useWindowScrollWatcher';

export default function StudentList(){
  const [list,setList] = useState([])
  const {loading,excuteRequest} = useRequestLoadingDispatch()
  useWindowScrollWatcher(()=>{
    console.log("scrolling!");
  })

  // useCallback只在创建函数引用时使用
  // 第一个参数：函数声明
  // 第二个参数：
  const fetchData = useCallback(async ()=>{
    excuteRequest(async ()=>{
      const res = await getStudentList()
      setList(res.data)
    })
  },[excuteRequest])
  
  useEffect(() => { 
    fetchData()
   },[fetchData])

  return (
    <div style={{height:"1200px"}}>
      {
        loading ? <h2>加载ing</h2> : list.map(student=><StudentItem {...student}/>)
      }
    </div>
  )
}