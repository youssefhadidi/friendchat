import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import React, {useEffect, useState} from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { getRoomIdFromServer } from "../../services/messageServices";
import Room from "../room/Room";

const Rooms = () => {
  const { addRoom } = useStoreActions(actions => actions);
  const rooms = useStoreState((state) => state.getRooms); // [[key, roomId], ...]
  const user = useStoreState((state) => state.user);
  const [newRoomRequest, setNewRoomRequest] = useState(null);

  useEffect(() => {
    getRoomIdFromServer(setNewRoomRequest);
  }, [])

  useEffect(() => {
    if (newRoomRequest) {
      const { sender, to, roomId } = newRoomRequest;
      const key = user.username === sender.username ? to.username : sender.username;
        
      addRoom({ key, roomId });
    }
  }, [newRoomRequest])

  return (
    <>
      <Tabs className="mb-3 tabs bg-light">
        {rooms.map(([key, roomId], index) => (
          <Tab eventKey={key} title={key} key={index}>
            <Room roomId={roomId} roomKey={key} key={index} />
          </Tab>
        ))}
      </Tabs>
    </>
  );
};

export default Rooms;
