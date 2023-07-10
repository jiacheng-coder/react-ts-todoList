import React, { useEffect } from 'react'
import { FormContext } from './context'

const FormProvider = ({form, children}) => {
  // 表单的挂载和卸载
  useEffect(() => { 
    form.onMount()
    return () => { 
      form.onUnmount()
     }
   },[])
  return (
    <FormContext.Provider value={form}>
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider