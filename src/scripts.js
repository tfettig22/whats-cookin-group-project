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
const favoritesPage = document.querySelector('.main-favorite-container');
const searchContainer = document.querySelector('.search-container');
const searchFavoritesContainer = document.querySelector('.search-favorite-container');
const homeButton = document.querySelector('.home-img');
const favoritePageButton = document.querySelector('.fav-img');
const searchButton = document.querySelector('.search-button');
const favoriteSearchButton = document.querySelector('.favorite-search-button');
const recipeSidebarList = document.querySelector('.list-recipes');
const recipeIconContainer = document.querySelector('.recipe-icon-container');
const icon1Img = document.querySelector('.icon-1-img');
const icon2Img = document.querySelector('.icon-2-img');
const icon3Img = document.querySelector('.icon-3-img');
const icon4Img = document.querySelector('.icon-4-img');
const icon5Img = document.querySelector('.icon-5-img');
const icon6Img = document.querySelector('.icon-6-img');
const featureImage = document.querySelector('.random-feature-img');
const selectedRecipeImg = document.querySelector('.selected-recipe-img');
const recipeNameBox = document.querySelector('.recipe-title-box');
const totalPriceBox = document.querySelector('.total-price-box');
const recipeDetailsBox = document.querySelector('.recipe-info-box');
const searchValue = document.querySelector('.search-input');
const favoriteSearchValue = document.querySelector('.search-favorite-input');
const tagRadioBtn = document.querySelector('.tag-search');
const nameRadioBtn = document.querySelector('.name-search');
const nameRadioBtnFavorite = document.querySelector('.name-search-favorite');
const tagRadioBtnFavorite = document.querySelector('.tag-search-favorite');
const addFavoriteButton = document.querySelector('.add-favorite-button');
const quantities = document.querySelector('.quantities');
const names = document.querySelector('.names');
const prices = document.querySelector('.prices')
const favoriteRecipeImages = document.querySelector('.favorite-recipe-icons');
const removeFiltersButton = document.querySelector('.remove-filters-button');
const userWelcomeMessage = document.querySelector('.user-welcome-message');

// ***** Event Listeners ***** //
// window.addEventListener('load', updateMainPageRecipeIcons);
// window.addEventListener('load', updateMainPageFeatureImg);
// window.addEventListener('load', loadNewUser);
// window.addEventListener('load', displayAllNames);
recipeSidebarList.addEventListener('click', viewRecipe);
recipeIconContainer.addEventListener('click', viewRecipeFromIcon);
// favoriteRecipeImages.addEventListener('click', viewRecipeFromIcon);
homeButton.addEventListener('click', showHomePage);
searchButton.addEventListener('click', filterRecipe);
favoriteSearchButton.addEventListener('click', filterFavoriteRecipes)
favoritePageButton.addEventListener('click', showFavoritesPage);
addFavoriteButton.addEventListener('click', addToFavorites);
favoriteRecipeImages.addEventListener('rightclick', removeFromFavorites);
removeFiltersButton.addEventListener('click', showFavoritesPage);

// ***** Global Variables ***** //

const allRecipes = recipeData.recipeData.map(recipe => new Recipe(recipe, ingredientData.ingredientsData));
let user;
let selectedRecipeName;
let selectedRecipeIcon;
let selectedRecipe;
let recipeRepository;

// ***** Functions ***** //

getAllData().then(responses => {
  recipeRepository =  new RecipeRepository(responses[0]);
  ingredientData = responses[1];
  userData = responses[2];
  window.addEventListener('load', updateMainPageRecipeIcons);
  window.addEventListener('load', updateMainPageFeatureImg);
  window.addEventListener('load', loadNewUser);
  window.addEventListener('load', displayAllNames);
});

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

function updateUserWelcome(user) {
  userWelcomeMessage.innerText = `Welcome \n ${user.name}, \n ready to cook?`
}

function updateMainPageRecipeIcons() {
  icon1Img.src = allRecipes[getRandomIndex(allRecipes)].image;
  icon2Img.src = allRecipes[getRandomIndex(allRecipes)].image;
  icon3Img.src = allRecipes[getRandomIndex(allRecipes)].image;
  icon4Img.src = allRecipes[getRandomIndex(allRecipes)].image;
  icon5Img.src = allRecipes[getRandomIndex(allRecipes)].image;
  icon6Img.src = allRecipes[getRandomIndex(allRecipes)].image;
  loadNewUser();
  updateUserWelcome(user);
}

function updateMainPageFeatureImg(){
  featureImage.src = allRecipes[getRandomIndex(allRecipes)].image;
}

function displayRecipeNames(recipes) {
  recipeSidebarList.innerHTML = ''
  const recipeNames = recipes.map(recipe => recipe.name);
  recipeNames.forEach(name => {
    recipeSidebarList.innerHTML += `<p class="recipes-list">${name}</p>`
  });
}

function displayAllNames() {
  displayRecipeNames(recipeRepository.recipeData);
}

