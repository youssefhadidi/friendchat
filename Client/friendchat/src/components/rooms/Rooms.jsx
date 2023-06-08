import React from 'react';
import { useStoreState, useStoreActions } from "easy-peasy";
import Tabs from '../tabs/Tabs';
import Room from '../room/Room';

const Rooms = () => {
  const rooms = useStoreState(state => state.getRooms); // [[key, roomId], ...]
  const roomKeys = useStoreState(state => state.roomKeys);
  
  return (
    <>
      <Tabs tabs={roomKeys} />
      {rooms.map((room, index) => <Room/>)}
    </>
  );
}
 
export default Rooms;