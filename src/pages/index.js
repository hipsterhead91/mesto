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



// НАСТРОЙКА API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '41d7f09e-77c9-4cd2-9eb8-a7dd1866e16a',
    'Content-Type': 'application/json'
  }
});



// ОТРАЖЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ НА СТРАНИЦЕ
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__job',
  userAvatarSelector: '.profile__avatar'
});



// ПОПАП ОБНОВЛЕНИЯ АВАТАРА
const avatarPopup = new PopupWithForm({
  popupSelector: '#avatar-popup',
  resetFunction: () => avatarFormValidator.resetValidation(),
  submitFunction: data => {
    avatarPopup.savingInProgress(true, avatarSubmitButton);
    api.patchUserAvatar(data.avatar)
      .then(result => {
        userInfo.setUserAvatar(result.avatar);
        avatarPopup.close();
      })
      .catch(error => console.error(error))
      .finally(() => avatarPopup.savingInProgress(false, avatarSubmitButton))
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
      .then(result => {
        userInfo.setUserInfo(result.name, result.about);
        profilePopup.close();
      })
      .catch(error => console.error(error))
      .finally(() => profilePopup.savingInProgress(false, profileSubmitButton))
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



// РАБОТА С ПРОМИСАМИ
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(values => {

    // КОНТЕЙНЕР ДЛЯ КАРТОЧЕК
    const cardsContainer = new Section({
      containerSelector: '.elements',
      items: [],
      renderer: item => {
        const card = createCard(userData._id, item);
        cardsContainer.addItem(card);
      }
    });

    const [userData, initialCards] = values;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    cardsContainer.setItems(initialCards);
    cardsContainer.renderAll();

    // ПОПАП ДОБАВЛЕНИЯ НОВЫХ КАРТОЧЕК
    const newCardPopup = new PopupWithForm({
      popupSelector: '#new-card-popup',
      resetFunction: () => newCardFormValidator.resetValidation(),
      submitFunction: data => {
        newCardPopup.savingInProgress(true, newCardSubmitButton);
        api.postNewCard(data.title, data.link)
          .then(result => {
            const card = createCard(userData._id, result);
            cardsContainer.addItem(card);
            newCardPopup.close();
          })
          .catch(error => console.error(error))
          .finally(() => newCardPopup.savingInProgress(false, newCardSubmitButton))
      }
    });

    newCardPopup.setEventListeners();
    addNewCardButton.addEventListener('click', () => {
      newCardPopup.open();
    });
  })
  .catch(error => console.log(error))



// СОЗДАНИЕ КАРТОЧКИ
function createCard(userId, item) {
  const card = new Card(
    userId,
    {
      cardId: item._id,
      ownerId: item.owner._id,
      name: item.name,
      link: item.link,
      templateSelector: cardTemplate,
      likes: item.likes,
      likeFunction: (likesArray, cardId, likeButton, likesCounter) => {
        let hasLiked = likesArray.some(owner => owner._id === userId);
        if (hasLiked) {
          api.deleteLike(cardId)
            .then((result) => {
              likeButton.classList.remove('element__like-button_active');
              likesCounter.textContent = result.likes.length;
              let index = likesArray.findIndex(n => n._id === userId);
              likesArray.splice(index, 1);
            })
            .catch(error => console.error(error))
        } else {
          api.putLike(cardId)
            .then((result) => {
              likeButton.classList.add('element__like-button_active');
              likesCounter.textContent = result.likes.length;
              api.getUserData()
                .then(user => {
                  likesArray.push(user);
                })
                .catch(error => console.error(error))
            })
            .catch(error => console.error(error))
        }
      },
      imageOpening: () => imagePopup.open(item.name, item.link),
      removeCardFunction: (actualCard) => {
        confirmationPopup = new PopupWithConfirmation({
          popupSelector: '#confirmation-popup',
          submitFunction: () => {
            api.deleteCard(item._id)
              .then(() => {
                actualCard.remove();
                confirmationPopup.close();
              })
              .catch(error => console.error(error))
          }
        });
        confirmationPopup.setEventListeners();
        confirmationPopup.open();
      }
    })
    .getCard();
  return card;
}