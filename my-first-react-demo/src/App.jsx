import { useState } from 'react';
import Counter from './components/Counter/index';
import Test from './components/Test';
import TestUseEffect from './components/TestUseEffect';
import Tick from './components/Tick'

function App() {
  const [countInApp,setCountInApp] = useState(10)
  const [isShow, setIsShow] = useState(true)
  // let countInApp = 1
  const handleClick = ()=>{
    setCountInApp(prev=>prev+1)
    // countInApp++
  }
  return (
    <div className="App">
      <main>
        {/* <Counter initalVal={countInApp}/>
        <button onClick={handleClick}>添加</button> */}
        <Test />
        <button onClick={() => { setIsShow(pre=>!pre) }}>点击</button>
        {isShow ? <Tick/> : null}
      </main>
    </div>
  );
}

export default App;
