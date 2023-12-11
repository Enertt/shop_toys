import React from 'react'
import s from './adminLogin.module.css'
import { useState } from 'react'

const AdminLogin = (props) => {

    const [inputState, setInputState] = useState('')
    const [buttonBlur, setButtonBlur] = useState(false)

  return (
    <div className={s.wrapper}>
        <div>
            <input value={inputState} onChange={(e)=>{setInputState(e.target.value)}}></input>
        </div>
        <div>
            <button onBlur={buttonBlur} onClick={()=>{
                props.setTokenThunkCreator(inputState)
                setInputState('')
                setButtonBlur(true)
                }}>войти</button>
        </div>
    </div>
  )
}

export default AdminLogin