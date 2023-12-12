const { ModelFactory } = require("../classes/ModelFactory")

const del = async (req, res) => {
    try {
        let model = req.params.model || null
        let id = req.body.id || null

        if (model == null) return res.status(400).send({ status: "ERROR", result: [], message: "No model" })
        if (id == null) return res.status(400).send({ status: "ERROR", result: [], message: "No ID" })
        if (isNaN(id)) return res.status(400).send({ status: "ERROR", result: [], message: "Id no es un numero valido" })

        obj = ModelFactory.create(model, { id })
        if (obj === 0) { return res.status(404).send({ status: "ERROR", result: [], message: "Model unknown" }) }

        let x = await obj.delete();
        if (x[0].affectedRows > 0) return res.status(200).send({ status: "OK", result: [], message: "eliminado exitosamente" })
        else return res.status(404).send({ status: "ERROR", result: [], message: "not found" })
    } catch (err) {
        console.log("ERROR", err)
        return res.status(500).send({ status: "ERROR", result: [], message: err.message })
    }
}

module.exports = { del }