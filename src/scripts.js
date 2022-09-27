import './styles.css';
import { getAllData } from './apiCalls';
import RecipeRepository from './classes/RecipeRepository';
import Recipe from './classes/Recipe';
import User from './classes/User';

// ***** Query Selectors ***** //

const homePage = document.querySelector('.main-page-container');
const recipePage = document.querySelector('.recipe-container');
const favoritesPage = document.querySelector('.main-favorite-container');
const searchContainer = document.querySelector('.search-container');
const searchFavoritesContainer = document.querySelector('.search-favorite-container');
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
const quantities = document.querySelector('.quantities');
const names = document.querySelector('.names');
const prices = document.querySelector('.prices');
const favoriteRecipeImages = document.querySelector('.fav-container-lower-wrapper');
const nameRadioBtnFavorite = document.querySelector('.name-search-favorite');
const tagRadioBtnFavorite = document.querySelector('.tag-search-favorite');
const removeFavFiltersBtn = document.querySelector('.remove-filters-button-fav');
const homeButton = document.querySelector('.home-img');
const favoritePageBtn = document.querySelector('.fav-img');
const searchButton = document.querySelector('.search-button');
const favoriteSearchBtn = document.querySelector('.favorite-search-button');
const addFavoriteBtn = document.querySelector('.add-favorite-button');
const addToFavoritesText = document.querySelector('.add-favorites-text')
const userWelcomeMessage = document.querySelector('.user-welcome-message');
const nameRadioBtn = document.querySelector('.name-search');
const removeFiltersBtn = document.querySelector('.remove-filters-button');
const tagRadioBtn = document.querySelector('.tag-search');
const sideBarTitle = document.querySelector('.side-bar-title-wrapper');
const userPantryContainer = document.querySelector('.pantry-ingredients');
const convertToId = document.querySelector('.convert-to-id');
const getIngId2 = document.querySelector('.get-ing-id2');
const ingredientForm = document.querySelector('.add-pantry-ingredient-form');
const addIngBtn = document.querySelector('.add-ingredient-btn');
const goToFormButton = document.querySelector('.go-to-form-button');
const userPantryIngredients = document.querySelector('.user-info-pantry-container');
const ingIdInput = document.querySelector('.ingredient-id-input');
const ingQInput = document.querySelector('.ingredient-quantity')
const pantryTitle = document.querySelector('.user-pantry-title');
const errorMsg = document.querySelector('.post-error-message');
const refreshPantry = document.querySelector('.refresh-pantry');

// ***** Event Listeners ***** //
window.addEventListener('load', getAllData);
recipeSidebarList.addEventListener('click', viewRecipe);
recipeSidebarList.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
    viewRecipe(event);
  }
});
recipeIconContainer.addEventListener('click', viewRecipeFromIcon);
favoriteRecipeImages.addEventListener('click', viewRecipeFromIcon);
favoriteRecipeImages.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
    viewRecipeFromIcon(event);
  }
});
homeButton.addEventListener('click', showHomePage);
homeButton.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
    showHomePage();
  }
});
searchButton.addEventListener('click', filterRecipe);
favoriteSearchBtn.addEventListener('click', filterFavoriteRecipes);
favoritePageBtn.addEventListener('click', showFavoritesPage);
favoritePageBtn.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
    showFavoritesPage();
  }
});
addFavoriteBtn.addEventListener('click', addToFavorites);
removeFavFiltersBtn.addEventListener('click', showFavoritesPage);
removeFiltersBtn.addEventListener('click', displayAllNames);
convertToId.addEventListener('click', getIngredientId);
goToFormButton.addEventListener('click', goToFormView);
addIngBtn.addEventListener('click', makeNewIngredientToPost);
refreshPantry.addEventListener('click', refreshPantryList);

// ***** Global Variables ***** //
let ingredientData;
let userData;
let user;
let recipeData;
let selectedRecipeName;
let selectedRecipeIcon;
let selectedRecipe;
let recipeRepository;
let allRecipes;
let newIngredientToPost;

// ***** Functions ***** //

getAllData().then(responses => {
  recipeData = responses[0];
  ingredientData = responses[1];
  userData = responses[2];
  user = new User(userData[getRandomIndex(userData)]);
  allRecipes = recipeData.map(recipe => new Recipe(recipe, ingredientData));
  recipeRepository =  new RecipeRepository(allRecipes);
  updateMainPageRecipeIcons();
  displayAllNames();
});

//~~~~~~~~~Post Request~~~~~~~~~~~~~~

