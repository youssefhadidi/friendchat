import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import './input.css';
import { useState, useEffect } from "react";
import { getFile } from "../../services/messageService";

const Input = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const [dataUrl, setDataUrl] = useState("");
    
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  }

  useEffect(() => {
    //onSubmit(dataUrl)
  }, [dataUrl])

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
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={() => getFile(setDataUrl)}
        >Choose file</Button>
        <Button variant="outline-secondary" id="button-addon2" type="submit">
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default Input;
