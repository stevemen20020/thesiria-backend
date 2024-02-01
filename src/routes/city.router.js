import { Router } from "express";
import { getAllCities, 
        getCityById, 
        insertCity,
        updateCity, 
        deleteCity } from "../controller/city.js";

const cityRouter = Router()

cityRouter.get('/', getAllCities)
cityRouter.get('/:id', getCityById)
cityRouter.post('/', insertCity)
cityRouter.put('/:id', updateCity)
cityRouter.delete('/:id', deleteCity)

export default cityRouter
