import { useEffect } from "react";

export default function useWindowScrollWatcher(scrollCallback) {
  useEffect(() => { 
    document.addEventListener('scroll',scrollCallback)
    return () => { 
      document.removeEventListener('scroll',scrollCallback)
     }
   })
}