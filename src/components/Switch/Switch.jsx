import React from "react";
import "./Switch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const Switch = ({ labels, switchId }) => {
  const currentTempUnitContext = React.useContext(
    CurrentTemperatureUnitContext
  );
  const fSwitchTexts = document.querySelectorAll(".switch__text_f");
  const cSwitchTexts = document.querySelectorAll(".switch__text_c");

  // function toggleSwitchText(arr. ) {
  //   for (let i = 0; i < switchTexts.length; i++) {
  //     if (i % 2 === num) {
  //       switchTexts[i].classList.remove("switch__text_checked");
  //     } else {
  //       switchTexts[i].classList.add("switch__text_checked");
  //     }
  //   }
  // }

  function toggleSwitch() {
    if (currentTempUnitContext.currentTemperatureUnit === "F") {
      currentTempUnitContext.setCurrentTemperatureUnit("C");
      // toggleSwitchText(0);
      switchTexts[0].classList.remove("switch__text_checked");
      switchTexts[1].classList.add("switch__text_checked");
    } else {
      currentTempUnitContext.setCurrentTemperatureUnit("F");
      toggleSwitchText(1);
      // switchTexts[0].classList.add("switch__text_checked");
      // switchTexts[1].classList.remove("switch__text_checked");
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
