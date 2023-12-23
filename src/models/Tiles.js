db = require('../database/thesiria_dev');
require('dotenv').config()

class Tiles {
    constructor (carga){
        if(carga){
            this.id = carga.id || null
            this.name = carga.name || null
            this.image = carga.image || null
            this.dungeon_id = carga.dungeon_id || null
            this.city_id = carga.city_id || null
        }
    }

    async fetch(id, where, orderby, limit, offset) {
        let extraQuery = (orderby ? " ORDER BY " + orderby : " ORDER BY tl.id") + (limit ? " limit " + (offset ? offset + ", " : "") + limit : '')
        let whereQuery = ` where tl.name like '%${where}%' `
        let x
        console.log('PARAMS:',id, where, orderby, limit, offset)
        if ((isNaN(id) == false && id != null) || isNaN(this.id) == false && this.id != null)
            x = await db.execute("SELECT tl.*," +
            "json_object('url', concat('" + process.env.IMAGES_TESTING + "tiles/', tl.image)) AS image, " +
            "json_object('id', dg.id,  " + 
                "'name', dg.name,  " + 
                "'description', dg.description,  " + 
                "'difficulty', dg.difficulty) AS dungeon, " + 
            "json_object('id', ct.id,  " + 
                "'name', ct.name,  " + 
                "'alleigiance', ct.alleigiance) AS city " + 
            "FROM tiles tl " + 
            "LEFT JOIN dungeons dg ON tl.dungeon_id = dg.id " + 
            "LEFT JOIN city ct ON tl.city_id = ct.id " + 
            "WHERE tl.id = ? GROUP BY tl.id" + extraQuery, [this.id]);
        else
            x = await db.execute("SELECT tl.*," +
            "json_object('url', concat('" + process.env.IMAGES_TESTING + "tiles/', tl.image)) AS image, " +
            "json_object('id', dg.id,  " + 
                "'name', dg.name,  " + 
                "'description', dg.description,  " + 
                "'difficulty', dg.difficulty) AS dungeon, " + 
            "json_object('id', ct.id,  " + 
                "'name', ct.name,  " + 
                "'alleigiance', ct.alleigiance) AS city " + 
            "FROM tiles tl " + 
            "LEFT JOIN dungeons dg ON tl.dungeon_id = dg.id " + 
            "LEFT JOIN city ct ON tl.city_id = ct.id " + 
            (where ? whereQuery : "") + "GROUP BY tl.id" + extraQuery);

        x[0].forEach((obj) => { 
            if(obj.dungeon.id == null) obj.dungeon = JSON.parse(null) 
            if(obj.city.id == null) obj.city = JSON.parse(null) 
        })
        return x;
    }

    async save() {
		await db.query("start transaction")
        let x = await db.query('insert into tiles (`name`, `image`, `dungeon_id`, `city_id`) values (?,?,?,?)', [this.name, this.image, this.dungeon_id, this.city_id])
        await db.query("commit")
        return x
    }

    async update() {
		await db.query("start transaction")
        let query = "UPDATE tiles SET "
        if (this.name)
            query += "name = '" + this.name + "',"
        if(this.image)
            query += "image = '" + this.image + "',"
        if(this.dungeon_id)
            query += "dungeon_id = '" + this.dungeon_id + "',"
        if(this.city_id)
            query += "city_id = '" + this.city_id + "',"
        if (query.charAt(query.length - 1) == ",")
            query = query.substring(0, query.length - 1);
        query += " WHERE id = " + this.id + ";"
        console.log(query)
        let x = await db.query(query)
		
        await db.query("commit")
        return x
    }

    delete() {
        return db.execute('delete from tiles where id = ?', [this.id])
    }

    setId(id) {
        this.id = id; 
    }
}
module.exports.Tiles = Tiles