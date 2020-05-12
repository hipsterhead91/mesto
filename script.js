// Объявляем все 
// необходимые переменные
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const closeButton = document.querySelector('.popup__close-button'); // кнопка закрытия попапа
const submitButton = document.querySelector('.popup__submit-button'); // кнопка сохранения изменений
let nameInput = document.querySelector('.popup__name-input'); // поле ввода имени
let jobInput = document.querySelector('.popup__job-input'); // поле ввода подписи
let name = document.querySelector('.profile__name'); // отражение имени в профиле
let job = document.querySelector('.profile__job'); // отражение подписи в профиле


// Делаем так, чтобы поля формы 
// были заполнены при открытии попапа
nameInput.value = name.textContent;
jobInput.value = job.textContent;


// Настраиваем кнопку редактирования профиля
// на открытие попапа
function openPopup(evt) {
  evt.preventDefault();
  popup.classList.add('popup_opened');
}
editButton.addEventListener('click', openPopup);


// Настраиваем кнопку с крестиком
// на закрытие попапа
function closePopup(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', closePopup);


// Настраиваем кнопку "Сохранить"
// на обновление данных и закрытие попапа
function submit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
}
submitButton.addEventListener('click', closePopup);
submitButton.addEventListener('click', submit);