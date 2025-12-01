import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ChatScreen.css";
import { io } from "socket.io-client"

const SERVER_URL = "http://localhost:4000";


export default function ChatScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  const username = location.state?.username;   // MUST match Register.jsx
  const roomname = location.state?.roomname;   // MUST match Register.jsx

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Redirect if someone enters /chat directly
  useEffect(() => {
    if (!username || !roomname) {
      navigate("/");
    }
  }, [username, roomname, navigate]);


  useEffect(() => {
    if (!username || !roomname) return;
    // Connects client with the server with the provided url
    socketRef.current = io(SERVER_URL, { transports: ["websocket"] });
    // On successful connection it sends username and roomname
    // and the server collects it in name and room.
    socketRef.current.on("connect", () => {
      socketRef.current.emit("join", { name: username, room: roomname })
    });

    // when message event is triggered, this will set the setMessages state
    socketRef.current.on("message", (msg) => {
      setMessages((prev) => [
        ...prev, msg
      ])
    });
    // disconnects user on unmount.
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [username, roomname]);


  // Auto scroll on messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    if(socketRef.current && socketRef.current.connected){
      socketRef.current.emit("sendMessage", input.trim());
      setInput("");
    }
  
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };





  return (
    <div className="chat-wrapper">
      <div className="chat-container">

        {/* Header shows dynamic room name */}
        <div className="chat-header">
          {roomname}
        </div>

        {/* Message List */}
        <div className="message-list">
          {messages.map((msg, idx) => {
            const isSystem = msg.user === "system";
            const isMe = msg.user === username;
            if (isSystem) {
              return (
                <div key={idx} className="info-message">
                  {msg.text}
                </div>
              );
            }

            return (
              <div key={idx} className=
                {isMe ? "message-sent" :
                  "message-received"}>
                <div className="bubble">
                  {!isMe && <strong>{msg.user}: </strong>}{msg.text}</div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div className="input-bar">
          <input
            type="text"
            value={input}
            placeholder={`Message ${roomname}`}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <button
            className="send-btn"
            disabled={!input.trim()}
            onClick={sendMessage}
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}
