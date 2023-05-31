import './profile.css';
import Dropdown from "react-bootstrap/Dropdown";

const statuses = { online: "online", idle: "idle", busy: "busy" };

const Profile = ({ user, onChangeStatus }) => {
    const { username, status: currentStatus } = user;
    return (
      <>
        <h2 className="text-dark">{username}</h2>
        <Dropdown>
          <Dropdown.Toggle
            className="bg-light text-dark border-0"
            id="dropdown"
            size="lg"
          >
            <i
              className={"fa fa-circle status " + statuses[currentStatus]}
              aria-hidden="true"
            ></i>
            {currentStatus}
          </Dropdown.Toggle>

          <Dropdown.Menu>
                    {Object.keys(statuses).map((status) => {
                return status === currentStatus ? (
                  null
                ) : (
                  <Dropdown.Item
                    value={status}
                    onClick={() => onChangeStatus(status)}
                  >
                    <i
                      className={"fa fa-circle status " + statuses[status]}
                      aria-hidden="true"
                    ></i>
                    {status}
                  </Dropdown.Item>
                ); 
            })}
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
}
 
export default Profile;