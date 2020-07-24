import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  
  constructor(options) {
    super(options);
    this._submitFunction = options.submitFunction;
    this._form = this._popup.querySelector('#confirm-form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitFunction();
      this.close();
    })
  }

}