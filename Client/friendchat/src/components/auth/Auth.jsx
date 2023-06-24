import './auth.css';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useState, useEffect } from 'react';
import Login from '../login/login';
import Register from '../register/Register';
//import { registerUser, loginUser, connectUser } from '../../services/userServices';
import UserService from '../../services/userServices';
import Socket from "../../services/socket";
import Joi from 'joi';

const Auth = () => {
    const { user } = useStoreState(state => state);
    const { setUser } = useStoreActions(actions => actions);
    const [tokens, setTokens] = useState({});
    const [errors, setErrors] = useState({});

    const validate = (userData, schema) => {
        const joiSchema = Joi.object(schema);
        const data = { ...userData };
        const errors = {};
        const options = { abortEarly: false };

        const { error } = joiSchema.validate(data, options);
        if (!error) return null;

        error.details.map(err => errors[err.path[0]] = err.message);
        
        return errors;
    }

    const validateProperty = ({ name, value }, schema) => {
        const propertySchema = Joi.object({ [name]: schema[name] });
        const propertyData = { [name]: value };

        const { error } = propertySchema.validate(propertyData);
        
        return error ? error.details[0].message : null;
    }

    const handleLogin = async (userData, registerToken) => {
        try {
            const response = await UserService.loginUser(userData, registerToken);
            const authToken = response.headers["x-auth-token"];
            sessionStorage.setItem("authToken", authToken);
            const user = response.data;
            
            setTokens({ ...tokens, authToken: authToken });
            setUser(user);
            
            Socket.connectSocket(authToken);
            UserService.connectUser(user)
        } catch (error) {
            const loginError = { ...errors };
            loginError.message = error.message;
            console.log(error)

            setErrors(loginError);
        }
    }

    const handleRegister = async userData => {
        try {
            const { data: registerToken } = await UserService.registerUser(userData);
            sessionStorage.setItem("registerToken", registerToken);

            setTokens({ ...tokens, registerToken: registerToken });
            handleLogin({ email: userData.email, password: userData.password }, registerToken);
        } catch (error) {
            const registerError = { ...errors };
            registerError.message = error.message;

            setErrors(registerError);
        }
    }

    useEffect(() => {
        const storedTokens = { ...tokens };

        const registerToken = sessionStorage.getItem('registerToken');
        if (registerToken) storedTokens.registerToken = registerToken;

        const authToken = sessionStorage.getItem('authToken');
        if (authToken) {
            storedTokens.authToken = authToken;
            Socket.connectSocket(authToken);
            UserService.connectUser(user);
        }

        setTokens(storedTokens);
    }, []);

    if (!tokens.registerToken)
        return <Register validate={validate} validateProperty={validateProperty} onRegister={handleRegister} />;

    return (
      <Login
        validate={validate}
        validateProperty={validateProperty}
        onLogin={handleLogin}
        user={user}
        registerToken={tokens.registerToken}
      />
    );
}
 
export default Auth;