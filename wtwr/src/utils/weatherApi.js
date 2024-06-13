import { baseUrl } from "./constants";

function fetchWeather() {
  return fetch(`${baseUrl}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(this._processResponse)
    .then((res) => {
      console.log(res);
      return res;
    });
}

export default fetchWeather;
