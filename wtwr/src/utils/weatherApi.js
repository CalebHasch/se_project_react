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

export { fetchWeather, filterWeatherData };
