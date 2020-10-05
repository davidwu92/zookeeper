const express = require('express');

const app = express()

const {animals} = require('./data/animals.json')

const PORT = process.env.PORT || 3001
// EXAMPLE DATA OBJECT = {
//   "id": "0",
//   "name": "Spindle",
//   "species": "bear",
//   "diet": "carnivore",
//   "personalityTraits": [
//     "hungry",
//     "zany",
//     "loving"
//   ]
// },

//filtering database before sending filtered results up to front end.
const filterByQuery = (query, animalsArray)=>{
  let filteredResults = animalsArray
  
  //filter by personality traits; string if only one in query, array if multiple in query.
  let ptArray = [];
  if(query.personalityTraits){
    if(typeof(query.personalityTraits) === 'string'){
      ptArray = [query.personalityTraits]
    } else {
      ptArray = query.personalityTraits
    }
    console.log(ptArray)
    ptArray.forEach(trait=>{
      filteredResults = filteredResults.filter(animal=>animal.personalityTraits.indexOf(trait)!==-1)
    })
  }
  if(query.diet){
    filteredResults = filteredResults.filter(animal=>animal.diet === query.diet)
  }
  if(query.species){
    filteredResults = filteredResults.filter(animal=>animal.species === query.species)
  }
  if(query.name){
    filteredResults = filteredResults.filter(animal=>animal.name === query.name)  
  }
  return filteredResults
}

const findById = (id, animalsArray)=>{
  let result = animalsArray.filter(animal=>animal.id===id)[0]
  return result
}

app.get('/', (req, res)=>{
  res.send(`
  Please specify route: /api/animals for entire animal database.
  To search for a specific animal by id, use route: /api/animals/id
  Add queries to search for animals by name, personalityTraits, species, or diet.
  i.e. "/api/animals?name=Erica"
  `)
})

app.get('/api/animals', (req, res) => {
  let results = animals
  console.log(req.query)
  //req.query is the object of queries: http://localhost:3001/api/animals?name=Erica
  //query object: {name: 'Erica'}
  //A query with: ?a=111&b=222&b=333
  //has object: {a: 111, b: [222, 333]}. Multiple values for same KEY are shoved into array.

  if (req.query){
    results = filterByQuery(req.query, animals)
  }
  

  res.json(results)
});

//this param route must come after the other route.
app.get('/api/animals/:id', (req, res)=>{
  let result = findById(req.params.id, animals)
  result?res.json(result):res.send(404)
})

app.listen(PORT, ()=>{
  console.log(`Server listening on ${PORT}`)
})
//websites have addresses: like address of a college campus.
//ports tell exactly where to go: building, classroom # on campus.