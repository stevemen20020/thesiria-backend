db = require('../database/thesiria_dev');

class Talisman {
    constructor (carga){
        if(carga){
            this.id = carga.id || null
            this.name = carga.name || null
            this.description = carga.description || null
            this.type = carga.type || null
            this.cooldown = carga.cooldown || null
            this.discovered = carga.discovered || null
        }
    }

    async fetch(id, where, orderby, limit, offset) {
        let extraQuery = (orderby ? " ORDER BY " + orderby : " ORDER BY tal.id") + (limit ? " limit " + (offset ? offset + ", " : "") + limit : '')
        let whereQuery = ` where tal.name like '%${where}%' `
        let x
        console.log('PARAMS:',id, where, orderby, limit, offset)
        if ((isNaN(id) == false && id != null) || isNaN(this.id) == false && this.id != null)
            x = await db.execute("SELECT tal.*" +
                                "FROM talismanes tal " + 
                                "WHERE tal.id = ? GROUP BY tal.id" + extraQuery, [this.id]);
        else
            x = await db.execute("SELECT tal.*" +
                                "FROM talismanes tal " + 
                                (where ? whereQuery : "") + "GROUP BY tal.id" + extraQuery);
        return x;
    }

    async save() {
		await db.query("start transaction")
        let x = await db.query('insert into talismanes (`name`, `description`, `type`, `cooldown`, `discovered`) values (?,?,?,?,?)', [this.name, this.description, this.type, this.cooldown, this.discovered])
        await db.query("commit")
        return x
    }

    async update() {
		await db.query("start transaction")
        let query = "UPDATE talismanes SET "
        if (this.name)
            query += "name = '" + this.name + "',"
        if (this.description)
            query += "description = '" + this.description + "',"
        if (this.type)
            query += "type = '" + this.type + "',"
        if (this.cooldown)
            query += "cooldown = '" + this.cooldown + "',"
        if (this.discovered)
            query += "discovered = '" + this.discovered + "',"
        if (query.charAt(query.length - 1) == ",")
            query = query.substring(0, query.length - 1);
        query += " WHERE id = " + this.id + ";"
        console.log(query)
        let x = await db.query(query)
		
        await db.query("commit")
        return x
    }

    delete() {
        return db.execute('delete from talismanes where id = ?', [this.id])
    }

    setId(id) {
        this.id = id; 
    }
}
module.exports.Talisman = Talisman