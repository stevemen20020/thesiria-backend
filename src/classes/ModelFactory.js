const {PlayableCharacter} = require("../models/PlayableCharacter.js")
const {Affinity} = require("../models/Affinity.js")
const {Element} = require("../models/Element.js")
const {Users} = require('../models/Users.js')
const {Skill} = require ('../models/Skill.js')
const {Tiles} = require ('../models/Tiles.js')
const {Dungeon} = require ('../models/Dungeons.js')
const {City} = require ('../models/City.js')
const {Object} = require ('../models/Object.js')
const {Weapon} = require('../models/Weapon.js')
const {InventoryWeapon} = require ('../models/InventoryWeapon.js')
const {Talisman} = require ('../models/Talisman.js')

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
            case 'object':
                return new Object(payload)
            case 'weapon':
                return new Weapon(payload)
            case 'inventory_weapon':
                return new InventoryWeapon(payload)
            case 'talisman':
                return new Talisman(payload)
            default:
                return 0
        }
    }
}

module.exports.ModelFactory = ModelFactory