import "./App.css";
import { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import Col from "react-bootstrap/Col";
import ChatBox from "./components/chatbox/ChatBox";
import Login from "./components/login/login";
import Users from "./components/users/Users";
import Profile from "./components/profile/Profile";
import { getAllUsers } from "./services/userServices";
import { getMessage, sendMessage } from "./services/messageServices";

function App() {
  const user = useStoreState(state => state.user);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleSendMessage = (msg) => {
    sendMessage({ sender: user.username, ...msg, roomId: "#public" });
  };

  /*const handleChangeStatus = (status) => {
    setUser({ ...user, status: status });
    updateUserStatus(status);
  };*/

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

  if (!user) return <Login />;

  return (
    <>
      <Col sm={3} style={{ marginRight: "10px" }}>
        <div className="side-bar rounded-top bg-light">
          <Profile />
          <Users users={allUsers} />
        </div>
      </Col>
      <ChatBox messages={messages} onSendMessage={handleSendMessage} />
    </>
  );
}

export default App;

/* { sender: user.username,
     payload: {type: String,
               data: String},
     roomId: "#public" }*/
