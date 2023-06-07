const { getUser } = require("./userHandlers");

const publicMessagesHandler = (io, socket) => {
    socket.on("chat_message", packet => {
      io.to(packet.to).emit("chat_message", packet);
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

            io.to(roomId).emit("join_private_room", {from: getUser(socket.username), to: getUser(socket.username)});
        } catch (error) {
            console.log(error);
        }
    });


}

module.exports = { publicMessagesHandler };

/* { sender: user.username,
     payload: {type: String,
               data: String},

     to: "#public" }*/