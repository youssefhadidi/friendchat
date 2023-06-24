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
    static socket;
    static handlers = [];
    
    static connectSocket = (authToken) => {
        this.socket = io(URL, {
            auth: {
            token: authToken,
            },
        });

        this.notify();
    };

    static addHandler = handler => {
        console.log("handler: " + handler);
        this.handlers[this.handlers.length++] = handler; 
    }

    static notify() {
        for (let i = 0; i < this.handlers.length; i++) {
            this.handlers[i].update();
        } 
    }

    static get = () => this.socket;
}

export default Socket;

