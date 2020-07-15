import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  open(name, link) {
    this._popup.querySelector('.popup__image').src = link;
    this._popup.querySelector('.popup__image-title').textContent = name;
    super.open();
  }
}