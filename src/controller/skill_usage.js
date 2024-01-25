import { PrismaClient } from "@prisma/client"

const Skill_Usage = new PrismaClient().skill_usage

export const getAllSkills = async (req, res) => {
    try{
        const allSkills = await Skill_Usage.findMany()

        res.status(200).json({result:allSkills})
    } catch (e) {
        console.log(e)
    }
}

export const getSkillById = async (req, res) => {
    try{
        const skillId = parseInt(req.params.id)
        const uniqueSkill = await Skill_Usage.findUnique({
            where:{
                id:skillId
            }
        })

        if(uniqueElement === null) res.status(404).json({error:'Element not found'})

        res.status(200).json({result:uniqueSkill})
    } catch (e) {
        console.log(e)
    }
}

export const insertSkill = async(req, res) => {
    try{
        const skillData = req.body
        const newSkill = await Skill_Usage.create({
            data:skillData
        })

        res.status(200).json({result:newSkill})
    } catch (e) {
        console.log(e)
    }
}

export const updateSkill = async(req, res) => {
    try{
        const skillData = req.body
        const skillId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingSkill = await Skill_Usage.findUnique({
            where: {
                id: skillId,
            },
        });

        if (!existingSkill) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Skill usage not found" });
        }

        const editedSkill = await Skill_Usage.update({
            where:{
                id:skillId
            },
            data:skillData
        })

        res.status(200).json({result:editedSkill})
    } catch (e) {
        console.log(e)
    }
}

export const deleteSkill = async(req, res) => {
    try{
        const skillId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingSkill = await Skill_Usage.findUnique({
            where: {
                id: skillId,
            },
        });

        if (!existingSkill) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "Skill usage not found" });
        }
    
        const deletedSkill = await Skill_Usage.delete({
            where:{
                id:skillId
            },
        })

        res.status(200).json({result:deletedSkill})
    } catch (e) {
        console.log(e)
    }
}