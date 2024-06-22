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

// clothing data
const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

export { baseUrl, defaultClothingItems, nightBanners, dayBanners };
