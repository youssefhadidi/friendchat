import { action, thunk, computed } from "easy-peasy";
import {
  connectUser,
  register,
  updateUserStatus,

} from "./services/userServices";

const model = {
  user: null,
  setUser: action((state, user) => {
    state.user = user;
  }),
  setUserStatus: action((state, status) => {
    state.user.status = status; 
    updateUserStatus(status);
  }),

  loginError: "",
  setLoginError: action((state, error) => {
    state.loginError = error;
  }),
  onLogin: thunk(async (actions, payload) => {
    try {
      const { data: user } = await register(payload);
      actions.setUser(user);
      connectUser(user);
    } catch (error) {
      actions.setLoginError(error.response.data);
    }
  }),

  allUsers: [],
  setAllUsers: action((state, payload) => {
    state.allUsers = payload;
  }),
  
  rooms: {},
  addRoom: action((state, { key, roomId, msg }) => {
    state.rooms[key] = { roomId };
    state.rooms[key].messages = [];
    if (msg)
      state.rooms[key].messages.push(msg);
  }),
  getRooms: computed(state => Object.entries(state.rooms)),
  getRoom: computed(state => {
    return key => state.rooms[key];
  }),
  hasRoom: computed(state => {
    return key => state.rooms.hasOwnProperty(key);
  }),
  roomKeys: computed(state => Object.keys(state.rooms)),
  forwardMessageToRoom: action((state, packet) => {
    const { key, msg } = packet;
    console.log("in forward method: ", packet)
    state.rooms[key].messages.push(msg);
  })

};

export default model;
