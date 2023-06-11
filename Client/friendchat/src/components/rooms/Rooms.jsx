import "./rooms.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import CloseButton from "react-bootstrap/CloseButton";
import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { getMessage } from "../../services/messageServices";
import Room from "../room/Room";

const Rooms = ({ rooms, onCheckPacket }) => {
  const {onReadMessages, storeRoomData, removeRoom} = useStoreActions(actions => actions)
  const [currentMessage, setCurrentMessage] = useState("");
  const [newActiveKey, setNewActiveKey] = useState("");
  const [unreadCount, setUnreadCount] = useState({ });

  const handleCountUnreadMessages = (roomKey, count) => {
    const unreadCountList = { ...unreadCount };
    unreadCountList[roomKey] = count;
    setUnreadCount({ ...unreadCountList });
  }

  const handleSelectKey = eventKey => {
    handleCountUnreadMessages(eventKey, 0);
    setNewActiveKey(eventKey);
  }

  const handleCloseRoom = roomKey => {
    storeRoomData(roomKey);
    removeRoom(roomKey);
  }

  useEffect(() => {
    getMessage(setCurrentMessage);
  }, [])

  useEffect(() => {
    if (currentMessage)
      onCheckPacket(currentMessage);
  }, [currentMessage])

  useEffect(() => {
    /**new tab opens automatically only if the chat is launched by user*/
    if (rooms.length > 0) {
      const newRoom = rooms[rooms.length - 1];
      if (
        newRoom[1].readMessages.length === 0 &&
        newRoom[1].unreadMessages.length === 0
      ) {
        setNewActiveKey(newRoom[0]);
      }
    }
  }, [rooms]);

  useEffect(() => {
    if(newActiveKey)
      onReadMessages(newActiveKey);
  }, [newActiveKey, currentMessage])

  const renderTabTitle = tabKey => {
    return (
      <>
        {tabKey}
        {unreadCount[tabKey] > 0 && (
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
        activeKey={newActiveKey}
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