import Recipe from './Recipe';
import Pantry from './Pantry';

class User{
    constructor(userData) {
      this.name = userData.name;
      this.id = userData.id;
      this.pantry = new Pantry(userData.pantry)
      this.recipesToCook = [];  
    }


   addRecipesToCook(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
     this.recipesToCook.push(recipe)
    }
   }

   removeRecipesToCook(recipeId) {
    this.recipesToCook.forEach((recipe, index) => {
      if (recipe.id === recipeId) {
        this.recipesToCook.splice(index, 1)
      } 
    })
   }

    filterSavedRecipesByTag(tag) {
      let filteredRecipes = this.recipesToCook.filter(recipe => recipe.tags.includes(tag));
      return filteredRecipes;
    }

    filterSavedRecipesByName(name) {
      let filteredRecipes = this.recipesToCook.filter(recipe => recipe.name.includes(name));
      return filteredRecipes;
    }
};


export default User;