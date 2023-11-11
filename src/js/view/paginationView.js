import View from './view.js';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1)
      return this.#generateMarkupButton(curPage, false, true, numPages);

    // last page
    if (curPage === numPages && numPages > 1)
      return this.#generateMarkupButton(curPage, true, false, numPages);

    // Other page
    if (curPage < numPages)
      return this.#generateMarkupButton(curPage, true, true, numPages);

    // Page 1, and there are no other pages
    return '';
  }

  #generateMarkupButton(pageNum, isPrev = false, isNext = false, totalPages) {
    let markup = '';
    if (isPrev)
      markup = `<button data-goto = "${
        pageNum - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${pageNum - 1}</span>
      </button>`;

    markup += `<div>
      page ${pageNum} of ${totalPages}
      </div>`;
    if (isNext)
      markup += ` <button  data-goto = "${
        pageNum + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${pageNum + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;

    return markup;
  }
}

export default new PaginationView();
