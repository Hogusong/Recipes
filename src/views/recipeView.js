import { dom } from '../models/base';

export const renderRecipe = (recipe) => {
  console.log(recipe);
  const markup = `
    <figure class="recipe__fig">
      <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>
    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
        <span class="recipe__info-text"> minutes</span>
      </div>

      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
        <span class="recipe__info-text"> servings</span>

        <div class="recipe__info-buttons">
          <button class="btn-tiny">
            <svg>
              <use href="img/icons.svg#icon-circle-with-minus"></use>
            </svg>
          </button>
          <button class="btn-tiny">
            <svg>
              <use href="img/icons.svg#icon-circle-with-plus"></use>
            </svg>
          </button>
        </div>
      </div>

      <button class="recipe__love">
        <svg class="header__likes">
          <use href="img/icons.svg#icon-heart-outlined"></use>
        </svg>
      </button>
    </div>
  `;
  dom.recipeUI.insertAdjacentHTML('beforeend', markup);
}