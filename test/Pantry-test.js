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
    // let emptyPantry;

    beforeEach(() => {
     user1 = new User(testUserData[0]);
     user2 = new User(testUserData[2]);
    //  emptyPantry = new Pantry();
     pantry1 = new Pantry(user1.pantry);
     pantry2 = new Pantry(user2.pantry);
     recipe1 = new Recipe(testRecipeData[0], testIngData);
     recipe2 = new Recipe(testRecipeData[1], testIngData);
     recipe3 = new Recipe(testRecipeData[3], testIngData);
    });

    it('should create a new instance of Pantry', () => {
        expect(pantry1).to.be.an.instanceOf(Pantry);
    });

    // it('should start empty', () => {
    //     expect(emptyPantry.ingredientsInPantry).to.deep.equal([]);
    // });

    it('should take in a user pantry', () => {
        expect(pantry1.ingredientsInPantry).to.deep.equal(user1.pantry);
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

    it('should have a method to cook a recipe and remove the required ingredients from the user\'s pantry', () => {
      pantry1.cookRecipe(recipe1);
      expect(pantry1.ingredientsInPantry).to.deep.equal([
        { ingredient: 11297, amount: 4 },
        { ingredient: 1082047, amount: 10 },
        { ingredient: 20081, amount: 3.5 },
        { ingredient: 18372, amount: 8.5 },
        { ingredient: 1123, amount: 7 }
      ]);
    });

    it('should not be able to cook a recipe if the user does not have all the required ingredients', () => {
      expect(pantry1.cookRecipe(recipe2)).to.equal('Cannot cook this recipe yet, you are missing some ingredients.');
    });

    it('should have a method to add a certain amount of an ingredient to the pantry by id', () => {
      pantry1.addIngredient(11297, 5)
      pantry1.addIngredient(1123, 3)
      pantry1.addIngredient(14, 1000)
      expect(pantry1.ingredientsInPantry).to.deep.equal([
        { ingredient: 11297, amount: 9 },
        { ingredient: 1082047, amount: 10 },
        { ingredient: 20081, amount: 5 },
        { ingredient: 18372, amount: 9 },
        { ingredient: 1123, amount: 11 },
        { ingredient: 14, amount: 1000 }
      ])
    })

});