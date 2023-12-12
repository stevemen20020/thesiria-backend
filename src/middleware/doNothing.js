db = require('../database/thesiria_dev');
const jwt = require('jsonwebtoken')

//header Authorization: "bearer <token>"
const doNothing = (req, res, next) => {
    next()
}

module.exports = { doNothing }