//import { Link } from "react-router-dom";
import "./users.css";
import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { getAllUsers } from '../../services/userServices';


const Users = () => {
  const { allUsers: users } = useStoreState(state => state);
  const setAllUsers = useStoreActions(actions => actions.setAllUsers);

  useEffect(() => {
    getAllUsers(setAllUsers);
  }, [users]);

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

// user = {username: String, id: number, status: String};
