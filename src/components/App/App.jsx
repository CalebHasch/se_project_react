import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Foot";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
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

  const [clothingItems] = useState(defaultClothingItems);

  const [modalClothingItem, setModalClothingItem] = useState({
    name: "",
    linke: "",
    weather: "",
  });

  const itemModal = document.querySelector("#itemModal");
  const addGarmetModal = document.querySelector("#add-card-modal");
  const addGarmetElements = {
    name: "add-card",
    title: "Add Garmet",
    buttonText: "Add Garmet",
  };

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
                  clothingItems={clothingItems}
                  gaugeTemp={gaugeTemp}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route path="/se_project_react/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
        <ModalWithForm
          modal={addGarmetModal}
          onClose={closeModal}
          formElements={addGarmetElements}
        >
          <label className="form__field">
            Name
            <input
              type="text"
              className="form__input"
              id="form__name"
              name="name"
              placeholder="Name"
              required
            />
            <span className="form__error"></span>
          </label>
          <label className="form__field">
            Image
            <input
              type="url"
              className="form__input"
              id="form__image-link"
              name="link"
              placeholder="Image URL"
              required
            />
            <span className="form__error"></span>
          </label>
          <div className="form__multiple-choice">
            <p className="form__subtitle">Select the weather type:</p>
            <div className="form__radio-field">
              <input
                type="radio"
                className="form__radio-input"
                name="weather"
                value={"hot"}
                required
              />
              <label className="form__radio-label">Hot</label>{" "}
            </div>
            <div className="form__radio-field">
              <input
                type="radio"
                className="form__radio-input"
                name="weather"
                value={"warm"}
                required
              />
              <label className="form__radio-label">Warm</label>{" "}
            </div>
            <div className="form__radio-field">
              <input
                type="radio"
                className="form__radio-input"
                name="weather"
                value={"cold"}
                required
              />
              <label className="form__radio-label">Cold</label>
              <span className="form__error"></span>
            </div>
          </div>
        </ModalWithForm>
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
