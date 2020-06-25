// ПЕРЕМЕННЫЕ

// работа с карточками
const newCardPopup = document.querySelector('.new-card-popup');
const newCardForm = document.querySelector('.add-new-card');
const addNewCardButton = document.querySelector('.profile__add-button');
const newCardCloseButton = document.querySelector('.new-card-close-button');
const titleInput = document.querySelector('.title-input');
const linkInput = document.querySelector('.link-input');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;
const initialCards = [
  {name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
  {name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
  {name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
  {name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
  {name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
  {name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
]

// просмотр картинок
const imagePopup = document.querySelector('.image-popup');
const imageCloseButton = document.querySelector('.image-close-button');

// настройка профиля
const profilePopup = document.querySelector('.profile-popup');
const profileForm = document.querySelector('.edit-profile');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.profile-close-button');
const userName = document.querySelector('.profile__name');
const userNameInput = document.querySelector('.name-input');
const userJob = document.querySelector('.profile__job');
const userJobInput = document.querySelector('.job-input');

// валидация форм
const validationOptions = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible'
};

export {
  newCardPopup, newCardForm, addNewCardButton, newCardCloseButton, titleInput, linkInput, cardsContainer, cardTemplate, initialCards, imagePopup, imageCloseButton, profilePopup, profileForm, editProfileButton, profileCloseButton, userName, userNameInput, userJob, userJobInput, validationOptions
};