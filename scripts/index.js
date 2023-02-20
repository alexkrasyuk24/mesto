// открыть/закрыть форму 
const profilePopup = document.querySelector('.popup_edit');
const editButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
// редактирование профиля
const popupForm = document.querySelector('.popup__form_edit');
const popupTitle = document.querySelector('.popup__input_type_name');
const popupSubtitle = document.querySelector('.popup__input_type_job');
// открытие/редактирование формы добавления изображений
const popupAdd = document.querySelector('.popup__add');
const popupFormAdd = document.querySelector(".popup__form_add");
const editButtonAdd = document.querySelector('.profile__add-button');
const nameInput = document.querySelector(".popup__input_value_place");
const linkInput = document.querySelector(".popup__input_value_link");
// кнопка поставить/удалить лайк
const likeButton = document.querySelectorAll('.elements__like');
const deleteButton = document.querySelector('.elments__delete');
// список изображений
const template = document.querySelector('.template').content;
const elements = document.querySelector('.elements');
const elementsList = elements.querySelector('.elements__list');
const imagePopup = document.querySelector(".image-popup");
const popupImage = document.querySelector(".image-popup__image");
const popupImageTitle = document.querySelector(".image-popup__title");
// массив изображений
  const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// функция добавить, удалить, лайкнуть изображения
function addCards(nameValue, linkValue) {
  const elementsItem = template.querySelector('.elements__item').cloneNode(true);
  const elementsImage = elementsItem.querySelector('.elements__image');
  elementsImage.src = linkValue;
  elementsImage.alt = nameValue;
  const elementsTitle = elementsItem.querySelector('.elements__title');
  elementsTitle.textContent = nameValue;
  elementsItem.querySelector('.elements__like').addEventListener('click', (evt) => { 
    evt.target.classList.toggle('elements__like_active');
    });
    elementsItem.querySelector('.elements__delete').addEventListener('click', () => {
      elementsItem.remove();
    });
    elementsImage.addEventListener('click', () => {
      popupImage.src = linkValue;
      popupImage.alt = nameValue;
      popupImageTitle.textContent = nameValue;
      openPopup(imagePopup);
    });
    return elementsItem;
  };

initialCards.forEach((card) => {
  const addImage = addCards(card.name, card.link);
  elementsList.append(addImage);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//1 попап функция открыть/закрыть форму попапов
function handleEditButtonClick() {
  popupTitle.value = profileTitle.textContent;
  popupSubtitle.value = profileSubtitle.textContent;
  openPopup(profilePopup);
};
//2 попап добавления изображений
const handleEditButtonAddClick = () => {
  popupAdd.classList.add('popup_opened');
};
// редактировать форму
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupTitle.value;
  profileSubtitle.textContent = popupSubtitle.value;
};
// добавление изображений
function handleAddSubmitClick(evt) {
  evt.preventDefault();
  const addNewImage = addCards(nameInput.value, linkInput.value);
  elementsList.prepend(addNewImage);
  evt.target.reset();
  closePopup(popupAdd);
};
// Обработчик «отправки» формы
function handleFormSubmitClick(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы.
  profileTitle.textContent = popupTitle.value;
  profileSubtitle.textContent = popupSubtitle.value;
  closePopup(profilePopup);
};

popupFormAdd.addEventListener("submit", handleAddSubmitClick);
editButton.addEventListener('click', handleEditButtonClick);
editButtonAdd.addEventListener('click', handleEditButtonAddClick);
popupForm.addEventListener("submit", handleFormSubmitClick);
