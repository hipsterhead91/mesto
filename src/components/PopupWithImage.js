import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {

  constructor(options) {
    super(options);
    this._title = this._popup.querySelector('.popup__image-title');
    this._image = this._popup.querySelector('.popup__image');
  }

  open(name, link) {
    this._title.textContent = name;
    this._image.src = link;
    super.open();
  }

}