import { useState } from "react";

export default function useForceUpdate() {
  const [_,setVal] = useState({})
  const forceUpdate = ()=>{
    setVal({})
  }
  return {
    _,
    forceUpdate
  }
}