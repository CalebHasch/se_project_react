import React from "react";
import "./Switch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const Switch = ({ labels, switchId }) => {
  const currentTempUnitContext = React.useContext(
    CurrentTemperatureUnitContext
  );
  const fSwitchTexts = document.querySelectorAll(".switch__text_f");
  const cSwitchTexts = document.querySelectorAll(".switch__text_c");

  function toggleSwitchText(arr, isAdded) {
    console.log(arr);
    if (!isAdded) {
      arr.forEach((item) => item.classList.remove("switch__text_checked"));
    } else {
      arr.forEach((item) => item.classList.add("switch__text_checked"));
    }
  }

  function toggleSwitch() {
    if (currentTempUnitContext.currentTemperatureUnit === "F") {
      currentTempUnitContext.setCurrentTemperatureUnit("C");
      toggleSwitchText(cSwitchTexts, true);
      toggleSwitchText(fSwitchTexts, false);
    } else {
      currentTempUnitContext.setCurrentTemperatureUnit("F");
      toggleSwitchText(fSwitchTexts, true);
      toggleSwitchText(cSwitchTexts, false);
    }
  }

  return (
    <>
      <input
        className="switch__checkbox"
        onChange={toggleSwitch}
        id={`${switchId}-switch`}
        checked={currentTempUnitContext.currentTemperatureUnit === "C"}
        type="checkbox"
      />
      <label className="switch__label " htmlFor={`${switchId}-switch`}>
        <p className="switch__text switch__text_checked switch__text_f">
          {labels.first}
        </p>
        <span className={`switch__button`} />
        <p className="switch__text switch__text_c">{labels.second}</p>
      </label>
    </>
  );
};

export default Switch;
