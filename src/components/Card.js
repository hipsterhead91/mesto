export class Card {
  constructor(text, image, templateSelector, handleCardClick) {
    this._text = text;
    this._image = image;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._templateSelector.cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._card.querySelector('.element__like-button').addEventListener('click', () => {
      this._like(event);
    });
    this._card.querySelector('.element__delete-button').addEventListener('click', () => {
      this._removeCard(event);
    });
    this._card.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _like(event) {
    event.target.classList.toggle('element__like-button_active');
  }

  _removeCard(event) {
    event.target.closest('.element').remove();
  }

  getCard() {
    this._card = this._getTemplate();
    this._card.querySelector('.element__image').src = this._image;
    this._card.querySelector('.element__title').textContent = this._text;
    this._setEventListeners();
    return this._card;
  }
}