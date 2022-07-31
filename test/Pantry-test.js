import { expect } from 'chai';
import Pantry from '../src/classes/Pantry.js';
import Recipe from '../src/classes/Recipe.js';
import User from '../src/classes/User.js';
const recipeData = require('../src/data/recipes.js');
const ingData = require('../src/data/ingredients.js');
const userData = require('../src/data/users.js');
const testRecipeData = recipeData.testRecipeData;
const testIngData = ingData.testIngredients;
const userIngData = ingData.testIngredientsByUser;
const testUserData = userData.testUserData;

describe('Pantry', () => {
    let recipe1;
    let recipe2;
    let recipe3;
    let user1;
    let user2;
    let pantry1; 
    let pantry2;

    beforeEach(() => {
     user1 = new User(testUserData[0]);
     user2 = new User(testUserData[2]);
     pantry1 = user1.pantry
     pantry2 = user2.pantry
     recipe1 = new Recipe(testRecipeData[0], testIngData);
     recipe2 = new Recipe(testRecipeData[1], testIngData);
     recipe3 = new Recipe(testRecipeData[3], testIngData);
    });

    it('should create a new instance of Pantry', () => {
        expect(pantry1).to.be.an.instanceOf(Pantry);
    });

    it('should take in a user pantry', () => {
        expect(pantry1.ingredientsInPantry).to.deep.equal(testUserData[0].pantry);
    });

    it('should get the details of all the ingredients in the pantry', () => {
      expect(pantry1.getIngredientDetails(userIngData)).to.deep.equal([
        {
          "id": 11297,
          "name": "flat leaf parsley leaves",
          "amount": 4
        },
        {
          "id": 1082047,
          "name": "kosher salt",
          "amount": 10
        },
        {
          "id": 20081,
          "name": "wheat flour",
          "amount": 5
        },
        {
          "id": 18372,
          "name": "bicarbonate of soda",
          "amount": 9
        },
        {
          "id": 1123,
          "name": "eggs",
          "amount": 8
        }
      ]);
    });

    it('should have a method to find the required ingredients for a specific recipe', () => {
      expect(pantry1.findRequiredIngredients(recipe1)).to.deep.equal([
        {id: 20081, amount: 1.5},
        {id: 18372, amount: 0.5},
        {id: 1123, amount: 1}
      ]);
    });

    it('should check if the user\'s pantry has enough ingredients to cook a specific recipe', () => {
      expect(pantry1.checkIfUserCanCookRecipe(recipe1)).to.equal(true);
      expect(pantry1.checkIfUserCanCookRecipe(recipe2)).to.equal(false);
    });

    it('should be told what ingredients are still needed for a recipe', () => {
      expect(pantry1.getMissingIngredients(recipe1)).to.deep.equal([]);
      expect(pantry1.getMissingIngredients(recipe2)).to.deep.equal([
        { id: 1009016, amount: 1.5 },
        { id: 9003, amount: 2 },
        { id: 20027, amount: 1 }
      ]);
    });

    it('should return no ingredients if user pantry has all ingredients needed', () => {
      expect(pantry1.getMissingIngredients(recipe1)).to.deep.equal([]);
    });  

    it('should have a method to determine the amounts of ingredients that the user is missing', () => {
      expect(pantry2.getIngredientAmountsNeeded(recipe1)).to.deep.equal([
        {id: 20081, amount: 0.5 }
      ]);
      expect(pantry2.getIngredientAmountsNeeded(recipe3)).to.deep.equal([
        {id: 20081, amount: 5.5 },
        {id: 18372, amount: 2 },
        {id: 1123, amount: 2 }
      ]);
    });

    it('should return no missing amounts if user has all required ingredients', () => {
      expect(pantry1.getIngredientAmountsNeeded(recipe1)).to.deep.equal([]);
    });

});