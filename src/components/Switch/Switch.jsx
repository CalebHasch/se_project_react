import React from "react";
import "./Switch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const Switch = ({ labels, switchId }) => {
  const currentTempUnitContext = React.useContext(
    CurrentTemperatureUnitContext
  );
  const SwitchTexts = document.querySelectorAll(".switch__text");

  function toggleSwitch() {
    if (currentTempUnitContext.currentTemperatureUnit === "F") {
      currentTempUnitContext.setCurrentTemperatureUnit("C");
      SwitchTexts[0].classList.remove("switch__text_checked");
      SwitchTexts[1].classList.add("switch__text_checked");
    } else {
      currentTempUnitContext.setCurrentTemperatureUnit("F");
      SwitchTexts[0].classList.add("switch__text_checked");
      SwitchTexts[1].classList.remove("switch__text_checked");
    }
  }

  return (
    <>
      <input
        className="switch__checkbox"
        onChange={toggleSwitch}
        id={`${switchId}-switch`}
        type="checkbox"
      />
      <label className="switch__label" htmlFor={`${switchId}-switch`}>
        <p className="switch__text switch__text_checked">{labels.first}</p>
        <span className={`switch__button`} />
        <p className="switch__text">{labels.second}</p>
      </label>
    </>
  );
};

export default Switch;
