import { useEffect, useState } from "react";

export default function TestUseEffect(){
  const [tickTime, setTickTime] = useState(100)
  useEffect(()=>{
    let timer = setInterval(() => { 
      setTickTime(pre=>pre-1)
      console.log("Tick is working");
     },1000)
     return ()=>{
      clearInterval(timer)
      timer = null
     }
  },[])
  return (
    <h2>抢购剩余时间: {tickTime}s</h2>
  )
}