/*import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./ProviderChat.css";

export default function ProviderChat() {
  const { bookingId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Simulate fetching chat messages from backend
  useEffect(() => {
    // Replace this with API call to get chat by bookingId
    setMessages([
      { sender: "customer", text: "Hello! Is my booking confirmed?" },
      { sender: "provider", text: "Yes, I've accepted it." }
    ]);
  }, [bookingId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { sender: "provider", text: input };
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    // TODO: Send to backend via API/WebSocket
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h3>Chat with Customer (Booking #{bookingId})</h3>
      </header>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.sender === "provider" ? "sent" : "received"}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
*/


/*import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProviderChat.css";

export default function ProviderChat() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([
      { sender: "customer", text: "Hello! Is my booking confirmed?" },
      { sender: "provider", text: "Yes, I've accepted it." }
    ]);
  }, [bookingId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { sender: "provider", text: input };
    setMessages(prev => [...prev, newMessage]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <header className="chat-header">
        <button onClick={() => navigate(-1)}>⬅ Back</button>
        Chat with Customer (Booking #{bookingId})
      </header>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.sender === "provider" ? "sent" : "received"}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}*/





import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProviderChat.css";

export default function ProviderChat() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([
      { sender: "customer", text: "Hello! Is my booking confirmed?" },
      { sender: "provider", text: "Yes, I've accepted it." }
    ]);
  }, [bookingId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { sender: "provider", text: input };
    setMessages(prev => [...prev, newMessage]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-page">
      <div className="chat-card">
        <header className="chat-header">
          <button onClick={() => navigate(-1)}>←</button>
          Chat with Customer (Booking #{bookingId})
        </header>

        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${msg.sender === "provider" ? "sent" : "received"}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
