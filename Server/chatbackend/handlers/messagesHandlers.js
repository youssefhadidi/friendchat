const { getUser, getSocket } = require("./userHandlers");

const messagesDelivery = (io, socket) => {  
    socket.on("chat_message", packet => {
        io.to(packet.to).emit("chat_message", packet);
    })
}

const roomServicesHandler = (io, socket) => {  
    socket.on("set_private_room", async request => {
        /**request = {sender, to} */
        console.log("room request");

        const receiverId = request.to;
        const roomId = socket.data.userId + receiverId;
        const toSocket = getSocket(receiverId);
        if (!toSocket)
            throw new Error("User Not Exist");

        socket.join(roomId);
        toSocket.join(roomId);

        io.to(roomId).emit("set_private_room", {
          sender: getUser(socket.data.username),
          to: getUser(toSocket.data.username),
          roomId,
        });
        
    })  
}

module.exports = { messagesDelivery, roomServicesHandler };

/* { sender: user.username,
     payload: {type: String,
               data: String},

     to: "#public" }*/