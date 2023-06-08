import React, {useState, useEffect} from 'react';
import ChatBox from '../chatbox/ChatBox';

const Room = () => {
    
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);
    
    const handleSendMessage = () => { }

    return <ChatBox messages={messages} onSendMessage={handleSendMessage} />;
}
 
export default Room;