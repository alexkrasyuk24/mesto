import Card from "./Card.js";
import initialCards from "./initialCards.js";
import FormValidator from "./FormValidator.js"

// открыть/закрыть форму и все формы
const profilePopup = document.querySelector('.popup_edit');
const editButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formEdit = document.querySelector('.popup__form_edit');
const formAdd = document.querySelector('.popup__form_add');
// редактирование профиля
const popupFormEdit = document.querySelector('.popup__form_edit');
const popupTitle = document.querySelector('.popup__input_type_name');
const popupSubtitle = document.querySelector('.popup__input_type_job');
// открытие/редактирование формы добавления изображений
const popupAdd = document.querySelector('.popup_add');
const popupFormAdd = document.querySelector('.popup__form_add');
const editButtonAdd = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__input_value_place');
const linkInput = document.querySelector('.popup__input_value_link');
// список изображений
const element = document.querySelector('.elements');
const elementSet = element.querySelector('.elements__list');
const imagePopup = document.querySelector('.image-popup');
const popupImage = document.querySelector('.image-popup__image');
const popupImageTitle = document.querySelector('.image-popup__title');
const formValidationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
};
const formEditValidator = new FormValidator(formValidationConfig, formEdit);
const formAddValidator = new FormValidator(formValidationConfig, formAdd);
formEditValidator.enableValidation();
formAddValidator.enableValidation();

initialCards.forEach((item) => {
  const cardElement = createCard(item);
  elementSet.append(cardElement);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const closePopupsEsc = (evt) => { 
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
      closePopup(popup);
    }
} 

function openPopup(popup) {
  popup.classList.add('popup_opened');
  //закрытие попапа нажатием на ESC
  document.addEventListener('keydown', closePopupsEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupsEsc);
}

const popups = document.querySelectorAll('.popup')
popups.forEach(popup => {
    popup.addEventListener('mousedown', evt => {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup)
          }
    });
});

//1 попап редактировать профиль
function handleEditButtonClick() {
  popupTitle.value = profileTitle.textContent;
  popupSubtitle.value = profileSubtitle.textContent;
  openPopup(profilePopup);
  formEditValidator.validateFormOnOpen();
};

//2 попап добавления изображений
const handleEditButtonAddClick = () => {
  openPopup(popupAdd);
};

function handleAddSubmitClick(evt) {
  evt.preventDefault();
  const cardElement = createCard({
    name:nameInput.value, link:linkInput.value
  });
  elementSet.prepend(cardElement);
  closePopup(popupAdd);
  formAddValidator.resetForm();
};

// Обработчик «отправки» формы
function handleFormSubmitClick(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы.
  profileTitle.textContent = popupTitle.value;
  profileSubtitle.textContent = popupSubtitle.value;
  closePopup(profilePopup);
};

function handleClickItem(name, link) {
  openPopup(imagePopup);
  popupImage.alt = name;
  popupImage.src = link;
  popupImageTitle.textContent = name;
}

function createCard(item) {
  const card = new Card(item, '.template', handleClickItem);
  return card.generateCard();
}

popupFormAdd.addEventListener("submit", handleAddSubmitClick);
editButton.addEventListener('click', handleEditButtonClick);
editButtonAdd.addEventListener('click', handleEditButtonAddClick);
popupFormEdit.addEventListener("submit", handleFormSubmitClick);