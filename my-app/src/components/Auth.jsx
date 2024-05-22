import React,{useState} from 'react'
import {app} from '../FirebaseConfig'

function Auth() {
    const [data,setData]=useState({});

    const handleInput=(event)=>{
        let newInput={[event.target.name]:event.target.value};

        setData({...data,...newInput})
    }
    const handleSubmit=()=>{

    }
  return (
    <>
    <div>
        <input type="email" placeholder='Email' name='email' onChange={(event)=>handleInput(event)} />
        <input type="email" placeholder='Password' name='password' onChange={(event)=>handleInput(event)} />
    </div>
    <div>
        <button onClick={handleSubmit}>Submit</button>
    </div>
    </>
  )
}

export default Auth