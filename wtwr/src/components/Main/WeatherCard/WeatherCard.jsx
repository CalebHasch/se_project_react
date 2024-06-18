import sunny from "../../../assets/sunny.png";
import "./WeatherCard.css";

export default function WeatherCard({ weatherData }) {
  return (
    <div className="weather-card">
      <p className="weather-card__temp">
        {Math.round(weatherData.temp.F)}&deg;F
      </p>
      <img className="weather-card__img" src={sunny} />
    </div>
  );
}
