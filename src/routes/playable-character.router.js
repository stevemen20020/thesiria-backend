const { Router } = require("express");
const { getAllCharacters, 
    getPlayableCharacterById, 
    insertPlayableCharacterById, 
    updatePlayableCharacter, 
    deletePlayableCharacter } = require ("../controller/playable-character.js");

const characterRouter = Router()

characterRouter.get('/', getAllCharacters)
characterRouter.get('/:id', getPlayableCharacterById)
characterRouter.post('/', insertPlayableCharacterById)
characterRouter.put('/:id', updatePlayableCharacter)
characterRouter.delete('/:id', deletePlayableCharacter)

module.exports =  characterRouter
