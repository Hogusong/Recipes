export default class Likes {
  constructor() {
    this.likes = []
  }

  addLike(item) {
    const index = this.likes.findIndex(el => el.id === item.id);
    if (index < 0) {
      this.likes.push(item);
      return item;
    }
    return null;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    if (index >= 0) this.likes.splice(index, 1);
  }

  isLiked(id) {
    return this.likes.find(el => el.id === id);
  }

  getNumLikes() {
    return this.likes.length;
  }
}