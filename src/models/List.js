import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient, step) {
    const index = this.items.findIndex(el => el.ingredient === ingredient)
    if (index < 0) {
      this.items.push({ id: uniqid(),  count,  unit,  ingredient,  step })
    } else this.items[index].count += count 
  }

  deleteItem(id) {
    const index = this.items.findIndex(el => el.id === id)
    if (index >= 0) this.items.splice(index, 1)
  }

  updateCount(id, newCount) {
    const index = this.items.findIndex(el => el.id === id)
    if (index >= 0) this.items[index].count = newCount;
  }
}