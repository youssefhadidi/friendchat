import './chatBox.css'
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Message from '../message/message'


function ChatBox({messages}) {
  return (
    <ListGroup as="ul" className="chatBox">
      {messages.map(msg => <Message sender={msg.username} text={ msg.text } />)}
    </ListGroup>
  )
}

export default ChatBox;