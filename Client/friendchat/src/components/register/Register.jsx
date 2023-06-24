import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./register.css";
import { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import Joi from "joi";

const Register = ({validate, validateProperty, onRegister}) => {
  const [userData, setUserData] = useState({username: "", email: "", password: ""});
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(8).max(255).required(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate(schema);
    if (errors) return setErrors(errors);

    onRegister(userData);
  };

  const handleChange = ({ currentTarget: input }) => {
    const inputErrors = { ...errors };
    const errorMessage = validateProperty(input, schema);

    if (errorMessage) inputErrors[input.name] = errorMessage;
    else delete inputErrors[input.name];

    const data = { ...userData };
    data[input.name] = input.value;

    setErrors(inputErrors);
    setUserData(data);
  };

  useEffect(() => {
 
  }, []);

  return (
    <Form className="register" onSubmit={(e) => handleSubmit(e)}>
      <Form.Group className="mb-3" controlId="register">
        <Form.Label>Email</Form.Label>
        <Form.Control
          className="shadow-none"
          type="text"
          value={userData.email}
          name="email"
          onChange={(e) => handleChange(e)}
        />
        {errors.email && (
          <Alert variant="secondary error-message">{errors.email}</Alert>
        )}

        <Form.Label>Username</Form.Label>
        <Form.Control
          className="shadow-none"
          type="text"
          value={userData.username}
          name="username"
          onChange={(e) => handleChange(e)}
        />
        {errors.username && (
          <Alert variant="secondary error-message">{errors.username}</Alert>
        )}

        <Form.Label>Password</Form.Label>
        <Form.Control
          className="shadow-none"
          type="text"
          value={userData.password}
          name="password"
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
      {errors.password && (
        <Alert variant="secondary error-message">{errors.password}</Alert>
      )}

      <Button variant="primary" type="submit" disabled={validate()}>
        Sign Up
      </Button>
    </Form>
  );
};

export default Register;
