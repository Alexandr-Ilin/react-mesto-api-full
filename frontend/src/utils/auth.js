import BASE_URL from './consts';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json()
    .then((err) => {
      throw err;
    });
};

function register({ password, email }) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then(checkResponse);
}

function authorize(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then(checkResponse);
}

function exitUserProfile() {
  return fetch(`${BASE_URL}/exit`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(checkResponse);
}

export { register, authorize, exitUserProfile };
