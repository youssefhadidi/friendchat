import socket from './socket';

export const sendMessage = msg => {
    socket.volatile.emit("chat_message", msg);
}

export const getMessage = callback => {
    socket.on("chat_message", msg => {
        callback(msg);
    })
}

