const { User } = require("../models/user");

const sockets = {};

/**socket = {...
 *            data: {
 *              user: {
 *                _id: String,  
 * }}} */

const userLoginHandlers = (io, socket) => {
  socket.on("user_login", async () => {
    /** user = {username: String, id: Number, isInPublic: boolean} */
    
    const userId = socket.data.user._id;
    const user = await User.findById(userId); // find user with provided id in db

    socket.data.user.username = user.username.toLowerCase();

    /** add current socket to sockets, using user's name as its key */
    sockets[user.username] = socket;

    if (user.isInPublic) socket.join("#public");

    const users = await User.find({
      status: { $in: ["online", "idle", "busy"] },
    }).sort("name");
      
    io.to("#public").emit("all_users", users);
  });

  socket.on("disconnect", async () => {
    const userId = socket.data.user._id;
    /**For Notification */
    const disconnectedUser = await User.findByIdAndUpdate(
      userId,
      { status: "disconnected" },
      { new: true }
    );

    const users = await User.find({
      status: { $in: ["online", "idle", "busy"] },
    }).sort("name");

    io.emit("all_users", users);
    console.log(disconnectedUser.username + " disconnect");
  });
};

const updateUserHandlers = (io, socket) => {
    socket.on("update_status", async (status) => {
    const userId = socket.data.user._id;
    /**For Notification */
    const updatedUser = await User.findByIdAndUpdate(userId, { status }, { new: true });
      
    const users = await User.find({
      status: { $in: ["online", "idle", "busy"] },
    }).sort("name");
        
    io.emit("all_users", users);
  });
};

const getSocket = (username) => {
  return sockets[username];
};

module.exports = {
  userLoginHandlers,
  updateUserHandlers,
  getSocket,
};
