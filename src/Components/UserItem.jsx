import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/userItem.css';

function UserItem({user}) {
  const navigate = useNavigate();

  const handleShowOrgs = () => {
    navigate(`/organizations/${user.login}`);
  };

  const handleShowRepos = () => {
    navigate(`/repositories/${user.login}`);
  };

  return (
    <tr className="user-item">
      <td className="avatar-cell">
        <img src={user.avatar_url} alt={user.login} style={{ width: '50px', height: '50px' }} />
      </td>
      <td className="username-cell">
        {user.login}
      </td>
      <td className="actions-cell">
        <div className="button-group">
          <button onClick={handleShowOrgs}>
            Show Organizations
          </button>
          <button onClick={handleShowRepos}>
            Show Repositories
          </button>
        </div>
      </td>
    </tr>
  );
}

export default UserItem;
