const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(processResponse);
}

function getInitialClothes() {
  return request(`${baseUrl}/items`, {
    headers: headers,
  }).then((res) => {
    return res;
  });
}

function postClothingItem({ name, imageUrl, weather }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    }),
  });
}

function deleteClothingItem(itemId) {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: headers,
  });
}

export {
  getInitialClothes,
  postClothingItem,
  deleteClothingItem,
  processResponse,
};
