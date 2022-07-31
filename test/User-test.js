import { expect } from 'chai';
import Recipe from '../src/classes/Recipe.js';
import User from '../src/classes/User.js';
const data = require('../src/data/recipes.js');
const data1 = require('../src/data/ingredients.js');
const data2 = require('../src/data/users.js');
const testRecipeData = data.testRecipeData;
const testIngData = data1.testIngredients;
const testUserData = data2.testUserData;

describe('User', () => {
  
  let user1;
  let user2;
  let recipe1;
  let recipe2;
  let recipe3;

  beforeEach(() => {
    user1 = new User(testUserData[0]);
    user2 = new User(testUserData[1]);
    recipe1 = new Recipe(testRecipeData[0], testIngData);
    recipe2 = new Recipe(testRecipeData[1], testIngData);
    recipe3 = new Recipe(testRecipeData[2], testIngData);
  
    });
    it('should be a function', () => {
      expect(User).to.be.a('function');
    });

    it('should have a name', () => {
      expect(user1.name).to.equal('Saige O\'Kon');
      expect(user2.name).to.equal('Ephraim Goyette');
    });

    it('should have an id', () => {
      expect(user1.id).to.equal(1);
      expect(user2.id).to.equal(2);
    });

    it('should have a pantry of ingredients', () => {
      expect(user1.pantry.ingredientsInPantry).to.deep.equal([
        {
          "ingredient": 11297,
          "amount": 4,
        },
        {
          "ingredient": 1082047,
          "amount": 10,
        },
        {
          "ingredient": 20081,
          "amount": 5,
        },
        {
          "ingredient": 18372,
          "amount": 9,
        },
        {
          "ingredient": 1123,
          "amount": 8,
        }
      ]);
      expect(user2.pantry.ingredientsInPantry).to.deep.equal([
        {
          ingredient: 6150,
          amount: 3,
        },
        {
          ingredient: 1032009,
          amount: 7,
        },
        {
          ingredient: 1082047,
          amount: 8,
        },
      ]);
    });

    it('should store recipes to cook, without duplicate recipes', () => {
      user1.addRecipesToCook(recipe1);
      expect(user1.recipesToCook).to.deep.equal([recipe1]);

      user1.addRecipesToCook(recipe2);
      user1.addRecipesToCook(recipe2);
      expect(user1.recipesToCook).to.deep.equal([recipe1, recipe2]);
    });

    it('should be able to remove recipes from recipes to cook array', () => {
      user1.addRecipesToCook(recipe1);
      user1.addRecipesToCook(recipe2);

      user1.removeRecipesToCook(595736);

      expect(user1.recipesToCook).to.deep.equal([recipe2]);

      user1.removeRecipesToCook(678353);

      expect(user1.recipesToCook).to.deep.equal([]);
    });

    it('should be able to filter the saved recipes by tag', () => {
      user1.addRecipesToCook(recipe1);
      user1.addRecipesToCook(recipe2);
      user1.addRecipesToCook(recipe3);
      user2.addRecipesToCook(recipe1);
      user2.addRecipesToCook(recipe2);
      user2.addRecipesToCook(recipe3);

      expect(user1.filterSavedRecipesByTag('antipasti')).to.deep.equal([recipe1])
      expect(user1.filterSavedRecipesByTag('antipasti')[0].name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups')
      expect(user2.filterSavedRecipesByTag('test')).to.deep.equal([recipe2, recipe3])
      expect(user2.filterSavedRecipesByTag('test')[1].name).to.equal('Dirty Steve\'s Original Wing Sauce')
    })

    it('filter should not return a recipe if there are no recipes that match the tag given', () => {
      user2.addRecipesToCook(recipe1);
      user2.addRecipesToCook(recipe2);
      user2.addRecipesToCook(recipe3);
      expect(user2.filterSavedRecipesByTag('brunch')).to.deep.equal([])
    }) 

    it('should be able to filter the saved recipes by name', () => {
      user1.addRecipesToCook(recipe1);
      user1.addRecipesToCook(recipe2);
      user1.addRecipesToCook(recipe3);
      user2.addRecipesToCook(recipe1);
      user2.addRecipesToCook(recipe2);
      user2.addRecipesToCook(recipe3);

      expect(user1.filterSavedRecipesByName('Cookie')).to.deep.equal([recipe1])
      expect(user1.filterSavedRecipesByName('Cookie')[0].name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups')
      expect(user2.filterSavedRecipesByName('Pork')).to.deep.equal([recipe2])
      expect(user2.filterSavedRecipesByName('Pork')[0].name).to.equal('Maple Dijon Apple Cider Grilled Pork Chops')
    })

    it('filter should not return a recipe if there are no recipes that match the name given', () => {
      user2.addRecipesToCook(recipe1);
      user2.addRecipesToCook(recipe2);
      user2.addRecipesToCook(recipe3);
      expect(user2.filterSavedRecipesByName('Lasagna')).to.deep.equal([])
    }) 

}); 
