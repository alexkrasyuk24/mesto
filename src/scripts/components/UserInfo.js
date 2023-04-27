class UserInfo {
  constructor({userNameSelector, userInfoSelector, userAvatarSelector}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
    this._id = '';
  }
  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      info: this._userInfoElement.textContent
    }
  }
  setUserInfo({name, about, _id, avatar}) {
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = about;
    this._userAvatarElement.src = avatar; 
    this._id = _id;
  }

  getUserId() {
    return this._id;
  }
}

export default UserInfo