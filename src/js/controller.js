import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';

import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';
import addRecipeView from './view/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    //1) show spinner while loading
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    //2) call API
    await model.loadRecipe(id);

    //3) render results

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderErrorMessage();
  }
};

const controlServings = function (newServings) {
  //recipeView.render(model.updateServings(newServings));
  recipeView.update(model.updateServings(newServings));
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //1) get query
    const query = searchView.getQuery();
    if (!query) return;

    //2) load results
    await model.loadSearchResults(query);

    //3) render results
    resultsView.render(model.getSearchResultsPage());
    //4) render pagination buttons
    paginationView.render(model.state.search);

    //5) display sort menu
    resultsView.toggleSortMenu();
  } catch (err) {
    console.log(err);
    resultsView.renderErrorMessage(err.message);
  }
};

const controlPagination = function (goToPage) {
  //1) render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2) render new pagination buttons
  paginationView.render(model.state.search);
};

const controlAddBookmark = function () {
  //1) add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //2) update recipeView;
  recipeView.update(model.state.recipe);

  //3) render bookmarks view
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //show spinner
    addRecipeView.renderSpinner();

    //upload recipe data
    await model.uploadRecipe(newRecipe);

    //render recipe
    recipeView.render(model.state.recipe);

    //SUCCESS MESSAGE
    addRecipeView.renderMessage();

    //render bookmarkview
    bookmarksView.render(model.state.bookmarks);

    //Change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close the form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
      //reset form
      location.reload();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderErrorMessage(err.message);
  }
};

const controlSort = function (sortByVal) {
  if (!sortByVal) return;

  const { sortBy, order } = sortByVal;
  model.sortSearchResults(sortBy, order);

  if (model.state.search.results)
    resultsView.render(model.getSearchResultsPage());
};

const init = function () {
  bookmarksView.addHandlerBookmark(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);

  resultsView.addHandlerSort(controlSort);
};

init();
