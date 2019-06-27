import { dom } from '../models/base';

export const getInput = () => {
  let query = dom.searchField.value;
  // clear input field after get a new input;
  dom.searchField.value = '';
  return query.toLowerCase().trim();
}

export const clearRecipesUI = () => {
  dom.recipesList.innerHTML = '';
  dom.pagination.innerHTML = '';
}

export const renderRecipes = (recipes, page, perPage) => {
  // clear before render the recipes list.
  clearRecipesUI();
  // render recipes on left side of the browser.
  const len = recipes.length;
  const start = perPage * (page - 1);
  const end = start + perPage >= len ? len : start + perPage;
  for (let i = start; i < end; i++) renderRecipe(recipes[i])

  renderPagination(page, len, perPage);
}

function renderRecipe(recipe) {
  const markup = `
    <li>
      <a class="results__link results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
          <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${recipe.title}</h4>
          <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;
  dom.recipesList.insertAdjacentHTML('beforeend', markup);
}

function renderPagination(page, numRecipes, perPage) {
  const lastPage = Math.ceil(numRecipes / perPage);
  let pageBtn;
  if (page === 1) {
    pageBtn = renderPageBtn(2, 'next');
  } else if (page === lastPage) {
    pageBtn = renderPageBtn(page - 1, 'prev');
  } else {
    pageBtn = renderPageBtn(page - 1, 'prev') + renderPageBtn(page + 1, 'next');
  }
  dom.pagination.insertAdjacentHTML('beforeend', pageBtn);
}

export const renderPageBtn = (goTo, type) => {
  return `
    <button class="btn-inline results__btn--${type}" data-goto=${goTo}>
      <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type ==='prev' ? 'left' : 'right'}"></use>
      </svg>
      <span>Page ${goTo}</span>
    </button>
  `
}