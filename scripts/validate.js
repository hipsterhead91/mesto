function showError(form, input, errorMessage, inputErrorClass, errorClass) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage; 
  errorElement.classList.add(errorClass);
}

function hideError(form, input, inputErrorClass, errorClass) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = ''; 
}

function isInputValid(form, input, inputErrorClass, errorClass) {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, inputErrorClass, errorClass);
  } else {
    hideError(form, input, inputErrorClass, errorClass);
  }
}

function hasInvalidInput(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputs, button, inactiveButtonClass) {
  if (hasInvalidInput(inputs)) {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  }
}

function enableValidation(options) {
  const forms = Array.from(document.querySelectorAll(options.formSelector));
  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(options.inputSelector));
    const button = form.querySelector(options.submitButtonSelector);
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        isInputValid(form, input, options.inputErrorClass, options.errorClass);
        toggleButtonState(inputs, button, options.inactiveButtonClass);
      });
    });
  });
}

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible'
});