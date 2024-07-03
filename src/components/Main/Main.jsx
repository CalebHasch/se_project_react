import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";

export default function Main({ weatherData, clothes, handleCardClick }) {
  const currentTempUnitContext = React.useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <>
      <WeatherCard weatherData={weatherData} />
      <p className="main__text">
        Today is{" "}
        {Math.round(
          weatherData.temp[currentTempUnitContext.currentTemperatureUnit]
        )}
        &deg;{currentTempUnitContext.currentTemperatureUnit} / You may want to
        wear:
      </p>
      <ul className="main__list">
        {clothes.map((item) => {
          return (
            <li key={item._id}>
              <ItemCard clothes={item} handleCardClick={handleCardClick} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
