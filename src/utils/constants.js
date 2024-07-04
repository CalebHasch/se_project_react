//banner images
import sunny from "../assets/sunny.png";
import cloudy from "../assets/cloudy.png";
import rain from "../assets/rain.png";
import storm from "../assets/storm.png";
import snow from "../assets/snow.png";
import fog from "../assets/fog.png";
import clearNight from "../assets/clearNight.png";
import cloudyNight from "../assets/cloudyNight.png";
import snowyNight from "../assets/snowyNight.png";
import rainyNight from "../assets/rainyNight.png";
import foggyNight from "../assets/foggyNight.png";
import stormyNight from "../assets/stormyNight.png";

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

// API fetch info
const APIkey = "7ea7645c306017f13db7782b47777322";
const latitude = 36.316154;
const longitude = -82.353031;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;

export { baseUrl, nightBanners, dayBanners };
