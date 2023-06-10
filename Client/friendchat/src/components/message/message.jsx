import "./message.css";
import React from "react";
import ListGroup from "react-bootstrap/esm/ListGroup";


function Message({ sender, payload }) {

  const renderMessage = () => {
    const { type, data } = payload;

    if (/^image/.test(type)) {
      return <img src={data} width="400px" alt=""/> 
    }
    
    return payload.data;
  }
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{sender}</div>
        {renderMessage()}
      </div>
    </ListGroup.Item>
  );
}

export default Message;

/*message = {
  sender: "",
  payload: {
    type: <text or image>
    data: ""
  }
} */
