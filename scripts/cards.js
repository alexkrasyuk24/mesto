class Card {
  constructor(data, templateSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
  }
_getTemplate() {
  // забираем разметку из HTML и клонируем элемент
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);
  // вернём DOM-элемент карточки
    return cardElement;
};

_setEventListeners() {
  this.element.querySelector('.elements__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__like_active');
  });
  this.element.querySelector('.elements__delete').addEventListener('click', (evt) => {
    evt.target.closest('elements__item').remove();
  });
  this.elementImage.addEventListener('click', () => {
    this._openPopup(this._name, this._link);
  });
}

generateCard() {
  this._element = this._getTemplate();
  this._elementTitle = this._element.querySelector('.elements__title');
  this._elementImage = this._element.querySelector('elements__image');

  this._elementTitle.textContent = this._name;
  this._elementImage.alt = this._name;
  this._elementImage.src = this._link;

  this._setEventListeners();

  return this._element;
}
}

export default Card;