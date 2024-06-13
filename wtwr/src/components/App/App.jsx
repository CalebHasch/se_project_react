// import { useState } from 'react'
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import fetchWeather from "../../utils/weatherApi";

import "./App.css";

function App() {
  // fetchWeather();
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}

export default App;
