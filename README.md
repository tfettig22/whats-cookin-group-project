# 👩‍🍳 What's Cookin'? 👩‍🍳
## We believe 'Anyone Can Cook!'

## Table of Contents
- [Introduction](#introduction)
- [Links](#links)
- [Learning Goals](#learning-goals)
- [Setup](#setup)
- [Features](#features)
- [Future Additions](#future-additions)
- [Contributors](#contributors)
- [Languages](#languages)

## Introduction
'Anyone Can Cook!' is an interactive website similar to Epicurious, AllRecipes, or NYTimes cooking. A user can browse recipes and save their favorites for later. Users can browse recipes by tag (course) or search for recipes by name. If a photo or name catches their eye, they can click on the recipe to see more details about the recipe such as ingredients, amounts, estimated cost to make, and step by step instructions. On the recipe page, they even have the option to add it to their Favorites aka future list of recipes to cook! The user can also search on their Favorites page by recipe name or by tags as well.

The user can also view the pantry ingredients and amounts they currently have. They can also specify a recipe to cook by clicking "cook me!" which will compare if the user has enough ingredients to cook it. If the user has enough ingredients, it will return the updated pantry with relevant ingredient amounts subtracted for that recipe. If the user does not have all the ingredients for the recipe, it will return which ingredients and amounts are still needed. Once the user goes out shopping, they can also manually add ingredients and their amounts to their pantry for future cooking fun!

## Links
- [Project spec](https://frontend.turing.edu/projects/whats-cookin-part-one.html)
- [Project Board](https://github.com/users/tfettig22/projects/1)
- [DTR](https://gist.github.com/GOECHA/d7bcb7fc6ac06c54144e9aa1259c1cfb)
- [WireFrame- Home Page](https://user-images.githubusercontent.com/102189342/179422204-fdd7ef75-4062-4c24-b966-a88e76d447c7.png)
- [WireFrame- Recipe/Favorite Page](https://user-images.githubusercontent.com/102189342/179422201-08ee9c5e-4410-476b-b611-b7a8f3c3bdfc.png)

## Learning Goals
- Implement ES6 classes that communicate to each other as needed
- Use object and array prototype methods to perform data manipulation
- Create a user interface that is easy to use and clearly displays information.
- Write modular, reusable code that follows SRP (Single Responsibility Principle)
- Implement a robust testing suite using TDD
- Make network/local server requests to retrieve data and utilize 'post' to add data

## Setup
1. This project fetches data from an API so you will need to begin by cloning down the API and running it.
Clone the API by running git clone git@github.com:turingschool/What-s-cookin--starter-kit-API.git
2.CD into that directory, run npm install and then npm start. You should see “What's cookin-starter-kit API is now running on http://localhost:3001 !”
Open a NEW terminal tab and cd somewhere outside of the API repo you just cloned. Do not close the tab that is running the API.
3. Clone a copy of this repo to your machine by running git clone `https://github.com/tfettig22/whats-cookin-group-project`. Add an optional argument after the repo url when cloning. The command should look like this: git clone [remote-address] [what you want to name the repo].
4. Once you have cloned the repo, change into that directory, run `npm install` and then `npm start`. You should see “Project is running at http://localhost:8080/"
5. A link will appear in the terminal similar to http://localhost:8080/ (you might see 8081). Open that link in your browser. `Control + C` is the command to stop running the local server. Closing the terminal without stopping the server first could allow the server to continue to run in the background and cause problems. This command is not specific to Webpack; make note of it for future use.
6. Enjoy!

## Features
- User can view all recipes on the main page and use the Search bar to filter by name or by tags (course) such as "snack" or "dinner." There are several ways to view more recipe info. The recipe images and a main recipe image on the main page as well as the links on the right side will all take you to that recipe:

![2022-07-17 18 43 51](https://media.giphy.com/media/nZSWMyKwrjrqWGK4D2/giphy.gif)

- On the recipe page, the user can view the recipe information such as instructions and ingredients, add their recipe to favorites and add recipe to cooking queue:

![2022-07-17 18 43 51](https://media.giphy.com/media/R5CsASE1SfLs9c7tda/giphy.gif)

- User can also view all Favorited Recipes and search among those recipes using the name and tag search functionality. 

![2022-07-17 18 43 51](https://media.giphy.com/media/dIrflY15FtColNPnd2/giphy.gif)

- User can also view the ingredients and amounts in their pantry or manually add ingredients to their pantry. 

- User can also specify a recipe to cook and the required ingredients to cook that recipe are compared to the ingredients currently in the pantry. If the ingredients are missing or not enough, the page will display which ingredients the user needs to go shopping for first. 

## Future Additions
- Add login screen for user. 
- Increase search functionality to also be able to search by ingredient.
- Sort recipes and ingredients alphabetically for a better user experience.  

## Contributors
This website was built by three Front End Engineering students in Mod 2 at the Turing School of Software and Design. 

- [Tom Fettig](https://github.com/tfettig22)
- [Nicole Forseth](https://github.com/forsethnico)
- [Chantal Goethals](https://github.com/GOECHA)

## Languages
- JavaScript
- HTML
- CSS
- Webpack
- API
- Testing using Mocha and Chai
