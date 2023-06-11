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
  const rooms = useStoreState((state) => state.getRooms);
  const { addRoom, forwardMessage } = useStoreActions(
    (actions) => actions
  );
  const hasRoom = useStoreState((state) => state.hasRoom);

  const handleCheckPacket = (packet) => {
    const { sender, to: receiver } = packet;

    if (receiver === "#public")
      return forwardMessage({ key: receiver, msg: packet });

    if (sender === user.username) {
      if (hasRoom(receiver))
        return forwardMessage({ key: receiver, msg: packet });

      return addRoom({ key: receiver, roomId: receiver, msg: packet });
    }

    if (!hasRoom(sender)) {
      return addRoom({ key: sender, roomId: sender, msg: packet });
    } else forwardMessage({ key: sender, msg: packet });
  };

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
          <Rooms rooms={rooms} onCheckPacket={handleCheckPacket} />
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
