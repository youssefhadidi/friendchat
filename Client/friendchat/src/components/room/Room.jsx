import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from "easy-peasy";
import ChatBox from '../chatbox/ChatBox';
import { sendMessage } from "../../services/messageServices";

const Room = ({roomKey}) => {
    const { user } = useStoreState(state => state);
    const currentRoom = useStoreState(state => state.getRoom(roomKey));
    const [messages, setMessages] = useState([]);
    
    const handleSendMessage = (msg) => {
      sendMessage({ sender: user.username, to: roomKey, ...msg });
      console.log(msg);
    };

    useEffect(() => {
      const { messages } = currentRoom;
      setMessages(messages);
    }, [currentRoom]);

    return <ChatBox messages={messages} onSendMessage={handleSendMessage} />;
}
 
export default Room;
