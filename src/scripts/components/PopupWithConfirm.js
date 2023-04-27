import Popup from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor({baseConfig, handleSubmitForm}) {
    super(baseConfig);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popupElement.querySelector('form');
    this._buttonSubmit = this._formElement.querySelector('button'); 
  }
  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._cardId, this._card)
    })
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
export default PopupWithConfirm