const { ModelFactory } = require("../classes/ModelFactory")

const insert = async (req, res) => {
    try {
        console.log(req.body)

        let payload = req.body || null
        let model = req.params.model || null

        if (payload == null) return res.status(400).send({ status: "ERROR", response: {}, message: "Carga vacia" })
        if (model == null) return res.status(400).send({ status: "ERROR", response: {}, message: "Modelo vacio" })

        let input = ModelFactory.create(model, { ...payload })
        if (input === 0) return res.status(400).send({ status: "ERROR", response: {}, message: "Modelo desconocido" })

        const result = await input.save()
        if (result && result.length > 0) {
            if (result[0].error) { return res.status(400).send({ status: "ERROR", response: {}, message: result[0].error }) }
            if (result[0].affectedRows < 1) { return res.status(400).send({ status: "ERROR", response: {}, message: "error al intentar insertar la informacion" }) }
            input.setId(result[0].insertId)
        if(req.files != null){  
            for(var i=0;i<req.files.length;i++){
                await input.image(req.files[i].filename)
            }
            return res.status(200).send({ status: "OK", response: { id: result[0].insertId }, message: (result[0].message ? result[0].message : "Entidad creada exitosamente") })
        } else{
            if (req.file != null)
                await input.image(req.file.filename)
            return res.status(200).send({ status: "OK", response: { id: result[0].insertId }, message: (result[0].message ? result[0].message : "Entidad creada exitosamente") })
        }
            
        } else
            return res.status(400).send({ status: "ERROR", response: {}, message: "" })
    } catch (err) {
        console.log("ERROR", err)
        if (err.code == "ER_DUP_ENTRY") {
            return res.status(509).send({ message: "Existen datos que no se pueden duplicar", status: "ERROR", data: [] })
        } else
            return res.status(500).send({ message: err.message, status: "ERROR", data: [] })     
    }
}

module.exports = { insert }