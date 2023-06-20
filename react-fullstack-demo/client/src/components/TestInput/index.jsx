import { forwardRef } from "react"

function TestInput(props, refFromParent) {
  return (
    <>
      <input ref={refFromParent} type="text" className="input"/>
    </>
  )
}

export default forwardRef(TestInput)