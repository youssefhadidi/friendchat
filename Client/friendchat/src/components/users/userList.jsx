//import { Link } from "react-router-dom";
import "./userList.css";

const UserList = ({ users }) => {
  return (
    <div className="usersList">
      <h2 className="text-dark">Online</h2>
      <ul className="users scroll">
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
