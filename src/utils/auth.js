export const BASE_URL = "https://http://127.0.0.1:3001";

export const register = (name, email, password, avatarUrl) => {
  console.log(name, email, password, avatarUrl);
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, avatarUrl }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};
