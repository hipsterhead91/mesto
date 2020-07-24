export class UserInfo {

  constructor(options) {
    this._userName = document.querySelector(options.userNameSelector);
    this._userJob = document.querySelector(options.userJobSelector);
    this._userAvatar = document.querySelector(options.userAvatarSelector);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._userName.textContent;
    this._userInfo.job = this._userJob.textContent;
    return this._userInfo;
  }

  setUserInfo(newName, newJob) {
    this._userName.textContent = newName;
    this._userJob.textContent = newJob;
  }

  setUserAvatar(newAvatar) {
    this._userAvatar.src = newAvatar;
  }

}