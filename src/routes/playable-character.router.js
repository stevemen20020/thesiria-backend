import { Router } from "express";
import { getAllCharacters, getPlayableCharacterById, insertPlayableCharacterById, updatePlayableCharacter, deletePlayableCharacter } from "../controller/playable-character.js";

const characterRouter = Router()

characterRouter.get('/', getAllCharacters)
characterRouter.get('/:id', getPlayableCharacterById)
characterRouter.post('/', insertPlayableCharacterById)
characterRouter.put('/:id', updatePlayableCharacter)
characterRouter.delete('/:id', deletePlayableCharacter)

export default characterRouter
