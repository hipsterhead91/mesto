import './index.css';
import { Api } from '../components/Api.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { editAvatarButton, editProfileButton, addNewCardButton, cardTemplate, validationOptions, avatarSubmitButton, profileSubmitButton, newCardSubmitButton } from '../utils/constants.js';



// НАСТРОЙКА API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '41d7f09e-77c9-4cd2-9eb8-a7dd1866e16a',
    'Content-Type': 'application/json'
  }
});



// ВАЛИДАЦИЯ ФОРМ
const avatarFormValidator = new FormValidator({
  validationOptions: validationOptions,
  formSelector: '#avatar-form'
});

const profileFormValidator = new FormValidator({
  validationOptions: validationOptions,
  formSelector: '#edit-profile-form'
});

const newCardFormValidator = new FormValidator({
  validationOptions: validationOptions,
  formSelector: '#add-new-card-form'
});

avatarFormValidator.enableValidation();
profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();



// ЗАГРУЗКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ С СЕРВЕРА
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__job',
  userAvatarSelector: '.profile__avatar'
});

api.getUserData()
  .then(result => {
    userInfo.setUserInfo(result.name, result.about);
    userInfo.setUserAvatar(result.avatar);
  })
  .catch(error => console.error(error));



// ПОПАП ОБНОВЛЕНИЯ АВАТАРА
const avatarPopup = new PopupWithForm({
  popupSelector: '#avatar-popup',
  resetFunction: () => avatarFormValidator.resetValidation(),
  submitFunction: data => {
    avatarPopup.savingInProgress(true, avatarSubmitButton);
    api.patchUserAvatar(data.avatar)
      .then(result => userInfo.setUserAvatar(result.avatar))
      .catch(error => console.error(error))
      .finally(() => {
        avatarPopup.savingInProgress(false, avatarSubmitButton);
        avatarPopup.close();
      })
  }
});
avatarPopup.setEventListeners();
editAvatarButton.addEventListener('click', () => avatarPopup.open());



// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const profilePopup = new PopupWithForm({
  popupSelector: '#profile-popup',
  resetFunction: () => profileFormValidator.resetValidation(),
  submitFunction: data => {
    profilePopup.savingInProgress(true, profileSubmitButton);
    api.patchUserInfo(data.name, data.job)
      .then(result => userInfo.setUserInfo(result.name, result.about))
      .catch(error => console.error(error))
      .finally(() => {
        profilePopup.savingInProgress(false, profileSubmitButton);
        profilePopup.close();
      })
  }
});

profilePopup.setEventListeners();
editProfileButton.addEventListener('click', () => {
  const actualUserInfo = userInfo.getUserInfo();
  document.querySelector('#name').value = actualUserInfo.name;
  document.querySelector('#job').value = actualUserInfo.job;
  profilePopup.open();
});



// ПОПАП ПОЛНОРАЗМЕРНОЙ КАРТИНКИ
const imagePopup = new PopupWithImage({
  popupSelector: '#image-popup',
  submitFunction: () => { }
});
imagePopup.setEventListeners();



// ПОПАП ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ
let confirmationPopup = new PopupWithConfirmation({
  popupSelector: '#confirmation-popup',
  submitFunction: () => { }
});
confirmationPopup.setEventListeners();


// РЕНДЕР КАРТОЧЕК С СЕРВЕРА
const cardsContainer = new Section({
  containerSelector: '.elements',
  items: [],
  renderer: item => {
    const card = new Card({
      cardId: item._id,
      ownerId: item.owner._id,
      name: item.name,
      link: item.link,
      templateSelector: cardTemplate,
      likes: item.likes,
      likeFunction: () => api.putLike(item._id),
      removeLikeFunction: () => api.deleteLike(item._id),
      imageOpening: () => imagePopup.open(item.name, item.link),
      removeCardFunction: (actualCard) => {
        confirmationPopup = new PopupWithConfirmation({
          popupSelector: '#confirmation-popup',
          submitFunction: () => {
            api.deleteCard(item._id)
            .then(() => {
              actualCard.remove();
            });
            confirmationPopup.close();
          }
        });
        confirmationPopup.setEventListeners();
        confirmationPopup.open();
      }
    })
      .getCard();
    cardsContainer.addItem(card);
  }
});

api.getInitialCards()
  .then(result => {
    cardsContainer.setItems(result);
    cardsContainer.renderAll();
  })
  .catch(error => console.error(error));



// ПОПАП ДОБАВЛЕНИЯ НОВЫХ КАРТОЧЕК
const newCardPopup = new PopupWithForm({
  popupSelector: '#new-card-popup',
  resetFunction: () => newCardFormValidator.resetValidation(),
  submitFunction: data => {
    newCardPopup.savingInProgress(true, newCardSubmitButton);
    api.postNewCard(data.title, data.link)
      .then(result => {
        const card = new Card({
          cardId: result._id,
          ownerId: result.owner._id,
          name: result.name,
          link: result.link,
          templateSelector: cardTemplate,
          likes: result.likes,
          likeFunction: () => api.putLike(result._id),
          removeLikeFunction: () => api.deleteLike(result._id),
          imageOpening: () => imagePopup.open(result.name, result.link),
          removeCardFunction: (actualCard) => {
            confirmationPopup = new PopupWithConfirmation({
              popupSelector: '#confirmation-popup',
              submitFunction: () => {
                api.deleteCard(result._id)
                .then(() => {
                  actualCard.remove();
                });
                confirmationPopup.close();
              }
            });
            confirmationPopup.setEventListeners();
            confirmationPopup.open();
          }
        }).getCard();
        cardsContainer.addItem(card);
      })
      .catch(error => console.error(error))
      .finally(() => {
        newCardPopup.savingInProgress(false, newCardSubmitButton);
        newCardPopup.close();
      })
  }
});

newCardPopup.setEventListeners();
addNewCardButton.addEventListener('click', () => {
  newCardPopup.open();
});