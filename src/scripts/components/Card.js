class Card {
  constructor(data, templateSelector, handleClickItem, handleOpenConfirm, handleToggleLike, userId) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleClickItem = handleClickItem;
    this._handleOpenConfirm = handleOpenConfirm;
    this._handleToggleLike = handleToggleLike;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._likes = data.likes;
    this._cardId = data._id;
  }

// добавить, удалить, лайкнуть изображения
generateCard() {
  this._element = this._getTemplate();
  this._cardImage = this._element.querySelector('.elements__image');
  this._cardTitle = this._element.querySelector('.elements__title');
    // кнопка поставить/удалить лайк
  this._likeButton = this._element.querySelector('.elements__like');
    // cчетчик лайков
  this._likesCounter = this._element.querySelector('.element__likes-number');
  this._deleteButton = this._element.querySelector('.elements__delete');

  this._cardImage.src = this._link;
  this._cardImage.alt = this._name;
  this._cardTitle.textContent = this._name;
  this._likesCounter.textContent = this._likes.length;

  this._setEventListeners();
  this._toggleButtonLikeActive();
  if(this._userId !== this._ownerId) {
    this._deleteButton.remove();
  }
  return this._element;
}
//поставить/удалить, изменение количества лайков
 toggleLike({likes}) {
  this._likes = likes;
  this._toggleButtonLikeActive();
  this._likesCounter.textContent = this._likes.length;
}

_getTemplate() {
  // забираем разметку из HTML и клонируем элемент
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
  // вернём DOM-элемент карточки
    return cardElement;
};

// удалить изображения
handleDeleteCard = () => {
  this._element.remove();
  this._element = null;
}

// лайкнуть изображения
_isCardLiked() {
  return this._likes.some((user) => {
    return this._userId === user._id;
  }); 
}

_toggleButtonLikeActive() {
  if(this._isCardLiked()) {
    this._likeButton.classList.add('element__like-btn_active')
} else {
  this._likeButton.classList.remove('element__like-btn_active')
}
}

_setEventListeners() {
  this._element.querySelector('.elements__image').addEventListener('click', () => {
    this._handleClickItem({name: this._name, link: this._link});
  });
  this._element.querySelector('.elements__like').addEventListener('click', () => {
    this._handleToggleLike(this._cardId, this._isCardLiked());
  });
  this._element.querySelector('.elements__delete').addEventListener('click', () => {
    this._handleOpenConfirm(this._cardId);
  });
}
}

export default Card;