class Pantry {
    constructor(pantry) {
        this.ingredientsInPantry = pantry || [];
    };
    getIngredientDetails(ingredientData) {
        const pantryIngredients = this.ingredientsInPantry.map(ingredient => {
            const foundIngredient = ingredientData.find(
              data => data.id === ingredient.ingredient
            );
            return {
                'id': ingredient.ingredient,
                'name': foundIngredient.name,
                'amount': ingredient.amount
            }
          });
          return pantryIngredients
         }
    };

    getMissingIngredients(recipeData, ingredientData) {
        const compareIngredients = this.ingredientsInPantry.map(ingredient => {
            const recipeIngredients = recipeData.find(
              data => data.id === ingredient.ingredient
            );
            return {
                'id': ingredient.ingredient,
                'name': foundIngredient.name,
                'amount': ingredient.amount,
                'recipeAmount': 
            }
          });
          return compareIngredients
         }
    }




export default Pantry;
