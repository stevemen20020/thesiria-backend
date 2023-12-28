db = require('../database/thesiria_dev');
require('dotenv').config()

class Weapon {
    constructor (carga){
        if(carga){
            this.id = carga.id || null
            this.name = carga.name || null
            this.element_id = carga.element_id || null
            this.damage_points_lvl1 = carga.damage_points_lvl1 || null
            this.damage_points_lvl2 = carga.damage_points_lvl2 || null
            this.damage_points_lvl3 = carga.damage_points_lvl3 || null
            this.damage_points_lvl4 = carga.damage_points_lvl4 || null
            this.damage_points_lvl5 = carga.damage_points_lvl5 || null
            this.upgrade_item_id = carga.upgrade_item_id || null
            this.upgrade_cost_lvl2 = carga.upgrade_cost_lvl2 || null
            this.upgrade_cost_lvl3 = carga.upgrade_cost_lvl3 || null
            this.upgrade_cost_lvl4 = carga.upgrade_cost_lvl4 || null
            this.upgrade_cost_lvl5 = carga.upgrade_cost_lvl5 || null
            this.rarity = carga.rarity || null
            this.durability = carga.durability || null
            this.durability_max = carga.durability_max || null
            this.chipping = carga.chipping || null
            this.ammo = carga.ammo || null
            this.weapon_type = carga.weapon_type || null 
            this.location_id = carga.location_id || null
            this.skill_usage = carga.skill_usage || null
            this.dice_needed = carga.dice_needed || null
            this.found = carga.found || null
            this.price_sell = carga.price_sell || null
            this.price_buy = carga.price_buy || null
            this.description = carga.description || null
            this.image = carga.image || null
        }
    }

    async fetch(id, where, orderby, limit, offset) {
        let extraQuery = (orderby ? " ORDER BY " + orderby : " ORDER BY wp.id") + (limit ? " limit " + (offset ? offset + ", " : "") + limit : '')
        let whereQuery = ` where wp.name like '%${where}%' `
        let x
        console.log('PARAMS:',id, where, orderby, limit, offset)
        if ((isNaN(id) == false && id != null) || isNaN(this.id) == false && this.id != null)
            x = await db.execute("SELECT wp.*," +
            "json_object('url', concat('" + process.env.IMAGES_TESTING + "weapons/', wp.image)) AS image, " +
            "json_object('id', el.id,  " + 
                "'name', el.name) AS element, " + 
            "json_object('id', ob.id,  " + 
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
                "'price_buy', ob.price_buy) AS upgrade_item,  " + 
            "json_object('id', til.id,  " + 
                "'name', til.name,  " + 
                "'image', json_object('url', concat('" + process.env.IMAGES_TESTING + "tiles/', til.image)), " +
                "'city_id', til.city_id,  " + 
                "'dungeon_id', til.dungeon_id) AS location, " + 
            "json_object('id', skus.id,  " + 
                "'name', skus.name) AS skill_usage " + 
            "FROM weapon wp " + 
            "LEFT JOIN elements el ON wp.element_id = el.id " + 
            "LEFT JOIN objects ob ON wp.upgrade_item_id = ob.id " + 
            "LEFT JOIN tiles til ON wp.location_id = til.id " + 
            "LEFT JOIN skill_usage skus ON wp.skill_usage = skus.id " +
            "LEFT JOIN elements elem ON ob.element_id = elem.id " + 
            "LEFT JOIN skill_usage sk ON ob.skill_usage_id = sk.id " + 
            "LEFT JOIN tiles tl ON ob.location_id = tl.id " + 

            "WHERE wp.id = ? GROUP BY wp.id" + extraQuery, [this.id]);
        else
            x = await db.execute("SELECT wp.*," +
            "json_object('url', concat('" + process.env.IMAGES_TESTING + "weapons/', wp.image)) AS image, " +
            "json_object('id', el.id,  " + 
                "'name', el.name) AS element, " + 
            "json_object('id', ob.id,  " + 
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
                "'price_buy', ob.price_buy) AS upgrade_item,  " + 
            "json_object('id', til.id,  " + 
                "'name', til.name,  " + 
                "'image', json_object('url', concat('" + process.env.IMAGES_TESTING + "tiles/', til.image)), " +
                "'city_id', til.city_id,  " + 
                "'dungeon_id', til.dungeon_id) AS location, " + 
            "json_object('id', skus.id,  " + 
                "'name', skus.name) AS skill_usage " + 
            "FROM weapon wp " + 
            "LEFT JOIN elements el ON wp.element_id = el.id " + 
            "LEFT JOIN objects ob ON wp.upgrade_item_id = ob.id " + 
            "LEFT JOIN tiles til ON wp.location_id = til.id " + 
            "LEFT JOIN skill_usage skus ON wp.skill_usage = skus.id " +
            "LEFT JOIN elements elem ON ob.element_id = elem.id " + 
            "LEFT JOIN skill_usage sk ON ob.skill_usage_id = sk.id " + 
            "LEFT JOIN tiles tl ON ob.location_id = tl.id " + 
            (where ? whereQuery : "") + "GROUP BY wp.id" + extraQuery);
    
        x[0].forEach((obj) => { 
            if(obj.element.id == null) obj.element = JSON.parse(null) 
        })
        return x;
    }

