db = require('../database/thesiria_dev');
require('dotenv').config()

class Dungeon {
    constructor (carga){
        if(carga){
            this.id = carga.id || null
            this.name = carga.name || null
            this.description = carga.description || null
            this.difficulty = carga.difficulty || null
            this.location_id = carga.location_id || null
        }
    }

    async fetch(id, where, orderby, limit, offset) {
        let extraQuery = (orderby ? " ORDER BY " + orderby : " ORDER BY dg.id") + (limit ? " limit " + (offset ? offset + ", " : "") + limit : '')
        let whereQuery = ` where dg.name like '%${where}%' `
        let x
        console.log('PARAMS:',id, where, orderby, limit, offset)
        if ((isNaN(id) == false && id != null) || isNaN(this.id) == false && this.id != null)
            x = await db.execute("SELECT dg.*," +
            "json_object('id', tl.id,  " + 
                "'name', tl.name,  " + 
                "'image', json_object('url', concat('" + process.env.IMAGES_TESTING + "tiles/', tl.image)), " +
                "'city_id', tl.city_id,  " + 
                "'dungeon_id', tl.dungeon_id) AS dungeon " + 
            "FROM dungeons dg " + 
            "LEFT JOIN tiles tl ON dg.location_id = tl.id " + 
            "WHERE dg.id = ? GROUP BY dg.id" + extraQuery, [this.id]);
        else
            x = await db.execute("SELECT dg.*," +
            "json_object('id', tl.id,  " + 
                "'name', tl.name,  " + 
                "'image', json_object('url', concat('" + process.env.IMAGES_TESTING + "tiles/', tl.image)), " +
                "'city_id', tl.city_id,  " + 
                "'dungeon_id', tl.dungeon_id) AS dungeon " + 
            "FROM dungeons dg " + 
            "LEFT JOIN tiles tl ON dg.location_id = tl.id " + 
            (where ? whereQuery : "") + "GROUP BY dg.id" + extraQuery);
        return x;
    }

    async save() {
		await db.query("start transaction")
        let x = await db.query('insert into dungeons (`name`, `description`, `difficulty`, `location_id`) values (?,?,?,?)', [this.name, this.description, this.difficulty, this.location_id])
        await db.query("commit")
        return x
    }

    async update() {
		await db.query("start transaction")
        let query = "UPDATE dungeons SET "
        if (this.name)
            query += "name = '" + this.name + "',"
        if(this.description)
            query += "description = '" + this.description + "',"
        if(this.difficulty)
            query += "difficulty = '" + this.difficulty + "',"
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
        return db.execute('delete from dungeons where id = ?', [this.id])
    }

    setId(id) {
        this.id = id; 
    }
}
module.exports.Dungeon = Dungeon