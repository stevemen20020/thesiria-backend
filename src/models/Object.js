db = require('../database/thesiria_dev');
require('dotenv').config()

class Object {
    constructor (carga){
        if(carga){
            this.id = carga.id || null
            this.name = carga.name || null
            this.element_id = carga.element_id || null
            this.rarity = carga.rarity || null
            this.skill_usage_id = carga.skill_usage_id || null
            this.dice_needed = carga.dice_needed || null
            this.location_id = carga.location_id || null
            this.description = carga.description || null
            this.price_sell = carga.price_sell || null
            this.price_buy = carga.price_buy || null
        }
    }

    async fetch(id, where, orderby, limit, offset) {
        let extraQuery = (orderby ? " ORDER BY " + orderby : " ORDER BY ob.id") + (limit ? " limit " + (offset ? offset + ", " : "") + limit : '')
        let whereQuery = ` where ob.name like '%${where}%' `
        let x
        console.log('PARAMS:',id, where, orderby, limit, offset)
        if ((isNaN(id) == false && id != null) || isNaN(this.id) == false && this.id != null)
            x = await db.execute("SELECT ob.*," +
            "json_object('id', el.id,  " + 
                "'name', el.name) AS element, " + 
            "json_object('id', sk.id,  " + 
                "'name', sk.name) AS skill_usage, " + 
            "json_object('id', tl.id,  " + 
                "'name', tl.name,  " + 
                "'image', json_object('url', concat('" + process.env.IMAGES_TESTING + "tiles/', tl.image)), " +
                "'city_id', tl.city_id,  " + 
                "'dungeon_id', tl.dungeon_id) AS location " + 
            "FROM objects ob " + 
            "LEFT JOIN elements el ON ob.element_id = el.id " + 
            "LEFT JOIN skill_usage sk ON ob.skill_usage_id = sk.id " + 
            "LEFT JOIN tiles tl ON ob.location_id = tl.id " + 
            "WHERE ob.id = ? GROUP BY ob.id" + extraQuery, [this.id]);
        else
            x = await db.execute("SELECT ob.*," +
            "json_object('id', el.id,  " + 
                "'name', el.name) AS element, " + 
            "json_object('id', sk.id,  " + 
                "'name', sk.name) AS skill_usage, " + 
            "json_object('id', tl.id,  " + 
                "'name', tl.name,  " + 
                "'image', json_object('url', concat('" + process.env.IMAGES_TESTING + "tiles/', tl.image)), " +
                "'city_id', tl.city_id,  " + 
                "'dungeon_id', tl.dungeon_id) AS location " + 
            "FROM objects ob " + 
            "LEFT JOIN elements el ON ob.element_id = el.id " + 
            "LEFT JOIN skill_usage sk ON ob.skill_usage_id = sk.id " + 
            "LEFT JOIN tiles tl ON ob.location_id = tl.id " + 
            (where ? whereQuery : "") + "GROUP BY ob.id" + extraQuery);
        return x;
    }

    async save() {
		await db.query("start transaction")
        let x = await db.query('insert into objects (`name`, `element_id`, `rarity`, `skill_usage_id`, `dice_needed`, `location_id`, `description`, `price_sell`, `price_buy`) values (?,?,?,?,?,?,?,?,?)', [this.name, this.element_id, this.rarity, this.skill_usage_id, this.dice_needed, this.location_id, this.description, this.price_sell, this.price_buy])
        await db.query("commit")
        return x
    }

    async update() {
		await db.query("start transaction")
        let query = "UPDATE objects SET "
        if (this.name)
            query += "name = '" + this.name + "',"
        if(this.element_id)
            query += "element_id = '" + this.element_id + "',"
        if(this.rarity)
            query += "rarity = '" + this.rarity + "',"
        if(this.skill_usage_id)
            query += "skill_usage_id = '" + this.skill_usage_id + "',"
        if(this.dice_needed)
            query += "dice_needed = '" + this.dice_needed + "',"
        if(this.location_id)
            query += "location_id = '" + this.location_id + "',"
        if(this.description)
            query += "description = '" + this.description + "',"
        if(this.price_sell)
            query += "price_sell = '" + this.price_sell + "',"
        if(this.price_buy)
            query += "price_buy = '" + this.price_buy + "',"
        if (query.charAt(query.length - 1) == ",")
            query = query.substring(0, query.length - 1);
        query += " WHERE id = " + this.id + ";"
        console.log(query)
        let x = await db.query(query)
		
        await db.query("commit")
        return x
    }

    delete() {
        return db.execute('delete from objects where id = ?', [this.id])
    }

    setId(id) {
        this.id = id; 
    }
}
module.exports.Object = Object