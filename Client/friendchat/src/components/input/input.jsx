import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import './input.css';
import { useState } from "react";

const Input = ({ onSubmit }) => {
    const [value, setValue] = useState("");
    
    const handleSubmit = () => {
        console.log(value)
        onSubmit(value);
        setValue('');
    }
    
  return (
    <InputGroup className="mb-3 input">
      <Form.Control
        aria-label="message"
        aria-describedby="basic-addon2"
              value={value}
              onChange={e => setValue(e.target.value)}
      />
      <Button variant="outline-secondary" id="button-addon2" onClick={handleSubmit}>
        Send
      </Button>
    </InputGroup>
  );
};

export default Input;
