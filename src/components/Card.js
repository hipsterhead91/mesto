export class Card {

  constructor(userId, options) {
    this._userId = userId; // id пользователя, который получен при запросе данных пользователя
    this._cardId = options.cardId;
    this._ownerId = options.ownerId; // id владельца конкретно этой карточки (не путать с id пользователя, ибо могут отличаться)
    this._name = options.name;
    this._link = options.link;
    this._templateSelector = options.templateSelector;
    this._likes = options.likes;
    this._likeFunction = options.likeFunction;
    this._removeLikeFunction = options.removeLikeFunction;
    this._imageOpening = options.imageOpening;
    this._removeCardFunction = options.removeCardFunction;
  }

  getCard() {
    this._card = this._getTemplate();
    this._deleteButton = this._card.querySelector('.element__delete-button');
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    };
    this._likeButton = this._card.querySelector('.element__like-button');
    this._likesCounter = this._card.querySelector('.element__like-counter');
    this._likesCounter.textContent = this._likes.length;

    this._likes.find((owner) => {
      if (owner._id === this._userId) {
        this._likeButton.classList.add('element__like-button_active');
      }
    });

    this._removeButton = this._card.querySelector('.element__delete-button');
    this._title = this._card.querySelector('.element__title');
    this._title.textContent = this._name;
    this._image = this._card.querySelector('.element__image');
    this._image.src = this._link;
    this._setEventListeners();
    return this._card;
  }

  _getTemplate() {
    this._template = this._templateSelector.querySelector('.element').cloneNode(true);
    return this._template;
  }

  _setEventListeners() {
    if (this._ownerId == this._userId) {
      this._removeButton.addEventListener('click', () => {
        this._removeCardFunction(this._card);
      });
    }
    this._likeButton.addEventListener('click', () => {
      this._likeFunction(this._likes, this._cardId, this._likeButton, this._likesCounter);
    });
    this._image.addEventListener('click', () => {
      this._imageOpening();
    });
  }

}