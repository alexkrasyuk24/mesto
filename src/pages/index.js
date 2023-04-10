import './index.css';
import Card from "../scripts/components/Card.js";
import initialCards from "../scripts/initialCards.js";
import FormValidator from "../scripts/components/FormValidator.js"
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";

// открыть/закрыть все формы
const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');
// редактирование профиля
const popupFormEdit = document.querySelector('.popup__form_edit');
const popupTitle = document.querySelector('.popup__input_type_name');
const popupSubtitle = document.querySelector('.popup__input_type_job');
// открытие/редактирование формы добавления изображений
const popupFormAdd = document.querySelector('.popup__form_add');
const buttonOpenPopupAdd = document.querySelector('.profile__add-button');
// список изображений
const element = document.querySelector('.elements');
const elementSet = element.querySelector('.elements__list');
const formValidationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
};

function createCard(item) {
  const card = new Card(item, '.template', (data) => {
    popupImageInstance.open(data);
  });
  return card.generateCard();
}

const formEditValidator = new FormValidator(formValidationConfig, popupFormEdit);
const formAddValidator = new FormValidator(formValidationConfig, popupFormAdd);
formEditValidator.enableValidation();
formAddValidator.enableValidation();

const cardSection = new Section({
  items: initialCards, 
  renderer: (data) => {
    cardSection.addItem(createCard(data));
  }, 
  container: elementSet
});
cardSection.renderElements();

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userInfoSelector: '.profile__subtitle',
});

const popupEditInstance = new PopupWithForm({
  baseConfig: {
    popupSelector: 'popup_edit',
    popupClassOpened: 'popup_opened',
    buttonCloseSelector: 'popup__close'
  },
  handleSubmitForm: handleSubmitFormEdit,
  formSelector: '.popup__form_edit'
});
popupEditInstance.setEventListeners();

const popupAddInstance = new PopupWithForm({
  baseConfig: {
    popupSelector: 'popup_add',
    popupClassOpened: 'popup_opened',
    buttonCloseSelector: 'popup__close'
  },
  handleSubmitForm: handleSubmitFormAdd,
  formSelector: '.popup__form_add'
});
popupAddInstance.setEventListeners();

const popupImageInstance = new PopupWithImage({
  baseConfig: {
    popupSelector: 'image-popup',
    popupClassOpened: 'popup_opened',
    buttonCloseSelector: 'popup__close'
  },
  imageSelector: '.image-popup__image',
  textSelector: '.image-popup__title'
});
popupImageInstance.setEventListeners();

//открыть попап редактирования профиля
function handleOpenPopupEdit() {
  const {name, info} = userInfo.getUserInfo();
  popupTitle.value = name;
  popupSubtitle.value = info;
  popupEditInstance.open();
  formEditValidator.validateFormOnOpen();
};

// Коллбэк сабмита формы добавления
function handleSubmitFormAdd(data) {
  cardSection.addItem(createCard(data));
  popupAddInstance.close();
  formAddValidator.disableButton();
};

// Коллбэк сабмита формы редактирования
function handleSubmitFormEdit({name, job}) {
  userInfo.setUserInfo({
    newUserName: name,
    newUserInfo: job
  });
  popupEditInstance.close();
};
buttonOpenPopupEdit.addEventListener('click', handleOpenPopupEdit);
buttonOpenPopupAdd.addEventListener('click', () => popupAddInstance.open());