import { useEffect, useState } from "react";
import "./App.css";
import Col from "react-bootstrap/Col";
import ChatBox from "./components/chatbox/ChatBox";
import Login from "./components/login/login";
import UserList from "./components/users/userList";
import { register, getAllUsers } from "./services/userServices";
import { getMessage, sendMessage } from "./services/messageService";
import Input from "./components/input/input";

function App() {
  //const socket = io(URL);
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleLogin = (user) => {
    try {
      setUser(user);
      register(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = (msg) => {
    sendMessage({ sender: user.username, text: msg });
  };

  useEffect(() => {
    getAllUsers(setAllUsers);
  }, [allUsers]);

  useEffect(() => {
    getMessage(setCurrentMessage);
  }, [messages]);

  useEffect(() => {
    if (currentMessage) {
      const allMessages = [...messages, currentMessage];
      setMessages(allMessages);
    }
  }, [currentMessage]);

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <>
      <Col sm={3} style={{ marginRight: "10px" }}>
        <UserList users={allUsers} />
      </Col>

      <Col sm={true} className="chat-box">
        <ChatBox messages={messages} />
        <Input onSubmit={handleSendMessage} />
      </Col>
    </>
  );
}

export default App;
