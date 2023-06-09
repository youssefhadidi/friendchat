import "./App.css";
import { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import Col from "react-bootstrap/Col";
import Login from "./components/login/login";
import Users from "./components/users/Users";
import Profile from "./components/profile/Profile";
import Rooms from "./components/rooms/Rooms";

function App() {  
  const user = useStoreState(state => state.user);
  const { addRoom } = useStoreActions(actions => actions);

  useEffect(() => {
    if (user && user.isInPublic)
      addRoom({ key: "#public", roomId: "#public" });
  }, [user])

  if (!user) return <Login />;

  return (
    <>
      <Col sm={3}>
        <div className="side-bar rounded-top bg-light">
          <Profile />
          <Users />
        </div>
      </Col>
      <Col sm={9}>
        <div className="chat-section">
          <Rooms />
        </div>
      </Col>
    </>
  );
}

export default App;

/* { sender: user.username,
     payload: {type: String,
               data: String},
     roomId: "#public" }*/
