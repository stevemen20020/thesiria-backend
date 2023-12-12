const {PlayableCharacter} = require("../models/PlayableCharacter.js")

class ModelFactory {
    static create(model, payload) {
        switch (model) {
            case 'playable_character':
                return new PlayableCharacter(payload)

            default:
                return 0
        }
    }
}

module.exports.ModelFactory = ModelFactory