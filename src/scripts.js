import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import RecipeRepository from './classes/RecipeRepository';
import Recipe from './classes/Recipe';
import Ingredient from './classes/Ingredient';
import User from './classes/User';
const recipeData = require('./data/recipes');
const ingredientData = require('./data/ingredients');
const userData = require('./data/users');

// ***** Query Selectors ***** //

const homePage = document.querySelector('.main-page-container');
const recipePage = document.querySelector('.recipe-container');
const homeButton = document.querySelector('.home-img');
const favoriteButton = document.querySelector('.fav-img');
const allRecipesSection = document.querySelector('.all-recipes');
const icon1Img = document.querySelector('.icon-1-img');
const icon2Img = document.querySelector('.icon-2-img');
const icon3Img = document.querySelector('.icon-3-img');
const icon4Img = document.querySelector('.icon-4-img');
const recipeNameBox = document.querySelector('.recipe-title-box');
const recipePriceList = document.querySelector('.price-box');
const recipeDetailsBox = document.querySelector('.recipe-box')
const searchBar = document.querySelector('.search-bar')

// ***** Event Listeners ***** //

window.addEventListener('load', updateMainPageRecipeIcons);
window.addEventListener('load', loadNewUser);
window.addEventListener('load', displayAllRecipeNames);
allRecipesSection.addEventListener('click', viewRecipe);
homeButton.addEventListener('click', showHomePage);
searchBar.addEventListener('keyup', filterRecipeByTag);
searchBar.addEventListener('keyup', filterRecipeByName);

// ***** Global Variables ***** //

const allRecipes = recipeData.recipeData.map(recipe => {
  return new Recipe(recipe, ingredientData.ingredientsData);
})
const recipeRepository =  new RecipeRepository(allRecipes);
let user;

// ***** Functions ***** //

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}

function loadNewUser() {
  user = new User(userData.usersData[getRandomIndex(userData.usersData)]);
}

function updateMainPageRecipeIcons() {
  icon1Img.src = allRecipes[getRandomIndex(allRecipes)].image;
  icon2Img.src = allRecipes[getRandomIndex(allRecipes)].image;
  icon3Img.src = allRecipes[getRandomIndex(allRecipes)].image;
  icon4Img.src = allRecipes[getRandomIndex(allRecipes)].image;
}

function displayAllRecipeNames() {
  const allRecipeNames = allRecipes.map(recipe => recipe.name);
  allRecipeNames.forEach(name => {
    allRecipesSection.innerHTML += `<p>${name}</p>`
  });
}


function showHomePage() {
  hide(recipePage);
  show(homePage);
}

function viewRecipe(event) {
  hide(homePage);
  show(recipePage);
  let selectedRecipeName = event.target.innerText
  console.log(selectedRecipeName)
  let selectedRecipe = allRecipes.filter(recipe => selectedRecipeName === recipe.name)
  recipeNameBox.innerText = selectedRecipe[0].name
  recipeDetailsBox.innerText = selectedRecipe[0].returnRecipeInstructions()
  recipePriceList.innerText = selectedRecipe[0].getCostofRecipe()

}

function filterRecipeByTag(){
  const term = e.target.value.toLowerCase() 
  const recipes = allRecipes.getElementByTagName(allRecipes.tags)
  if(recipes.getIndexOf(term) != -1){
    book
  }
  
}
function filterRecipeByName(name){
  allRecipes.filter(name)
}
//created filter recipe by name function --> need refactor

/// started search by tag function