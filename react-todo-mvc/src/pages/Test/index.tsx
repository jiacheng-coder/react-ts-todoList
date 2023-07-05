import React, { useState, useContext, useEffect, useCallback, useMemo, useReducer } from 'react';
import { Button } from '@roo/roo';

const initialState = {
  name: 'Conny',
  score: 0
}
type TAction = {
  type: 'increment' | 'decrement',
  payload: number
}

const reducer = (state: typeof initialState, action: TAction) => {
  switch (action.type) {
    case 'increment':
      return {...state, score: state.score + action.payload}
    case 'decrement':
      return {...state, score: state.score - action.payload}
    default:
      return state
  }
}

const initialAction = (initState: typeof initialState) => {
  const res = localStorage.getItem('state')
  if (!!res) {
    return JSON.parse(res)
  }
  return initState
}

export default function TestUseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState, initialAction)
  useEffect(()=>{
    localStorage.setItem('state', JSON.stringify(state))
  },[state])
  return <>
    <h1>UseReducer</h1>
    <hr />
    <div style={{display:'flex',gap:'2rem', alignItems: 'center'}}>
      <Button onClick={()=>dispatch({type:'increment',payload:2})}>+</Button>
      <span style={{fontSize:"2rem"}}>{state.score}</span>
      <Button onClick={()=>dispatch({type:'decrement',payload:2})}>-</Button>
    </div>
  </>
}