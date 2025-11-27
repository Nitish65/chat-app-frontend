import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ChatScreen.css";

export default function ChatScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  const username = location.state?.username;   // MUST match Register.jsx
  const roomname = location.state?.roomname;   // MUST match Register.jsx

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  // Redirect if someone enters /chat directly
  useEffect(() => {
    if (!username || !roomname) {
      navigate("/");
    }
  }, [username, roomname, navigate]);

  // Auto scroll on messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add WhatsApp-style join info
  useEffect(() => {
    if (username && roomname) {
      setMessages((prev) => [
        ...prev,
        { type: "info", text: `${username} joined the room` }
      ]);
    }
  }, [username, roomname]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { type: "sent", text: input }]);

    // const useReply = input;
    setInput("");

    setTimeout(()=>{
      const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
      const randomReplies = dummyReplies[Math.floor(Math.random() * dummyReplies.length)];

      setMessages((prev) =>
        [...prev, 
          { type: "received", text:`${randomUser} : ${randomReplies}`}
        ]);
    },700)
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };


  const fakeUsers = ["John", "Emma", "Lucas", "Sophie", "Mark"];

const dummyReplies = [
  "That's interesting!",
  "Really? Tell me more.",
  "I totally agree with you.",
  "Hmm, I need to think about that.",
  "Can you explain that again?",
  "Nice!",
  "Oh wow!"
];


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
            if (msg.type === "info") {
              return (
                <div key={idx} className="info-message">
                  {msg.text}
                </div>
              );
            }

            if (msg.type === "sent") {
              return (
                <div key={idx} className="message-sent">
                  <div className="bubble">{msg.text}</div>
                </div>
              );
            }

            return (
              <div key={idx} className="message-received">
                <div className="bubble">{msg.text}</div>
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
