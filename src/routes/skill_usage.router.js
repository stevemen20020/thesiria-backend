import { Router } from "express";
import { getAllSkills,
        getSkillById,
        insertSkill,
        updateSkill,
        deleteSkill } from "../controller/skill_usage.js";

const skillRouter = Router()

skillRouter.get('/', getAllSkills)
skillRouter.get('/:id', getSkillById)
skillRouter.post('/', insertSkill)
skillRouter.put('/:id', updateSkill)
skillRouter.delete('/:id', deleteSkill)

export default skillRouter
