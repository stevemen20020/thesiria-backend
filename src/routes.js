const { Router } = require ( "express");

const router = Router()

const characterRouter = require("./routes/playable-character.router.js");
const elementRouter = require ( "./routes/elemenet.router.js");
const affinityRouter = require ( "./routes/affinity.router.js");
const usersRouter = require ( "./routes/users.router.js");
const WeaponRouter = require ( "./routes/weapon.router.js");
const skillRouter = require ( "./routes/skill_usage.router.js");
const tileRouter = require ( "./routes/tiles.router.js");
const objectRouter = require ( "./routes/objects.router.js");
const inventoryMagicRouter = require ( "./routes/inventory_magic.router.js");
const inventoryWeaponRouter = require ( "./routes/inventory_weapon.router.js");
const inventoryArmorRouter = require ( "./routes/inventory_armor.router.js");
const armorRouter = require ( "./routes/armor.router.js");
const npcRouter = require ( "./routes/npc.router.js");
const attackRouter = require ( "./routes/attack.router.js");
const raceRouter = require ( "./routes/races.router.js");
const talismanRouter = require ( "./routes/talisman.router.js");
const cityRouter = require ( "./routes/city.router.js");
const devilFruitRouter = require ( "./routes/devil_fruit.router.js");
const dungeonRouter = require ( "./routes/dungeon.router.js");
const effectsRouter = require ( "./routes/effects.router.js");
const loottablesRouter = require ( "./routes/loottables.router.js");
const hakiRouter = require ( "./routes/haki.router.js");
const monsterRouter = require ( "./routes/monster.router.js");
const missionFasesRouter = require ( "./routes/mission_fases.route.js");
const missionJournalRouter = require ( "./routes/mission_journal.router.js");
const missionsRouter = require ( "./routes/missions.router.js");
const npcInventoryRouter = require ( './routes/npc_inventory.route.js');
const inventoryRouter = require ( "./routes/inventory.router.js");
const spellBuffDebuffRouter = require ( './routes/spell_buff_debuff.router.js');
const characterJournalRouter = require ( "./routes/playable_character_journal.router.js");
const spellsRouter = require ( './routes/spells.router.js');

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

module.exports =  router