import React from 'react';
import ListGroup from 'react-bootstrap/esm/ListGroup';

function Message({sender, text}) {
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{sender}</div>
        {text}
      </div>
    </ListGroup.Item>
  );
}

export default Message