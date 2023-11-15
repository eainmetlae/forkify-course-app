import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');

  _errorMessage = 'No recipes found for your query! Please try again:)';
  _message = '';

  _sortForm = document.querySelector('.sort-form');
  _sortBtn = document.querySelector('.nav__btn--sort');

  addHandlerSort(handler) {
    this._sortForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // const dataArr = [...new FormData(this)];
      const sortParams = Object.fromEntries([...new FormData(this)]);
      handler(sortParams);
    });
  }
  _generateMarkup() {
    console.log(this._data);

    return this._data.map(result => previewView.render(result, false)).join('');
    // let markup = '';
    // markup += this._data
    //   .map(result => previewView.render(result, false))
    //   .join('');
  }

  toggleSortMenu() {
    this._sortBtn.classList.toggle('hidden');
  }
}

export default new ResultsView();
