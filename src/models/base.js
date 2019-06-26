export const dom = {
  searchField: document.querySelector('.search__field'),
  searchBtn: document.querySelector('.search__btn'),
  recipesList: document.querySelector('.results__list'),
  resultsBrowser: document.querySelector('.results')
}

export const renderSpinner = parent => {
  const spinner = `
    <div class="spinner">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `
  parent.insertAdjacentHTML('afterbegin', spinner);
};

export const clearSpinner = () => {
  const spinner = document.querySelector('.spinner');
  if (spinner) spinner.parentElement.removeChild(spinner);
}