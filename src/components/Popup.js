export class Popup {

  constructor(options) {
    this._popup = document.querySelector(options.popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }
  
  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    })
  }

  open() {
    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', (event) => {
      this._handleEscClose(event);
    });

    this._popup.addEventListener('click', (event) => {
      this._overlayClickClose(event);
    });
  }

  close() {
    this._popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', (event) => {
      this._handleEscClose(event);
    });

    this._popup.removeEventListener('click', (event) => {
      this._overlayClickClose(event);
    });
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _overlayClickClose(event) {
    if (event.target.classList.contains('popup')) {
      this.close();
    }
  }

}