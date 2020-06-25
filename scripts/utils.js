import {titleInput, linkInput, cardsContainer, cardTemplate, userName, userNameInput, userJob, userJobInput} from './constants.js';
import {Card} from './Card.js';



// ФУНКЦИИ

// открытие/закрытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function closeByOverlayClick(event) {
  if (event.target.classList.contains('popup')) {
    event.target.classList.remove('popup_opened');
  }
}

function closeByEsc(event) {
  if (event.key === 'Escape') {
    const actualPopup = document.querySelector('.popup_opened');
    actualPopup.classList.remove('popup_opened');
  }
}

// работа с карточками
function renderCard(card, container) {
  container.prepend(card);
}

function addNewCard(event, popup) {
  event.preventDefault();
  const newCard = new Card(titleInput.value, linkInput.value, cardTemplate);
  renderCard(newCard.getCard(), cardsContainer);
  closePopup(popup);
  titleInput.value = '';
  linkInput.value = '';
}

function renderInitialCards(initialCards) {
  initialCards.forEach((item) => {
    const initialCard = new Card(item.name, item.link, cardTemplate);
    renderCard(initialCard.getCard(), cardsContainer);
  });  
}

// настройка профиля
function submitProfile(event, popup) {
  event.preventDefault();
  userName.textContent = userNameInput.value;
  userJob.textContent = userJobInput.value;
  closePopup(popup);
}

export {openPopup, closePopup, closeByOverlayClick, closeByEsc, renderCard, addNewCard, renderInitialCards, submitProfile};