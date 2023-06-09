import "./chatBox.css";
import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Message from "../message/Message";
import Input from "../input/input";

function ChatBox({ messages, onSendMessage }) {
  useEffect(() => {
    const chatbox = document.querySelector(".chatBox");
    chatbox.scrollTop = chatbox.scrollHeight - chatbox.clientHeight;
  }, [messages]);

  return (
    <div className="chat-box">
      <ListGroup as="ul" className="chatBox" variant="flush">
        {messages.map((msg, index) => (
          <Message sender={msg.sender} key={index} payload={msg.payload} />
        ))}
      </ListGroup>

      <Input onSubmit={onSendMessage} />
    </div>
  );
}

export default ChatBox;
