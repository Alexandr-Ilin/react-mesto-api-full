import { BASE_URL } from "./consts";

const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json()
    .then((err) => {
      throw err;
    })
}

export const register = ({password, email}) => {
  return fetch (`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
};

export const exitUserProfile = (token) => {
  return fetch(`${BASE_URL}/exit`,{
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(checkResponse)
}