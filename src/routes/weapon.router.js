const { Router } = require("express");
const { getAllWeapons, getWeaponById, insertWeapon, updateWeapon, deleteWeapon } = require ("../controller/weapon.js");

const WeaponRouter = Router()

WeaponRouter.get('/', getAllWeapons)
WeaponRouter.get('/:id', getWeaponById)
WeaponRouter.post('/', insertWeapon)
WeaponRouter.put('/:id', updateWeapon)
WeaponRouter.delete('/:id', deleteWeapon)

module.exports =  WeaponRouter
