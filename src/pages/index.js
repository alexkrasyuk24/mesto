import './index.css';
import Card from "../scripts/components/Card.js";
import initialCards from "../scripts/initialCards.js";
import FormValidator from "../scripts/components/FormValidator.js"
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm.js";
import Api from "../scripts/components/Api.js";
import { popupFormEdit, popupTitle, popupSubtitle, popupFormAdd, popupFormAvatar, buttonOpenPopupEdit,
  buttonOpenPopupAdd, buttonOpenPopupAvatar, element, elementSet, formValidationConfig,
} from '../scripts/utils/constants.js';

function createCard(item) {
  const card = new Card(
    item, 
    '.template', 
    (data) => popupImageInstance.open(data),
    (cardId) => popupConfirmInstance.open(cardId, card),
    (cardId, isLiked) => handleToggleLikeButton(cardId, isLiked, card),
    userInfo.getUserId()
    )
    return card.generateCard();
}

function handleToggleLikeButton(cardId, isLiked, card) {
  if(!isLiked) {
    api.setLike(cardId)
    .then((cardData) => {
      card.toggleLike(cardData)
    })
    .catch(console.log)
  } else {
    api.unsetLike(cardId)
    .then((cardData) => {
      card.toggleLike(cardData)
    })
    .catch(err => {
      console.log(err);
    })
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '6715cb7d-4f0e-4056-86d6-73d3f08499c0',
    'Content-Type': 'application/json'
  }
}); 

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cardItems]) => {
  userInfo.setUserInfo(userData)
  cardItems.reverse().forEach(item => { 
    cardSection.addItem(createCard(item));
  });
})
.catch(err => {
  console.log(err);
})

const formEditValidator = new FormValidator(formValidationConfig, popupFormEdit);
const formAddValidator = new FormValidator(formValidationConfig, popupFormAdd);
const formAvatarValidator = new FormValidator(formValidationConfig, popupFormAvatar);
formEditValidator.enableValidation();
formAddValidator.enableValidation();
formAvatarValidator.enableValidation();

const cardSection = new Section({
  items: initialCards, 
  renderer: (data) => {
    cardSection.addItem(createCard(data));
  }, 
  container: elementSet
});

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userInfoSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar-image'
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

const popupConfirmInstance = new PopupWithConfirm({
  baseConfig: {
    popupSelector: 'popup_delete-card',
    popupClassOpened: 'popup_opened',
    buttonCloseSelector: 'popup__close'
  },
  handleSubmitForm: handleSubmitPopupConfirm
})
popupConfirmInstance.setEventListeners();

const popupAvatarInstance = new PopupWithForm({
  baseConfig: {
    popupSelector: 'popup_avatar',
    popupClassOpened: 'popup_opened',
    buttonCloseSelector: 'popup__close'
  },
  handleSubmitForm: handleSubmitFormAvatar,
  formSelector: '.popup__form_avatar'
  })
popupAvatarInstance.setEventListeners();

function handleSubmitPopupConfirm(cardId, card) {
  popupConfirmInstance.setLoading(true, 'Удаление...');
  api.deleteCard(cardId)
  .then(() => {
    card.handleDeleteCard();
    popupConfirmInstance.close();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    popupConfirmInstance.setLoading(false, 'Да');
  });
}

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
  popupAddInstance.setLoading(true, 'Создание...');
  api.addCard(data)
  .then(res => {
    cardSection.addItem(createCard(res));
    popupAddInstance.close();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    popupAddInstance.setLoading(false, 'Создать');
  });
};

function handleOpenPopupAdd() {
  popupAddInstance.open();
  formAddValidator.disableButton();
}

function handleOpenPopupAvatar() {
  popupAvatarInstance.open();
  formAvatarValidator.disableButton();
}

// Коллбэк сабмита формы редактирования
function handleSubmitFormEdit({name, job}) {
  popupEditInstance.setLoading(true, 'Сохранение...');
  api.updateUserInfo({name, about: job})
  .then(res => {
    userInfo.setUserInfo(res);
    popupEditInstance.close();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    popupEditInstance.setLoading(false, 'Сохранить');
  });
};

function handleSubmitFormAvatar(data) {
  popupAvatarInstance.setLoading(true, 'Сохранение...');
  api.editAvatar(data)
  .then((data) => {
    userInfo.setUserInfo(data);
    popupAvatarInstance.close();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    popupAvatarInstance.setLoading(false, 'Сохранить');
  });
};

buttonOpenPopupEdit.addEventListener('click', handleOpenPopupEdit);
buttonOpenPopupAdd.addEventListener('click', handleOpenPopupAdd);
buttonOpenPopupAvatar.addEventListener('click', handleOpenPopupAvatar);