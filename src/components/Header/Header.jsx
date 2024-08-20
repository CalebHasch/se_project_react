import { useEffect, useState, useRef, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import headerLogo from "../../assets/wtwr-logo.png";
import menu from "../../assets/headerMenu.png";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

export default function Header({ weatherData, handleButtonClick, modal }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const navigationRef = useRef(null);
  const user = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  function toggleMobileMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }

  function showMenuButton() {
    if (window.innerWidth <= 630) {
      navigationRef.current.classList.add("header__navigation_shown");
    } else {
      navigationRef.current.classList.remove("header__navigation_shown");
    }
  }

  useEffect(() => {
    showMenuButton();
    window.addEventListener("resize", showMenuButton);

    return () => window.removeEventListener("resize", showMenuButton);
  }, []);

  return (
    <div className="header">
      <div className="header__container header__container_left">
        <NavLink to="/">
          <img className="header__logo" src={headerLogo} alt="WTWR logo" />
        </NavLink>
        <p className="header__location-time">
          {currentDate}, {weatherData.location}
        </p>
      </div>
      <div>
        <div className="header__container header__container_widescreen">
          <ToggleSwitch
            labels={{ first: "F", second: "C" }}
            switchId={"header"}
          />
          {!user ? (
            <div className="header__container">
              <button
                className="header__add-button header__signup"
                onClick={() => handleButtonClick("registration")}
              >
                Sign Up
              </button>
              <button
                className="header__add-button"
                onClick={() => handleButtonClick("login")}
              >
                Login
              </button>
            </div>
          ) : (
            <div className="header__container">
              <button
                className="header__add-button"
                onClick={() => handleButtonClick(modal)}
              >
                + Add clothes
              </button>
              <NavLink to="/profile" style={{ textDecoration: "none" }}>
                <p className="header__username">{user.data.name}</p>
              </NavLink>
              {user.data.avatar ? (
                <img
                  className="header__avatar"
                  src={user.data.avatar}
                  alt={user.data.name}
                />
              ) : (
                <span className="header__avatar header__avatar_empty">
                  {user.data.name.split("")[0].toUpperCase()}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="header__container">
          <div className="header__navigation" ref={navigationRef}>
            {!isMobileMenuOpened ? (
              <img
                className="header__menu"
                src={menu}
                alt="menu"
                onClick={toggleMobileMenu}
              />
            ) : !user ? (
              <div className="header__nav-container">
                <button
                  className="header__close"
                  type="button"
                  aria-label="close"
                  onClick={toggleMobileMenu}
                ></button>
                <button
                  className="header__add-button header__signup_column"
                  onClick={() => handleButtonClick("registration")}
                >
                  Sign Up
                </button>
                <button
                  className="header__add-button header__signup_column"
                  onClick={() => handleButtonClick("login")}
                >
                  Login
                </button>
                <ToggleSwitch
                  labels={{ first: "F", second: "C" }}
                  switchId={"nav"}
                />
              </div>
            ) : (
              <div className="header__nav-container">
                <button
                  className="header__close"
                  type="button"
                  aria-label="close"
                  onClick={toggleMobileMenu}
                ></button>
                <div className="header__user-container">
                  <NavLink to="/profile" style={{ textDecoration: "none" }}>
                    <p className="header__username">{user.data.name}</p>
                  </NavLink>
                  {user.data.avatar ? (
                    <img
                      className="header__avatar"
                      src={user.data.avatar}
                      alt={user.data.name}
                    />
                  ) : (
                    <span className="header__avatar header__avatar_empty">
                      {user.data.name.split("")[0].toUpperCase()}
                    </span>
                  )}
                </div>
                <button
                  className="header__add-button"
                  onClick={() => handleButtonClick(modal)}
                >
                  + Add clothes
                </button>
                <ToggleSwitch
                  labels={{ first: "F", second: "C" }}
                  switchId={"nav"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
