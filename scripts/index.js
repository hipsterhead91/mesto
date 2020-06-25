import {openPopup, closePopup, closeByOverlayClick, renderInitialCards, addNewCard, submitProfile} from './utils.js';
import {FormValidator} from './FormValidator.js';
import {newCardPopup, newCardForm, addNewCardButton, newCardCloseButton, titleInput, linkInput, initialCards, imagePopup, imageCloseButton, profilePopup, profileForm, editProfileButton, profileCloseButton, userName, userNameInput, userJob, userJobInput, validationOptions} from './constants.js';



// ЗАПУСКАЕМ КОД

// валидация форм
const profileFormValidator = new FormValidator(validationOptions, profileForm);
const newCardFormValidator = new FormValidator(validationOptions, newCardForm);
profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();

// рендер карточек "из коробки"
renderInitialCards(initialCards);



// УСТАНАВЛИВАЕМ СЛУШАТЕЛИ

// настройка профиля
editProfileButton.addEventListener('click', () => {
  openPopup(profilePopup);
  userNameInput.value = userName.textContent;
  userJobInput.value = userJob.textContent;
  profileFormValidator.resetValidation();
});

profileCloseButton.addEventListener('click', () => {
  closePopup(profilePopup);
});

profileForm.addEventListener('submit', () => {
  submitProfile(event, profilePopup);
});

profilePopup.addEventListener('mousedown', closeByOverlayClick);

// работа с карточками
addNewCardButton.addEventListener('click', () => {
  openPopup(newCardPopup);
  newCardFormValidator.resetValidation();
});

newCardCloseButton.addEventListener('click', () => {
  closePopup(newCardPopup);
  titleInput.value = '';
  linkInput.value = '';
});

newCardForm.addEventListener('submit', () => {
  addNewCard(event, newCardPopup);
});

newCardPopup.addEventListener('mousedown', closeByOverlayClick);

// просмотр картинок
imageCloseButton.addEventListener('click', () => {
  closePopup(imagePopup);
});

imagePopup.addEventListener('mousedown', closeByOverlayClick);