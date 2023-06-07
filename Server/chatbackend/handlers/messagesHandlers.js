
const publicMessagesHandler = (io, socket) => {
    socket.on("chat_message", (msg) => {
      io.emit("chat_message", msg);
    });
}

module.exports = { publicMessagesHandler };