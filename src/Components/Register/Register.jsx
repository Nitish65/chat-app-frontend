import React, { useState } from "react";
import "./Register.css";

const Register = () => {

  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");

// const isDisabled = !username  || !roomname ;

  const isDisabled = username ==="" || roomname ==="";
  
  return (
    <>
      <div id="outer">
        <div id="inner">
          <h1>Register to create a room</h1>
          <form>
            <div id="inputs">
              <input
                type="text"
                name="username"
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
                name="group-name"
                placeholder="Room Name"
                maxLength={15}
                minLength={5}
                required
                pattern="^[A-Za-z_\-]+$"
                value={roomname}
                onChange={(e)=>setRoomname(e.target.value)}
              />
              <button disabled={isDisabled} >Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
