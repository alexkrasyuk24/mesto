class Card {
  constructor(data, templateSelector, handleClickItem) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleClickItem = handleClickItem;
  }
_getTemplate() {
  // забираем разметку из HTML и клонируем элемент
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
  // вернём DOM-элемент карточки
    return cardElement;
};

// добавить, удалить, лайкнуть изображения
generateCard() {
  this._element = this._getTemplate();
  this._element.querySelector('.elements__image').src = this._link;
  this._element.querySelector('.elements__image').alt = this._name;
  this._element.querySelector('.elements__title').textContent = this._name;
  // кнопка поставить/удалить лайк
  this._likeButton = this._element.querySelector('.elements__like');
  this._deleteButton = this._element.querySelector('.elements__delete');
  
  this._setEventListeners();

  return this._element;
}
// лайкнуть изображения
_handleCardLike = () => {
  this._likeButton.classList.toggle('elements__like_active');
}
// удалить изображения
_handleDeleteCard = () => {
  this._element.remove();
  this._element = null;
}

_setEventListeners() {
  this._element.querySelector('.elements__image').addEventListener('click', () => {
    this._handleClickItem({name: this._name, link: this._link});
  });
  this._element.querySelector('.elements__like').addEventListener('click', () => {
    this._handleCardLike();
  });
  this._element.querySelector('.elements__delete').addEventListener('click', () => {
    this._handleDeleteCard();
  });
}
}

export default Card;