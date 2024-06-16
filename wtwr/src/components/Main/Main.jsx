import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { useEffect, useState } from "react";

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
      <ul>
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
