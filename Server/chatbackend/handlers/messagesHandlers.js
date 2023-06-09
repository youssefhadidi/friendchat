const { getUser } = require("./userHandlers");

const messagesDelivery = (io, packet) => {  
      io.to(packet.to).emit("chat_message", packet);
}

const privateRoomHandler = async (io, socket) => {  
    /** join users in one room and send request to join room to both users */
    const toId = packet.to;
    const roomId = socket.userId + toId;

    try {
      const sockets = await io.fetchSockets();
      const toSocket = sockets[toId];
      socket.join(roomId);
      toSocket.join(roomId);

      io.to(roomId).emit("join_private_room", {
        sender: getUser(socket.username),
        to: getUser(toSocket.username),
        roomId,
      });
    } catch (error) {
      console.log(error);
    }

}

const messagesHandlers = (io, socket) => {
    socket.on("chat_message", packet => {
        if (packet.to === "#public")
            return messagesDelivery(io, packet);
        
        privateRoomHandler(io, socket, packet);

        messagesDelivery(io, packet);
    });
}

module.exports = { messagesHandlers };

/* { sender: user.username,
     payload: {type: String,
               data: String},

     to: "#public" }*/