import { getToken } from "./token";
let token;
const baseUrl = "http://127.0.0.1:3001";

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
  token = getToken();
  return request(`${baseUrl}/items`, {
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
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function addCardLike(itemId) {
  token = getToken();
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function removeCardLike(itemId) {
  token = getToken();
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function editUser({ name, avatar }) {
  token = getToken();
  return request(`${baseUrl}/users/me`, {
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
