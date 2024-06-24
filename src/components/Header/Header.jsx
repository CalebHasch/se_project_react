import headerLogo from "../../assets/wtwr-logo.png";
import avatar from "../../assets/avatar.png";
import menu from "../../assets/headerMenu.png";
import "./Header.css";
import { useEffect, useState } from "react";

export default function Header({ weatherData, handleButtonClick, modal }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  let navigationElement;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  function toggleMobileMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }

  function showMenuButton() {
    if (window.innerWidth <= 630) {
      navigationElement.classList.add("header__navigation_shown");
    } else {
      navigationElement.classList.remove("header__navigation_shown");
    }
  }

  useEffect(() => {
    navigationElement = document.querySelector(".header__navigation");
    window.addEventListener("resize", showMenuButton);
  }, [() => window.removeEventListener("resize", showMenuButton)]);

  return (
    <div className="header">
      <div className="header__container">
        <img className="header__logo" src={headerLogo} alt="WTWR logo" />
        <p className="header__location-time">
          {currentDate}, {weatherData.location}
        </p>
      </div>
      <div className="header__container">
        <button
          className="header__add-button header__add-button_widescreen"
          onClick={() => handleButtonClick(modal)}
        >
          + Add clothes
        </button>
        <p className="header__username header__username_widescreen">
          Terrence Tegegne
        </p>
        <img
          className="header__avatar header__avatar_widescreen"
          src={avatar}
          alt="Terrence Tegegne"
        />
        <div className="header__navigation">
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
                <p className="header__username">Terrence Tegegne</p>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
