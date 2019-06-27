import Search from './models/Search';
import Recipe from './models/Recipe';
import { dom, renderSpinner, clearSpinner  } from './models/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

const state = {
  perPage: 9
}

const controlSearch = async () => {
  // get query from search input
  const query = searchView.getInput();

  if (query) {
    // create a search object and add it to state
    state.search = new Search(query);
    try {
      // clear UI before render recipes
      searchView.clearRecipesUI();
      renderSpinner(dom.resultsBrowser);

      // search query to get recipes
      await state.search.getRecipes(query)

      // render results on UI
      clearSpinner();
      state.page = 1;
      searchView.renderRecipes(state.search.recipes, state.page, state.perPage);
    } catch (err) {
      alert(err)
      clearSpinner();
    }
  }
};

// add event to search button
dom.searchBtn.addEventListener('click', e => {
  e.preventDefault();
  controlSearch();
})

// add event to pagination buttons
dom.pagination.addEventListener('click', e=> {
  // set button as event target for all near selection.
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    state.page = +btn.dataset.goto;
    searchView.renderRecipes(state.search.recipes, state.page, state.perPage);
  }
});

// set controller to handle the detail of a selected recipe.
const controlRecipe = async () => {
  // get id from url
  const id = window.location.hash.replace('#', '');

  if (id) {
    // create new recipe object
    state.recipe = new Recipe(id);
    renderSpinner(dom.recipeUI);

    try {
      // get recipe data
      await state.recipe.getRecipe();

      // render recipe
      clearSpinner();
      recipeView.renderRecipe(state.recipe);
    } catch (err) {
      alert(err);
    }
  }

};

// add event for 'hashchange'
window.addEventListener('hashchange', controlRecipe);
