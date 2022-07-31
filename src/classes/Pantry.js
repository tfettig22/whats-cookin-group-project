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
            'amount': ingredient.amount
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

  getMissingIngredients(recipe) {
    let requiredIngredients = this.findRequiredIngredients(recipe);
    let getMissingIngredients = [];
      requiredIngredients.forEach(item => {
        let found = false;
        this.ingredientsInPantry.find(ing => {
          if (item.id === ing.ingredient) {
            found = true;
          }   
        })
          if (found === false) {
            getMissingIngredients.push(item);
          }
      })
    return getMissingIngredients;
  };

  getIngredientAmountsNeeded(recipe) {
    let requiredIngredients = this.findRequiredIngredients(recipe);
    let amountNeeded = [];
    requiredIngredients.forEach(ingredient => {
      this.ingredientsInPantry.forEach(ing => {
        if ((ing.ingredient === ingredient.id) && (ing.amount < ingredient.amount)) {
          amountNeeded.push({id : ingredient.id, amount: (ingredient.amount - ing.amount)})
        }
      })
    })
    return amountNeeded
  }

  cookRecipe(recipe) {
    if (this.checkIfUserCanCookRecipe(recipe)) {
      let requiredIngredients = this.findRequiredIngredients(recipe)
      requiredIngredients.forEach(ingredient => {
        this.ingredientsInPantry.forEach(ing => {
          if (ing.ingredient === ingredient.id) {
            ing.amount -= ingredient.amount
          }
        })
      })
    } else {
      return 'Cannot cook this recipe yet, you are missing some ingredients.'
    }
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

