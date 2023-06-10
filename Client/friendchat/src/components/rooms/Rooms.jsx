import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import React, {useEffect, useState} from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { getMessage } from "../../services/messageServices";
import Room from "../room/Room";

const Rooms = () => {
  const { addRoom, forwardMessageToRoom } = useStoreActions(actions => actions);
  const hasRoom = useStoreState(state => state.hasRoom);
  const rooms = useStoreState((state) => state.getRooms); // [[key, {roomId}], ...]
  const user = useStoreState((state) => state.user);
  const [currentMessage, setCurrentMessage] = useState("");

  const checkPacket = packet => {
    const { sender, to: receiver } = packet;

    if (receiver === "#public")
      return forwardMessageToRoom({ key: receiver, msg: packet });
    
    if (sender === user.username) {
      if (hasRoom(receiver))
        return forwardMessageToRoom({ key: receiver, msg: packet });
      
      return addRoom({ key: receiver, roomId: receiver, msg: packet });
    }

    if (!hasRoom(sender)) {
      return addRoom({ key: sender, roomId: sender, msg: packet });
    } else
      forwardMessageToRoom({ key: sender, msg: packet });
    
  }

  useEffect(() => {
    getMessage(setCurrentMessage);
  }, [])

  useEffect(() => {
    if (currentMessage)
      checkPacket(currentMessage);
  }, [currentMessage])

  return (
    <>
      <Tabs className="mb-3 tabs bg-light">
        {rooms.map(([key], index) => (
          <Tab eventKey={key} title={key} key={index}>
            <Room roomKey={key} key={index} />
          </Tab>
        ))}
      </Tabs>
    </>
  );
};

export default Rooms;