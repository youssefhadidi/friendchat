import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import './login.css'
import { useState, useEffect } from "react";
import { register, validateUsername } from "../../services/userServices";

const Login = ({onLogin}) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    // Client-side validation
    const error = validateUsername(username);
    if (error) {
      setError(error)
      return;
    }

    let user;
    try {
      const { data } = await register({ username });
      user = data;
    } catch (error) {
      setError(error.response.data);
      return;
    }
    onLogin(user);
  }

  const handleChange = e => {
    setUsername((prevState, state) => {
      if (prevState !== state && error)
        setError("");
      
      return e.target.value
    });
  }

  

  useEffect(() => {
    if (username === "")
      setError("");
  }, [username])

    return (
      <Form className="login" onSubmit={e => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="login">
          <Form.Label>Login as</Form.Label>
          <Form.Control className="shadow-none" type="text" placeholder="Username" value={username} onChange={e => handleChange(e)} required/>
        </Form.Group>
        {error && <Alert variant="secondary error-message">{error}</Alert>}
        <Button variant="primary" type="submit" disabled={!username || error}>
          Join Chat
        </Button>
      </Form>
    );
}
 
export default Login;