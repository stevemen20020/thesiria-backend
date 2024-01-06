db = require('../database/thesiria_dev');
require('dotenv').config()

class InventoryWeapon {
    constructor (carga){
        if(carga){
            this.id = carga.id || null
            this.id_user = carga.id_user || null
            this.id_weapon = carga.id_weapon || null
            this.level = carga.level || null
        }
    }

    async fetch(id, where, orderby, limit, offset) {
        let extraQuery = (orderby ? " ORDER BY " + orderby : " ORDER BY inv_wp.id") + (limit ? " limit " + (offset ? offset + ", " : "") + limit : '')
        let whereQuery = ` where inv_wp.name level '%${where}%' `
        let x
        console.log('PARAMS:',id, where, orderby, limit, offset)
        if ((isNaN(id) == false && id != null) || isNaN(this.id) == false && this.id != null)
            x = await db.execute("SELECT inv_wp.*," +
            "json_object('id', pc.id,  " + 
                "'user', json_object('id', us.id," +
                    "'username', us.username," + 
                    "'name', us.name," + 
                    "'last_name', us.last_name," + 
                    "'email', us.email," + 
                    "'password', us.password)," + 
                "'name', pc.name,  " + 
                "'biography', pc.biography,  " + 
                "'race', json_object('id', ra.id,  " + 
                    "'race', ra.race,  " + 
                    "'strength_bonus', ra.strength_bonus,  " + 
                    "'dexterity_bonus', ra.dexterity_bonus,  " + 
                    "'defense_bonus', ra.defense_bonus,  " + 
                    "'aim_bonus', ra.aim_bonus,  " + 
                    "'vision_bonus', ra.vision_bonus,  " + 
                    "'speed_bonus', ra.speed_bonus,  " + 
                    "'handcraft_bonus', ra.handcraft_bonus,  " + 
                    "'agility_bonus', ra.agility_bonus,  " + 
                    "'charisma_bonus', ra.charisma_bonus), " +
                "'strength', pc.strength,  " + 
                "'dexterity', pc.dexterity,  " + 
                "'defense', pc.defense,  " + 
                "'aim', pc.aim,  " + 
                "'vision', pc.vision,  " + 
                "'speed', pc.speed,  " + 
                "'handcraft', pc.handcraft,  " + 
                "'agility', pc.agility,  " + 
                "'charisma', pc.charisma,  " + 
                "'affinity', json_object('id', af.id,  " + 
                    "'name', af.name,  " + 
                    "'element_id', af.element_id,  " + 
                    "'bonus', af.bonus)," +
                "'weapon_id', pc.weapon_id, " +
                "'armor_id', pc.armor_id, " +
                "'chronicler_status', pc.chronicler_status,  " + 
                "'image', json_object('url', concat('" + process.env.IMAGES_TESTING + "playable/', pc.image_reference)), " +
                "'haki_level', pc.haki_level,  " + 
                "'haki_type', json_object('id', hk.id,  " + 
                    "'name', hk.name,  " + 
                    "'description', hk.description,  " + 
                    "'skill_bonused', json_object('id', hk_sk.id," +
                        "'name', hk_sk.name))," +
                "'devil_fruit', json_object('id', df.id," +
                    "'name', df.name," +
                    "'bonus', df.bonus," +
                    "'description', df.description," +
                    "'skill_bonused', json_object('id', df_sk.id," +
                        "'name', df_sk.name)," +
                    "'awakening_description', df.awakening_description)," +
                "'devil_fruit_awakening', pc.devil_fruit_awakening,  " + 
                "'money', pc.money,  " + 
                "'health', pc.health,  " + 
                "'max_health', pc.max_health,  " + 
                "'dungeon_max_health', pc.dungeon_max_health,  " + 
                "'titan', pc.titan) AS playable_character, " + 
            "json_object('id', wp.id,  " + 
                "'name', wp.name,  " + 
                "'element', json_object('id', el.id,  " + 
                    "'name', el.name), " + 
                "'damage_points_lvl1', wp.damage_points_lvl1,  " + 
                "'damage_points_lvl2', wp.damage_points_lvl2,  " + 
                "'damage_points_lvl3', wp.damage_points_lvl3,  " + 
                "'damage_points_lvl4', wp.damage_points_lvl4,  " + 
                "'damage_points_lvl5', wp.damage_points_lvl5,  " + 
                "'upgrade_item', json_object('id', ob.id,  " + 
                    "'name', ob.name,  " + 
                    "'element', json_object( " +
                        "'id', elem.id, " +
                        "'name', elem.name " +
                    ")," +
                    "'rarity', ob.rarity,  " + 
                    "'skill_usage', json_object( " +
                        "'id', sk.id, " +
                        "'name', sk.name " +
                    ")," +
                    "'dice_needed', ob.dice_needed,  " + 
                    "'location', json_object( " +
                        "'id', tl.id,  " + 
                        "'name', tl.name,  " + 
                        "'image', json_object('url', concat('" + process.env.IMAGES_TESTING + "tiles/', tl.image)), " +
                        "'city_id', tl.city_id,  " + 
                        "'dungeon_id', tl.dungeon_id" +
                    ")," +
                    "'description', ob.description,  " + 
                    "'price_sell', ob.price_sell,  " + 
                    "'price_buy', ob.price_buy),  " + 
                "'upgrade_cost_lvl2', wp.upgrade_cost_lvl2,  " + 
                "'upgrade_cost_lvl3', wp.upgrade_cost_lvl3,  " + 
                "'upgrade_cost_lvl4', wp.upgrade_cost_lvl4,  " + 
                "'upgrade_cost_lvl5', wp.upgrade_cost_lvl5,  " + 
                "'rarity', wp.rarity,  " + 
                "'durability', wp.durability,  " + 
                "'durability_max', wp.durability_max,  " + 
                "'chipping', wp.chipping,  " +
                "'ammo', wp.ammo,  " +  
                "'weapon_type', wp.weapon_type,  " +
                "'location', json_object('id', til.id,  " + 
                    "'name', til.name,  " + 
                    "'image', json_object('url', concat('" + process.env.IMAGES_TESTING + "tiles/', til.image)), " +
                    "'city_id', til.city_id,  " + 
                    "'dungeon_id', til.dungeon_id), " + 
                "'skill_usage', json_object('id', skus.id,  " + 
                    "'name', skus.name)," + 
                "'dice_needed', wp.dice_needed,  " +  
                "'found', wp.found,  " + 
                "'price_sell', wp.price_sell,  " + 
                "'price_buy', wp.price_buy,  " + 
                "'description', wp.description,  " + 
                "'image', json_object('url', concat('" + process.env.IMAGES_TESTING + "weapons/', wp.image))) as weapon " + 
            "FROM inventory_weapon inv_wp " + 

            "LEFT JOIN playable_character pc ON inv_wp.id_user = pc.id " + 
                "LEFT JOIN users us ON pc.user_id = us.id " + 
                "LEFT JOIN races ra ON pc.id_race = ra.id " +
                "LEFT JOIN affinity af ON pc.affinity_id = af.id " +  
                "LEFT JOIN haki_types hk ON pc.haki_type_id = hk.id " +  
                    "LEFT JOIN skill_usage hk_sk ON hk.skill_bonused = hk_sk.id " +  
                "LEFT JOIN devil_fruit df ON pc.devil_fruit_id = df.id " +  
                    "LEFT JOIN skill_usage df_sk ON df.skill_bonused = df_sk.id " +  
            "LEFT JOIN weapon wp ON inv_wp.id_weapon = wp.id " + 
                "LEFT JOIN elements el ON wp.element_id = el.id " + 
                "LEFT JOIN objects ob ON wp.upgrade_item_id = ob.id " + 
                "LEFT JOIN tiles til ON wp.location_id = til.id " + 
                "LEFT JOIN skill_usage skus ON wp.skill_usage = skus.id " +
                "LEFT JOIN elements elem ON ob.element_id = elem.id " + 
                "LEFT JOIN skill_usage sk ON ob.skill_usage_id = sk.id " + 
                "LEFT JOIN tiles tl ON ob.location_id = tl.id " + 
            "WHERE inv_wp.id = ? GROUP BY inv_wp.id" + extraQuery, [this.id]);
        else
            x = await db.execute("SELECT inv_wp.*," +
            "json_object('id', pc.id,  " + 
                "'user', json_object('id', us.id," +
                    "'username', us.username," + 
                    "'name', us.name," + 
                    "'last_name', us.last_name," + 
                    "'email', us.email," + 
                    "'password', us.password)," + 
                "'name', pc.name,  " + 
                "'biography', pc.biography,  " + 
                "'race', json_object('id', ra.id,  " + 
                    "'race', ra.race,  " + 
                    "'strength_bonus', ra.strength_bonus,  " + 
                    "'dexterity_bonus', ra.dexterity_bonus,  " + 
                    "'defense_bonus', ra.defense_bonus,  " + 
                    "'aim_bonus', ra.aim_bonus,  " + 
                    "'vision_bonus', ra.vision_bonus,  " + 
                    "'speed_bonus', ra.speed_bonus,  " + 
                    "'handcraft_bonus', ra.handcraft_bonus,  " + 
                    "'agility_bonus', ra.agility_bonus,  " + 
                    "'charisma_bonus', ra.charisma_bonus), " +
                "'strength', pc.strength,  " + 
                "'dexterity', pc.dexterity,  " + 
                "'defense', pc.defense,  " + 
                "'aim', pc.aim,  " + 
                "'vision', pc.vision,  " + 
                "'speed', pc.speed,  " + 
                "'handcraft', pc.handcraft,  " + 
                "'agility', pc.agility,  " + 
                "'charisma', pc.charisma,  " + 
                "'affinity', json_object('id', af.id,  " + 
                    "'name', af.name,  " + 
                    "'element_id', af.element_id,  " + 
                    "'bonus', af.bonus)," +
                "'weapon_id', pc.weapon_id, " +
                "'armor_id', pc.armor_id, " +
                "'chronicler_status', pc.chronicler_status,  " + 
                "'image', json_object('url', concat('" + process.env.IMAGES_TESTING + "playable/', pc.image_reference)), " +
                "'haki_level', pc.haki_level,  " + 
                "'haki_type', json_object('id', hk.id,  " + 
                    "'name', hk.name,  " + 
                    "'description', hk.description,  " + 
                    "'skill_bonused', json_object('id', hk_sk.id," +
                        "'name', hk_sk.name))," +
                "'devil_fruit', json_object('id', df.id," +
                    "'name', df.name," +
                    "'bonus', df.bonus," +
                    "'description', df.description," +
                    "'skill_bonused', json_object('id', df_sk.id," +
                        "'name', df_sk.name)," +
                    "'awakening_description', df.awakening_description)," +
                "'devil_fruit_awakening', pc.devil_fruit_awakening,  " + 
                "'money', pc.money,  " + 
                "'health', pc.health,  " + 
                "'max_health', pc.max_health,  " + 
                "'dungeon_max_health', pc.dungeon_max_health,  " + 
                "'titan', pc.titan) AS playable_character, " + 
            "json_object('id', wp.id,  " + 
                "'name', wp.name,  " + 
                "'element', json_object('id', el.id,  " + 
                    "'name', el.name), " + 
                "'damage_points_lvl1', wp.damage_points_lvl1,  " + 
                "'damage_points_lvl2', wp.damage_points_lvl2,  " + 
                "'damage_points_lvl3', wp.damage_points_lvl3,  " + 
                "'damage_points_lvl4', wp.damage_points_lvl4,  " + 
                "'damage_points_lvl5', wp.damage_points_lvl5,  " + 
                "'upgrade_item', json_object('id', ob.id,  " + 
                    "'name', ob.name,  " + 
                    "'element', json_object( " +
                        "'id', elem.id, " +
                        "'name', elem.name " +
                    ")," +
                    "'rarity', ob.rarity,  " + 
                    "'skill_usage', json_object( " +
                        "'id', sk.id, " +
                        "'name', sk.name " +
                    ")," +
                    "'dice_needed', ob.dice_needed,  " + 
                    "'location', json_object( " +
                        "'id', tl.id,  " + 
                        "'name', tl.name,  " + 
                        "'image', json_object('url', concat('" + process.env.IMAGES_TESTING + "tiles/', tl.image)), " +
                        "'city_id', tl.city_id,  " + 
                        "'dungeon_id', tl.dungeon_id" +
                    ")," +
                    "'description', ob.description,  " + 
                    "'price_sell', ob.price_sell,  " + 
                    "'price_buy', ob.price_buy),  " + 
                "'upgrade_cost_lvl2', wp.upgrade_cost_lvl2,  " + 
                "'upgrade_cost_lvl3', wp.upgrade_cost_lvl3,  " + 
                "'upgrade_cost_lvl4', wp.upgrade_cost_lvl4,  " + 
                "'upgrade_cost_lvl5', wp.upgrade_cost_lvl5,  " + 
                "'rarity', wp.rarity,  " + 
                "'durability', wp.durability,  " + 
                "'durability_max', wp.durability_max,  " + 
                "'chipping', wp.chipping,  " +
                "'ammo', wp.ammo,  " +  
                "'weapon_type', wp.weapon_type,  " +
                "'location', json_object('id', til.id,  " + 
                    "'name', til.name,  " + 
                    "'image', json_object('url', concat('" + process.env.IMAGES_TESTING + "tiles/', til.image)), " +
                    "'city_id', til.city_id,  " + 
                    "'dungeon_id', til.dungeon_id), " + 
                "'skill_usage', json_object('id', skus.id,  " + 
                    "'name', skus.name)," + 
                "'dice_needed', wp.dice_needed,  " +  
                "'found', wp.found,  " + 
                "'price_sell', wp.price_sell,  " + 
                "'price_buy', wp.price_buy,  " + 
                "'description', wp.description,  " + 
                "'image', json_object('url', concat('" + process.env.IMAGES_TESTING + "weapons/', wp.image))) as weapon " + 
            "FROM inventory_weapon inv_wp " + 

            "LEFT JOIN playable_character pc ON inv_wp.id_user = pc.id " + 
                "LEFT JOIN users us ON pc.user_id = us.id " + 
                "LEFT JOIN races ra ON pc.id_race = ra.id " +
                "LEFT JOIN affinity af ON pc.affinity_id = af.id " +  
                "LEFT JOIN haki_types hk ON pc.haki_type_id = hk.id " +  
                    "LEFT JOIN skill_usage hk_sk ON hk.skill_bonused = hk_sk.id " +  
                "LEFT JOIN devil_fruit df ON pc.devil_fruit_id = df.id " +  
                    "LEFT JOIN skill_usage df_sk ON df.skill_bonused = df_sk.id " +  
            "LEFT JOIN weapon wp ON inv_wp.id_weapon = wp.id " + 
                "LEFT JOIN elements el ON wp.element_id = el.id " + 
                "LEFT JOIN objects ob ON wp.upgrade_item_id = ob.id " + 
                "LEFT JOIN tiles til ON wp.location_id = til.id " + 
                "LEFT JOIN skill_usage skus ON wp.skill_usage = skus.id " +
                "LEFT JOIN elements elem ON ob.element_id = elem.id " + 
                "LEFT JOIN skill_usage sk ON ob.skill_usage_id = sk.id " + 
                "LEFT JOIN tiles tl ON ob.location_id = tl.id " + 
            (where ? whereQuery : "") + "GROUP BY inv_wp.id" + extraQuery);
        return x;
    }

    async save() {
		await db.query("start transaction")
        let x = await db.query('insert into inventory_weapon (`id_user`, `id_weapon`, `level`) values (?,?,?)', [this.id_user, this.id_weapon, this.level])
        await db.query("commit")
        return x
    }

    async update() {
		await db.query("start transaction")
        let query = "UPDATE inventory_weapon SET "
        if (this.id_user)
            query += "id_user = '" + this.id_user + "',"
        if(this.id_weapon)
            query += "id_weapon = '" + this.id_weapon + "',"
        if(this.level)
            query += "level = '" + this.level + "',"
        if (query.charAt(query.length - 1) == ",")
            query = query.substring(0, query.length - 1);
        query += " WHERE id = " + this.id + ";"
        console.log(query)
        let x = await db.query(query)
		
        await db.query("commit")
        return x
    }

    delete() {
        return db.execute('delete from inventory_weapon where id = ?', [this.id])
    }

    setId(id) {
        this.id = id; 
    }
}
module.exports.InventoryWeapon = InventoryWeapon