import Socket from './socket';

class MessageService {
  static ioSocket = Socket;
  static socket;

  static update = () => {
    this.socket = this.ioSocket.get();
    console.log("update in messageService is called, socket: ");
    console.log(this.socket);
  };

  static sendMessage = msg => {
    this.socket.volatile.emit("chat_message", msg);
  }

  static getMessage = callback => {
    this.socket.on("chat_message", msg => {
        callback(msg);
    })
  }
}

export default MessageService;

