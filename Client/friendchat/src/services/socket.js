import { io } from "socket.io-client";

const URL = `http://localhost:4000`;

/*let socket;

const connectSocket = authToken => {
    socket = io(URL, {
      auth: {
        token: authToken,
      },
    });
}*/


class Socket {
  static socket; /**Singleton Pattern*/
  static handlers = [];

  static connectSocket = (authToken) => {
    this.socket = io(URL, {
      auth: {
        token: authToken,
      },
    });

    this.notify();
  };

  /**Observer Pattern */
  static addHandler = (handler) => {
    this.handlers[this.handlers.length++] = handler;
  };

  static notify() {
    for (let i = 0; i < this.handlers.length; i++) {
      this.handlers[i].update();
    }
  }

  static get = () => this.socket;

  static getStatus = callBack => {
    this.socket.on("socket_connected", () => {

      callBack(true);
    });
  }
}

export default Socket;

