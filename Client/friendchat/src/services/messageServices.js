import socket from './socket';

export const sendMessage = msg => {
    socket.volatile.emit("chat_message", msg);
}

/** Polymorphism */
export const getMessage = callback => {
    socket.on("chat_message", msg => {
        console.log(msg)
        callback(msg);
    })
}

export const requestPrivateRoom = request => {
    socket.volatile.emit("set_private_room", request);
}

export const getRoomIdFromServer = callBack => {
    socket.on("set_private_room", response => {     
        console.log(response)
        callBack(response);
    })
}

