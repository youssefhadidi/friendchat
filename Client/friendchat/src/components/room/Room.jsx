import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from "easy-peasy";
import ChatBox from '../chatbox/ChatBox';
import { getMessage, sendMessage } from "../../services/messageServices";

const Room = ({roomId}) => {
    const { user } = useStoreState(state => state);
    //const { saveMessages } = useStoreActions(actions => actions);
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);
    
    const handleSendMessage = (msg) => {
      sendMessage({ sender: user.username, to: roomId,...msg });
    };

    useEffect(() => {
      getMessage(setCurrentMessage);
    }, []);

    useEffect(() => {
      if (currentMessage && currentMessage.to === roomId) {
        const allMessages = [...messages, currentMessage];
        setMessages(allMessages);
      }
    }, [currentMessage]);

    return <ChatBox messages={messages} onSendMessage={handleSendMessage} />;
}
 
export default Room;