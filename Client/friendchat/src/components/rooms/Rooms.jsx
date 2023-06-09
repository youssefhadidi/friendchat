import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import Room from "../room/Room";

const Rooms = () => {
  const rooms = useStoreState((state) => state.getRooms); // [[key, roomId], ...]
  const roomKeys = useStoreState((state) => state.roomKeys);
  console.log(rooms);

  return (
    <>
      <Tabs className="mb-3 tabs">
        {rooms.map(([key, roomId], index) => (
          <Tab eventKey={key} title={key}>
            <Room roomId={ roomId }/>
          </Tab>
        ))}
      </Tabs>
    </>
  );
};

export default Rooms;
