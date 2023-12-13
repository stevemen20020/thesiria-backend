db = require('../database/thesiria_dev');

class PlayableCharacter {
    constructor (carga){
        if(carga){
            this.id = carga.id || null
            this.user_id = carga.user_id || null
            this.name = carga.name || null
            this.biography = carga.biography || null
            this.id_race = carga.id_race || null
            this.strength = carga.strength || null
            this.dexterity = carga.dexterity || null
            this.defense = carga.defence || null
            this.aim = carga.aim || null
            this.vision = carga.vision || null
            this.speed = carga.speed || null
            this.handcraft = carga.handcraft || null
            this.agility = carga.agility || null
            this.charisma = carga.charisma || null
            this.affinity_id = carga.affinity_id || null
            this.chronicler_status = carga.chronicler_status || null
            this.image_reference = carga.image_reference || null
            this.armor_id = carga.armor_id || null
            this.weapon_id = carga.weapon_id || null
            this.haki_level = carga.haki_level || null 
            this.haki_type_id = carga.haki_type_id || null
            this.devil_fruit_id = carga.devil_fruit_id || null
            this.devil_fruit_awakening = carga.devil_fruit_awakening || null
            this.money = carga.money || null
            this.health = carga.health || null
            this.max_health = carga.max_health || null
            this.dungeon_max_health = carga.dungeon_max_health || null
            this.titan = carga.titan|| null
        }
    }

