import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './login.css'
import { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    onLogin({username});
  }

    return (
      <Form className="login" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="login">
          <Form.Label>Login as</Form.Label>
          <Form.Control type="text" placeholder="Username" value={username} onChange={ e => setUsername(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Join Chat
        </Button>
      </Form>
    );
}
 
export default Login;