const addNewIngredient = (newIngredient) => {
  fetch('http://localhost:3001/api/v1/users', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newIngredient)
  })
  .then(response => {
    if(!response.ok) {
      throw new Error(response.statusText);
    } else {
      return response.json();
    }   
  })
  .then(ingredient => {
    user.pantry.addIngredient(newIngredient['ingredientID'], newIngredient['ingredientModification']);
    getAllData();
    showFavoritesPage();
  })
  .catch(err => {
    errorMsg.innerText = err.message;
  });
 }

function makeNewIngredientToPost(event) {
  event.preventDefault();
  newIngredientToPost = { userID: user.id,
                          ingredientID: parseFloat(ingIdInput.value),
                          ingredientModification: parseFloat(ingQInput.value) }
  addNewIngredient(newIngredientToPost);
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}

function updateUserWelcome(user) {
  userWelcomeMessage.innerText = `Welcome \n ${user.name}, \n ready to cook?`;
}

function changeToUpperCase(data) {
  data.forEach(recipe => {
    let wordsInName = recipe.name.split(' ');
    let capitalizedWords = wordsInName.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    recipe.name = capitalizedWords.join(' ');
  });
}

function updateMainPageRecipeIcons() {
  let numbers = [];
  let randomNumber;
  allRecipes.forEach(recipe => {
    randomNumber = getRandomIndex(allRecipes);
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  });
  icon1Img.src = allRecipes[numbers[0]].image;
  icon2Img.src = allRecipes[numbers[1]].image;
  icon3Img.src = allRecipes[numbers[2]].image;
  icon4Img.src = allRecipes[numbers[3]].image;
  icon5Img.src = allRecipes[numbers[4]].image;
  icon6Img.src = allRecipes[numbers[5]].image;
  featureImage.src = allRecipes[numbers[6]].image;
  updateUserWelcome(user);
}

function displayRecipeNames(recipes) {
  recipeSidebarList.innerHTML = '';
  const recipeNames = recipes.map(recipe => recipe.name);
  recipeNames.forEach(name => {
    recipeSidebarList.innerHTML += `<p class="recipes-list" tabindex=0 role='button'>${name}</p>`;
  });
}

function displayAllNames() {
  recipeRepository.recipeData.forEach(recipe => {
    let wordsInName = recipe.name.split(' ');
    let capitalizedWords = wordsInName.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    recipe.name = capitalizedWords.join(' ');
  })
  displayRecipeNames(recipeRepository.recipeData);
  show(sideBarTitle);
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
  hide(ingredientForm);
  show(userPantryIngredients);
  show(favoritesPage);
  show(searchFavoritesContainer);
  showFavoriteRecipeImages(user.recipesToCook);
  show(userPantryContainer);
  displayPantryIngredients();
  pantryTitle.innerText = 'User\'s Pantry Ingredients';
}

function viewRecipe(event) {
  displayRecipeByClickTag(event);
  if (event.target.classList.contains('recipes-list')) {
    selectedRecipeName = event.target.innerText;
    selectedRecipe = allRecipes.filter(recipe => selectedRecipeName === recipe.name)[0];
    viewRecipesHelperFunction();
  }
}

function viewRecipeFromIcon(event) {
  if (event.target.classList.contains('icon')) {
    selectedRecipeIcon = event.target.src;
    selectedRecipe = allRecipes.filter(recipe => selectedRecipeIcon === recipe.image)[0];
    viewRecipesHelperFunction();
  }
  if(event.target.classList.contains('remove-from-favorites-btn')) {
    removeFromFavorites(event);
  }
  if(event.target.classList.contains('cook-me-btn')) {
    cookRecipe(event);
  }
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
  toggleFavoritesButton();
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
  recipeDetailsBox.innerHTML += `<p class='recipe-instructions'>Step ${instruction} </p></br>`;
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
  show(sideBarTitle);
  if (filteredRecipes.length === 0) {
    hide(sideBarTitle);
    recipeSidebarList.innerHTML = 
    `<p class="tag-names">No recipes found, try one of these tags: </p> 
     <ul> 
        <br> <li class="tag"> Antipasti </li>
        <br> <li class="tag"> Starter </li>
        <br> <li class="tag"> Snack </li>
        <br> <li class="tag"> Appetizer </li>
        <br> <li class="tag"> Antipasto </li>
        <br> <li class="tag"> Hor d'oeuvre </li>
        <br> <li class="tag"> Lunch </li>
        <br> <li class="tag"> Main course </li>
        <br> <li class="tag"> Main dish </li>
        <br> <li class="tag"> Dinner </li>
        <br> <li class="tag"> Side dish </li>
        <br> <li class="tag"> Salad </li>
        <br> <li class="tag"> Condiment </li>
        <br> <li class="tag"> Dip </li>
        <br> <li class="tag"> Spread </li>
        <br> <li class="tag"> Sauce </li>
      </ul>`;
  }
}

function displayRecipeByClickTag(event) {
  if(event.target.classList.contains('tag')){
    filterRecipeByTag(event.target.innerText);
  }
}

