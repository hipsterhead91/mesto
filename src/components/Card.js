export class Card {

  constructor(options) {
    this._cardId = options.cardId;
    this._ownerId = options.ownerId;
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
    if (this._ownerId !== '3fd8f167d4be4f0b8a023473') {
      this._deleteButton.remove();
    };
    this._likeButton = this._card.querySelector('.element__like-button');
    this._likesCounter = this._card.querySelector('.element__like-counter');
    this._likesCounter.textContent = this._likes.length;

    this._likes.find((owner) => {
      if (owner._id === '3fd8f167d4be4f0b8a023473') {
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
    this._template = this._templateSelector.cloneNode(true);
    return this._template;
  }

  _setEventListeners() {
    if (this._ownerId == '3fd8f167d4be4f0b8a023473') {
      this._removeButton.addEventListener('click', () => {
        this._removeCardFunction();
      });
    }
    this._likeButton.addEventListener('click', () => {
      this._like();
    });
    this._image.addEventListener('click', () => {
      this._imageOpening();
    });
  }

  _like() {
    if (this._likeButton.classList.contains('element__like-button_active')) {
      this._removeLikeFunction();
      this._likesCounter.textContent = Number(this._likesCounter.textContent) - 1;
    } else {
      this._likeFunction();
      this._likesCounter.textContent = Number(this._likesCounter.textContent) + 1;
    }
    this._likeButton.classList.toggle('element__like-button_active');
  }

}