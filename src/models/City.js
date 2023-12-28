db = require('../database/thesiria_dev');
require('dotenv').config()

class City {
    constructor (carga){
        if(carga){
            this.id = carga.id || null
            this.name = carga.name || null
            this.alleigiance = carga.alleigiance || null
            this.location_id = carga.location_id || null
        }
    }

    async fetch(id, where, orderby, limit, offset) {
        let extraQuery = (orderby ? " ORDER BY " + orderby : " ORDER BY ct.id") + (limit ? " limit " + (offset ? offset + ", " : "") + limit : '')
        let whereQuery = ` where ct.name like '%${where}%' `
        let x
        console.log('PARAMS:',id, where, orderby, limit, offset)
        if ((isNaN(id) == false && id != null) || isNaN(this.id) == false && this.id != null)
            x = await db.execute("SELECT ct.*," +
            "json_object('id', tl.id,  " + 
                "'name', tl.name,  " + 
                "'image', json_object('url', concat('" + process.env.IMAGES_TESTING + "tiles/', tl.image)), " +
                "'city_id', tl.city_id,  " + 
                "'dungeon_id', tl.dungeon_id) AS location " + 
            "FROM city ct " + 
            "LEFT JOIN tiles tl ON dg.location_id = tl.id " + 
            "WHERE ct.id = ? GROUP BY ct.id" + extraQuery, [this.id]);
        else
            x = await db.execute("SELECT ct.*," +
            "json_object('id', tl.id,  " + 
                "'name', tl.name,  " + 
                "'image', json_object('url', concat('" + process.env.IMAGES_TESTING + "tiles/', tl.image)), " +
                "'city_id', tl.city_id,  " + 
                "'dungeon_id', tl.dungeon_id) AS location " + 
            "FROM city ct " + 
            "LEFT JOIN tiles tl ON ct.location_id = tl.id " + 
            (where ? whereQuery : "") + "GROUP BY ct.id" + extraQuery);
        return x;
    }

    async save() {
		await db.query("start transaction")
        let x = await db.query('insert into city (`name`, `alleigiance`, `location_id`) values (?,?,?)', [this.name, this.alleigiance, this.location_id])
        await db.query("commit")
        return x
    }

    async update() {
		await db.query("start transaction")
        let query = "UPDATE city SET "
        if (this.name)
            query += "name = '" + this.name + "',"
        if(this.alleigiance)
            query += "alleigiance = '" + this.alleigiance + "',"
        if(this.location_id)
            query += "location_id = '" + this.location_id + "',"
        if (query.charAt(query.length - 1) == ",")
            query = query.substring(0, query.length - 1);
        query += " WHERE id = " + this.id + ";"
        console.log(query)
        let x = await db.query(query)
		
        await db.query("commit")
        return x
    }

    delete() {
        return db.execute('delete from city where id = ?', [this.id])
    }

    setId(id) {
        this.id = id; 
    }
}
module.exports.City = City