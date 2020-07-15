import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction, resetFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._resetFunction = resetFunction;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._resetForm();
  }

  _resetForm() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._inputList.forEach((input) => {
      input.value = '';
    });
    this._resetFunction();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__container').addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitFunction(this._getInputValues());
      this.close();
    });
  }
}