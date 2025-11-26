import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    navigate('/chat', {
      state: {username, roomname}
    });
  }

// const isDisabled = !username  || !roomname ;

  const isDisabled = username ==="" || roomname ==="";
  
  return (
    <>
      <div id="outer">
        <div id="inner">
          <h1>Register to create a room</h1>
          <form onSubmit={handleSubmit} >
            <div id="inputs">
              <input
                type="text"
                name="user-name"
                placeholder="User Name"
                maxLength={15}
                minLength={5}
                required
                pattern="^[A-Za-z_\-]+$"
                autoFocus
                autoComplete="off"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              />
              <input
                type="text"
                name="room-name"
                placeholder="Room Name"
                maxLength={15}
                minLength={5}
                required
                autoComplete="off"
                pattern="^[A-Za-z_\-]+$"
                value={roomname}
                onChange={(e)=>setRoomname(e.target.value)}
              />
              <button disabled={isDisabled} type="submit" >Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
