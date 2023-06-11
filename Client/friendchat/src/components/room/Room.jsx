import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import ChatBox from "../chatbox/ChatBox";
import { sendMessage } from "../../services/messageServices";

const Room = ({ roomKey, onCountUnread }) => {
  const { user } = useStoreState((state) => state);
  const readMessages = useStoreState((state) => state.getReadMessages(roomKey));
  const unreadMessages = useStoreState(state => state.getUnreadMessages(roomKey));
  
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (msg) => {
    sendMessage({ sender: user.username, to: roomKey, ...msg });
  };

  useEffect(() => {
    setMessages(readMessages);
  }, [readMessages]);

  useEffect(() => {
    console.log("roomKey: " + roomKey, " count: " + unreadMessages.length);
    if(unreadMessages.length > 0)
      onCountUnread(roomKey, unreadMessages.length);
  }, [unreadMessages])

  //return ;
  return ( <ChatBox messages={messages} onSendMessage={handleSendMessage} />);
};

export default Room;
