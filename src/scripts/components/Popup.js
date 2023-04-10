class Popup {
  constructor({popupSelector, popupClassOpened, buttonCloseSelector}) {
    this._popupElement = document.querySelector(`.${popupSelector}`);
    this._popupSelector = popupSelector;
    this._popupClassOpened = popupClassOpened;
    this._buttonCloseSelector = buttonCloseSelector;
  }
  open() {
    this._popupElement.classList.add(this._popupClassOpened);
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popupElement.classList.remove(this._popupClassOpened);
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
        this.close();
  }
}
  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(this._popupSelector) || 
      evt.target.classList.contains(this._buttonCloseSelector)) {
        this.close();
      }
    });
  }
}
export default Popup