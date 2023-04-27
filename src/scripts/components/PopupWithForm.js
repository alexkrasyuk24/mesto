import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({baseConfig, handleSubmitForm, formSelector}) {
    super(baseConfig);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popupElement.querySelector(formSelector);
    this._formInputs = this._formElement.querySelectorAll('input');
    this._buttonSubmit = this._formElement.querySelector('button');
  }
  _getInputValues() {
    const formInputValues = {}
    this._formInputs.forEach(input => {
      formInputValues[input.name] = input.value
    });
    return formInputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._formElement.reset();
  }
  setLoading(isLoading, buttonText) {
    if(isLoading) {
      this._buttonSubmit.textContent = buttonText;
      this._buttonSubmit.disabled = true;
    } else {
      this._buttonSubmit.textContent = buttonText;
      this._buttonSubmit.disabled = false;
    }
  }
}
export default PopupWithForm