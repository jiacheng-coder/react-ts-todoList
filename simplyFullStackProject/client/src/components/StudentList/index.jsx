import { getStudentList } from '../../request';
import { useState,useEffect } from 'react';

export default function StudentList(){
  const [list,setList] = useState([])
  const fetchData = async ()=>{
    const data = await getStudentList()
    setList(data)
  }
  useEffect(() => { 
    fetchData()
   },[])
  return (
    <div>
      <ul>
        {list.map(item=>{
          return <li>{item}</li>
        })}
      </ul>
    </div>
  )
}