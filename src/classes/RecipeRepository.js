class RecipeRepository {
  constructor(recipeData) {
    this.recipeData = recipeData
  }

  filterByTag(tag) {
    let filteredRecipes = this.recipeData.filter(recipe => recipe.tags.includes(tag));
    return filteredRecipes;
  }

  filterByName(name) {
    let filteredRecipes = this.recipeData.filter(recipe => recipe.name.includes(name));
    return filteredRecipes;
  }
  // try reduce later for the extention using multiple parameters? Maybe use ternary operator

}

export default RecipeRepository;
