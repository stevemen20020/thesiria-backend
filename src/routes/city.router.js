const { Router } = require("express");
const { getAllCities, 
        getCityById, 
        insertCity,
        updateCity, 
        deleteCity } = require ("../controller/city.js");

const cityRouter = Router()

cityRouter.get('/', getAllCities)
cityRouter.get('/:id', getCityById)
cityRouter.post('/', insertCity)
cityRouter.put('/:id', updateCity)
cityRouter.delete('/:id', deleteCity)

module.exports =  cityRouter
