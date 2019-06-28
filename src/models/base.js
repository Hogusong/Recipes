import { Fraction } from 'fractional';

export const dom = {
  searchField: document.querySelector('.search__field'),
  searchBtn: document.querySelector('.search__btn'),
  recipesList: document.querySelector('.results__list'),
  resultsBrowser: document.querySelector('.results'),
  pagination: document.querySelector('.results__pages'),
  recipeUI: document.querySelector('.recipe'),
  shoppingList: document.querySelector('.shopping__list'),
  likesList: document.querySelector('.likes__list'),
  likesField: document.querySelector('.likes__field')
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

export const formatCount = no => {
  if (no) {
    // keep upto 2 decimal point
    no = Math.round(no * 100) / 100;

    // seperate it into integer and decimal 
    // 3.25 => ['3', '25'],  3 => ['3'],   0.25 => ['0', '25']
    const [inc, dec] = no.toString().split('.');

    if (!dec) return inc;

    const fr = new Fraction(no - +inc);
    const fact = fr.numerator + '/' + fr.denominator;
    return (inc != '0') ? inc + ' ' + fact : fact ;
  }
};
