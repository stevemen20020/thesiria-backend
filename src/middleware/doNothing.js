const doNothing = (req, res, next) => {
    next()
}

module.exports = doNothing