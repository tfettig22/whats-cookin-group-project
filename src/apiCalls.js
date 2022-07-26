// const getIngredientData = () => {
//     return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients')
//     .then(response => response.json())
//     .catch(error => console.log('API error: ${error.message}'));
// }

//   const getRecipeData = () => {
//     return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes')
//     .then(response => response.json())
//     .catch(error => console.log('API error: ${error.message}'));
//   }

//   const getUserData = () => {
//     return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users')
//     .then(response => response.json())
//     .catch(error => console.log('API error: ${error.message}'));
//   }

  const fetchAllData = (dataType) => {
    return fetch(`https://what-s-cookin-starter-kit.herokuapp.com/api/v1/${dataType}`)
    .then(response => response.json())
    .catch(error => console.log('API error: ${error.message}'));
  }

  const getAllData = () => {
    const result =  Promise.all([fetchAllData('recipes'), fetchAllData('ingredients'), fetchAllData('users')])
      .then(responses => {
        return responses;
      })
    return result;
  }

export { getAllData }
