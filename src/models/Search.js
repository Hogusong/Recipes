import axios from 'axios';
import { config } from '../environments/config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getRecipes() {
    const res = await axios(`${config.proxy}https://www.food2fork.com/api/search?key=${config.key}&q=${this.query}`);
    this.recipes = res.data.recipes
  }
}