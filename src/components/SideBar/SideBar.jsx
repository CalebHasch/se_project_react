import avatar from "../../assets/avatar.png";
import "./Sidebar.css";

export default function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Terrence Tegegne" />
      <div className="sidebar__container">
        <p className="sidebar__username">Terrence Tegegne</p>
        <p className="sidebar__profile-text">Change profile data</p>
        <p className="sidebar__profile-text">Log out</p>
      </div>
    </div>
  );
}
