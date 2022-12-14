import BASE_URL from './consts';

class Api {
  constructor({
    baseUrl,
    headers,
  }) {
    this._baseUrl = baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._avaUrl = `${this._baseUrl}/users/me/avatar`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._headers = headers;
  }

  //  получение информации о пользователе с сервера
  getUserData() {
    return fetch(this._userUrl, {
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  //  получение карточек с сервера
  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  //  отправка данных пользователя на сервер
  changeUserData({ user, character }) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: user,
        about: character,
      }),
    })
      .then(this._checkResponse);
  }

  //  добавлениt новой карточки на сервер
  addNewCard({ name, link }) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._checkResponse);
  }

  //  удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isNotLiked) {
    if (isNotLiked) {
    //  ставить лайк
      return fetch(`${this._cardsUrl}/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
        credentials: 'include',
      })
        .then(this._checkResponse);
    }
    //  удалить лайк
    return fetch(`${this._cardsUrl}/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  //  смена аватара
  chengeAvatar(avatar) {
    return fetch(this._avaUrl, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(avatar),
    })
      .then(this._checkResponse);
  }

  // eslint-disable-next-line class-methods-use-this
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
