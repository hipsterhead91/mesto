import {openPopup} from './utils.js';



export class Card {
  constructor(text, image, templateSelector) {
    this._text = text;
    this._image = image;
    this._templateSelector = templateSelector;
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
      this._openImage();
    });
  }

  _like(event) {
    event.target.classList.toggle('element__like-button_active');
  }

  _removeCard(event) {
    event.target.closest('.element').remove();
  }

  _openImage() {
    const imagePopup = document.querySelector('.image-popup');
    imagePopup.querySelector('.popup__image-title').textContent = this._text;
    imagePopup.querySelector('.popup__image').src = this._image;
    openPopup(imagePopup);
  }

  getCard() {
    this._card = this._getTemplate();
    this._card.querySelector('.element__image').src = this._image;
    this._card.querySelector('.element__title').textContent = this._text;
    this._setEventListeners();
    return this._card;
  }
}