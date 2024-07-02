import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useEffect, useState } from "react";
import "./Main.css";

export default function Main({
  weatherData,
  gaugeTemp,
  clothingItems,
  handleCardClick,
}) {
  const [clothes, setClothes] = useState([]);
  const currentTempUnitContext = React.useContext(
    CurrentTemperatureUnitContext
  );

  function getWeatherAppropiateClothes(weather, clothes) {
    const appropiateClothes = clothes.filter(
      (item) => item.weather === weather
    );
    setClothes(appropiateClothes);
  }

  useEffect(() => {
    const weather = gaugeTemp(weatherData.temp.F);
    getWeatherAppropiateClothes(weather, clothingItems);
  }, [weatherData]);

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
