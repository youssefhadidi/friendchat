import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import './input.css';
import { useState, useEffect } from "react";
import { getFile, reader } from "../../services/messageService";

const Input = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
    
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ payload: { type: "text", data: value } });
    setValue('');
  }

  // no idea how to call this function
  const handleFile = async () => {
    const file = await getFile(); 
    setFile(file);
  }

  useEffect(() => {
    if(file)
      reader(file).then(res => onSubmit({payload: {type: file.type, data: res}}));
  }, [file])

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
          onClick={handleFile}
        >
          Choose file
        </Button>
        <Button variant="outline-secondary" id="button-addon2" type="submit">
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default Input;
