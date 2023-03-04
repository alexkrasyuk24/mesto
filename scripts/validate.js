const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error'
};

function disableSubmit(evt) {
  evt.preventDefault();
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', disableSubmit);
    form.addEventListener('input', () => {
      toggleButton(form, config);
  });
  addInputListners(form, config);
  toggleButton(form, config);
});
}
/**
 * Обработать ввод в input
 * @param {*} evt событие input
 * @param {*} config конфиг
 */

/* НА ЭТОЙ ФУНКЦИИ Я ЗАСТРЯЛ, ВАЛИДАЦИЯ ПОЛУЧАЕТСЯ ТОЛЬКО ИЛИ НА ОДНУ ФОРМУ, ИЛИ НА ДРУГУЮ, НА ОБЕ НИКАК. 
В ФАЙЛЕ CSS popup__input СДЕЛАНО ПОДЧЁРКИВАНИЕ ДЛЯ ВЕРХНЕГО ПОЛЯ ВТОРОЙ ФОРМЫ, 
ХОТЯ ДЛЯ СТИЛЯ ВАЛИДАЦИИ СОЗДАН ОТДЕЛЬНЫЙ ФАЙЛ error, ПОЧЕМУ ОНО РАБОТАЕТ ТАК, НЕ МОГУ ПОНЯТЬ, ЗАПУТАЛСЯ!
ЕСЛИ ВМЕСТО document ПОСТАВИТЬ form, ТО ВАЛИДАЦИЯ РАБОТАЕТ ПОЛНОЦЕННО НА ВТОРУЮ ФОРМУ, А НА ПЕРВУЮ УЖЕ НЕТ!*/
function handleFormInput(evt, config) {
  const input = evt.target;
  const inputId = input.id;
  const inputErrorElement = document.querySelector(`#${inputId}-error`);
  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass)
    inputErrorElement.textContent = ''
  } else {
    input.classList.add(config.inputErrorClass);
    inputErrorElement.textContent = input.validationMessage;
  }
}

function toggleButton(form, config) {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  const isFormInvalid = !form.checkValidity();
  buttonSubmit.disabled = isFormInvalid;
  buttonSubmit.classList.toggle('popup__button_disabled', isFormInvalid);
}

function addInputListners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  inputList.forEach(function (item) {
    item.addEventListener('input', (evt) => {
      handleFormInput(evt, config);
    });
  });
}

enableValidation(formValidationConfig);


