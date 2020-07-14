import './index.css';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { editProfileButton, addNewCardButton, profileForm, newCardForm, cardTemplate, initialCards, validationOptions } from '../utils/constants.js';


// ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ
const userInfo = new UserInfo({ userNameSelector: '.profile__name',  userJobSelector: '.profile__job' });


// ПОПАП ПОЛНОРАЗМЕРНОЙ КАРТИНКИ
const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();


// СЕКЦИЯ ДЛЯ РЕНДЕРА КАРТОЧЕК
const cardsContainer = new Section({ 
  items: initialCards, 
  renderer: (item) => {
    const card = new Card(
      item.name, 
      item.link, 
      cardTemplate,
      () => {
        imagePopup.open(item.name, item.link);
      })
      .getCard();
    cardsContainer.addItem(card);
  }
}, '.elements');

cardsContainer.renderAll();


// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const profilePopup = new PopupWithForm('#profile-popup', (data) => {
  userInfo.setUserInfo({
    name: data.name,
    job: data.job
  });
});

profilePopup.setEventListeners();

const profileFormValidator = new FormValidator(validationOptions, profileForm);
profileFormValidator.enableValidation();

editProfileButton.addEventListener('click', () => {
  const actualUserInfo = userInfo.getUserInfo();
  document.querySelector('#name').value = actualUserInfo.name;
  document.querySelector('#job').value = actualUserInfo.job;
  profilePopup.open();
});


// ПОПАП ДОБАВЛЕНИЯ НОВЫХ КАРТОЧЕК
const newCardPopup = new PopupWithForm('#new-card-popup', (formValuesObj) => {
  const card = new Card(
    formValuesObj.title, 
    formValuesObj.link, 
    cardTemplate,
    () => {
      imagePopup.open(formValuesObj.title, formValuesObj.link);
    })
  .getCard();
  cardsContainer.addItem(card);
});

newCardPopup.setEventListeners();

const newCardFormValidator = new FormValidator(validationOptions, newCardForm);
newCardFormValidator.enableValidation();

addNewCardButton.addEventListener('click', () => {
  newCardPopup.open();
});