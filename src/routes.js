import { Router } from "express";

const router = Router()

import characterRouter from "./routes/playable-character.router.js";

router.use('/playable_character', characterRouter)

export default router
