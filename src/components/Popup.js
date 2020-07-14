export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  
  open() {
    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', () => {
      this._handleEscClose(event);
    });

    this._popup.addEventListener('click', () => {
      this._overlayClickClose(event);
    });
  }

  close() {
    this._popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', () => {
      this._handleEscClose(event);
    });

    this._popup.removeEventListener('click', () => {
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

  setEventListeners() {
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._closeButton.addEventListener('click', () => {
      this.close();
    })
  }
}