class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;
    this._inputList = this._form.querySelectorAll(this._inputSelector);
    this._button = this._form.querySelector(this._submitButtonSelector);
  }

   enableValidation() {
    this._addInputListners();
     this._toggleButton();
    }

    validateFormOnOpen() {
      this._inputList.forEach(input => {
       this._validateForm(input);
      });
    }

    disableButton() {
      this._button.disabled = true;
      this._button.classList.add(this._inactiveButtonClass);
    }

   _addInputListners() {
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', evt => {
          const input = evt.target
           this._validateForm(input);
        });
      });
    }
    _validateForm(input) {
      this._validateInput(input);
       this._toggleButton();
    }
    _validateInput(input) {
      const isInputValid = this._checkInputValidity(input);
      if (isInputValid) {
        this._hideFormInput(input);
      } else {
        this._showFormInput(input);
      }
    }
    _checkInputValidity(input) {
      return input.validity.valid
     }
     // Валидация формы показать сообщение об ошибке
     _showFormInput(input) {
      const inputId = input.id;
      const errorElement = document.querySelector(`#${inputId}-error`);
      input.classList.add(this._inputErrorClass);
      errorElement.textContent = input.validationMessage;
    }
    // Валидация формы скрыть сообщение об ошибке
    _hideFormInput(input) {
      const inputId = input.id;
      const errorElement = document.querySelector(`#${inputId}-error`);
      input.classList.remove(this._inputErrorClass);
      errorElement.textContent = '';
    }
    // Активная/Неактивная кнопка
     _toggleButton() {
      const isFormValid = !this._form.checkValidity();
      this._button.disabled = isFormValid;
      this._button.classList.toggle(this._inactiveButtonClass, isFormValid);
    }
  } 

  export default FormValidator;