    async save() {
		await db.query("start transaction")
        let x = await db.query('insert into weapon (`name`,`element_id`,`damage_points_lvl1`,`damage_points_lvl2`,`damage_points_lvl3`,`damage_points_lvl4`,`damage_points_lvl5`,`upgrade_item_id`,`upgrade_cost_lvl2`,`upgrade_cost_lvl3`,`upgrade_cost_lvl4`,`upgrade_cost_lvl5`,`rarity`,`durability`,`durability_max`,`chipping`,`ammo`,`weapon_type`,`location_id`,`skill_usage`,`dice_needed`,`found`,`price_sell`,`price_buy`,`description`, `image`) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [this.name, this.element_id, this.damage_points_lvl1, this.damage_points_lvl2, this.damage_points_lvl3, this.damage_points_lvl4, this.damage_points_lvl5, this.upgrade_item_id, this.upgrade_cost_lvl2, this.upgrade_cost_lvl3, this.upgrade_cost_lvl4, this.upgrade_cost_lvl5, this.rarity, this.durability, this.durability_max, this.chipping, this.ammo, this.weapon_type, this.location_id, this.skill_usage, this.dice_needed, this.found, this.price_sell, this.price_buy, this.description, this.image])
        await db.query("commit")
        return x
    }

    async update() {
		await db.query("start transaction")
        let query = "UPDATE weapon SET "
        if (this.name)
            query += "name = '" + this.name + "',"
        if (this.element_id)
            query += "element_id = '" + this.element_id + "',"
        if (this.damage_points_lvl1)
            query += "damage_points_lvl1 = '" + this.damage_points_lvl1 + "',"
        if (this.damage_points_lvl2)
            query += "damage_points_lvl2 = '" + this.damage_points_lvl2 + "',"
        if (this.damage_points_lvl3)
            query += "damage_points_lvl3 = '" + this.damage_points_lvl3 + "',"
        if (this.damage_points_lvl4)
            query += "damage_points_lvl4 = '" + this.damage_points_lvl4 + "',"
        if (this.damage_points_lvl5)
            query += "damage_points_lvl5 = '" + this.damage_points_lvl5 + "',"
        if (this.upgrade_item_id)
            query += "upgrade_item_id = '" + this.upgrade_item_id + "',"
        if (this.upgrade_cost_lvl2)
            query += "upgrade_cost_lvl2 = '" + this.upgrade_cost_lvl2 + "',"
        if (this.upgrade_cost_lvl3)
            query += "upgrade_cost_lvl3 = '" + this.upgrade_cost_lvl3 + "',"
        if (this.upgrade_cost_lvl4)
            query += "upgrade_cost_lvl4 = '" + this.upgrade_cost_lvl4 + "',"
        if (this.upgrade_cost_lvl5)
            query += "upgrade_cost_lvl5 = '" + this.upgrade_cost_lvl5 + "',"
        if (this.rarity)
            query += "rarity = '" + this.rarity + "',"
        if (this.durability)
            query += "durability = '" + this.durability + "',"
        if (this.durability_max)
            query += "durability_max = '" + this.durability_max + "',"
        if (this.chipping)
            query += "chipping = '" + this.chipping + "',"
        if (this.ammo)
            query += "ammo = '" + this.ammo + "',"
        if (this.weapon_type)
            query += "weapon_type = '" + this.weapon_type + "',"
        if (this.location_id)
            query += "location_id = '" + this.location_id + "',"
        if (this.skill_usage)
            query += "skill_usage = '" + this.skill_usage + "',"
        if (this.dice_needed)
            query += "dice_needed = '" + this.dice_needed + "',"
        if (this.found)
            query += "found = '" + this.found + "',"
        if (this.price_sell)
            query += "price_sell = '" + this.price_sell + "',"
        if (this.price_buy)
            query += "price_buy = '" + this.price_buy + "',"
        if (this.description)
            query += "description = '" + this.description + "',"
        if (this.image)
            query += "image = '" + this.image + "',"
        if (query.charAt(query.length - 1) == ",")
            query = query.substring(0, query.length - 1);
        query += " WHERE id = " + this.id + ";"
        console.log(query)
        let x = await db.query(query)
		
        await db.query("commit")
        return x
    }

    delete() {
        return db.execute('delete from weapon where id = ?', [this.id])
    }

    setId(id) {
        this.id = id; 
    }
}
module.exports.Weapon = Weapon