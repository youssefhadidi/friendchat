import { action, thunk } from "easy-peasy";
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
    state.users = payload;
  }),

  rooms: [],
  addRoom: action((state, room) => {
    state.rooms.push(room);
  }),
};

export default model;
