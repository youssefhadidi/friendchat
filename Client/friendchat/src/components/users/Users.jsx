//import { Link } from "react-router-dom";
import "./users.css";

const Users = ({ users }) => {
  return (
    <ul className="users scroll rounded-top bg-white">
      {users.map((user, index) => (
        <li key={index}>
          <i
            className={"fa fa-circle status " + user.status}
            aria-hidden="true"
          ></i>
          {user.username}
        </li>
      ))}
    </ul>
  );
};

export default Users;
