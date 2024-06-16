import Header from "./Header/Header";
import Footer from "./Footer/Foot";
import Main from "../Main/Main";
import {
  fetchWeather,
  filterWeatherData,
  gaugeTemp,
} from "../../utils/weatherApi";
import { baseUrl, defaultClothingItems } from "../../utils/constants";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState({
    temp: { F: 999 },
    location: "",
  });

  useEffect(() => {
    fetchWeather(baseUrl)
      .then((res) => {
        const data = filterWeatherData(res);
        setWeatherData(data);
      })
      .catch(console.error());
  }, []);
  return (
    <>
      <Header weatherData={weatherData} />
      <Main
        weatherData={weatherData}
        defaultClothingItems={defaultClothingItems}
        gaugeTemp={gaugeTemp}
      />
      <Footer />
    </>
  );
}

export default App;
