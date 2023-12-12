db = require('../database/thesiria_dev');
const jwt = require('jsonwebtoken')

//header Authorization: "bearer <token>"
const tempJWT = (req, res, next) => {
    console.log("asd")
	//res.status(200).send(req.query)
    let bearer = req.query.authorization
    //const bearer = authHeader && authHeader.split(' ')
    console.log(bearer)
    if (bearer) {
        const bearerToken = bearer
        jwt.verify(bearerToken, "pizzapizz@", async (error, decodedToken) => {
            if (error) res.sendStatus(403)
            else {
                res.locals.id = (decodedToken.id ? decodedToken.id : 0)
                next()
            }
        })
    } else {
        res.sendStatus(403)
    }
}

module.exports = { tempJWT }