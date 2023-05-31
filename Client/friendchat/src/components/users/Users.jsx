//import { Link } from "react-router-dom";
import "./users.css";

const Users = ({ users }) => {
  return (    
      <ul className="users scroll rounded-top bg-white">
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
  );
};

export default Users;
