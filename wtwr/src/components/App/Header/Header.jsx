import headerLogo from "../../../assets/wtwr-logo.png";
import avatar from "../../../assets/avatar.png";
import "./Header.css";

function Header({ weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="header">
      <div className="headerContainer">
        <img className="headerLogo" src={headerLogo} />
        <h2 className="headerLocationTime">
          {currentDate}, {weatherData.location}
        </h2>
      </div>
      <div className="headerContainer">
        <button className="headerButton">+ Add clothes</button>
        <h2 className="headerUserName">Terrence Tegegne</h2>
        <img className="headerAvatar" src={avatar} />
      </div>
    </div>
  );
}

export default Header;
