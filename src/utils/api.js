const baseUrl = "http://localhost:3005";
const headers = { "Content-Type": "application/json" };

function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function getInitialClothes() {
  return fetch(`${baseUrl}/items`, {
    headers: headers,
  })
    .then(processResponse)
    .then((res) => {
      return res;
    });
}

function postClothingItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    }),
  }).then(processResponse);
}

function deleteClothingItem(itemId) {
  console.log(itemId);
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: headers,
  }).then(processResponse);
}

export { getInitialClothes, postClothingItem, deleteClothingItem };
