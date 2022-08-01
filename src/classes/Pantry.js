class Pantry {
  constructor(pantry) {
    this.ingredientsInPantry = JSON.parse(JSON.stringify(pantry));
  };

  getIngredientDetails(ingredientData) {
    const pantryIngredients = this.ingredientsInPantry.map(ingredient => {
      const foundIngredient = ingredientData.find(data => {
        return data.id === ingredient.ingredient;
      });
      return {
            'id': ingredient.ingredient,
            'name': foundIngredient.name,
            'amount': ingredient.amount,
            }
    });
      return pantryIngredients;
  };

  findRequiredIngredients(recipe) {
    let requiredIngredients = recipe.ingredients.map(ingredient => {
        let ingredientsData = {};
        ingredientsData.id = ingredient.id;
        ingredientsData.amount = ingredient.quantity.amount;
        return ingredientsData;
    });
    return requiredIngredients;
  };

  checkIfUserCanCookRecipe(recipe) {
    let requiredIngredients = this.findRequiredIngredients(recipe);
    let availableIngredients = [];
    requiredIngredients.forEach(ingredient => {
      this.ingredientsInPantry.forEach(ing => {
        if ((ing.ingredient === ingredient.id) && (ing.amount >= ingredient.amount)) {
          availableIngredients.push(ing.ingredient);
        }
      })
    });
    return requiredIngredients.every(ingredient => availableIngredients.includes(ingredient.id));
  };

  getMissingIngredients(recipe, ingredientData) {
    let requiredIngredients = this.findRequiredIngredients(recipe);
    let missingIngredients = [];
    requiredIngredients.forEach(item => {
      let pantryIngredient = this.ingredientsInPantry.find(ing => item.id === ing.ingredient);
      if (!pantryIngredient) {
        let diffItem = {
          id: item.id,
          name: ingredientData.find(ingData => ingData.id === item.id).name,
          amount: item.amount
        }
        missingIngredients.push(diffItem);
      } else if (pantryIngredient.amount < item.amount) {
        let diffItem = {
          id: item.id,
          name: ingredientData.find(ingData => ingData.id === item.id).name,
          amount: item.amount - pantryIngredient.amount
        }
        missingIngredients.push(diffItem);
      }
    })
    return missingIngredients;
  };

  cookRecipe(recipe) {
      let requiredIngredients = this.findRequiredIngredients(recipe)
      requiredIngredients.forEach(ingredient => {
        this.ingredientsInPantry.forEach(ing => {
          if (ing.ingredient === ingredient.id) {
            ing.amount -= ingredient.amount
          }
        })
      })
  }

  addIngredient(id, amount) {
    this.ingredientsInPantry.forEach(ing => {
      if (id === ing.ingredient) {
        ing.amount += amount
      }
    })
    if (this.ingredientsInPantry.every(ing => ing.ingredient !== id)) {
      this.ingredientsInPantry.push({ingredient: id, amount: amount})
    }
  }

};




export default Pantry;

