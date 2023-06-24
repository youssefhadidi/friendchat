import socket from './socket';
import http from "./httpServices";

const apiEndpoint = "http://localhost:4000/api";

export const registerUser = userData => {
    return http.post(`${apiEndpoint}/user/register`, userData);
}

export const loginUser = (userData, registerToken) => {
    return http.post(`${apiEndpoint}/auth`, userData, {
        headers: {
            "x-auth-token": registerToken
        }
    });
}

// Client-side username validation
export const validateUsername = username => {
    const regexPattern = /^[A-Za-z0-9]/;
    const valid = regexPattern.test(username);
    if (!valid) return "Invalid Username";

    return null;
} 

export const connectUser = user => {
    socket.volatile.emit("user_login", user);
}

export const disconnect = () => {
    socket.disconnect();
}

export const getAllUsers = setAllUsers => {
    socket.on("all_users", users => {
        setAllUsers(users);
    })
}

export const updateUserStatus = status => {
    socket.emit("update_status", status);
}
