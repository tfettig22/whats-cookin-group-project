import { expect } from 'chai';
import Pantry from '../src/classes/Pantry.js';
import Recipe from '../src/classes/Recipe.js';
import User from '../src/classes/User.js';
const data = require('../src/data/recipes.js');
const data1 = require('../src/data/ingredients.js');
const data2 = require('../src/data/users.js');
const testRecipeData = data.testRecipeData;
const testIngData = data1.testIngredients;
const userIngData = data1.testIngredientsByUser;
const testUserData = data2.testUserData;

describe('Pantry', () => {
    let recipe1;
    let recipe2;
    let user1;
    let user2;
    let pantry1; 
    let emptyPantry;

    beforeEach(() => {
     user1 = new User(testUserData[0]);
     user2 = new User(testUserData[1]);
     emptyPantry = new Pantry()
     pantry1 = new Pantry(user1.pantry)
     recipe1 = new Recipe(testRecipeData[0], testIngData);
     recipe2 = new Recipe(testRecipeData[1], testIngData);
    })

    it('should create a new instance of Pantry', () => {
        expect(pantry1).to.be.an.instanceOf(Pantry)
    })

    it('should start empty', () => {
        expect(emptyPantry.ingredientsInPantry).to.deep.equal([])
    })

    it('should take in a user pantry', () => {
        expect(pantry1.ingredientsInPantry).to.deep.equal(user1.pantry)
    })

    it('should get all the ingredients in pantry details', () => {
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
              }
            ])
    })

    it('should be told what ingredients are still needed for a recipe', () => {
        expect(pantry1.getMissingIngredients(recipe1, userIngData)).to.deep.equal([
        {
            "id": 11297,
            "name": "flat leaf parsley leaves",
            "amount": 4,
            "recipeAmount": ,
            "amountNeeded": ,
          },
          {
            "id": 1082047,
            "name": "kosher salt",
            "amount": 10,
            "recipeAmount": ,
            "amountNeeded": ,
          }
        ])
    })

    // it.skip('should check if pantry has enough ingredients to cook a recipe', () => {
    //     expect(user1.pantry.canCookRecipe(recipe1, userIngData)).to.equal(false)
    // })

    // it.skip('should check list of recipes to see if pantry has ingredients to cook recipe', () => {
    //     expect(user1.pantry.canCookAnyRecipe(user1.recipesToCook, userIngData)).to.equal(true)
    // })

})