function filterRecipeByName(name) {
  let input = name.toLowerCase();
  recipeRepository.recipeData.forEach(recipe => {
    recipe.name = recipe.name.toLowerCase();
  });
  let filteredRecipes = recipeRepository.filterByName(input);
  changeToUpperCase(filteredRecipes);
  displayRecipeNames(filteredRecipes);
  if (filteredRecipes.length === 0) {
    recipeSidebarList.innerHTML = `<p>No recipes found, try a different name/keyword.</p>`;
  }
}

function addToFavorites() {
  user.addRecipesToCook(selectedRecipe);
  toggleFavoritesButton();
}

function toggleFavoritesButton() {
  if (user.recipesToCook.includes(selectedRecipe)) {
    hide(addFavoriteBtn);
    addToFavoritesText.innerText = 'Favorite';
  } else {
    show(addFavoriteBtn);
    addToFavoritesText.innerText = 'Add to Favorites';
  }
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
  let input = tag.toLowerCase();
  let filteredRecipes = user.filterSavedRecipesByTag(input);
  showFavoriteRecipeImages(filteredRecipes);
  if (filteredRecipes.length === 0) {
    favoriteRecipeImages.innerHTML = `<p>No recipes found, try a different tag.</p>`;
  }
}

function filterFavoriteRecipesByName(name) {
  let input = name.toLowerCase();
  user.recipesToCook.forEach(recipe => {
    recipe.name = recipe.name.toLowerCase();
  });
  let filteredRecipes = user.filterSavedRecipesByName(input);
  changeToUpperCase(filteredRecipes);
  showFavoriteRecipeImages(filteredRecipes);
  if (filteredRecipes.length === 0) {
    favoriteRecipeImages.innerHTML = `<p>No recipes found, try a different name/keyword.</p>`;
  }
}

function showFavoriteRecipeImages(recipes) {
  changeToUpperCase(user.recipesToCook);
  favoriteRecipeImages.innerHTML = '';
  recipes.forEach(recipe => {
  favoriteRecipeImages.innerHTML +=
  `
  <section class="favorite-recipe-icons">
    <p class="icon-text">${recipe.name}</p>
    <img class="favorite-recipe-images icon" src=${recipe.image} id=${recipe.id} tabindex="0">
    <section class= "button-container"> 
    <button class="cook-me-btn" id = ${recipe.id}>cook me!</button> 
    <button class="remove-from-favorites-btn" id=${recipe.id}>delete</button>
    </section>
  </section>`;
  });
}

function removeFromFavorites(event) {
  let recipe = event.target;
  if(recipe.classList.contains("remove-from-favorites-btn")) {
    user.removeRecipesToCook(parseInt(recipe.id));
  }
  showFavoriteRecipeImages(user.recipesToCook);
}

function displayPantryIngredients() {
  userPantryContainer.innerHTML = '';
  let pantryIngredients = user.pantry.getIngredientDetails(ingredientData);
  pantryIngredients.forEach(pantryIngredient => {
    userPantryContainer.innerHTML += `<p class='pantry-items'> ${pantryIngredient.amount} -- ${pantryIngredient.name}</p>`;
  });
}

function convertIngNameToId(name) {
  ingredientData.forEach(ing => {
    if (ing.name === name) {
      ingIdInput.value = ing.id;
    }
  })
  if (ingredientData.every(ing => ing.name !== name)) {
    getIngId2.value = 'Ingredient not found';
  }
}

function getIngredientId(event) {
  event.preventDefault(event);
  convertIngNameToId(getIngId2.value);
}

function goToFormView() {
  hide(userPantryIngredients);
  show(ingredientForm);
}
  
function cookRecipe(event) {
  let selectedRecipe;
  allRecipes.forEach(recipe => {
    if((parseInt(event.target.id)) === recipe.id) {
      selectedRecipe = recipe;
    }
  })
    if (!user.pantry.checkIfUserCanCookRecipe(selectedRecipe)) {
      displayMissingIngredients(selectedRecipe);
   } else {
      user.pantry.cookRecipe(selectedRecipe);
      pantryTitle.innerText = 'Pantry amounts updated';
      displayPantryIngredients();
   }
}

function displayMissingIngredients(selectedRecipe) {
  pantryTitle.innerText = 'Oops, these ingredients are still needed:';
  userPantryContainer.innerHTML = '';
  let missingIngredients = user.pantry.getMissingIngredients(selectedRecipe, ingredientData);
  missingIngredients.forEach(pantryIngredient => {
    userPantryContainer.innerHTML += `<p class='pantry-items'>${pantryIngredient.amount} -- ${pantryIngredient.name}</p>`;
  })
}

function refreshPantryList() {
  showFavoritesPage();
}
