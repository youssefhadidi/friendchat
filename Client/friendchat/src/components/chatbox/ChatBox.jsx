import "./chatBox.css";
import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Message from "../message/Message";

function ChatBox({ messages }) {
  useEffect(() => {
    const chatbox = document.querySelector(".chatBox");
    chatbox.scrollTop = chatbox.scrollHeight - chatbox.clientHeight;
  }, [messages]);

  return (
    <ListGroup
      as="ul"
      className="chatBox"
      variant="flush"
    >
      {messages.map((msg, index) => (
        <Message sender={msg.sender} key={index} payload={msg.payload} />
      ))}
    </ListGroup>
  );
}

export default ChatBox;
