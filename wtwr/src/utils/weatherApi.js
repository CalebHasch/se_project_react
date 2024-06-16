function fetchWeather(baseUrl) {
  return fetch(`${baseUrl}`, {}).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
}

function filterWeatherData(data) {
  const obj = {};
  obj.location = data.name;
  obj.temp = { F: data.main.temp };

  return obj;
}

function gaugeTemp(temp) {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 60) {
    return "warm";
  } else {
    return "cold";
  }
}

export { fetchWeather, filterWeatherData, gaugeTemp };
