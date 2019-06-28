import { dom, limitLength } from '../models/base';

export const renderLike = like => {
  const title = limitLength(like.title, 20);
  const markup = `
    <li>
      <a class="likes__link" href="#${like.id}">
        <figure class="likes__fig">
          <img src="${like.img}" alt="${title}">
        </figure>
        <div class="likes__data">
          <h4 class="likes__name">${title}</h4>
          <p class="likes__author">${like.author}</p>
        </div>
      </a>
    </li>
  `;
  dom.likesList.insertAdjacentHTML('beforeend', markup)
}

export const removeLike = id => {
  const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
  if (el) el.parentElement.removeChild(el);
}

export const toggleLikeBtn = isLiked => {
  const iconStr = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconStr}`);
}

export const toggleLikeMenu = no => {
  dom.likesField.style.visibility = no > 0 ? 'visible' : 'hidden';
}