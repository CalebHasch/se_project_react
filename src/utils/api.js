import { getToken } from "./token";
let token;
import { BASE_URL } from "./auth";

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
  return request(`${BASE_URL}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res;
  });
}

function postClothingItem({ name, imageUrl, weather }) {
  token = getToken();
  return request(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    }),
  });
}

function deleteClothingItem(itemId) {
  token = getToken();
  return request(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function addCardLike(itemId) {
  token = getToken();
  return request(`${BASE_URL}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function removeCardLike(itemId) {
  token = getToken();
  return request(`${BASE_URL}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function editUser({ name, avatar }) {
  token = getToken();
  return request(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      avatar: avatar,
    }),
  });
}

export {
  processResponse,
  getInitialClothes,
  postClothingItem,
  deleteClothingItem,
  addCardLike,
  removeCardLike,
  editUser,
};
