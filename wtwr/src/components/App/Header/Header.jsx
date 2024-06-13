import headerLogo from "../../../assets/wtwr-logo.png";
import avatar from "../../../assets/avatar.png";
import "./Header.css";

function Header() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const location = "location";

  return (
    <div className="header">
      <div className="headerContainer">
        <img className="headerLogo" src={headerLogo} />
        <h2 className="locationTime">
          {currentDate}, {location}
        </h2>
      </div>
      <div className="headerContainer">
        <button className="addClothesButton">Add clothes</button>
        <h2 className="userName">Terrence Tegegne</h2>
        <img className="avatar" src={avatar} />
      </div>
    </div>
  );
}

export default Header;
