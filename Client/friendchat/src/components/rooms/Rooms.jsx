import React from 'react';
import { Nav } from 'bootstrap-4-react';

const Rooms = ({ rooms }) => {
  
    return (
      <Nav tabs>
        <Nav.Item active href="#">
          Active
        </Nav.Item>
        <Nav.Item href="#">Link</Nav.Item>
        <Nav.Item href="#">Link</Nav.Item>
        <Nav.Item href="#" disabled>
          Disabled
        </Nav.Item>
      </Nav>
    );
}
 
export default Rooms;