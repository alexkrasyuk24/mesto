import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor({baseConfig, imageSelector, textSelector}) {
    super(baseConfig);
    this._imageElement = this._popupElement.querySelector(imageSelector);
    this._textElement = this._popupElement.querySelector(textSelector);
  }
  open({name, link}) {
    super.open();
    this._imageElement.alt = name;
    this._imageElement.src = link;
    this._textElement.textContent = name;
  }
}
export default PopupWithImage