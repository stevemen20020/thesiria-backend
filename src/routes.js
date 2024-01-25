import { Router } from "express";

const router = Router()

import characterRouter from "./routes/playable-character.router.js";
import elementRouter from "./routes/elemenet.router.js";
import affinityRouter from "./routes/affinity.router.js";
import usersRouter from "./routes/users.router.js";
import WeaponRouter from "./routes/weapon.router.js";
import skillRouter from "./routes/skill_usage.router.js";
import tileRouter from "./routes/tiles.router.js";

router.use('/playable_character', characterRouter)
router.use('/element', elementRouter)
router.use('/affinity', affinityRouter)
router.use('/user', usersRouter)
router.use('/weapon', WeaponRouter)
router.use('/skill_usage', skillRouter)
router.use('/tiles', tileRouter)

export default router
