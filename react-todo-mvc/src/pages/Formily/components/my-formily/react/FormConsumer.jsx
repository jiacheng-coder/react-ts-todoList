import { observer } from "@formily/react"
import { useContext } from "react"
import { FormContext } from "./context"

const FormConsumer = observer(({children}) => {
  const form = useContext(FormContext)
  return children(form)
})

export default FormConsumer