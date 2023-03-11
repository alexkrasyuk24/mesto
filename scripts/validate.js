// функция включения валидации
function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector)
  formList.forEach((form) => {
    addInputListners(form, config)
  });
}

function addInputListners(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);
  const button = form.querySelector(config.submitButtonSelector)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', evt => {
      const input = evt.target
      validateForm(input, inputList, config, form, button)
    });
  });
}
const validateForm = (input, inputList, config, form, button) => {
  validateInput(input, config, inputList);
  toggleButton(form, config, button);
}
const validateInput = (input, config) => {
  const isInputValid = checkInputValidity(input)
  if (isInputValid) {
    hideFormInput(input, config)
  } else {
    showFormInput(input, config)
  }
}

const checkInputValidity = (input) => {
 return input.validity.valid
}

// Валидация формы показать сообщение об ошибке
function showFormInput(input, config) {
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
}
// Валидация формы скрыть сообщение об ошибке
function hideFormInput(input, config) {
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);
  input.classList.remove(config.inputErrorClass)
  errorElement.textContent = '';

}
// Активная/Неактивная кнопка
function toggleButton(form, config, buttonSubmit) {
  const isFormValid = !form.checkValidity();
  buttonSubmit.disabled = isFormValid;
  buttonSubmit.classList.toggle(config.inactiveButtonClass, isFormValid);
}

const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',

};
enableValidation(formValidationConfig);