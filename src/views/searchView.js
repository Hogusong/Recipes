import { dom } from '../models/base';

export const getInput = () => {
  let query = dom.searchField.value;
  // clear input field after get a new input;
  dom.searchField.value = '';
  return query.toLowerCase().trim();
}

export const clearRecipesUI = () => dom.recipesList.innerHTML = '';

export const renderRecipes = recipes => {
  // render recipes on left side of the browser.
  for (let i = 0; i < recipes.length; i++) renderRecipe(recipes[i])
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
