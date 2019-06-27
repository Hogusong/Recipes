import { dom } from '../models/base';

export const renderShoppingList = items => {
  dom.shoppingList.innerHTML = '';
  let markup = '';
  items.forEach(item => {
    markup += `
      <li class="shopping__item">
        <div class="shopping__count">
          <input type="number" value="${item.count}" step="${item.step}">
          <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
          <svg>
            <use href="img/icons.svg#icon-circle-with-cross"></use>
          </svg>
        </button>
      </li>
    `;
  });
  dom.shoppingList.insertAdjacentHTML('beforeend', markup);
};
