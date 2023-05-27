import { useState } from 'react';
import './App.css';
import Col from "react-bootstrap/Col";
import ChatBox from './components/chatbox/ChatBox';
import socket from "./services/socket";
import Login from './components/login/login';
import UserList from './components/users/userList';
import { register } from './services/userServices';

function App() {
  //const socket = io(URL);
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([{sender:'toi',text:'dghaiduadz'},{sender:'moi',text:'dajozidojiazd'}] )
  const [currentMessage, setCurrentMessage] = useState('');

  const handleLogin = user => {
    try {
      setUser(user);
      register(user);
    } catch (error) {
      console.log(error);
    }
  }
  /*const sendMessage = (text) => {
    // setHistory([...history,{sender:'Youssef',text:text}])
    // socket.timeout(5000).emit('receive',)
    socket.emit('returnmessage',text,(value)=>{
      console.log(value);
    })
  }
  
  socket.on('message',(value)=>{
    console.log(value);
  })*/

  if (!user) return <Login onLogin={handleLogin} />

  return (
    <>
      <Col sm={3} style={{marginRight: '10px'}}>
        <UserList users={[]} />
      </Col>

      <Col sm={true}>
        <ChatBox messages={history} />
        <div className="input">
          <input
            type="text"
            onInput={(value) => setCurrentMessage(value.target.value)}
          ></input>
          <button
            onClick={() => {
              
            }}
          >
            Send
          </button>
        </div>
      </Col>
    </>
  );
}

export default App;
