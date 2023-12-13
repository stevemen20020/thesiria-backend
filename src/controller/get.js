const { ModelFactory } = require("../classes/ModelFactory")

const get = async (req, res) => {
  try {
    let model = req.params.model || null
    let id = req.query.id || null
    let where = req.query.where || null
    let orderby = req.query.orderby || null
    let limit = req.query.limit || 50
    let offset = req.query.offset || 0

    if (model == null) return res.status(400).send({ status: "ERROR", result: [], message: "Modelo obligatorio" }, res.locals.id)
    if (id != null && Number.isInteger(id)) return res.status(400).send({ status: "ERROR", result: [], message: "Id no es un numero valido" }, res.locals.id)
    if (limit != 50 && Number.isInteger(limit)) return res.status(400).send({ status: "ERROR", result: [], message: "Limit no es un numero valido" }, res.locals.id)
    if (offset != 0 && Number.isInteger(offset)) return res.status(400).send({ status: "ERROR", result: [], message: "Offset no es un numero valido" }, res.locals.id)

    obj = ModelFactory.create(model, { id, ...req.query })

    if (obj == 0) return res.status(400).send({ status: "ERROR", result: [], message: "Modelo desconocido" })

    const [rows, fields, message] = await obj.fetch(id, where, orderby, limit, offset)


    if (rows == null || rows.length < 1)
      return res.status(200).send({ status: "OK", result: [], message: "Vacio", })
    else
      return res.status(200).send({ status: "OK", result: rows, message: (message ? message : "") })
  } catch (err) {
    console.log("ERROR", err)
    if (err.code == "ER_NO_REFERENCED_ROW_2") {
      return res.status(500).send({ message: "Una de las referencias no existe", status: "ERROR", data: [] })
    }
    return res.status(500).send({ status: "ERROR", result: [], message: err })
  }
}

module.exports = { get }