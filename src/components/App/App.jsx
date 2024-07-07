import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
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
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState("");

  function handleAddItemSubmit(item, reset) {
    setIsLoading(true);
    postClothingItem(item)
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        closeModal();
        reset();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function getWeatherAppropiateClothes(weather, clothes) {
    const appropiateClothes = clothes.filter(
      (item) => item.weather === weather
    );
    setAppropiateClothes(appropiateClothes);
  }

  function openModal(modal) {
    setActiveModal(modal);
  }

  function closeModal() {
    setActiveModal("");
  }

  function handleCardClick(item) {
    openModal("item-modal");
    setModalClothingItem(item);
  }

  function handleCardDelete() {
    setIsLoading(true);
    deleteClothingItem(modalClothingItem._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== modalClothingItem._id)
        );
        closeModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (!activeModal) return;

    const handleCloseEvent = (e) => {
      if (e.key == "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleCloseEvent);

    return () => {
      document.removeEventListener("keydown", handleCloseEvent);
    };
  }, [activeModal]);

  useEffect(() => {
    fetchWeather(baseUrl)
      .then((res) => {
        const data = filterWeatherData(res);
        setWeatherData(data);
      })
      .catch(console.error);

    getInitialClothes()
      .then((res) => setClothingItems(res))
      .catch(console.error);
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
            modal={"add-garment"}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothes={appropiateClothes}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothes={clothingItems}
                  handleCardClick={handleCardClick}
                  handleButtonClick={openModal}
                  modal={"add-garment"}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          onClose={closeModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItemSubmit}
          clothingItems={clothingItems}
          isLoading={isLoading}
        />
        <ItemModal
          clothingItem={modalClothingItem}
          onClose={closeModal}
          isOpen={activeModal === "item-modal"}
          onDelete={handleCardDelete}
          isLoading={isLoading}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
