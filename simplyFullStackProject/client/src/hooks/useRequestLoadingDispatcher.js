import { useState } from "react";

export default function useRequestLoadingDispatch() {
  const [loading,setLoading] = useState(false)
  const excuteRequest = async (promiseFn) => { 
    setLoading(true)
    await promiseFn()
    setLoading(false)
   }
   
   return {
    loading,
    excuteRequest
   }
}