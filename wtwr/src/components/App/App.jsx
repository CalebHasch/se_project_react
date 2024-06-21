import Header from "./Header/Header";
import Footer from "./Footer/Foot";
import Main from "../Main/Main";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import ItemModal from "./ItemModal/ItemModal";
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
    temp: { F: "999" },
    location: "",
    sunStatus: { sunset: "", sunrise: "" },
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  useEffect(() => {
    fetchWeather(baseUrl)
      .then((res) => {
        const data = filterWeatherData(res);
        setWeatherData(data);
      })
      .catch(console.error());
  }, []);
  return (
    <div className="page">
      <div className="page__content">
        <Header weatherData={weatherData} />
        <ModalWithForm />
        <ItemModal />
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          gaugeTemp={gaugeTemp}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
