import { Input as AntdInput } from "antd"
export const Input = (props) => {
  return (
      <AntdInput {...props} style={{...props.style}}/>
    )
}