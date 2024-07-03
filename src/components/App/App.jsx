import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Foot";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import {
  fetchWeather,
  filterWeatherData,
  gaugeTemp,
} from "../../utils/weatherApi";
import { baseUrl, defaultClothingItems } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState({
    temp: { F: "999", C: "999" },
    location: "",
    sunStatus: { sunset: "", sunrise: "" },
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [appropiateClothes, setAppropiateClothes] = useState([]);
  const [modalClothingItem, setModalClothingItem] = useState({
    name: "",
    link: "",
    weather: "",
  });

  const itemModal = document.querySelector("#itemModal");
  const addGarmetModal = document.querySelector("#add-card-modal");

  function handleAddItemSubmit(item) {
    setClothingItems([item, ...clothingItems]);
    console.log(clothingItems);
  }

  function getWeatherAppropiateClothes(weather, clothes) {
    const appropiateClothes = clothes.filter(
      (item) => item.weather === weather
    );
    setAppropiateClothes(appropiateClothes);
  }

  function openModal(modal) {
    modal.classList.add("modal_opened");
  }

  function closeModal(modal) {
    modal.classList.remove("modal_opened");
  }

  function handleCardClick(item) {
    openModal(itemModal);
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

  useEffect(() => {
    const weather = gaugeTemp(weatherData.temp.F);
    getWeatherAppropiateClothes(weather, clothingItems);
  }, [weatherData, clothingItems]);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, setCurrentTemperatureUnit }}
      >
        <div className="page__content">
          <Header
            weatherData={weatherData}
            handleButtonClick={openModal}
            modal={addGarmetModal}
          />
          <Routes>
            <Route
              path="/se_project_react/"
              element={
                <Main
                  weatherData={weatherData}
                  clothes={appropiateClothes}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/se_project_react/profile"
              element={
                <Profile
                  clothes={appropiateClothes}
                  handleCardClick={handleCardClick}
                  handleButtonClick={openModal}
                  modal={addGarmetModal}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          modal={addGarmetModal}
          onClose={closeModal}
          onAddItem={handleAddItemSubmit}
          clothingItems={clothingItems}
        />
        <ItemModal
          clothingItem={modalClothingItem}
          onClose={closeModal}
          modal={itemModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
