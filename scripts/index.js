const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');
const popupForm = document.querySelector('.popup__form');
const popupTitle = document.querySelector('.popup__input_value_title');
const popupSubtitle = document.querySelector('.popup__input_value_subtitle');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editButton = document.querySelector('.profile__edit-button');

const handleEditButtonClick = () => {
  popup.classList.add('popup_opened');
  let name = profileTitle.textContent;
  let job = profileSubtitle.textContent;
  popupTitle.value = name;
  popupSubtitle.value = job;
};

const handleCloseButtonClick = () => {
  popup.classList.remove('popup_opened');
};

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupTitle.value;
  profileSubtitle.textContent = popupSubtitle.value;
  handleCloseButtonClick();
}
popupForm.addEventListener('submit', handleFormSubmit);
