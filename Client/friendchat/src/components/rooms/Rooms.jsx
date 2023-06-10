import React, {useEffect, useState} from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { getMessage } from "../../services/messageServices";
import RoomTabs from "../roomTabs/roomTabs";

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

  return <RoomTabs rooms={ rooms } />;
};

export default Rooms;