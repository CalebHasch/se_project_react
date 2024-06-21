import Header from "./Header/Header";
import Footer from "./Footer/Foot";
import Main from "../Main/Main";
import ModalWithForm from "./Modals/ModalWithForm/ModalWithForm";
import ItemModal from "./Modals/ItemModal/ItemModal";
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

  const [modalClothingItem, setModalClothingItem] = useState({
    name: "",
    linke: "",
    weather: "",
  });

  const itemModal = document.querySelector("#itemModal");

  function closeModal() {
    itemModal.classList.remove("modal_opened");
  }

  function handleCardClick(item) {
    itemModal.classList.add("modal_opened");
    setModalClothingItem(item);
  }

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
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          gaugeTemp={gaugeTemp}
          handleCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <ModalWithForm />
      <ItemModal clothingItem={modalClothingItem} onClose={closeModal} />
    </div>
  );
}

export default App;