    async fetch(id, where, orderby, limit, offset) {
        let extraQuery = (orderby ? " ORDER BY " + orderby : " ORDER BY pc.id") + (limit ? " limit " + (offset ? offset + ", " : "") + limit : '')
        let whereQuery = ` where pc.name like '%${where}%' `
        let x
        console.log('PARAMS:',id, where, orderby, limit, offset)
        if ((isNaN(id) == false && id != null) || isNaN(this.id) == false && this.id != null)
            x = await db.execute("SELECT pc.*," +
                                "json_object('id', af.id,  " + 
                                    "'name', af.name,  " + 
                                    "'element_id', af.element_id,  " + 
                                    "'bonus', af.bonus) AS affinity, " + 
                                "json_object('id', ra.id,  " + 
                                    "'race', ra.race,  " + 
                                    "'strength_bonus', ra.strength_bonus,  " + 
                                    "'dexterity_bonus', ra.dexterity_bonus,  " + 
                                    "'defense_bonus', ra.defense_bonus,  " + 
                                    "'aim_bonus', ra.aim_bonus,  " + 
                                    "'vision_bonus', ra.vision_bonus,  " + 
                                    "'speed_bonus', ra.speed_bonus,  " + 
                                    "'handcraft_bonus', ra.handcraft_bonus,  " + 
                                    "'agility_bonus', ra.agility_bonus,  " + 
                                    "'charisma_bonus', ra.charisma_bonus) AS race,  " + 
                                "json_object('id', ar.id,  " + 
                                    "'name', ar.name,  " + 
                                    "'element_id', ar.element_id,  " + 
                                    "'defensive_points_lvl1', ar.defensive_points_lvl1,  " + 
                                    "'defensive_points_lvl2', ar.defensive_points_lvl2,  " + 
                                    "'defensive_points_lvl3', ar.defensive_points_lvl3,  " + 
                                    "'defensive_points_lvl4', ar.defensive_points_lvl4,  " + 
                                    "'defensive_points_lvl5', ar.defensive_points_lvl5,  " + 
                                    "'upgrade_item_id', ar.upgrade_item_id,  " + 
                                    "'upgrade_cost_lvl2', ar.upgrade_cost_lvl2,  " + 
                                    "'upgrade_cost_lvl3', ar.upgrade_cost_lvl3,  " + 
                                    "'upgrade_cost_lvl4', ar.upgrade_cost_lvl4,  " + 
                                    "'upgrade_cost_lvl5', ar.upgrade_cost_lvl5,  " + 
                                    "'rarity', ar.rarity,  " + 
                                    "'location_id', ar.location_id,  " + 
                                    "'skill_usage', ar.skill_usage,  " + 
                                    "'dice_needed', ar.dice_needed,  " + 
                                    "'found', ar.found,  " + 
                                    "'price_sell', ar.price_sell,  " + 
                                    "'price_buy', ar.price_buy,  " + 
                                    "'description', ar.description) AS armor, " + 
                                "json_object('id', wp.id,  " + 
                                    "'name', wp.name,  " + 
                                    "'element_id', wp.element_id,  " + 
                                    "'damage_points_lvl1', wp.damage_points_lvl1,  " + 
                                    "'damage_points_lvl2', wp.damage_points_lvl2,  " + 
                                    "'damage_points_lvl3', wp.damage_points_lvl3,  " + 
                                    "'damage_points_lvl4', wp.damage_points_lvl4,  " + 
                                    "'damage_points_lvl5', wp.damage_points_lvl5,  " + 
                                    "'upgrade_item_id', wp.upgrade_item_id,  " + 
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
                                    "'location_id', wp.location_id,  " + 
                                    "'skill_usage', wp.skill_usage,  " + 
                                    "'dice_needed', wp.dice_needed,  " + 
                                    "'found', wp.found,  " + 
                                    "'price_sell', wp.price_sell,  " + 
                                    "'price_buy', wp.price_buy,  " + 
                                    "'description', wp.description) AS weapon, " + 
                                "json_object('id', df.id,  " + 
                                "'name', df.name, " +
                                "'bonus', df.bonus , " +
                                "'skill_bonused', df.skill_bonused, " +
                                "'description', df.description, " +
                                "'awakening_description', df.awakening_description) AS devil_fruit " +
                                "FROM playable_character pc " + 
                                "LEFT JOIN races ra ON pc.id_race = ra.id " + 
                                "LEFT JOIN armor ar ON pc.armor_id = ar.id " + 
                                "LEFT JOIN weapon wp ON pc.weapon_id = wp.id " + 
                                "LEFT JOIN devil_fruit df ON pc.devil_fruit_id = df.id " +
                                "LEFT JOIN affinity af ON pc.affinity_id = af.id " + 
                                 "WHERE pc.id = ? GROUP BY pc.id" + extraQuery, [this.id]);
        else
            x = await db.execute("SELECT pc.*," +
                                "json_object('id', af.id,  " + 
                                    "'name', af.name,  " + 
                                    "'element_id', af.element_id,  " + 
                                    "'bonus', af.bonus) AS affinity, " + 
                                "json_object('id', ra.id,  " + 
                                    "'race', ra.race,  " + 
                                    "'strength_bonus', ra.strength_bonus,  " + 
                                    "'dexterity_bonus', ra.dexterity_bonus,  " + 
                                    "'defense_bonus', ra.defense_bonus,  " + 
                                    "'aim_bonus', ra.aim_bonus,  " + 
                                    "'vision_bonus', ra.vision_bonus,  " + 
                                    "'speed_bonus', ra.speed_bonus,  " + 
                                    "'handcraft_bonus', ra.handcraft_bonus,  " + 
                                    "'agility_bonus', ra.agility_bonus,  " + 
                                    "'charisma_bonus', ra.charisma_bonus) AS race,  " + 
                                "json_object('id', ar.id,  " + 
                                    "'name', ar.name,  " + 
                                    "'element_id', ar.element_id,  " + 
                                    "'defensive_points_lvl1', ar.defensive_points_lvl1,  " + 
                                    "'defensive_points_lvl2', ar.defensive_points_lvl2,  " + 
                                    "'defensive_points_lvl3', ar.defensive_points_lvl3,  " + 
                                    "'defensive_points_lvl4', ar.defensive_points_lvl4,  " + 
                                    "'defensive_points_lvl5', ar.defensive_points_lvl5,  " + 
                                    "'upgrade_item_id', ar.upgrade_item_id,  " + 
                                    "'upgrade_cost_lvl2', ar.upgrade_cost_lvl2,  " + 
                                    "'upgrade_cost_lvl3', ar.upgrade_cost_lvl3,  " + 
                                    "'upgrade_cost_lvl4', ar.upgrade_cost_lvl4,  " + 
                                    "'upgrade_cost_lvl5', ar.upgrade_cost_lvl5,  " + 
                                    "'rarity', ar.rarity,  " + 
                                    "'location_id', ar.location_id,  " + 
                                    "'skill_usage', ar.skill_usage,  " + 
                                    "'dice_needed', ar.dice_needed,  " + 
                                    "'found', ar.found,  " + 
                                    "'price_sell', ar.price_sell,  " + 
                                    "'price_buy', ar.price_buy,  " + 
                                    "'description', ar.description) AS armor, " + 
                                "json_object('id', wp.id,  " + 
                                    "'name', wp.name,  " + 
                                    "'element_id', wp.element_id,  " + 
                                    "'damage_points_lvl1', wp.damage_points_lvl1,  " + 
                                    "'damage_points_lvl2', wp.damage_points_lvl2,  " + 
                                    "'damage_points_lvl3', wp.damage_points_lvl3,  " + 
                                    "'damage_points_lvl4', wp.damage_points_lvl4,  " + 
                                    "'damage_points_lvl5', wp.damage_points_lvl5,  " + 
                                    "'upgrade_item_id', wp.upgrade_item_id,  " + 
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
                                    "'location_id', wp.location_id,  " + 
                                    "'skill_usage', wp.skill_usage,  " + 
                                    "'dice_needed', wp.dice_needed,  " + 
                                    "'found', wp.found,  " + 
                                    "'price_sell', wp.price_sell,  " + 
                                    "'price_buy', wp.price_buy,  " + 
                                    "'description', wp.description) AS weapon, " + 
                                "json_object('id', df.id,  " + 
                                "'name', df.name, " +
                                "'bonus', df.bonus , " +
                                "'skill_bonused', df.skill_bonused, " +
                                "'description', df.description, " +
                                "'awakening_description', df.awakening_description) AS devil_fruit " +
                                "FROM playable_character pc " + 
                                "LEFT JOIN races ra ON pc.id_race = ra.id " + 
                                "LEFT JOIN armor ar ON pc.armor_id = ar.id " + 
                                "LEFT JOIN weapon wp ON pc.weapon_id = wp.id " + 
                                "LEFT JOIN devil_fruit df ON pc.devil_fruit_id = df.id " +
                                "LEFT JOIN affinity af ON pc.affinity_id = af.id "  + (where ? whereQuery : "") + "GROUP BY pc.id" + extraQuery);
        
        x[0].forEach((obj) => { 
            if(obj.armor.id == null) obj.armor = JSON.parse(null) 
            if(obj.weapon.id == null) obj.weapon = JSON.parse(null) 
            if(obj.devil_fruit.id == null) obj.devil_fruit = JSON.parse(null) 
        })
        return x;
    }

