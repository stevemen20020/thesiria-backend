import { PrismaClient } from "@prisma/client"

const Users = new PrismaClient().users

export const getAllUsers = async (req, res) => {
    try{
        const allUsers = await Users.findMany()
        res.status(200).json({result:allUsers})
    } catch (e) {
        console.log(e)
    }
}

export const getUniqueUser = async (req, res) => {
    try{
        const userId = parseInt(req.params.id)
        const uniqueUser = await Users.findUnique({
            where:{
                id:userId
            }
        })

        if(uniqueUser === null) res.status(404).json({error:'User not found'})

        res.status(200).json({result:uniqueUser})
    } catch (e) {
        console.log(e)
    }
}

export const insertUser = async(req, res) => {
    try{
        const userData = req.body
        const newUser = await Users.create({
            data:userData
        })

        res.status(200).json({result:newUser})
    } catch (e) {
        console.log(e)
    }
}

export const updateUser = async (req, res) => {
    try {
        const userData = req.body;
        const userId = parseInt(req.params.id);

        // Attempt to find the user first
        const existingUser = await Users.findUnique({
            where: {
                id: userId,
            },
        });

        if (!existingUser) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "User not found" });
        }

        // User exists, proceed with the update
        const editedUser = await Users.update({
            where: {
                id: userId,
            },
            data: userData,
        });

        res.status(200).json({ result: editedUser });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const deleteUser = async(req, res) => {
    try{
        const userId = parseInt(req.params.id)

        // Attempt to find the user first
        const existingUser = await Users.findUnique({
            where: {
                id: userId,
            },
        });

        if (!existingUser) {
            // If the user doesn't exist, return a 404 response
            return res.status(404).json({ error: "User not found" });
        }

        const deletedUser = await Users.delete({
            where:{
                id:userId
            },
        })

        res.status(200).json({result:deletedUser})
    } catch (e) {
        console.log(e)
    }
}