import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Foot";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import {
  getInitialClothes,
  postClothingItem,
  deleteClothingItem,
} from "../../utils/api";
import {
  fetchWeather,
  filterWeatherData,
  gaugeTemp,
} from "../../utils/weatherApi";
import { baseUrl } from "../../utils/constants";
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
  const [clothingItems, setClothingItems] = useState([]);
  const [appropiateClothes, setAppropiateClothes] = useState([]);
  const [modalClothingItem, setModalClothingItem] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const itemModal = document.querySelector("#itemModal");
  const addGarmetModal = document.querySelector("#add-card-modal");
  let currentModal;

  function handleAddItemSubmit(item) {
    postClothingItem(item)
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
      })
      .catch(console.error());
  }

  function getWeatherAppropiateClothes(weather, clothes) {
    const appropiateClothes = clothes.filter(
      (item) => item.weather === weather
    );
    setAppropiateClothes(appropiateClothes);
  }

  const handleCloseEvent = (e) => {
    if (e.key == "Escape") {
      closeModal(currentModal);
    }
  };

  function openModal(modal) {
    currentModal = modal;
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", handleCloseEvent);
  }

  function closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleCloseEvent);
  }

  function handleCardClick(item) {
    openModal(itemModal);
    setModalClothingItem(item);
  }

  function handleCardDelete() {
    deleteClothingItem(modalClothingItem._id)
      .then(
        setClothingItems(
          clothingItems.filter((item) => item._id !== modalClothingItem._id)
        )
      )
      .catch(console.error());

    closeModal(itemModal);
  }

  useEffect(() => {
    fetchWeather(baseUrl)
      .then((res) => {
        const data = filterWeatherData(res);
        setWeatherData(data);
      })
      .catch(console.error());

    getInitialClothes()
      .then((res) => setClothingItems(res))
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
          onDelete={handleCardDelete}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
