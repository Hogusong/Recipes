import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import { dom, renderSpinner, clearSpinner  } from './models/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';

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
    // prepare UI to show a selected recipe
    recipeView.clearRecipe();

    // create new recipe object
    state.recipe = new Recipe(id);
    renderSpinner(dom.recipeUI);

    // highlight selected recipe in the list view
    searchView.highlightSelected(id);

    try {
      // get recipe data
      await state.recipe.getRecipe();

      state.recipe.calcTime();
      state.recipe.calcServings();
      // render recipe
      clearSpinner();
      recipeView.renderRecipe(state.recipe);
    } catch (err) {
      alert(err);
    }
  }

};

const controlList = () => {
  if (!state.list) state.list = new List();

  state.recipe.ingredients.forEach(ing => {
    const unitCount = ing.count / state.recipe.servings;
    state.list.addItem(ing.count, ing.unit, ing.ingredient, unitCount);
  });
  listView.renderShoppingList(state.list.items);
}

const controlLikes = () => {}

// add event for 'hashchange'
window.addEventListener('hashchange', controlRecipe);

// add all event listeners which are needed in Recipe UI.
dom.recipeUI.addEventListener('click', e => {
  if (e.target.matches('.btn-minus, .btn-minus *')) {
    state.recipe.updateServings('minus');
  } else if (e.target.matches('.btn-plus, .btn-plus *')) {
    state.recipe.updateServings('plus');
  } else if (e.target.matches('.recipe__btn-add, .recipe__btn-add *')) {
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    controlLikes();
  }
  recipeView.renderUpdateServings(state.recipe);
})

// add all event listeners which are needed  in Shoping List UI.
dom.shoppingList.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.id;
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // delete from state.list
    state.list.deleteItem(id);
    // remove item from UI
    listView.removeItem(id);
  } else if (e.target.matches('.shopping__count-value')) {
    // update new count to the shopping list.
    const val = parseFloat(e.target.value);
    if (val < 0) e.target.value = 0;
    else state.list.updateCount(id, val);
  }
})
