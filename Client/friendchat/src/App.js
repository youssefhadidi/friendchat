import { useState } from 'react';
import './App.css';
import History from './components/messages/Messages';
import socket from "./services/socket";
import Login from './components/login/login';

function App() {
  //const socket = io(URL);
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([{sender:'toi',text:'dghaiduadz'},{sender:'moi',text:'dajozidojiazd'}] )
  const [currentMessage, setCurrentMessage] = useState('')
  const sendMessage = (text) => {
    // setHistory([...history,{sender:'Youssef',text:text}])
    // socket.timeout(5000).emit('receive',)
    socket.emit('returnmessage',text,(value)=>{
      console.log(value);
    })
  }
  
  socket.on('message',(value)=>{
    console.log(value);
  })

  if (!user) return <Login onLogin={user => setUser(user) } />

  return (
    <div className="App">
      <div className='history'>
        <History historyList = {history}/>
      </div>
      <div className='input'>
        <input type="text" onInput={(value)=> setCurrentMessage(value.target.value)}></input>
        <button onClick={() => {sendMessage(currentMessage)}}>Send</button>
      </div>
    </div>
  );
}

export default App;
