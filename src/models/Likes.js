export default class Likes {
  constructor() {
    this.likes = this.getLikesFromStorage();
  }

  addLike(item) {
    const index = this.likes.findIndex(el => el.id === item.id);
    if (index < 0) {
      this.likes.push(item);
      localStorage.setItem('likes', JSON.stringify(this.likes))
      return item;
    }
    return null;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    if (index >= 0) {
      this.likes.splice(index, 1);
      localStorage.setItem('likes', JSON.stringify(this.likes))
    }
  }

  isLiked(id) {
    return this.likes.find(el => el.id === id);
  }

  getNumLikes() {
    return this.likes.length;
  }

  getLikesFromStorage() {
    const likes = JSON.parse(localStorage.getItem('likes'))
    return likes ? likes : [];
  }
}