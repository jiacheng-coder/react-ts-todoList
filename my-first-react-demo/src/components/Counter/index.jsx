import { useState } from 'react'
export default function Counter(props){
  const {initalVal} = props
  const [count,setCount] = useState(initalVal)
  const increase = ()=>{
    setCount(prev=>prev+1)
  }
  const decrease = ()=>{
    setCount(prev=>prev+1)
  }
  // console.log("Counter重新渲染");
  return (
    <div style={{display:'flex'}}>
      <button onClick={increase}>+</button>
      <p>{count}</p>
      <button onClick={decrease}>-</button>
      <div>{initalVal}</div>
      <div style={{width:"200px",height:"200px",backgroundColor:"blue"}}>
        <button onClick={e=>{
          console.log("I am here");
          // 异步情况
          // setInterval(() => {
          //   console.log("button event:",e)
          // }, 100);
        }}>Click me</button>
      </div>
    </div>
  )
}