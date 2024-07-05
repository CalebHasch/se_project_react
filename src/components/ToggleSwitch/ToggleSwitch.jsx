import React from "react";
import { useRef } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch({ labels, switchId }) {
  const currentTempUnitContext = React.useContext(
    CurrentTemperatureUnitContext
  );

  const fSwitchTextsRef = useRef(null);
  const cSwitchTextsRef = useRef(null);

  function toggleSwitch() {
    if (currentTempUnitContext.currentTemperatureUnit === "F") {
      currentTempUnitContext.setCurrentTemperatureUnit("C");
      fSwitchTextsRef.current.classList.remove("switch__text_checked");
      cSwitchTextsRef.current.classList.add("switch__text_checked");
    } else {
      currentTempUnitContext.setCurrentTemperatureUnit("F");
      fSwitchTextsRef.current.classList.add("switch__text_checked");
      cSwitchTextsRef.current.classList.remove("switch__text_checked");
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
        <p
          className="switch__text switch__text_checked switch__text_f"
          ref={fSwitchTextsRef}
        >
          {labels.first}
        </p>
        <span className={`switch__button`} />
        <p className="switch__text switch__text_c" ref={cSwitchTextsRef}>
          {labels.second}
        </p>
      </label>
    </>
  );
}
