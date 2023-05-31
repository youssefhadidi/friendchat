import socket from './socket';
import http from "./httpServices";

const apiEndpoint = "http://localhost:4000/api/users";

export const register = user => {
    return http.post(apiEndpoint, user);
}

// Client-side username validation
export const validateUsername = username => {
    const regexPattern = /^[A-Za-z0-9]/;
    console.log("client side validation")
    const valid = regexPattern.test(username);
    if (!valid) return "Invalid Username";

    return null;
} 

export const connectUser = user => {
    socket.emit("user_login", user);
}

export const getAllUsers = callBack => {
    socket.on("all_users", users => {
        callBack(users);
    } )
}

export const updateUserStatus = status => {
    socket.emit("update_status", status);
}
