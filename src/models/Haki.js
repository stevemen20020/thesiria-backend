db = require('../database/thesiria_dev');

class Haki {
    constructor (carga){
        if(carga){
            this.id = carga.id || null
            this.name = carga.name || null
            this.description = carga.description || null
            this.skill_bonused = carga.skill_bonused || null
        }
    }

    async fetch(id, where, orderby, limit, offset) {
        let extraQuery = (orderby ? " ORDER BY " + orderby : " ORDER BY hk.id") + (limit ? " limit " + (offset ? offset + ", " : "") + limit : '')
        let whereQuery = ` where hk.name like '%${where}%' `
        let x
        console.log('PARAMS:',id, where, orderby, limit, offset)
        if ((isNaN(id) == false && id != null) || isNaN(this.id) == false && this.id != null)
            x = await db.execute("SELECT hk.*," +
            "json_object('id', su.id,  " + 
                "'name', su.name) AS skill_usage " + 
            "FROM haki_types hk " + 
            "LEFT JOIN skill_usage su ON hk.skill_bonused =su.id " + 
            "WHERE hk.id = ? GROUP BY hk.id" + extraQuery, [this.id]);
        else
            x = await db.execute("SELECT hk.*," +
            "json_object('id', su.id,  " + 
                "'name', su.name) AS skill_usage " + 
            "FROM haki_types hk " + 
            "LEFT JOIN skill_usage su ON hk.skill_bonused = su.id " + 
            (where ? whereQuery : "") + "GROUP BY hk.id" + extraQuery);
        return x;
    }

    async save() {
		await db.query("start transaction")
        let x = await db.query('insert into haki_types (`name`, `description`, `skill_bonused`) values (?,?,?)', [this.name, this.description, this.skill_bonused])
        await db.query("commit")
        return x
    }

    async update() {
		await db.query("start transaction")
        let query = "UPDATE haki_types SET "
        if (this.name)
            query += "name = '" + this.name + "',"
        if(this.description)
            query += "description = '" + this.description + "',"
        if(this.skill_bonused)
            query += "skill_bonused = '" + this.skill_bonused + "',"
        if (query.charAt(query.length - 1) == ",")
            query = query.substring(0, query.length - 1);
        query += " WHERE id = " + this.id + ";"
        console.log(query)
        let x = await db.query(query)
		
        await db.query("commit")
        return x
    }

    delete() {
        return db.execute('delete from haki_types where id = ?', [this.id])
    }

    setId(id) {
        this.id = id; 
    }
}
module.exports.Haki = Haki