    async save() {
		await db.query("start transaction")
        let x = await db.query('insert into playable_character (`user_id`,`name`,`biography`,`id_race`,`strength`,`dexterity`,`defense`,`aim`,`vision`,`speed`,`handcraft`,`agility`,`charisma`,`affinity_id`,`chronicler_status`,`image_reference`,`armor_id`,`weapon_id`,`haki_level`,`haki_type_id`,`devil_fruit_id`,`devil_fruit_awakening`,`money`,`health`,`max_health`,`dungeon_max_health`,`titan`) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [this.user_id, this.name, this.biography, this.id_race, this.strength, this.dexterity, this.defense, this.aim, this.vision, this.speed, this.handcraft, this.agility, this.charisma, this.affinity_id, this.chronicler_status, this.image_reference, this.armor_id, this.weapon_id, this.haki_level, this.haki_type_id, this.devil_fruit_id, this.devil_fruit_awakening, this.money, this.health, this.max_health, this.dungeon_max_health, this.titan])
        await db.query("commit")
        return x
    }

    async update() {
		await db.query("start transaction")
        let query = "UPDATE playable_character SET "
        if (this.user_id)
            query += "user_id = '" + this.user_id + "',"
        if (this.name)
            query += "name = '" + this.name + "',"
        if (this.biography)
            query += "biography = '" + this.biography + "',"
        if (this.id_race)
            query += "id_race = '" + this.id_race + "',"
        if (this.strength)
            query += "strength = '" + this.strength + "',"
        if (this.dexterity)
            query += "dexterity = '" + this.dexterity + "',"
        if (this.defense)
            query += "defense = '" + this.defense + "',"
        if (this.aim)
            query += "aim = '" + this.aim + "',"
        if (this.vision)
            query += "vision = '" + this.vision + "',"
        if (this.speed)
            query += "speed = '" + this.speed + "',"
        if (this.handcraft)
            query += "handcraft = '" + this.handcraft + "',"
        if (this.agility)
            query += "agility = '" + this.agility + "',"
        if (this.charisma)
            query += "charisma = '" + this.charisma + "',"
        if (this.affinity_id)
            query += "affinity_id = '" + this.affinity_id + "',"
        if (this.chronicler_status)
            query += "chronicler_status = '" + this.chronicler_status + "',"
        if (this.image_reference)
            query += "image_reference = '" + this.image_reference + "',"
        if (this.armor_id)
            query += "armor_id = '" + this.armor_id + "',"
        if (this.weapon_id)
            query += "weapon_id = '" + this.weapon_id + "',"
        if (this.haki_level)
            query += "haki_level = '" + this.haki_level + "',"
        if (this.haki_type_id)
            query += "haki_type_id = '" + this.haki_type_id + "',"
        if (this.devil_fruit_id)
            query += "devil_fruit_id = '" + this.devil_fruit_id + "',"
        if (this.devil_fruit_awakening)
            query += "devil_fruit_awakening = '" + this.devil_fruit_awakening + "',"
        if (this.money)
            query += "money = '" + this.money + "',"
        if (this.health)
            query += "health = '" + this.health + "',"
        if (this.max_health)
            query += "max_health = '" + this.max_health + "',"
        if (this.dungeon_max_health)
            query += "dungeon_max_health = '" + this.dungeon_max_health + "',"
        if (this.titan)
            query += "titan = '" + this.titan + "',"
        if (query.charAt(query.length - 1) == ",")
            query = query.substring(0, query.length - 1);
        query += " WHERE id = " + this.id + ";"
        console.log(query)
        let x = await db.query(query)
		
        await db.query("commit")
        return x
    }

    delete() {
        return db.execute('delete from playable_character where id = ?', [this.id])
    }

    setId(id) {
        this.id = id; 
    }
}
module.exports.PlayableCharacter = PlayableCharacter