import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute";
import {
  getInitialClothes,
  postClothingItem,
  deleteClothingItem,
  addCardLike,
  removeCardLike,
  editUser,
} from "../../utils/api";
import {
  fetchWeather,
  filterWeatherData,
  gaugeTemp,
} from "../../utils/weatherApi";
import { baseUrl } from "../../utils/constants";
import AppContext from "../../contexts/AppContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ActiveModalContext } from "../../contexts/ActiveModalContext";
import "./App.css";
import { useEffect, useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import * as auth from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";

function App() {
  const [currentUser, setCurrentUser] = useState({ name: "" });
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

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleRegistration({ name, email, password, avatar }) {
    const makeRequest = () => {
      return auth.register(name, email, password, avatar).then(() => {
        handleLogin({ email, password });
      });
    };
    handleSubmit(makeRequest);
  }

  function handleLogin({ email, password }) {
    const makeRequest = () => {
      return auth.login(email, password).then((data) => {
        if (data.token) {
          setToken(data.token);
          auth
            .getUser(data.token)
            .then((data) => {
              setIsLoggedIn(true);
              setCurrentUser(data.data);
            })
            .catch(console.error);
        }
      });
    };
    handleSubmit(makeRequest);
  }

  function handleLogout() {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser({ name: "", avatar: "", email: "" });
  }

  function handleAddItemSubmit(item, reset) {
    const makeRequest = () => {
      return postClothingItem(item).then((res) => {
        setClothingItems([res.data, ...clothingItems]);
        reset();
      });
    };
    handleSubmit(makeRequest);
  }

  function handleEditProfile({ name, avatar }) {
    const makeRequest = () => {
      return editUser({ name, avatar }).then((res) => {
        currentUser.name = res.data.name;
        currentUser.avatar = res.data.avatar;
        setCurrentUser(currentUser);
      });
    };
    handleSubmit(makeRequest);
  }

  function handleCardLike({ _id, likes }) {
    const isLiked = likes.includes(currentUser._id);

    !isLiked
      ? addCardLike(_id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard.data : item))
            );
          })
          .catch(console.error)
      : removeCardLike(_id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard.data : item))
            );
          })
          .catch(console.error);
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
    const makeRequest = () => {
      return deleteClothingItem(modalClothingItem._id).then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== modalClothingItem._id)
        );
      });
    };
    handleSubmit(makeRequest);
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
    <ActiveModalContext.Provider value={setActiveModal}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, setCurrentTemperatureUnit }}
          >
            <AppContext.Provider
              value={{ isLoggedIn, setIsLoggedIn, isLoading }}
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
                        onCardLike={handleCardLike}
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
                          handleLogout={handleLogout}
                          handleCardLike={handleCardLike}
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
              />
              <ItemModal
                clothingItem={modalClothingItem}
                onClose={closeModal}
                isOpen={activeModal === "item-modal"}
                onDelete={handleCardDelete}
              />
              <RegistrationModal
                onClose={closeModal}
                isOpen={activeModal === "registration"}
                onRegister={handleRegistration}
              />
              <EditProfileModal
                onClose={closeModal}
                isOpen={activeModal === "edit-profile"}
                onUpdate={handleEditProfile}
              />
              <LoginModal
                onClose={closeModal}
                isOpen={activeModal === "login"}
                onLogin={handleLogin}
              />
            </AppContext.Provider>
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </CurrentUserContext.Provider>
    </ActiveModalContext.Provider>
  );
}

export default App;
