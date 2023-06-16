import { useEffect } from "react";

export default function TestUseEffect(){
  const handleKeyDown = (e) => { console.log("keydown is called") }
  useEffect(()=>{
    document.addEventListener('keydown', handleKeyDown)
    return () => { 
      document.removeEventListener('keydown',handleKeyDown)
     }
  },[])
  return (
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
  )
}