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

    static update = () => {
        this.socket = this.ioSocket.get();
        console.log("update is called, socket: ");
        console.log(this.socket);
    }
    
    static registerUser = userData => {
        return http.post(`${apiEndpoint}/user/register`, userData);
    }

    static loginUser = (userData, registerToken) => {
        return http.post(`${apiEndpoint}/auth`, userData, {
            headers: {
                "x-auth-token": registerToken
            }
        });
    }

    static connectUser = user => {
        this.socket.volatile.emit("user_login", user);
    }

    static disconnect = () => {
        this.socket.disconnect();
    }

    static getAllUsers = setAllUsers => {
        console.log("socket " + this.socket);
        this.socket.on("all_users", users => {
            setAllUsers(users);
        })
    }

    static updateUserStatus = status => {
        this.socket.emit("update_status", status);
    }
}

export default UserService;
