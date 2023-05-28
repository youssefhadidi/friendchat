import socket from './socket';
import http from "./httpServices";

const apiEndpoint = "http://localhost:4000/api/users";

export const register = user => {
    return http.post(apiEndpoint, user);
}

export const connectUser = user => {
    socket.emit("user login", user);
}

export const getAllUsers = callBack => {
    socket.on("all users", users => {
        callBack(users);
    } )
}
