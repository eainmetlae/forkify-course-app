import View from './view.js';
import FormValidator from '../formValidator.js';
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

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    let self = this;
    const formValidator = new FormValidator(self._parentElement, self._fields);
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      self._validateStatus = formValidator.validateOnSubmit();

      if (self._validateStatus === 'error') return;

      const dataArr = [...new FormData(this)]; //this here is form
      const data = Object.fromEntries(dataArr);
      console.log(data);
      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
