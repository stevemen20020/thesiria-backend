import { Router } from "express";

const router = Router()

import characterRouter from "./routes/playable-character.router.js";
import elementRouter from "./routes/elemenet.router.js";

router.use('/playable_character', characterRouter)
router.use('/element', elementRouter)

export default router
