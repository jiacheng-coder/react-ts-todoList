import React from 'react'
// import {Input} from 'antd'

export const Input = (props:any) => {
  return (
      <input {...props} style={{...props.style, color: 'red'}}/>
      // <Input {...props} style={{...props.style}}/>
    )
}