// РАБОТА С КАРТОЧКАМИ
const newCardPopup = document.querySelector('.new-card-popup');
const newCardForm = document.querySelector('.add-new-card');
const addNewCardButton = document.querySelector('.profile__add-button');
const newCardCloseButton = document.querySelector('.new-card-close-button');
const newCardSubmitButton = document.querySelector('.new-card-submit-button');
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


// ОТКРЫТИЕ КАРТИНКИ В ПОЛНОМ РАЗМЕРЕ
const imagePopup = document.querySelector('.image-popup');
const imageCloseButton = document.querySelector('.image-close-button');
const imagePopupPhoto = document.querySelector('.popup__image');
const imagePopupTitle = document.querySelector('.popup__image-title');


// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const profilePopup = document.querySelector('.profile-popup');
const profileForm = document.querySelector('.edit-profile');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.profile-close-button');
const profileSubmitButton = document.querySelector('.profile-submit-button');
const userName = document.querySelector('.profile__name');
const userNameInput = document.querySelector('.name-input');
const userJob = document.querySelector('.profile__job');
const userJobInput = document.querySelector('.job-input');



// ЗАКРЫВАЕМ ПОПАП ПО КЛИКУ НА ОВЕРЛЕЙ ИЛИ ПРИ НАЖАТИИ ESC
function closeByOverlayClick(event) {
  if (event.target.classList.contains('popup')) {
    event.target.classList.remove('popup_opened');
  }
}

function closeByEsc(event) {
  if (event.keyCode == 27) {
    const actualPopup = document.querySelector('.popup_opened');
    actualPopup.classList.remove('popup_opened');
  }
}


// ЛАЙКАЕМ КАРТОЧКУ, УДАЛЯЕМ, СМОТРИМ КАРТИНКУ В ПОЛНОМ РАЗМЕРЕ
function like(event) {
  event.target.classList.toggle('element__like-button_active');
}

function deleteCard(event) {
  event.target.closest('.element').remove();
}

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


// РЕНДЕРИМ КАРТОЧКИ, ДОБАВЛЯЕМ НОВЫЕ
function getCard(item) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__like-button').addEventListener('click', like);
  card.querySelector('.element__delete-button').addEventListener('click', deleteCard);
  card.querySelector('.element__image').addEventListener('click', openImage);
  return card;
}

function renderCard(card, container) {
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
  const cardInfo = {name: `${titleInput.value}`, link: `${linkInput.value}`};
  const newCard = getCard(cardInfo);
  renderCard(newCard, cardsContainer);
  closeNewCardForm();
}


// РЕДАКТИРУЕМ ПРОФИЛЬ
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


// РЕНДЕРИМ КАРТОЧКИ "ИЗ КОРОБКИ"
initialCards.forEach((item) => {
  const initialCard = getCard(item);
  renderCard(initialCard, cardsContainer);
});


// СЛУШАЕМ СОБЫТИЯ
imageCloseButton.addEventListener('click', closeImage);

addNewCardButton.addEventListener('click', editNewCard);
newCardCloseButton.addEventListener('click', closeNewCardForm);
newCardForm.addEventListener('submit', addNewCard);

editProfileButton.addEventListener('click', editProfile);
profileCloseButton.addEventListener('click', closeProfileForm);
profileForm.addEventListener('submit', submitProfile);