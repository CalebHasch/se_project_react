import headerLogo from "../../../assets/wtwr-logo.png";
import avatar from "../../../assets/avatar.png";
import "./Header.css";

export default function Header({ weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="header">
      <div className="header__container">
        <img className="header__logo" src={headerLogo} />
        <p className="header__location-time">
          {currentDate}, {weatherData.location}
        </p>
      </div>
      <div className="header__container">
        <button className="header__add-button">+ Add clothes</button>
        <p className="header__username">Terrence Tegegne</p>
        <img className="header__avatar" src={avatar} />
      </div>
    </div>
  );
}
