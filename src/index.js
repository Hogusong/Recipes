import Search from './models/Search';
import { dom } from './models/base';
import * as searchView from './views/searchView';

const state = {}

const controlSearch = async () => {
  // 
  const query = searchView.getInput();
  
  state.search = new Search(query);
  await state.search.getRecipes(query)
  console.log(state.search.recipes);
};

dom.searchBtn.addEventListener('click', e => {
  e.preventDefault();
  controlSearch();
})
