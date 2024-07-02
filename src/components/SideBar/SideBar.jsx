import avatar from "../../assets/avatar.png";
import "./Sidebar.css";

export default function SideBar() {
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar sidebar__avatar_widescreen"
        src={avatar}
        alt="Terrence Tegegne"
      />
      <p className="sidebar__username sidebar__username_widescreen">
        Terrence Tegegne
      </p>
    </div>
  );
}
