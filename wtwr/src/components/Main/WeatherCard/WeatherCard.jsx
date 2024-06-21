import sunny from "../../../assets/sunny.png";
import cloudy from "../../../assets/cloudy.png";
import rain from "../../../assets/rain.png";
import storm from "../../../assets/storm.png";
import snow from "../../../assets/snow.png";
import fog from "../../../assets/fog.png";
import clearNight from "../../../assets/clearNight.png";
import cloudyNight from "../../../assets/cloudyNight.png";
import snowyNight from "../../../assets/snowyNight.png";
import rainyNight from "../../../assets/rainyNight.png";
import foggyNight from "../../../assets/foggyNight.png";
import stormyNight from "../../../assets/stormyNight.png";

import "./WeatherCard.css";

export default function WeatherCard({ weatherData }) {
  const dayBanners = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rain,
    Thunderstorm: storm,
    Snow: snow,
    Fog: fog,
  };

  const nightBanners = {
    Clear: clearNight,
    Clouds: cloudyNight,
    Rain: rainyNight,
    Thunderstorm: stormyNight,
    Snow: snowyNight,
    Fog: foggyNight,
  };

  function determineBanner(data) {
    let bannerSet;

    if (isDay(data)) {
      bannerSet = dayBanners;
    } else {
      bannerSet = nightBanners;
    }

    if (bannerSet[data.condition]) {
      console.log(bannerSet[data.condition]);
      return bannerSet[data.condition];
    } else {
      return bannerSet.clear;
    }
  }

  function isDay(data) {
    const time = Date.now() / 1000;
    console.log(data);
    if (time >= data.sunStatus.sunrise && time < data.sunStatus.sunset) {
      console.log("day");
      return true;
    } else {
      console.log("night");
      return false;
    }
  }

  return (
    <div className="weather-card">
      <p className="weather-card__temp">
        {Math.round(weatherData.temp.F)}&deg;F
      </p>
      <img
        className="weather-card__img"
        id="weather-card-img"
        src={determineBanner(weatherData)}
      />
    </div>
  );
}
