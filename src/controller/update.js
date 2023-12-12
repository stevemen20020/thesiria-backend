const { ModelFactory } = require("../classes/ModelFactory")

const update = async (req, res) => {
  try {
    let payload = req.body || null
    let model = req.params.model || null

    let id = parseInt(req.body.id) || null

    if (id && Number.isInteger(id))
      payload.id = id

    if (payload == null) return res.status(400).send({ status: "ERROR", response: [], message: "Carga vacia" })
    if (payload.id == null) return res.status(400).send({ status: "ERROR", response: [], message: "No ID" })
    if (model == null) return res.status(400).send({ status: "ERROR", response: [], message: "Modelo vacio" })

    let input = ModelFactory.create(model, { ...payload })

    if (input === 0) return res.status(400).send({ status: "ERROR", response: [], message: "Modelo desconocido" })

    const result = await input.update()
    if (result.length > 0) {
      console.log(result)
      if (result[0].error) { return res.status(400).send({ status: "ERROR", response: [], message: result[0].error }) }

      if (result[0].affectedRows < 1) { return res.status(400).send({ status: "ERROR", response: [], message: "error al intentar insertar la informacion" }) }
      return res.status(200).send({ status: "OK", response: payload, message: (result[0].message ? result[0].message : "") })
    } else
      return res.status(400).send({ status: "ERROR", response: [], message: "" })
  } catch (err) {
    console.log("ERROR", err)
    return res.status(400).send({ message: err.message, status: "ERROR", data: [] })
  }
}

module.exports = { update }