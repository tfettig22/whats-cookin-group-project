const fetchAllData = (dataType) => {
    return fetch(`http://localhost:3001/api/v1/${dataType}`)
    .then(response => response.json())
    .catch(error => console.log('API error: ${error.message}'));
  }

const getAllData = () => {
  const result = Promise.all([fetchAllData('recipes'), fetchAllData('ingredients'), fetchAllData('users')])
    .then(responses => {
      return responses;
    })
    return result;
  }

 
export { getAllData }
