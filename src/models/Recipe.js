import axios from 'axios';
import { config } from '../environments/config';

export default class Recipe {
  constructor(id) {
    this.id = id
  }

  async getRecipe() {
    const res = await axios(`${config.proxy}https://www.food2fork.com/api/get?key=${config.key}&rId=${this.id}`);
    this.title = res.data.recipe.title;
    this.author = res.data.recipe.publisher;
    this.url = res.data.recipe.surce_url;
    this.img = res.data.recipe.image_url;
    this.ingredients = res.data.recipe.ingredients;
  }
}