import headerLogo from "../../assets/wtwr-logo.png";
import avatar from "../../assets/avatar.png";
import menu from "../../assets/headerMenu.png";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export default function Header({ weatherData, handleButtonClick, modal }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const navigationRef = useRef(null);

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
          <button
            className="header__add-button"
            onClick={() => handleButtonClick(modal)}
          >
            + Add clothes
          </button>
          <NavLink to="/profile" style={{ textDecoration: "none" }}>
            <p className="header__username">Terrence Tegegne</p>
          </NavLink>
          <img className="header__avatar" src={avatar} alt="Terrence Tegegne" />
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
                    <p className="header__username">Terrence Tegegne</p>
                  </NavLink>
                  <img
                    className="header__avatar"
                    src={avatar}
                    alt="Terrence Tegegne"
                  />
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
