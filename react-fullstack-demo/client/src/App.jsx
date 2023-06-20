import TestInput from "./components/TestInput";
import { useCallback,useRef } from "react";

function App() {
  const inputElementRef = useRef(null)
  const handleClick = useCallback(()=>{
    inputElementRef.current.focus() 
  },[])
  return (
    <>
      <TestInput ref={inputElementRef}/>
      <button onClick={handleClick}>Click</button>
    </>
  )
}

export default App;
