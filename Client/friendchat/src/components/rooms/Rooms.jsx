import "./rooms.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { getMessage } from "../../services/messageServices";
import Room from "../room/Room";

const Rooms = ({ rooms, onCheckPacket }) => {
  const { onReadMessages, storeRoomData, removeRoom, setActiveRoom } = useStoreActions(actions => actions);
  const hasRoom = useStoreState(state => state.hasRoom);
  const { activeRoom } = useStoreState(state => state);
  const [currentMessage, setCurrentMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState({ });

  const handleCountUnreadMessages = (roomKey, count) => {
    const unreadCountList = { ...unreadCount };
    unreadCountList[roomKey] = count;
    setUnreadCount({ ...unreadCountList });
  }

  const handleSelectKey = eventKey => {
    console.log("in handleSelectKey " + eventKey)
    setActiveRoom(eventKey);
  }

  const handleCloseRoom = roomKey => {
    if (activeRoom === roomKey)
      setActiveRoom("#public");
    storeRoomData(roomKey); // temporrily store current room's data in localStorage
    removeRoom(roomKey); // remove current room
  }

  useEffect(() => {
    getMessage(setCurrentMessage);
  }, [])

  useEffect(() => {
    if (currentMessage)
      onCheckPacket(currentMessage);
  }, [currentMessage])

  useEffect(() => {
    handleCountUnreadMessages(activeRoom, 0);
  }, [activeRoom])

  const renderTabTitle = tabKey => {
    return (
      <>
        {tabKey}
        {(unreadCount[tabKey] > 0 && activeRoom !== tabKey) && (
          <span className="unread-badge">
            <span className="badge-content">{unreadCount[tabKey]}</span>
          </span>
        )}
        {tabKey !== "#public" && (
          <span className="close-button" onClick={() => handleCloseRoom(tabKey)}>X</span>
        )}
      </>
    );
  }

  return (
    <>
      <Tabs
        className="mb-3 tabs bg-light"
        activeKey={activeRoom}
        onSelect={(eventKey) => handleSelectKey(eventKey)}
      >
        {rooms.map(([key], index) => (
          <Tab eventKey={key} title={renderTabTitle(key)} key={index} className="tab-key">
            <Room roomKey={key} key={index} onCountUnread={ handleCountUnreadMessages } />
          </Tab>
        ))}
      </Tabs>
    </>
  );
};

export default Rooms;