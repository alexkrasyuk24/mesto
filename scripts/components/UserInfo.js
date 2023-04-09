class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
  }
  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      info: this._userInfoElement.textContent
    }
  }
  setUserInfo({newUserName, newUserInfo}) {
    this._userNameElement.textContent = newUserName;
    this._userInfoElement.textContent = newUserInfo;
  }
}
export default UserInfo