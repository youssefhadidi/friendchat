import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./login.css";
import { useState, useEffect } from "react";
import Joi from 'joi';

const Login = ({validate, validateProperty, onLogin, user}) => {
  /*const [username, setUsername] = useState("");
  const {onLogin, setLoginError} = useStoreActions(actions => actions); 
  const loginError = useStoreState(state => state.loginError);*/

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(8).max(255).required(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Client-side validation
    const errors = validate(schema);
    if (errors) return setErrors(errors);

    const registerToken = sessionStorage.getItem("register-token");
    onLogin(userData, registerToken);

  };

  const handleChange = ({currentTarget: input}) => {
    const inputErrors = {...errors};

    const errorMessage = validateProperty(input, schema);
    if (errorMessage) inputErrors[input.name] = errorMessage;
    else delete inputErrors[input.name];

    const data = { ...userData };
    data[input.name] = input.value;

    setUserData(data);
    setErrors(inputErrors);
  };

  if (user) return (
    <div>
      <h2>Hello, {user.username}!</h2>
      <Button variant="primary" type="submit">
        Join Chat
      </Button>
    </div>
  );

  return (
    <Form className="login" onSubmit={(e) => handleSubmit(e)}>
      <Form.Group className="mb-3" controlId="login">
        <Form.Label>Email</Form.Label>
        <Form.Control
          className="shadow-none"
          type="text"
          name="email"
          value={userData.email}
          onChange={(e) => handleChange(e)}
        />
        {errors.password && (
          <Alert variant="secondary error-message">{errors.password}</Alert>
        )}

        <Form.Label>Password</Form.Label>
        <Form.Control
          className="shadow-none"
          type="password"
          name="password"
          value={userData.password}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
      {errors.password && (
        <Alert variant="secondary error-message">{errors.password}</Alert>
      )}

      <Button variant="primary" type="submit" disabled={validate()}>
        Join Chat
      </Button>
    </Form>
  );
};

export default Login;
