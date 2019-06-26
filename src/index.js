import Search from './models/Search';
import { dom, renderSpinner, clearSpinner  } from './models/base';
import * as searchView from './views/searchView';

const state = {}

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
      searchView.renderRecipes(state.search.recipes);
    } catch (err) {
      alert(err)
    }
  }
};

dom.searchBtn.addEventListener('click', e => {
  e.preventDefault();
  controlSearch();
})
