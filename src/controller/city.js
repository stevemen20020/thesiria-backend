const { PrismaClient } = require("@prisma/client");

const City = new PrismaClient().city

const getAllCities = async (req, res) => {
    try{
        const allCities = await City.findMany({
            include: {
                tiles_city_location_idTotiles: true
            }
        })

        res.status(200).json({result:allCities})
    } catch (e) {
        console.log(e)
    }
}

const getCityById = async (req, res) => {
    try{
        const cityId = parseInt(req.params.id)
        const uniqueCity = await City.findUnique({
            include: {
                tiles_city_location_idTotiles: true
            },
            where:{
                id:cityId
            }
        })

        if(uniqueCity === null) res.status(404).json({error:'City not found'})

        res.status(200).json({result:uniqueCity})
    } catch (e) {
        console.log(e)
    }
}

const insertCity = async(req, res) => {
    try{
        const cityData = req.body
        const newCity = await City.create({
            data:cityData
        })

        res.status(200).json({result:newCity})
    } catch (e) {
        console.log(e)
    }
}

const updateCity = async(req, res) => {
    try{
        const cityData = req.body
        const cityId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingCity = await City.findUnique({
            where: {
                id: cityId,
            },
        });

        if (!existingCity) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "City not found" });
        }

        const editedCity = await City.update({
            where:{
                id:cityId
            },
            data:cityData
        })

        res.status(200).json({result:editedCity})
    } catch (e) {
        console.log(e)
    }
}

const deleteCity = async(req, res) => {
    try{
        const cityId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingCity = await City.findUnique({
            where: {
                id: cityId,
            },
        });

        if (!existingCity) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "City not found" });
        }

        const deletedCity = await City.delete({
            where:{
                id:cityId
            },
        })

        res.status(200).json({result:deletedCity})
    } catch (e) {
        console.log(e)
    }
}

module.exports ={
    getAllCities: getAllCities,
    getCityById: getCityById,
    insertCity: insertCity,
    updateCity: updateCity,
    deleteCity: deleteCity
}