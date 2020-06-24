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
import {initialCards} from './initialCards.js';

// просмотр картинок в полном размере
const imagePopup = document.querySelector('.image-popup');
const imageCloseButton = document.querySelector('.image-close-button');
const imagePopupPhoto = document.querySelector('.popup__image');
const imagePopupTitle = document.querySelector('.popup__image-title');

// настройка профиля (имя, статус)
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
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
const profileFormValidator = new FormValidator(validationOptions, profileForm);
const newCardFormValidator = new FormValidator(validationOptions, newCardForm);





// ФУНКЦИИ

// альтернативное закрытие попапов
function closeByOverlayClick(event) {
  if (event.target.classList.contains('popup')) {
    event.target.classList.remove('popup_opened');
  }
}

function closeByEsc(event) {
  if (event.keyCode === 27) {
    const actualPopup = document.querySelector('.popup_opened');
    actualPopup.classList.remove('popup_opened');
  }
}

// просмотр картинок в полном размере
function openImage(event) {
  imagePopup.classList.add('popup_opened');
  imagePopupPhoto.src = event.target.closest('.element__image').src;
  imagePopupTitle.textContent = event.target.closest('.element').querySelector('.element__title').textContent;
  imagePopup.addEventListener('click', closeByOverlayClick);
  document.addEventListener('keydown', closeByEsc);
}

function closeImage() {
  imagePopup.classList.remove('popup_opened');
  imagePopup.removeEventListener('click', closeByOverlayClick);
  document.removeEventListener('keydown', closeByEsc);
}

// работа с карточками
function renderCard(card, container) {
  card.querySelector('.element__image').addEventListener('click', openImage);
  container.prepend(card);
}

function editNewCard(event) {
  event.preventDefault();
  newCardPopup.classList.add('popup_opened');
  newCardPopup.addEventListener('mousedown', closeByOverlayClick);
  document.addEventListener('keydown', closeByEsc);
}

function closeNewCardForm() {
  newCardPopup.classList.remove('popup_opened');
  titleInput.value = '';
  linkInput.value = '';
  newCardPopup.removeEventListener('mousedown', closeByOverlayClick);
  document.removeEventListener('keydown', closeByEsc);
}

function addNewCard(event) {
  event.preventDefault();
  const newCard = new Card(titleInput.value, linkInput.value, cardTemplate);
  renderCard(newCard.getCard(), cardsContainer);
  closeNewCardForm();
}

// настройка профиля (имя, статус)
function editProfile(event) {
  event.preventDefault();
  profilePopup.classList.add('popup_opened');
  userNameInput.value = userName.textContent;
  userJobInput.value = userJob.textContent;
  profilePopup.addEventListener('mousedown', closeByOverlayClick);
  document.addEventListener('keydown', closeByEsc);
}

function closeProfileForm() {
  profilePopup.classList.remove('popup_opened');
  profilePopup.removeEventListener('mousedown', closeByOverlayClick);
  document.removeEventListener('keydown', closeByEsc);
}

function submitProfile(event) {
  event.preventDefault();
  userName.textContent = userNameInput.value;
  userJob.textContent = userJobInput.value;
  closeProfileForm();
}





// ЗАПУСК КОДА

// рендер карточек "из коробки"
initialCards.forEach((item) => {
  const initialCard = new Card(item.name, item.link, cardTemplate);
  renderCard(initialCard.getCard(), cardsContainer);
});

// включение валидации
profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();

// установка слушателей
imageCloseButton.addEventListener('click', closeImage);
addNewCardButton.addEventListener('click', editNewCard);
newCardCloseButton.addEventListener('click', closeNewCardForm);
newCardForm.addEventListener('submit', addNewCard);
editProfileButton.addEventListener('click', editProfile);
profileCloseButton.addEventListener('click', closeProfileForm);
profileForm.addEventListener('submit', submitProfile);