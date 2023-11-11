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

  _btnAddIngredient = document.querySelector('.btn_add-ingredient');

  _newIngredient = document.querySelectorAll('.add-ingredient');

  _divIngredientContainer = document.querySelector(
    '.upload__ingredientContainer'
  );

  _ingCounter = 0;
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this._addHandlerAddIngredient();
    this._addHandlerRemoveIngredient();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  #createHiddenField(fieldValue) {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', `ingredient-${this._ingCounter}`);
    input.setAttribute('value', fieldValue);
    console.log(input);
    return input;
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerAddIngredient() {
    let self = this;
    this._btnAddIngredient.addEventListener('click', function (e) {
      e.preventDefault();
      self._ingCounter++;

      const newIng = Array.from(self._newIngredient)
        .map(ingEl => ingEl.value)
        .join(',');

      if (newIng !== '') self._newIngredient.forEach(el => (el.value = ''));

      //update ingredient as hidden field
      const hiddenInputEl = self.#createHiddenField(newIng);
      self._parentElement.insertAdjacentElement('beforeend', hiddenInputEl);

      //update ingredient list
      const newIng_noComma = newIng.split(',').join(' ').trim();
      const spannerMarkup = `<div id="ing-list-${self._ingCounter}">${newIng_noComma} &nbsp; <a href='' id=${self._ingCounter}> <span>Remove</span></a> </div>`;

      if (self._ingCounter === 1) self._divIngredientContainer.innerHTML = '';
      self._divIngredientContainer.insertAdjacentHTML(
        'beforeend',
        spannerMarkup
      );
    });
  }

  _addHandlerRemoveIngredient() {
    this._divIngredientContainer.addEventListener('click', function (e) {
      e.preventDefault();
      console.log(e.target.closest('div'));
      const divEl = e.target.closest('div');
      if (!divEl) divEl.remove();
    });
  }

  addHandlerUpload(handler) {
    let self = this;
    const formValidator = new FormValidator(self._parentElement, self._fields);
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      self._validateStatus = formValidator.validateOnSubmit();

      if (self._validateStatus === 'error') return;

      const dataArr = [...new FormData(this)]; //this here is form
      debugger;
      const data = Object.fromEntries(dataArr);
      console.log(data);
      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
