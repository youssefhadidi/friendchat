import Socket from './socket';
import http from "./httpServices";

const apiEndpoint = "http://localhost:4000/api";

/*let socket;
const handleGetSocket = () => {
    socket = Socket.getSocket();
}

Socket.addHandler(handleGetSocket);

console.log("socket ", socket);*/

class UserService {
  static ioSocket = Socket;
  static socket;

  /**Observer Pattern */
  static update = () => {
    this.socket = this.ioSocket.get();
  };

  static registerUser = (userData) => {
    return http.post(`${apiEndpoint}/user/register`, userData);
  };

  static loginUser = (userData, registerToken) => {
    return http.post(`${apiEndpoint}/auth`, userData, {
      headers: {
        "x-auth-token": registerToken,
      },
    });
  };

  static connectUser = (user) => {
    /*if (this.socket.connected)
      console.log("socket connected")
    else console.log("not connected yet")*/
    this.socket.volatile.emit("user_login", user);
  };

  static disconnect = () => {
    this.socket.disconnect();
  };

  static getAllUsers = (setAllUsers) => {
    this.socket.on("all_users", (users) => {
      setAllUsers(users);
    });
  };

  static updateUserStatus = (status) => {
    this.socket.emit("update_status", status);
  };
}

export default UserService;
