// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

const profilePopup = document.querySelector('#profile-popup');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileSubmitButton = document.querySelector('#profile-submit-button');
const name = document.querySelector('.profile__name');
const nameInput = document.querySelector('#name-input');
const job = document.querySelector('.profile__job');
const jobInput = document.querySelector('#job-input');
nameInput.value = name.textContent;
jobInput.value = job.textContent;
const profileCloseButton = document.querySelector('#profile-close-button');

editProfileButton.addEventListener('click', editProfile);
profileSubmitButton.addEventListener('click', submitProfile);
profileCloseButton.addEventListener('click', closeProfileForm);

function editProfile(event) {
  event.preventDefault();
  profilePopup.classList.add('popup_opened');
}

function submitProfile(event) {
  event.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closeProfileForm();
}

function closeProfileForm() {
  profilePopup.classList.remove('popup_opened');
}


// РЕНДЕР КАРТОЧЕК "ИЗ КОРОБКИ"

const renderedCards = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

const initialCards = [
  {name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
  {name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
  {name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
  {name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
  {name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
  {name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
]

initialCards.forEach(renderCard);

function renderCard(item) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__image').src = item.link;
  renderedCards.prepend(card);
}


// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ

const newCardPopup = document.querySelector('#new-card-popup');
const addNewCardButton = document.querySelector('.profile__add-button');
const newCardSubmitButton = document.querySelector('#new-card-submit-button');
const titleInput = document.querySelector('#title-input');
const linkInput = document.querySelector('#link-input');
const newCardCloseButton = document.querySelector('#new-card-close-button');

addNewCardButton.addEventListener('click', editNewCard);
newCardSubmitButton.addEventListener('click', addNewCard);
newCardCloseButton.addEventListener('click', closeNewCardForm);

function editNewCard(event) {
  event.preventDefault();
  newCardPopup.classList.add('popup_opened');
}

function addNewCard(event) {
  event.preventDefault();
  const newCard = {name: `${titleInput.value}`, link: `${linkInput.value}`};
  initialCards.push(newCard);
  renderCard(newCard);
  closeNewCardForm();
  const likeButton = document.querySelector('.element__like-button');
  like(likeButton);
  const deleteButton = document.querySelector('.element__delete-button');
  deleteCard(deleteButton);
  const cardImage = document.querySelector('.element__image');
  openImage(cardImage);
}

function closeNewCardForm() {
  newCardPopup.classList.remove('popup_opened');
  titleInput.value = '';
  linkInput.value = '';
}


// ЛАЙК КАРТОЧКИ

const likeButtons = document.querySelectorAll('.element__like-button');
likeButtons.forEach(like);

function like(button) {
  button.addEventListener('click', function(event) {
    event.target.closest('.element__like-button').classList.toggle('element__like-button_active');
  });
}


// УДАЛЕНИЕ КАРТОЧКИ

const deleteButtons = document.querySelectorAll('.element__delete-button');
deleteButtons.forEach(deleteCard);

function deleteCard(button) {
  button.addEventListener('click', function(event) {
    event.target.closest('.element').remove();
  });
}


// ОТКРЫТИЕ КАРТИНКИ В ПОЛНОМ РАЗМЕРЕ

const imagePopup = document.querySelector('#image-popup');
const title = document.querySelector('.popup__image-title');
const photo = document.querySelector('.popup__image');

const cardTitle = document.querySelector('.element__title');
const cardImages = document.querySelectorAll('.element__image');
cardImages.forEach(openImage);

function openImage(image) {
  image.addEventListener('click', function() {
    imagePopup.classList.add('popup_opened');
    photo.src = image.src;
    title.textContent = cardTitle.textContent;
  });
}

const imageCloseButton = document.querySelector('#image-close-button');
imageCloseButton.addEventListener('click', closeImage);
function closeImage() {
  imagePopup.classList.remove('popup_opened');
}