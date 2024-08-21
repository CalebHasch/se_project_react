import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Sidebar.css";

export default function SideBar({ onOpen, onLogout }) {
  const user = useContext(CurrentUserContext);

  function handleEditOpen() {
    onOpen("edit-profile");
  }

  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={user.avatar} alt={user.name} />
      <div className="sidebar__container">
        <p className="sidebar__username">{user.name}</p>
        <p className="sidebar__profile-text" onClick={handleEditOpen}>
          Change profile data
        </p>
        <p className="sidebar__profile-text" onClick={onLogout}>
          Log out
        </p>
      </div>
    </div>
  );
}
