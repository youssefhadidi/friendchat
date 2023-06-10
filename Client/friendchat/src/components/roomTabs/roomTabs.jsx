import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState, useEffect } from "react";
import Room from "../room/Room";

const RoomTabs = ({rooms}) => {
    const [newActiveKey, setNewActiveKey] = useState("");

    useEffect(() => {
    /**new tab opens automatically only if the chat is launched by user*/
    if (rooms.length > 0) {
      const newRoom = rooms[rooms.length - 1];
      if (newRoom[1].messages.length === 0) {
        setNewActiveKey(newRoom[0])
      }
    }
      
  }, [rooms])
    return (
      <>
        <Tabs
          className="mb-3 tabs bg-light"
          activeKey={newActiveKey}
          onSelect={(eventKey) => setNewActiveKey(eventKey)}
        >
          {rooms.map(([key], index) => (
            <Tab eventKey={key} title={key} key={index}>
              <Room roomKey={key} key={index} />
            </Tab>
          ))}
        </Tabs>
      </>
    );
}
 
export default RoomTabs;