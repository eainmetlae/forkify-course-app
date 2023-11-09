import View from './view.js';
import icons from 'url:../../img/icons.svg';
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded =)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  // prettier-ignore
  _fields = ['title','publisher','image','sourceUrl','cookingTime','servings'];

  _validateStatus = '';
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _deleteMessage(el) {
    el.innerText = '';
  }
  _clearErrorMessages() {
    const errorElements = document.querySelectorAll('.errormsg');

    errorElements.forEach(el => {
      this._deleteMessage(el);
    });
  }
  _resetValidateStatus() {
    this._validateStatus = '';
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    let self = this;
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      self._resetValidateStatus();
      self._clearErrorMessages();

      self._fields.forEach(field => {
        const input = document.querySelector(`#${field}`);
        self._validateFields(input);
      });
      console.log(self._validateStatus);
      if (self._validateStatus === 'error') return;

      const dataArr = [...new FormData(this)]; //this here is form
      const data = Object.fromEntries(dataArr);
      console.log(data);
      handler(data);
    });
  }
  _generateMarkup() {}

  _validateFields(field) {
    //non-blank or non-space
    if (field.value.trim() === '') {
      this._setStatus(
        field,
        `${field.previousElementSibling.innerText} cannot be blank!`,
        'error'
      );
    }
  }
  _setStatus(field, message, validationStatus) {
    const errorMsgEl = field.nextElementSibling;
    if (validationStatus === 'error') {
      this._validateStatus =
        this._validateStatus !== 'error' ? 'error' : this._validateStatus;

      errorMsgEl.innerText = '';
      errorMsgEl.innerText = message;
    }
  }
}

export default new AddRecipeView();
