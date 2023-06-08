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
  addRoom: action((state, {key, roomId}) => {
    state.rooms[key] = {roomId};
  }),
  getRooms: computed(state => Object.entries(state.rooms)),
  roomKeys: computed(state => Object.keys(state.rooms))
};

export default model;