function showHomePage() {
  hide(recipePage);
  hide(favoritesPage);
  hide(searchFavoritesContainer);
  show(homePage);
  show(searchContainer);
}

function showFavoritesPage() {
  hide(homePage);
  hide(searchContainer);
  hide(recipePage);
  show(favoritesPage);
  show(searchFavoritesContainer);
  showFavoriteRecipeImages(user.recipesToCook);
}

function viewRecipe(event) {
  selectedRecipeName = event.target.innerText
  selectedRecipe = allRecipes.filter(recipe => selectedRecipeName === recipe.name)[0];
  viewRecipesHelperFunction()
}

function viewRecipeFromIcon(event){
  selectedRecipeIcon = event.target.src
  selectedRecipe = allRecipes.filter(recipe => selectedRecipeIcon === recipe.image)[0];
  viewRecipesHelperFunction()
}

function viewRecipesHelperFunction() {
  hide(homePage);
  hide(searchContainer);
  hide(favoritesPage);
  hide(searchFavoritesContainer);
  show(recipePage);
  displaySelectedRecipeName();
  displayRecipeInstructions();
  displayIngredientNames();
  displayIngredientCosts();
  displayIngredientQuantities();
  displayTotalCostOfAllIngredients();
  displaySelectedRecipeImg();
}

function displaySelectedRecipeName() {
  recipeNameBox.innerText = selectedRecipe.name;
}

function displaySelectedRecipeImg() {
  selectedRecipeImg.src = selectedRecipe.image;
}

function displayRecipeInstructions() {
  recipeDetailsBox.innerHTML = '';
  selectedRecipe.returnRecipeInstructions().forEach(instruction => {
  recipeDetailsBox.innerHTML += `<p class='recipe-instructions'> ${instruction} </p></br>`;
  });
}

function displayIngredientNames() {
  names.innerHTML = '';
  selectedRecipe.getIngredientNames().forEach(ingredient => {
  names.innerHTML += `<p class='recipe-ingredients'> ${ingredient} </p>`;
  });
}

function displayIngredientCosts() {
  prices.innerHTML = '';
  selectedRecipe.getCostOfIngredientsInDollars().forEach(cost => {
  prices.innerHTML += `<p class='ingredient-prices'> ${cost} </p>`;
  });
}

function displayIngredientQuantities() {
  quantities.innerHTML = '';
  selectedRecipe.getAmountOfIngredients().forEach(amount => {
  quantities.innerHTML += `<p class='ingredient-quantities'> ${amount} </p>`;
  });
}

function displayTotalCostOfAllIngredients() {
  totalPriceBox.innerText = selectedRecipe.getCostOfRecipe();
}

function filterRecipe(event) {
  event.preventDefault();
  if (tagRadioBtn.checked) {
    filterRecipeByTag(searchValue.value);
  } else if (nameRadioBtn.checked) {
    filterRecipeByName(searchValue.value);
  }
}

function filterRecipeByTag(tag) {
  let input = tag.toLowerCase();
  let filteredRecipes = recipeRepository.filterByTag(input);
  displayRecipeNames(filteredRecipes);
}

function filterRecipeByName(name) {
  let input = name.toLowerCase()
  recipeRepository.recipeData.forEach(recipe => {
    recipe.name = recipe.name.toLowerCase()
  })
  let filteredRecipes = recipeRepository.filterByName(input);
  filteredRecipes.forEach(recipe => {
    let wordsInName = recipe.name.split(' ')
    let capitalizedWords = str1.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    recipe.name = capitalizedWords.join(' ')
  })
  displayRecipeNames(filteredRecipes);
}

function addToFavorites() {
  user.addRecipesToCook(selectedRecipe)
}

function filterFavoriteRecipes(event) {
  event.preventDefault();
  if (tagRadioBtnFavorite.checked) {
    filterFavoriteRecipesByTag(favoriteSearchValue.value);
  } else if (nameRadioBtnFavorite.checked) {
    filterFavoriteRecipesByName(favoriteSearchValue.value);
  }
}

function filterFavoriteRecipesByTag(tag) {
  console.log('hello')
  let input = tag.toLowerCase();
  let filteredRecipes = user.filterSavedRecipesByTag(input);
  showFavoriteRecipeImages(filteredRecipes)
}

function filterFavoriteRecipesByName(name) {
  let filteredRecipes = user.filterSavedRecipesByName(name);
  showFavoriteRecipeImages(filteredRecipes)
}

function showFavoriteRecipeImages(recipes){
  favoriteRecipeImages.innerHTML = '';
  recipes.forEach(recipe => {
  favoriteRecipeImages.innerHTML += `<section class = "favorite-recipe-icons">
  <p>${recipe.name}</p>
  <img class = "favorite-recipe-icons" src = ${recipe.image} id = ${recipe.id}>
  <button class="remove-from-favorites-btn">delete</button>
  </section>`;
  });
}

function removeFromFavorites(event) {
  let recipe = event.target
  if(recipe.classList.contains("recipe-icons")) {
    recipe.closest("section").remove()
    user.removeRecipesToCook(parseInt(recipe.id))
  }
}
