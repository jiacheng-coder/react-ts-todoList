import { getStudentList } from '../../request';
import { useState,useEffect } from 'react';
import StudentItem from './components/StudentItem';
import useRequestLoadingDispatch from '../../hooks/useRequestLoadingDispatcher';
import useWindowScrollWatcher from '../../hooks/useWindowScrollWatcher';

export default function StudentList(){
  const [list,setList] = useState([])
  const {loading,excuteRequest} = useRequestLoadingDispatch()
  useWindowScrollWatcher(()=>{
    console.log("scrolling!");
  })

  const fetchData = async ()=>{
    excuteRequest(async ()=>{
      const res = await getStudentList()
      setList(res.data)
    })
  }
  
  useEffect(() => { 
    fetchData()
   },[])

  return (
    <div style={{height:"1200px"}}>
      {
        loading ? <h2>加载ing</h2> : list.map(student=><StudentItem {...student}/>)
      }
    </div>
  )
}