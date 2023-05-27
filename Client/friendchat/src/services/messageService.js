import socket from './socket';

export const sendMessage = msg => {
    socket.emit("chat message", msg);
}

export const getMessage = callback => {
    socket.on("chat message", msg => {
        callback(msg);
    })
}