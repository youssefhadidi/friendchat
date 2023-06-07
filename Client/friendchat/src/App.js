import { useEffect, useState } from "react";
import "./App.css";
import Col from "react-bootstrap/Col";
import ChatBox from "./components/chatbox/ChatBox";
import Login from "./components/login/Login";
import Users from "./components/users/Users";
import {
  getAllUsers,
  connectUser,
  updateUserStatus,
} from "./services/userServices";
import { getMessage, sendMessage } from "./services/messageService";
import Profile from "./components/profile/Profile";

function App() {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [rooms, setRoom] = useState([]);

  const handleLogin = (user) => {
    setUser(user);
    connectUser(user);
  };

  const handleSendMessage = (msg) => {
    sendMessage({ sender: user.username, ...msg, to: "#public" });
  };

  const handleChangeStatus = (status) => {
    setUser({ ...user, status: status });
    updateUserStatus(status);
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
        <div className="side-bar rounded-top bg-light">
          <Profile user={user} onChangeStatus={handleChangeStatus} />
          <Users users={allUsers} />
        </div>
      </Col>
      <ChatBox messages={messages} onSendMessage={handleSendMessage}/>
    </>
  );
}

export default App;

/* { sender: user.username,
     payload: {type: String,
               data: String},

     to: "#public" }*/