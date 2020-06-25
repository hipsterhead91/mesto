export class FormValidator {
  constructor(options, form) {
    this._options = options;
    this._form = form;
  }

  _showError(input, errorMessage) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._options.inputErrorClass);
    errorElement.textContent = errorMessage; 
    errorElement.classList.add(this._options.errorClass);
  }

  _hideError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._options.inputErrorClass);
    errorElement.classList.remove(this._options.errorClass);
    errorElement.textContent = ''; 
  }

  _isInputValid(input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(inputs, button) {
    if (this._hasInvalidInput(inputs)) {
      button.classList.add(this._options.inactiveButtonClass);
      button.setAttribute('disabled', true);
    } else {
      button.classList.remove(this._options.inactiveButtonClass);
      button.removeAttribute('disabled');
    }
  }

  enableValidation() {
    const inputs = Array.from(this._form.querySelectorAll(this._options.inputSelector));
    const button = this._form.querySelector(this._options.submitButtonSelector);
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._isInputValid(input);
        this._toggleButtonState(inputs, button);
      });
    });
  }

  resetValidation() {
    const inputs = Array.from(this._form.querySelectorAll(this._options.inputSelector));
    const button = this._form.querySelector(this._options.submitButtonSelector);
    this._toggleButtonState(inputs, button);
    inputs.forEach((input) => {
      this._hideError(input);
    });
  }
}