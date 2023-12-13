const {PlayableCharacter} = require("../models/PlayableCharacter.js")
const {Affinity} = require("../models/Affinity.js")
const {Element} = require("../models/Element.js")

class ModelFactory {
    static create(model, payload) {
        switch (model) {
            case 'playable_character':
                return new PlayableCharacter(payload)
            case 'affinity':
                return new Affinity(payload)
            case 'element':
                return new Element(payload)
            default:
                return 0
        }
    }
}

module.exports.ModelFactory = ModelFactory