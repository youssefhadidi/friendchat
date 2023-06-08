import React from "react";
import Nav from "react-bootstrap/Nav";
import { useState, useEffect } from "react";

const Tabs = ({tabs}) => {
    
    return (
      <Nav variant="tabs" >
        {tabs.map((label, index) => (
          <Nav.Item key={"tab-" + index}>{label}</Nav.Item>
        ))}
      </Nav>
    );
};

export default Tabs;