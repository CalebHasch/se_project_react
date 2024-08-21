import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import ProtectedRoute from "../ProtectedRoute";
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
import LoginModal from "../LoginModal/LoginModal";
import * as auth from "../../utils/auth";
import AppContext from "../../contexts/AppContext";
import { setToken, getToken } from "../../utils/token";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  const [activeModal, setActiveModal] = useState("login");

  function handleRegistration({ name, email, password, avatar }) {
    auth
      .register(name, email, password, avatar)
      .then(() => {
        console.log(email, password);
        handleLogin({ email, password });
      })
      .catch(console.error);
  }

  function handleLogin({ email, password }) {
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          console.log("login " + data.token);
          setToken(data.token);
          closeModal();
          setIsLoggedIn(true);
        }
      })
      .catch(console.error);
  }

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
    const jwt = getToken();

    fetchWeather(baseUrl)
      .then((res) => {
        const data = filterWeatherData(res);
        setWeatherData(data);
      })
      .catch(console.error);

    getInitialClothes()
      .then((res) => {
        setClothingItems(res.data);
      })
      .catch(console.error);

    if (jwt) {
      auth
        .getUser(jwt)
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data.data);
          closeModal();
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    const weather = gaugeTemp(weatherData.temp.F);
    getWeatherAppropiateClothes(weather, clothingItems);
  }, [weatherData, clothingItems]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, setCurrentTemperatureUnit }}
        >
          <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        clothes={clothingItems}
                        handleCardClick={handleCardClick}
                        handleButtonClick={openModal}
                        modal={"add-garment"}
                      />
                    </ProtectedRoute>
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
            <RegistrationModal
              onClose={closeModal}
              isOpen={activeModal === "registration"}
              onRegister={handleRegistration}
              isLoading={isLoading}
            />
            <LoginModal
              onClose={closeModal}
              isOpen={activeModal === "login"}
              onLogin={handleLogin}
              isLoading={isLoading}
            />
          </AppContext.Provider>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
