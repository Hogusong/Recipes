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
    this.ingredients = this.parseIngredients(res.data.recipe.ingredients);
  }

  calcTime() {
    // assuming that we need 15 minutes for each 4 imgredients
    const numOfIng = this.ingredients.length;
    this.time = Math.ceil(numOfIng / 4) * 15
  }

  calcServings() {
    // assuming that each recipe is good to server for 4.
    this.servings = 4;
  }

  parseIngredients(ingredients) {
    // create units dictionary to convert unit.
    const units = {
      'tablespoons': 'tbsp',  'tablespoon': 'tbsp',
      'teaspoons': 'tsp',     'teaspoon': 'tsp',
      'ounces': 'oz',  'ounce': 'oz',
      'cups': 'cup',   'pounds': 'pound',
      'kg': 'kg',      'g': 'g'
    };
    const newIngredients = ingredients.map(ing => {
      let ingredient = ing.toLowerCase();

      // replace all units to standard format.
      Object.keys(units).forEach(u => {
        ingredient = ingredient.replace(u, units[u]);
      });

      // remove all inside parentheses including parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
      ingredient = ingredient.replace(',', '');

      // parse ingredient into count, unit and ingredient
      const arrIng = ingredient.split(' ');
      let index, count, unit;
      for (let i = 0; i < arrIng.length; i++) {
        if ('123456789'.includes(arrIng[i][0])) continue;
        index = i;
        unit = arrIng[i];
        break;
      }
      
      if (index < 1) {
        count = 1;
      } else {
        const arrCount = arrIng.slice(0, index);
        arrCount[0] = arrCount[0].replace('-', '+');
        count = eval(arrCount.join('+'));
      }

      if (!Object.values(units).includes(unit)) {
        unit = ' '
      } else {
        index++;
      }

      ingredient = arrIng.slice(index).join(' ')
      return { count, unit, ingredient }
    });
    return newIngredients;
  }

  updateServings(type) {}
}