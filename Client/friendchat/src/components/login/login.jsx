import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./login.css";
import { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';
import { validateUsername } from "../../services/userServices";

const Login = () => {
  const [username, setUsername] = useState("");
  const {onLogin, setLoginError} = useStoreActions(actions => actions); 
  const loginError = useStoreState(state => state.loginError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Client-side validation
    const error = validateUsername(username);
    if (error) {
      setLoginError(error);
      return;
    }
  
    onLogin({ username });
  };

  const handleChange = (e) => {
    setUsername((prevState, state) => {
      if (prevState !== state && loginError) setLoginError("");
      return e.target.value;
    });
  };

  useEffect(() => {
    if (username === "") setLoginError("");
  }, [username]);

  return (
    <Form className="login" onSubmit={(e) => handleSubmit(e)}>
      <Form.Group className="mb-3" controlId="login">
        <Form.Label>Login as</Form.Label>
        <Form.Control
          className="shadow-none"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => handleChange(e)}
          required
        />
      </Form.Group>
      {loginError && <Alert variant="secondary error-message">{loginError}</Alert>}
      <Button variant="primary" type="submit" disabled={!username || loginError}>
        Join Chat
      </Button>
    </Form>
  );
};

export default Login;
