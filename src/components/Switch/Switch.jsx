import "./Switch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const Switch = ({ labels, switchId }) => {
  return (
    <>
      <input
        className="switch__checkbox"
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
