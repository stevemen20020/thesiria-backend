db = require('../database/thesiria_dev');

class Element {
    constructor (carga){
        if(carga){
            this.id = carga.id || null
            this.name = carga.name || null
        }
    }

    async fetch(id, where, orderby, limit, offset) {
        let extraQuery = (orderby ? " ORDER BY " + orderby : " ORDER BY el.id") + (limit ? " limit " + (offset ? offset + ", " : "") + limit : '')
        let whereQuery = ` where el.name like '%${where}%' `
        let x
        console.log('PARAMS:',id, where, orderby, limit, offset)
        if ((isNaN(id) == false && id != null) || isNaN(this.id) == false && this.id != null)
            x = await db.execute("SELECT el.*" +
                                "FROM elements el " + 
                                "WHERE el.id = ? GROUP BY el.id" + extraQuery, [this.id]);
        else
            x = await db.execute("SELECT el.*" +
                                "FROM elements el " + 
                                (where ? whereQuery : "") + "GROUP BY el.id" + extraQuery);
        return x;
    }

    async save() {
		await db.query("start transaction")
        let x = await db.query('insert into elements (`name`) values (?)', [this.name])
        await db.query("commit")
        return x
    }

    async update() {
		await db.query("start transaction")
        let query = "UPDATE elements SET "
        if (this.name)
            query += "name = '" + this.name + "',"
        if (query.charAt(query.length - 1) == ",")
            query = query.substring(0, query.length - 1);
        query += " WHERE id = " + this.id + ";"
        console.log(query)
        let x = await db.query(query)
		
        await db.query("commit")
        return x
    }

    delete() {
        return db.execute('delete from elements where id = ?', [this.id])
    }

    setId(id) {
        this.id = id; 
    }
}
module.exports.Element = Element