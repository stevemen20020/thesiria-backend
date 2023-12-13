db = require('../database/thesiria_dev');

class Affinity {
    constructor (carga){
        if(carga){
            this.id = carga.id || null
            this.name = carga.name || null
            this.element_id = carga.element_id || null
            this.bonus = carga.bonus || null
        }
    }

    async fetch(id, where, orderby, limit, offset) {
        let extraQuery = (orderby ? " ORDER BY " + orderby : " ORDER BY af.id") + (limit ? " limit " + (offset ? offset + ", " : "") + limit : '')
        let whereQuery = ` where af.name like '%${where}%' `
        let x
        console.log('PARAMS:',id, where, orderby, limit, offset)
        if ((isNaN(id) == false && id != null) || isNaN(this.id) == false && this.id != null)
            x = await db.execute("SELECT af.*," +
                                "json_object('id', el.id,  " + 
                                    "'name', el.name) AS element " + 
                                "FROM affinity af " + 
                                "LEFT JOIN elements el ON af.element_id = el.id " +
                                "WHERE af.id = ? GROUP BY af.id" + extraQuery, [this.id]);
        else
            x = await db.execute("SELECT af.*," +
                                "json_object('id', el.id,  " + 
                                    "'name', el.name) AS element " + 
                                "FROM affinity af " + 
                                "LEFT JOIN elements el ON af.element_id = el.id " +
                                (where ? whereQuery : "") + "GROUP BY af.id" + extraQuery);
        return x;
    }

    async save() {
		await db.query("start transaction")
        let x = await db.query('insert into affinity (`name`,`element_id`,`bonus`) values (?,?,?)', [this.name, this.element_id, this.bonus])
        await db.query("commit")
        return x
    }

    async update() {
		await db.query("start transaction")
        let query = "UPDATE affinity SET "
        if (this.name)
            query += "name = '" + this.name + "',"
        if (this.element_id)
            query += "element_id = '" + this.element_id + "',"
        if (this.bonus)
            query += "bonus = '" + this.bonus + "',"
        if (query.charAt(query.length - 1) == ",")
            query = query.substring(0, query.length - 1);
        query += " WHERE id = " + this.id + ";"
        console.log(query)
        let x = await db.query(query)
		
        await db.query("commit")
        return x
    }

    delete() {
        return db.execute('delete from affinity where id = ?', [this.id])
    }

    setId(id) {
        this.id = id; 
    }
}
module.exports.Affinity = Affinity