import { Router } from "express";
import { getAllWeapons, getWeaponById, insertWeapon, updateWeapon, deleteWeapon } from "../controller/weapon.js";

const WeaponRouter = Router()

WeaponRouter.get('/', getAllWeapons)
WeaponRouter.get('/:id', getWeaponById)
WeaponRouter.post('/', insertWeapon)
WeaponRouter.put('/:id', updateWeapon)
WeaponRouter.delete('/:id', deleteWeapon)

export default WeaponRouter
