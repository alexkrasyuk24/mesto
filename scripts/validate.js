const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  
};

function disabledSubmit(evt) {
  evt.preventDefault();
}

// функция включения валидации
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', disabledSubmit);
    form.addEventListener('input', () => {
      toggleButton(form, config);
  });
  addInputListners(form, config);
  toggleButton(form, config);
});
}

// Валидация формы
function handleFormInput(evt, config) {
  const input = evt.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);

  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass)
    errorElement.textContent = '';
  } else {
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }
}

// Активная/Неактивная кнопка
function toggleButton(form, config) {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  const isFormInvalid = !form.checkValidity();
  buttonSubmit.disabled = isFormInvalid;
  buttonSubmit.classList.toggle(config.inactiveButtonClass, isFormInvalid);
}

function addInputListners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (evt) => {
            handleFormInput(evt, config)
    });
  });
}

enableValidation(formValidationConfig);