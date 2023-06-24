import './auth.css';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useState, useEffect } from 'react';
import Login from '../login/login';
import Register from '../register/Register';
import { registerUser, loginUser } from '../../services/userServices';
import Joi from 'joi';

const Auth = () => {
    const { user } = useStoreState(state => state);
    const { setUser } = useStoreActions(actions => actions);
    const [userData, setUserData] = useState({username: "", email: "", password: ""});
    const [errors, setErrors] = useState({});

    const validate = schema => {
        const data = { ...userData };
        const errors = {};
        const options = { abortEarly: false };

        const { error } = schema.validate(data, options);
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
            const response = await loginUser(userData, registerToken);
            const authToken = response.headers["x-auth-token"];
            sessionStorage.setItem("auth-token", authToken);
            const user = response.data;

            setUser(user);
        } catch (error) {
            const loginError = { ...errors };
            loginError.message = error.message;

            setErrors(loginError);
        }
    }

    const handleRegister = async userData => {
        try {
            const { data: registerToken } = await registerUser(userData);
            sessionStorage.setItem("register-token", registerToken);

            handleLogin({ email: userData.email, password: userData.password }, registerToken);
        } catch (error) {
            const registerError = { ...errors };
            registerError.message = error.message;

            setErrors(registerError);
        }
    }

    if (!sessionStorage.getItem('register-token'))
        return <Register validate={validate} validateProperty={validateProperty} onRegister={handleRegister} />;

    return <Login validate={validate} validateProperty={validateProperty} onLogin={handleLogin} user={user} />;
}
 
export default Auth;