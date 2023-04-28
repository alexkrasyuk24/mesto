// редактирование профиля
const popupFormEdit = document.querySelector('.popup__form_edit');
const popupTitle = document.querySelector('.popup__input_type_name');
const popupSubtitle = document.querySelector('.popup__input_type_job');
// открытие/редактирование формы добавления изображений
const popupFormAdd = document.querySelector('.popup__form_add');
const popupFormAvatar = document.querySelector('.popup__form_avatar');
// открыть/закрыть все формы
const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
const buttonOpenPopupAvatar = document.querySelector('.profile__avatar-button');
// список изображений
const element = document.querySelector('.elements');
const elementSet = element.querySelector('.elements__list');
const formValidationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
};
export {popupFormEdit, popupTitle, popupSubtitle, popupFormAdd, popupFormAvatar, buttonOpenPopupEdit,
  buttonOpenPopupAdd, buttonOpenPopupAvatar, element, elementSet, formValidationConfig,
};