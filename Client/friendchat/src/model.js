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
  
  /** Room Management */
  rooms: {},
  addRoom: action((state, { key, roomId, msg }) => {
    state.rooms[key] = {
      roomId,
      readMessages: [],
      unreadMessages: []
    }
    if (msg)
      state.rooms[key].unreadMessages.push(msg);
  }),
  getRooms: computed(state => Object.entries(state.rooms)),
  getRoom: computed(state => {
    return key => state.rooms[key];
  }),
  hasRoom: computed(state => {
    return key => state.rooms.hasOwnProperty(key);
  }),
  roomKeys: computed(state => Object.keys(state.rooms)),

  /** Messages Management */
  forwardMessage: action((state, packet) => {
    const { key, msg } = packet;
    const { sender } = msg;
    if (sender === state.user.username)
      state.rooms[key].readMessages.push(msg);
    else
      state.rooms[key].unreadMessages.push(msg);
  }),
  onReadMessages: action((state, roomKey) => {
    const unreadMessages = state.rooms[roomKey].unreadMessages;
    state.rooms[roomKey].readMessages.push(...unreadMessages);
    state.rooms[roomKey].unreadMessages = [];
  }),
  getUnreadMessages: computed(state => {
    return key => state.rooms[key].unreadMessages;
  }),
  getReadMessages: computed(state => {
    return key => state.rooms[key].readMessages;
  })
};

export default model;
