import sunny from "../../../assets/sunny.png";
import "./WeatherCard.css";

export default function WeatherCard({ weatherData }) {
  return (
    <div className="weatherCard">
      <h2>{Math.round(weatherData.temp.F)}&deg;F</h2>
      <img className="weatherCardImg" src={sunny} />
    </div>
  );
}
