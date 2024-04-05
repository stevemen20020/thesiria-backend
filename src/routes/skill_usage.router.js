const { Router } = require("express");
const { getAllSkills,
        getSkillById,
        insertSkill,
        updateSkill,
        deleteSkill } = require ("../controller/skill_usage.js");

const skillRouter = Router()

skillRouter.get('/', getAllSkills)
skillRouter.get('/:id', getSkillById)
skillRouter.post('/', insertSkill)
skillRouter.put('/:id', updateSkill)
skillRouter.delete('/:id', deleteSkill)

module.exports =  skillRouter
