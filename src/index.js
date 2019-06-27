import Search from './models/Search';
import { dom, renderSpinner, clearSpinner  } from './models/base';
import * as searchView from './views/searchView';

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

dom.searchBtn.addEventListener('click', e => {
  e.preventDefault();
  controlSearch();
})
