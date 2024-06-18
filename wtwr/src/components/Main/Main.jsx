import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { useEffect, useState } from "react";
import "./Main.css";

export default function Main({ weatherData, gaugeTemp, defaultClothingItems }) {
  const [clothes, setClothes] = useState([]);

  function getWeatherAppropiateClothes(weather, clothes) {
    const appropiateClothes = clothes.filter(
      (item) => item.weather === weather
    );
    setClothes(appropiateClothes);
  }

  useEffect(() => {
    const weather = gaugeTemp(weatherData.temp.F);
    getWeatherAppropiateClothes(weather, defaultClothingItems);
  }, [weatherData]);

  return (
    <>
      <WeatherCard weatherData={weatherData} />
      <p className="main__text">
        Today is {Math.round(weatherData.temp.F)}&deg;F / You may want to wear:
      </p>
      <ul className="main__list">
        {clothes.map((item) => {
          return (
            <li key={item._id}>
              <ItemCard clothes={item} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
