import React from 'react'
import "./Register.css"

const Register = () => {
  return (
    <>
    <div id='outer'>
        <div id='inner'>
        <h1>Register to create a room</h1>
        <div id="inputs">
        <input type="text" placeholder='User Name'/>
        <input type="text" placeholder='Room Name' />
        </div>
        <button>Register</button>
        </div>
    </div>
    </>
  )
}

export default Register