import Header from "./Header/Header";
import Footer from "./Footer/Foot";
import { fetchWeather, filterWeatherData } from "../../utils/weatherApi";
import { baseUrl } from "../../utils/constants";
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
      <Footer />
    </>
  );
}

export default App;
