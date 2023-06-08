const { getUser } = require("./userHandlers");

const publicMessagesHandler = (io, socket) => {
    socket.on("chat_message", packet => {
      io.to(packet.roomId).emit("chat_message", packet);
    });
}

const privateMessagesHandler = (io, socket) => {
    socket.on("send_private_message", async packet => {
        const toId = packet.to;
        const roomId = socket.userId + toId;
        try {
            const sockets = await io.fetchSockets();
            const toSocket = sockets[toId];
            socket.join(roomId);
            toSocket.join(roomId);

            io.to(roomId).emit("join_private_room", {sender: getUser(socket.username), to: getUser(toSocket.username), roomId});
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("private_message", packet => {
        io.to(packet.roomId).emit("private_message", packet);
    });

}

module.exports = { publicMessagesHandler };

/* { sender: user.username,
     payload: {type: String,
               data: String},

     to: "#public" }*/