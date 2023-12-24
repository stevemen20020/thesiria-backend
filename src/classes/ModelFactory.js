const {PlayableCharacter} = require("../models/PlayableCharacter.js")
const {Affinity} = require("../models/Affinity.js")
const {Element} = require("../models/Element.js")
const {Users} = require('../models/Users.js')
const {Skill} = require ('../models/Skill.js')
const {Tiles} = require ('../models/Tiles.js')
const {Dungeon} = require ('../models/Dungeons.js')
const {City} = require ('../models/City.js')

class ModelFactory {
    static create(model, payload) {
        switch (model) {
            case 'playable_character':
                return new PlayableCharacter(payload)
            case 'affinity':
                return new Affinity(payload)
            case 'element':
                return new Element(payload)
            case 'user':
                return new Users(payload)
            case 'skill_usage':
                return new Skill(payload)
            case 'tiles':
                return new Tiles(payload)
            case 'dungeons':
                return new Dungeon(payload)
            case 'city':
                return new City(payload)
            default:
                return 0
        }
    }
}

module.exports.ModelFactory = ModelFactory