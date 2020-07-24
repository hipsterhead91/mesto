export class Api {

  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // РАБОТА С ИНФОРМАЦИЕЙ О ПОЛЬЗОВАТЕЛЕ

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(result => {
        if (result.ok) { return result.json() }
        else { return Promise.reject(`Ошибка: ${result.status}`) }
      })
  }

  patchUserInfo(newName, newJob) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newJob
      })
    })
      .then(result => {
        if (result.ok) { return result.json() }
        else { return Promise.reject(`Ошибка: ${result.status}`) }
      })
  }

  patchUserAvatar(newAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar
      })
    })
      .then(result => {
        if (result.ok) { return result.json() }
        else { return Promise.reject(`Ошибка: ${result.status}`) }
      })
  }

  // РАБОТА С КАРТОЧКАМИ

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(result => {
        if (result.ok) { return result.json() }
        else { return Promise.reject(`Ошибка: ${result.status}`) }
      })
  }

  postNewCard(cardTitle, cardImage) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardTitle,
        link: cardImage
      })
    })
      .then(result => {
        if (result.ok) { return result.json() }
        else { return Promise.reject(`Ошибка: ${result.status}`) }
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(result => {
        if (result.ok) { return result.json() }
        else { return Promise.reject(`Ошибка: ${result.status}`) }
      })
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(result => {
        if (result.ok) { return result.json() }
        else { return Promise.reject(`Ошибка: ${result.status}`) }
      })
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(result => {
        if (result.ok) { return result.json() }
        else { return Promise.reject(`Ошибка: ${result.status}`) }
      })
  }

}