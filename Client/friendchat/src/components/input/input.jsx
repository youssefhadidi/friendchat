import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import './input.css';
import { useState } from "react";

const Input = ({ onSubmit }) => {
    const [value, setValue] = useState("");
    
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  }
    
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <InputGroup className="input">
        <Form.Control
          className="shadow-none"
          aria-label="message"
          aria-describedby="basic-addon2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button variant="outline-secondary" id="button-addon2" type="submit">
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default Input;
