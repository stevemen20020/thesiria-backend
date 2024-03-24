import { Router } from "express";

const router = Router()

import characterRouter from "./routes/playable-character.router.js";
import elementRouter from "./routes/elemenet.router.js";
import affinityRouter from "./routes/affinity.router.js";
import usersRouter from "./routes/users.router.js";
import WeaponRouter from "./routes/weapon.router.js";
import skillRouter from "./routes/skill_usage.router.js";
import tileRouter from "./routes/tiles.router.js";
import objectRouter from "./routes/objects.router.js";
import inventoryMagicRouter from "./routes/inventory_magic.router.js";
import inventoryWeaponRouter from "./routes/inventory_weapon.router.js";
import inventoryArmorRouter from "./routes/inventory_armor.router.js";
import armorRouter from "./routes/armor.router.js";
import npcRouter from "./routes/npc.router.js";
import attackRouter from "./routes/attack.router.js";
import raceRouter from "./routes/races.router.js";
import talismanRouter from "./routes/talisman.router.js";
import cityRouter from "./routes/city.router.js";
import devilFruitRouter from "./routes/devil_fruit.router.js";
import dungeonRouter from "./routes/dungeon.router.js";
import effectsRouter from "./routes/effects.router.js";
import loottablesRouter from "./routes/loottables.router.js";
import hakiRouter from "./routes/haki.router.js";
import monsterRouter from "./routes/monster.router.js";
import missionFasesRouter from "./routes/mission_fases.route.js";
import missionJournalRouter from "./routes/mission_journal.router.js";
import missionsRouter from "./routes/missions.router.js";
import npcInventoryRouter from './routes/npc_inventory.route.js'
import spellBuffDebuffRouter from './routes/spell_buff_debuff.router.js'
import characterJournalRouter from "./routes/playable_character_journal.router.js";
import spellsRouter from './routes/spells.router.js'

router.use('/playable_character', characterRouter)
router.use('/element', elementRouter)
router.use('/affinity', affinityRouter)
router.use('/user', usersRouter)
router.use('/weapon', WeaponRouter)
router.use('/skill_usage', skillRouter)
router.use('/tiles', tileRouter)
router.use('/object', objectRouter)
router.use('/inventory_magic', inventoryMagicRouter)
router.use('/inventory_weapon', inventoryWeaponRouter)
router.use('/inventory_armor', inventoryArmorRouter)
router.use('/armor', armorRouter)
router.use('/npc', npcRouter)
router.use('/attack', attackRouter)
router.use('/races', raceRouter)
router.use('/talisman', talismanRouter)
router.use('/city', cityRouter)
router.use('/devil_fruit', devilFruitRouter)
router.use('/dungeon', dungeonRouter)
router.use('/effects', effectsRouter)
router.use('/inventory', inventoryRouter)
router.use('/loottables', loottablesRouter)
router.use('/haki', hakiRouter)
router.use('/monster', monsterRouter)
router.use('/mission_fases', missionFasesRouter)
router.use('/mission_journal', missionJournalRouter)
router.use('/missions', missionsRouter)
router.use('/npc_inventory', npcInventoryRouter)
router.use('/spell_buff_debuff', spellBuffDebuffRouter)
router.use('/playable_character_journal', characterJournalRouter)
router.use('/spells', spellsRouter)

export default router