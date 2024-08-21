import { getToken } from "./token";
const token = getToken();
const baseUrl = "http://127.0.0.1:3001";
const headers = {
  "Content-Type": "application/json",
  authorization: `Bearer ${token}`,
};

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
    headers: {
      "Content-Type": "application/json",
    },
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

function EditUser({ name, avatar }) {
  return request(`${baseUrl}/user/me`);
}

export {
  getInitialClothes,
  postClothingItem,
  deleteClothingItem,
  processResponse,
};
