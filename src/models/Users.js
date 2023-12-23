db = require('../database/thesiria_dev');

class Users {
    constructor (carga){
        if(carga){
            this.id = carga.id || null
            this.username = carga.username || null
            this.name = carga.name || null
            this.last_name = carga.last_name || null
            this.email = carga.email || null
            this.password = carga.password || null
        }
    }

    async fetch(id, where, orderby, limit, offset) {
        let extraQuery = (orderby ? " ORDER BY " + orderby : " ORDER BY us.id") + (limit ? " limit " + (offset ? offset + ", " : "") + limit : '')
        let whereQuery = ` where us.username like '%${where}%' `
        let x
        console.log('PARAMS:',id, where, orderby, limit, offset)
        if ((isNaN(id) == false && id != null) || isNaN(this.id) == false && this.id != null)
            x = await db.execute("SELECT us.* " +
                                "FROM users us " + 
                                "WHERE us.id = ? GROUP BY us.id" + extraQuery, [this.id]);
        else
            x = await db.execute("SELECT us.* " +
                                "FROM users us " + 
                                (where ? whereQuery : "") + "GROUP BY af.id" + extraQuery);
        return x;
    }

    async save() {
		await db.query("start transaction")
        let x = await db.query('insert into users (`name`,`element_id`,`bonus`) values (?,?,?)', [this.name, this.element_id, this.bonus])
        await db.query("commit")
        return x
    }

    async update() {
		await db.query("start transaction")
        let query = "UPDATE users SET "
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
        return db.execute('delete from users where id = ?', [this.id])
    }

    setId(id) {
        this.id = id; 
    }
}
module.exports.Users = Users