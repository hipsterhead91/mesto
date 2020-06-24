export class FormValidator {
  constructor(options, form) {
    this._options = options;
    this._form = form;
  }

  _showError(form, input, errorMessage, inputErrorClass, errorClass) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage; 
    errorElement.classList.add(errorClass);
  }

  _hideError(form, input, inputErrorClass, errorClass) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = ''; 
  }

  _isInputValid(form, input, inputErrorClass, errorClass) {
    if (!input.validity.valid) {
      this._showError(form, input, input.validationMessage, inputErrorClass, errorClass);
    } else {
      this._hideError(form, input, inputErrorClass, errorClass);
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(inputs, button, inactiveButtonClass) {
    if (this._hasInvalidInput(inputs)) {
      button.classList.add(inactiveButtonClass);
      button.setAttribute('disabled', true);
    } else {
      button.classList.remove(inactiveButtonClass);
      button.removeAttribute('disabled');
    }
  }

  enableValidation() {
    const inputs = Array.from(this._form.querySelectorAll(this._options.inputSelector));
    const button = this._form.querySelector(this._options.submitButtonSelector);
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._isInputValid(this._form, input, this._options.inputErrorClass, this._options.errorClass);
        this._toggleButtonState(inputs, button, this._options.inactiveButtonClass);
      });
    });
  }
}