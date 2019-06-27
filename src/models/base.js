export const dom = {
  searchField: document.querySelector('.search__field'),
  searchBtn: document.querySelector('.search__btn'),
  recipesList: document.querySelector('.results__list'),
  resultsBrowser: document.querySelector('.results'),
  pagination: document.querySelector('.results__pages'),
  recipeUI: document.querySelector('.recipe')
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

export const limitLength = (title, limit=20) => {
  const words = title.split(' ');
  let str = '';
  for (let w of words) {
    if (str.length + w.length > limit) return str + '...';
    str += w + ' '
  }
  return str;
}