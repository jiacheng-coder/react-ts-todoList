import { useState } from "react";

export default function Test(){
  const [val,setVal] = useState("")
  const [isChecked,setIsChecked] = useState(false)
  const handleChange = (e)=>{
    console.log(e.target.value);
  }
  const handleControllChange = (e)=>{
    setVal(e.target.value)
    console.log(e.target.value);
  }

  const handleChangeCheckBox = (e)=>{
    console.log(e.target.checked);
  }
  const handleChangeControllCheckBox = e=>{
    setIsChecked(pre=>!pre)
    console.log(e.target.checked);
  }

  return (
    <>
      <section>
        <h2>非受控元素</h2>
        <input type="text" onChange={handleChange}/>
      </section>
      <section>
        <h2>受控元素</h2>
        <input type="text" onChange={handleControllChange} value={val}/>
      </section>
      <hr />
      <section>
        <h2>非受控元素</h2>
        <input type="checkbox" onChange={handleChangeCheckBox}/>
      </section>
      <section>
        <h2>受控元素</h2>
        <input type="checkbox" onChange={handleChangeControllCheckBox} checked={isChecked}/>
      </section>
    </>
  )
}