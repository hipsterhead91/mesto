// КНОПКИ
export const editAvatarButton = document.querySelector('.profile__edit-avatar');
export const editProfileButton = document.querySelector('.profile__edit-button');
export const addNewCardButton = document.querySelector('.profile__add-button');
export const avatarSubmitButton = document.querySelector('#avatar-submit');
export const profileSubmitButton = document.querySelector('#profile-submit');
export const newCardSubmitButton = document.querySelector('#new-card-submit');


// ШАБЛОН КАРТОЧКИ
export const cardTemplate = document.querySelector('.card-template').content;


// ВАЛИДАЦИЯ ФОРМ
export const validationOptions = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible'
};