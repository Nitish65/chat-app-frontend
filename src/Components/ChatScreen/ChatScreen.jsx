import React from 'react'
import './ChatScreen.css'
import { useNavigate } from 'react-router-dom'

const ChatScreen = () => {

  const navigate = useNavigate();



  // const handleSubmit = e => {
  //   e.preventDefault();
  //   navigate('/');
  // }

  return (
    <div id='outer'>

      <div id="inner">
        
          <div id="home">
          <button  onClick={()=>navigate('/')} title='Back to Home' >Home</button>
        </div>

      </div>
    </div>
  )
}

export default ChatScreen