import socket from './socket';
import http from "./httpServices";

const endpoint = "http://localhost:5000/api/users";

export const register = user => {
    //return http.post(endpoint, {username: user});
    socket.emit("user login", user);  
}

export const getAllUsers = callBack => {
    socket.on("all users", users => {
        callBack(users);
    } )
}
