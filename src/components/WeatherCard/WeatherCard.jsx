import "./WeatherCard.css";
import { dayBanners, nightBanners } from "../../utils/constants";

export default function WeatherCard({ weatherData }) {
  function determineBanner(data) {
    let bannerSet;

    if (isDay(data)) {
      bannerSet = dayBanners;
    } else {
      bannerSet = nightBanners;
    }

    if (bannerSet[data.condition]) {
      return bannerSet[data.condition];
    } else {
      return bannerSet.clear;
    }
  }

  function isDay(data) {
    const time = Date.now() / 1000;
    if (time >= data.sunStatus.sunrise && time < data.sunStatus.sunset) {
      return true;
    } else {
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
        alt={weatherData.condition}
      />
    </div>
  );
}
