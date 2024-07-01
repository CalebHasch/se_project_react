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
  console.log(data);
  obj.location = data.name;
  obj.temp = {
    F: data.main.temp,
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  obj.condition = data.weather[0].main;
  obj.sunStatus = { sunrise: data.sys.sunrise, sunset: data.sys.sunset };

  return obj;
}

function gaugeTemp(temp) {
  if (temp >= 70) {
    return "hot";
  } else if (temp >= 55) {
    return "warm";
  } else {
    return "cold";
  }
}

export { fetchWeather, filterWeatherData, gaugeTemp };
