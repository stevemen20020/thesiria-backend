const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const { elemental_reaction } = require('./elemental_reactions')

//CATEGORIES OF ATTACKS IN ALLIED ATTACKS
// 1.- FROM PLAYER TO NPC
// 2.- FROM PLAYER TO MONSTER

//CATEGORIES OF ATTACKS IN ENEMY ATTACKS
// 1.- FROM NPC TO PLAYER
// 2.- FROM MONSTER TO PLAYER


//PRISMA NOTES THAT LOOK THE SAME
// -inventory_weapon_playable_character_weapon_idToinventory_weapon // MEANING THE EQUIPED WEAPON
// -inventory_armor_playable_character_armor_idToinventory_armor // MEANING THE EQUIPED ARMOR

const fight_engine = (server) => {
  const { Server } = require("socket.io")
  const io = new Server(server, {
    cors: {
      origin:'*',
      allowedHeaders: ['Content-Type', 'Authorization', 'id_session']
    }
  })

  const BATTLE = {
    allied_attacks: [],
    enemy_attacks: [],
  }
  
  let TIMER_REPEATER = null

  io.on("connection", (socket) => {

    socket.on('start-battle', async (body) => {
      body = JSON.parse(body);

      const called_players = await prisma.playable_character.findMany({
        where:{
          id:{
            in: body.called_player_ids
          }
        }, include: {
          races:true,
          affinity:true,
          inventory_armor_inventory_armor_id_userToplayable_character:{
            include:{
              armor:true
            }
          }, inventory_weapon_inventory_weapon_id_userToplayable_character:{
            include:{
              weapon:true
            }
          }, haki_types: true,
          devil_fruit:true,
          titanes:true,
          attacks:{
            include:{
              skill_usage_attacks_skill_usageToskill_usage:true
            }
          }, inventory_armor_playable_character_armor_idToinventory_armor: {
            include:{
              armor:true
            }
          }, inventory_weapon_playable_character_weapon_idToinventory_weapon: {
            include: {
              weapon:true
            }
          }, inventory :{
            include:{
              objects: true
            }
          }, inventory_magic: {
            include: {
              spells: true
            }
          }
        }
      })

      const called_npc_allies = await prisma.npc.findMany({
        where:{
          id:{
            in: body.called_npc_ids
          }
        }, include:{
          races:true,
          affinity:true,
          armor:true,
          weapon:true,
          haki_types:true,
          devil_fruit:true,
          titanes:true,
          loottables: {
            include: {
              objects: true
            }
          }
        }
      })

      const called_npc_enemies = await prisma.npc.findMany({
        where:{
          id:{
            in: body.called_npc_enemie_ids
          }
        }, include:{
          races:true,
          affinity:true,
          armor:true,
          weapon:true,
          haki_types:true,
          devil_fruit:true,
          titanes:true,
          loottables: {
            include: {
              objects: true
            }
          },
          attacks: {
            include:{
              skill_usage_attacks_skill_usageToskill_usage: true
            }
          }
        }
      })

      const called_monsters = await prisma.monster.findMany({
        where:{
          id:{
            in: body.called_monsters_ids
          }
        }, include:{
          armor:true,
          weapon:true,
          loottables:{
            include:{
              objects:true
            }
          }
        }
      })

      let timer = 15;

      const speeds_players = called_players.map(player => player.speed);
      const monster_speed = called_monsters.map(monster => monster.speed);
      const npc_enemy_speed = called_npc_enemies.map(npc => npc.speed);
      const enemy_speed = [...monster_speed, ...npc_enemy_speed];

      const calculateAverageSpeed = (speeds) => {
        if (speeds.length === 0) return 0;  // Return 0 if no speeds are available
        const totalSpeed = speeds.reduce((sum, speed) => sum + speed, 0);
        return totalSpeed / speeds.length;
      };//

      const playerAverageSpeed = calculateAverageSpeed(speeds_players);
      const enemyAverageSpeed = calculateAverageSpeed(enemy_speed);

      const adjustTimeBasedOnSpeed = (averageSpeed, maxAdjust, threshold) => {
        if (averageSpeed > threshold) {
          return ((averageSpeed - threshold) / (20 - threshold)) * maxAdjust;
        } else {
          return ((threshold - averageSpeed) / threshold) * maxAdjust;
        }
      };

      if (speeds_players.length > 0) {
        if (playerAverageSpeed > 10) {
          timer += adjustTimeBasedOnSpeed(playerAverageSpeed, 5, 10);
        } else {
          timer -= adjustTimeBasedOnSpeed(playerAverageSpeed, 5, 10);
        }
      }

      if (enemy_speed.length > 0) {
        if (enemyAverageSpeed > 10) {
          timer -= adjustTimeBasedOnSpeed(enemyAverageSpeed, 5, 10);
        } else {
          timer += adjustTimeBasedOnSpeed(enemyAverageSpeed, 5, 10);
        }
      }

      timer = Math.max(0, timer);  // Ensure timer doesn't go below 0

      BATTLE.timer = timer
      BATTLE.players = called_players
      BATTLE.npc_enemies = called_npc_enemies
      BATTLE.npc_allies = called_npc_allies
      BATTLE.monsters = called_monsters

      TIMER_REPEATER = setInterval(() => {
        execute_player_attacks_to_NPC() //EXECUTES THE ATTACKS FROM THE PLAYER TO NPC'S
        execute_player_attacks_to_MONSTER() //EXECUTES THE ATTACKS FROM THE PLAYER TO MONSTERS
        execute_allied_NPC_attacks_to_NPC() //EXECUTES THE ATTACKS FROM ALLIED NPC'S TO NPC'S
        execute_NPC_attacks_to_MONSTER() //EXECUTES THE ATTACKS FROM ALLIED NPC'S TO MONSTERS

        BATTLE.allied_attacks = []  //RESETS THE BATTLE ATTACKS

        if(check_if_enemies_are_dead()) { //CHECKS IF ALL NPC's AND MONSTERS ARE DEAD IN ORDER TO FINISH THE BATTLE IN A WINNING STATE
          finish_battle()
        }

        execute_NPC_attacks() //EXECUTES THE ATTACKS FROM NPC'S TO PLAYERS
        execute_MONSTER_attacks() //EXECUTES THE ATTACKS FROM MONSTERS TO PLAYERS

        BATTLE.enemy_attacks = []

        if(check_if_players_are_dead()) { //CHECKS IF ALL PLAYERS ARE DEAD OR HAVE FLED IN ORDER TO FINISH THE BATTLE IN A LOSSING STATE
          cancel_battle() //FINISHES THE BATTLE
        }

        io.emit('battle-round', { BATTLE });
      }, timer * 1000);
    });

    socket.on('send-attack', async (body) => {
      const attack = JSON.parse(body)
      BATTLE.allied_attacks.push(attack)
    })

    socket.on('send-enemy-attack', async (body) => {
      const attack = JSON.parse(body)
      BATTLE.enemy_attacks.push(attack)
    })

    socket.on('flee-battle', async (body) => {
      const player_id = JSON.parse(body)
      save_weapon(player_id)
      save_player(player_id)
    })

    socket.on('weapon-swap', async(body) => {
      const { player_id, new_weapon_id } = JSON.parse(body)
      save_weapon(player_id)
      swap_weapon(player_id, new_weapon_id)
    })

    socket.on('cancel-battle', async () => {
      console.log('cancel-battle')
      cancel_battle()
    })
  });

  const execute_player_attacks_to_NPC = () => {
    let APPLIED_ELEMENT = 0

    BATTLE.allied_attacks.forEach(attack_id => {

      if(attack_id.attack_type !== 1) return
      
      let full_attack = {}
      let full_attack_index = -1
      let player_id = -1
      for(const player of BATTLE.players) {
        full_attack = player.attacks.find(attack => attack.id == attack_id.attack_id)
        full_attack_index = player.attacks.findIndex(attack => attack.id == attack_id.attack_id)
        player_id = player.id

        if(full_attack_index !== -1) break
      }
      if(full_attack_index !== -1) {
        const player_index = BATTLE.players.findIndex(player => player.id == player_id)
        BATTLE.players[player_index].attacks[full_attack_index].uses --
        BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.durability --

        let DICE_ROLL = attack_id.roll
        switch(full_attack.skill_usage) {
          case 1:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].strength)
            break;
          case 2:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].dexterity)
            break;
          case 3:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].defense)
            break;
          case 4:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].aim)
            break;
          case 5:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].vision)
            break;
          case 6:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].speed)
            break;
          case 7:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].handcraft)
            break;
          case 8:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].agility)
            break;
          case 9:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].charisma)
            break;
        }

        let FORCE_MULTIPLIER = 1

        if(APPLIED_ELEMENT !== 0){
          FORCE_MULTIPLIER = elemental_reaction(APPLIED_ELEMENT, BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.element_id)
          APPLIED_ELEMENT = 0
        }
        let enemy_speed_skill = 0

        if(attack_id.objective_ids !== -1) {
          const enemy = BATTLE.npc_enemies.findIndex(enemy => enemy.id == attack_id.objective_ids)
          enemy_speed_skill = BATTLE.npc_enemies[enemy].agility
        } else {
          let total = 0
          for(const enemy in BATTLE.npc_enemies) {
            total += enemy.agility
          }

          enemy_speed_skill = total /  BATTLE.npc_enemies.length
        }

        const movement_skipped = skip_ability(enemy_speed_skill)
        const CHIPPING = BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.chipping

        BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.chipping += CHIPPING

        let WEAPON_DAMAGE = 0
        switch( BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.level){
          case 1:
            WEAPON_DAMAGE = BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.damage_points_lvl1
            break;
          case 2:
            WEAPON_DAMAGE = BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.damage_points_lvl2
            break;
          case 3:
            WEAPON_DAMAGE = BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.damage_points_lvl3
            break;
          case 4:
            WEAPON_DAMAGE = BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.damage_points_lvl4
            break;
          case 5:
            WEAPON_DAMAGE = BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.damage_points_lvl5
            break;
        }

        const ATTACK_DAMAGE = full_attack.attack_points
        
        //TIME TO CALCULATE DAMAGE OUTPUT
        if(attack_id.objective_ids !== -1) {
          const enemy = BATTLE.npc_enemies.findIndex(enemy => enemy.id == attack_id.objective_ids)

          let DAMAGE_OUTPUT = (( DICE_ROLL * ((ATTACK_DAMAGE + WEAPON_DAMAGE)/CHIPPING))+(BATTLE.npc_enemies[enemy].defense/6) * FORCE_MULTIPLIER)

          if(movement_skipped === 0) DAMAGE_OUTPUT = 0

          BATTLE.npc_enemies[enemy].health -= parseFloat(DAMAGE_OUTPUT.toFixed(0))

          if(BATTLE.npc_enemies[enemy].health < 0) BATTLE.npc_enemies[enemy].health = 0
        } else {
          let total = 0
          for(const enemy in BATTLE.npc_enemies) {
            total += BATTLE.npc_enemies[enemy].defense
          }

          const enemy_defense = total /  BATTLE.npc_enemies.length
          let DAMAGE_OUTPUT = (( DICE_ROLL * ((ATTACK_DAMAGE + WEAPON_DAMAGE)/CHIPPING))+(enemy_defense/6) * FORCE_MULTIPLIER) 

          if(movement_skipped === 0) DAMAGE_OUTPUT = 0

          for(enemy in BATTLE.npc_enemies){
            BATTLE.npc_enemies[enemy].health -= parseFloat(DAMAGE_OUTPUT.toFixed(0))
            if(BATTLE.npc_enemies[enemy].health < 0) BATTLE.npc_enemies[enemy].health = 0
          }
        }
      }
    })
  }

  const execute_player_attacks_to_MONSTER = () => {
    let APPLIED_ELEMENT = 0

    BATTLE.allied_attacks.forEach(attack_id => {

      if(attack_id.attack_type !== 2) return
      
      let full_attack = {}
      let full_attack_index = -1
      let player_id = -1
      for(const player of BATTLE.players) {
        full_attack = player.attacks.find(attack => attack.id == attack_id.attack_id)
        full_attack_index = player.attacks.findIndex(attack => attack.id == attack_id.attack_id)
        player_id = player.id

        if(full_attack_index !== -1) break
      }
      if(full_attack_index !== -1) {
        const player_index = BATTLE.players.findIndex(player => player.id == player_id)
        BATTLE.players[player_index].attacks[full_attack_index].uses --
        BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.durability --

        let DICE_ROLL = attack_id.roll
        switch(full_attack.skill_usage) {
          case 1:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].strength)
            break;
          case 2:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].dexterity)
            break;
          case 3:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].defense)
            break;
          case 4:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].aim)
            break;
          case 5:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].vision)
            break;
          case 6:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].speed)
            break;
          case 7:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].handcraft)
            break;
          case 8:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].agility)
            break;
          case 9:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.players[player_index].charisma)
            break;
        }

        let FORCE_MULTIPLIER = 1

        if(APPLIED_ELEMENT !== 0){
          FORCE_MULTIPLIER = elemental_reaction(APPLIED_ELEMENT, BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.element_id)
          APPLIED_ELEMENT = 0
        }
        let enemy_speed_skill = 0

        if(attack_id.objective_ids !== -1) {
          const enemy = BATTLE.monsters.findIndex(enemy => enemy.id == attack_id.objective_ids)
          enemy_speed_skill = BATTLE.monsters[enemy].agility
        } else {
          let total = 0
          for(const enemy in BATTLE.monsters) {
            total += enemy.agility
          }

          enemy_speed_skill = total /  BATTLE.monsters.length
        }

        const movement_skipped = skip_ability(enemy_speed_skill)
        const CHIPPING = BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.chipping

        BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.chipping += CHIPPING

        let WEAPON_DAMAGE = 0
        switch( BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.level){
          case 1:
            WEAPON_DAMAGE = BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.damage_points_lvl1
            break;
          case 2:
            WEAPON_DAMAGE = BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.damage_points_lvl2
            break;
          case 3:
            WEAPON_DAMAGE = BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.damage_points_lvl3
            break;
          case 4:
            WEAPON_DAMAGE = BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.damage_points_lvl4
            break;
          case 5:
            WEAPON_DAMAGE = BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.damage_points_lvl5
            break;
        }

        const ATTACK_DAMAGE = full_attack.attack_points
        //TIME TO CALCULATE DAMAGE OUTPUT
        if(attack_id.objective_ids !== -1) {
          const enemy = BATTLE.monsters.findIndex(enemy => enemy.id == attack_id.objective_ids)

          let DAMAGE_OUTPUT = (( DICE_ROLL * ((ATTACK_DAMAGE + WEAPON_DAMAGE)/CHIPPING))+(BATTLE.monsters[enemy].defense/6) * FORCE_MULTIPLIER)

          if(movement_skipped === 0) DAMAGE_OUTPUT = 0

          BATTLE.monsters[enemy].health -= parseFloat(DAMAGE_OUTPUT.toFixed(0))
        } else {
          let total = 0
          for(const enemy in BATTLE.monsters) {
            total += BATTLE.monsters[enemy].defense
          }

          const enemy_defense = total /  BATTLE.monsters.length
          let DAMAGE_OUTPUT = (( DICE_ROLL * ((ATTACK_DAMAGE + WEAPON_DAMAGE)/CHIPPING))+(enemy_defense/6) * FORCE_MULTIPLIER)

          if(movement_skipped === 0) DAMAGE_OUTPUT = 0
          for(enemy in BATTLE.monsters){
            BATTLE.monsters[enemy].health -= parseFloat(DAMAGE_OUTPUT.toFixed(0))
          }
        }
      }
    })
  }

  const execute_allied_NPC_attacks_to_NPC = () => {
    let APPLIED_ELEMENT = 0

    BATTLE.allied_attacks.forEach(attack_id => {

      if(attack_id.attack_type !== 2) return
      
      let full_attack = {}
      let full_attack_index = -1
      let npc_id = -1
      for(const npc of BATTLE.npc_allies) {
        full_attack = npc.attacks.find(attack => attack.id == attack_id.attack_id)
        full_attack_index = npc.attacks.findIndex(attack => attack.id == attack_id.attack_id)
        npc_id = npc.id

        if(full_attack_index !== -1) break
      }
      if(full_attack_index !== -1) {
        const npc_index = BATTLE.npc_allies.findIndex(player => player.id == npc_id)
        BATTLE.npc_allies[npc_index].attacks[full_attack_index].uses --

        let DICE_ROLL = attack_id.roll
        switch(full_attack.skill_usage) {
          case 1:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].strength)
            break;
          case 2:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].dexterity)
            break;
          case 3:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].defense)
            break;
          case 4:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].aim)
            break;
          case 5:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].vision)
            break;
          case 6:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].speed)
            break;
          case 7:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].handcraft)
            break;
          case 8:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].agility)
            break;
          case 9:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].charisma)
            break;
        }

        let FORCE_MULTIPLIER = 1

        if(APPLIED_ELEMENT !== 0){
          FORCE_MULTIPLIER = elemental_reaction(APPLIED_ELEMENT, BATTLE.npc_allies[npc_index].weapon.element_id)
          APPLIED_ELEMENT = 0
        }
        let enemy_speed_skill = 0

        if(attack_id.objective_ids !== -1) {
          const enemy = BATTLE.npc_enemies.findIndex(enemy => enemy.id == attack_id.objective_ids)
          enemy_speed_skill = BATTLE.npc_enemies[enemy].agility
        } else {
          let total = 0
          for(const enemy in BATTLE.npc_enemies) {
            total += enemy.agility
          }

          enemy_speed_skill = total /  BATTLE.npc_enemies.length
        }

        const movement_skipped = skip_ability(enemy_speed_skill)
        const CHIPPING = BATTLE.npc_allies[npc_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.chipping

        BATTLE.npc_allies[npc_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.chipping += CHIPPING

        let WEAPON_DAMAGE = BATTLE.npc_allies[npc_index].weapon.damage_points_lvl5
        
        const ATTACK_DAMAGE = full_attack.attack_points
        //TIME TO CALCULATE DAMAGE OUTPUT
        if(attack_id.objective_ids !== -1) {
          const enemy = BATTLE.npc_enemies.findIndex(enemy => enemy.id == attack_id.objective_ids)

          let DAMAGE_OUTPUT = (( DICE_ROLL * ((ATTACK_DAMAGE + WEAPON_DAMAGE)/CHIPPING))+(BATTLE.npc_enemies[enemy].defense/6) * FORCE_MULTIPLIER)

          if(movement_skipped === 0) DAMAGE_OUTPUT = 0

          BATTLE.npc_enemies[enemy].health -= parseFloat(DAMAGE_OUTPUT.toFixed(0))
        } else {
          let total = 0
          for(const enemy in BATTLE.npc_enemies) {
            total += BATTLE.npc_enemies[enemy].defense
          }

          const enemy_defense = total /  BATTLE.npc_enemies.length
          let DAMAGE_OUTPUT = (( DICE_ROLL * ((ATTACK_DAMAGE + WEAPON_DAMAGE)/CHIPPING))+(enemy_defense/6) * FORCE_MULTIPLIER)

          if(movement_skipped === 0) DAMAGE_OUTPUT = 0
          for(enemy in BATTLE.npc_enemies){
            BATTLE.npc_enemies[enemy].health -= parseFloat(DAMAGE_OUTPUT.toFixed(0))
          }
        }
      }
    })
  }

  const execute_NPC_attacks_to_MONSTER = () => {
    let APPLIED_ELEMENT = 0

    BATTLE.allied_attacks.forEach(attack_id => {

      if(attack_id.attack_type !== 3) return
      
      let full_attack = {}
      let full_attack_index = -1
      let npd_id = -1
      for(const npc of BATTLE.npc_allies) {
        full_attack = npc.attacks.find(attack => attack.id == attack_id.attack_id)
        full_attack_index = npc.attacks.findIndex(attack => attack.id == attack_id.attack_id)
        npd_id = npc.id

        if(full_attack_index !== -1) break
      }
      if(full_attack_index !== -1) {
        const npc_index = BATTLE.npc_allies.findIndex(player => player.id == npd_id)
        BATTLE.npc_allies[npc_index].attacks[full_attack_index].uses --

        let DICE_ROLL = attack_id.roll
        switch(full_attack.skill_usage) {
          case 1:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].strength)
            break;
          case 2:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].dexterity)
            break;
          case 3:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].defense)
            break;
          case 4:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].aim)
            break;
          case 5:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].vision)
            break;
          case 6:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].speed)
            break;
          case 7:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].handcraft)
            break;
          case 8:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].agility)
            break;
          case 9:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_allies[npc_index].charisma)
            break;
        }

        let FORCE_MULTIPLIER = 1

        if(APPLIED_ELEMENT !== 0){
          FORCE_MULTIPLIER = elemental_reaction(APPLIED_ELEMENT, BATTLE.npc_allies[npc_index].weapon.element_id)
          APPLIED_ELEMENT = 0
        }
        let enemy_speed_skill = 0

        if(attack_id.objective_ids !== -1) {
          const enemy = BATTLE.monsters.findIndex(enemy => enemy.id == attack_id.objective_ids)
          enemy_speed_skill = BATTLE.monsters[enemy].agility
        } else {
          let total = 0
          for(const enemy in BATTLE.monsters) {
            total += enemy.agility
          }

          enemy_speed_skill = total /  BATTLE.monsters.length
        }

        const movement_skipped = skip_ability(enemy_speed_skill)
        const CHIPPING = BATTLE.npc_allies[npc_index].weapon.chipping

        BATTLE.npc_allies[npc_index].weapon.chipping += CHIPPING

        let WEAPON_DAMAGE = BATTLE.npc_allies[npc_index].weapon.damage_points_lvl5

        const ATTACK_DAMAGE = full_attack.attack_points
        //TIME TO CALCULATE DAMAGE OUTPUT
        if(attack_id.objective_ids !== -1) {
          const enemy = BATTLE.monsters.findIndex(enemy => enemy.id == attack_id.objective_ids)

          let DAMAGE_OUTPUT = (( DICE_ROLL * ((ATTACK_DAMAGE + WEAPON_DAMAGE)/CHIPPING))+(BATTLE.monsters[enemy].defense/6) * FORCE_MULTIPLIER)

          if(movement_skipped === 0) DAMAGE_OUTPUT = 0

          BATTLE.monsters[enemy].health -= parseFloat(DAMAGE_OUTPUT.toFixed(0))
        } else {
          let total = 0
          for(const enemy in BATTLE.monsters) {
            total += BATTLE.monsters[enemy].defense
          }

          const enemy_defense = total /  BATTLE.monsters.length
          let DAMAGE_OUTPUT = (( DICE_ROLL * ((ATTACK_DAMAGE + WEAPON_DAMAGE)/CHIPPING))+(enemy_defense/6) * FORCE_MULTIPLIER)

          if(movement_skipped === 0) DAMAGE_OUTPUT = 0
          for(enemy in BATTLE.monsters){
            BATTLE.monsters[enemy].health -= parseFloat(DAMAGE_OUTPUT.toFixed(0))
          }
        }
      }
    })
  }

  const execute_NPC_attacks = () => {
    let APPLIED_ELEMENT = 0

    BATTLE.enemy_attacks.forEach(attack_id => {

      if(attack_id.attack_type !== 1) return
      
      let full_attack = {}
      let full_attack_index = -1
      let npc_id = -1
      for(const npc of BATTLE.npc_enemies) {
        full_attack = npc.attacks.find(attack => attack.id == attack_id.attack_id)
        full_attack_index = npc.attacks.findIndex(attack => attack.id == attack_id.attack_id)
        npc_id = npc.id

        if(full_attack_index !== -1) break
      }
      if(full_attack_index !== -1) {
        const npc_index = BATTLE.npc_enemies.findIndex(player => player.id == npc_id)
        BATTLE.npc_enemies[npc_index].attacks[full_attack_index].uses --

        let DICE_ROLL = attack_id.roll
        switch(full_attack.skill_usage) {
          case 1:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_enemies[npc_index].strength)
            break;
          case 2:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_enemies[npc_index].dexterity)
            break;
          case 3:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_enemies[npc_index].defense)
            break;
          case 4:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_enemies[npc_index].aim)
            break;
          case 5:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_enemies[npc_index].vision)
            break;
          case 6:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_enemies[npc_index].speed)
            break;
          case 7:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_enemies[npc_index].handcraft)
            break;
          case 8:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_enemies[npc_index].agility)
            break;
          case 9:
            DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.npc_enemies[npc_index].charisma)
            break;
        }

        let FORCE_MULTIPLIER = 1

        if(APPLIED_ELEMENT !== 0){
          FORCE_MULTIPLIER = elemental_reaction(APPLIED_ELEMENT, BATTLE.npc_enemies[npc_index].weapon.element_id)
          APPLIED_ELEMENT = 0
        }
        let enemy_speed_skill = 0

        if(attack_id.objective_ids !== -1) {
          const enemy = BATTLE.players.findIndex(enemy => enemy.id == attack_id.objective_ids)
          enemy_speed_skill = BATTLE.players[enemy].agility
        } else {
          let total = 0
          for(const enemy in BATTLE.players) {
            total += enemy.agility
          }

          enemy_speed_skill = total /  BATTLE.players.length
        }

        const movement_skipped = skip_ability(enemy_speed_skill)
        //const CHIPPING = BATTLE.players[npc_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.chipping

        //BATTLE.players[npc_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.chipping += CHIPPING

        let WEAPON_DAMAGE = BATTLE.npc_enemies[npc_index].weapon.damage_points_lvl5

        const ATTACK_DAMAGE = full_attack.attack_points
        //TIME TO CALCULATE DAMAGE OUTPUT
        if(attack_id.objective_ids !== -1) {
          const enemy = BATTLE.players.findIndex(enemy => enemy.id == attack_id.objective_ids)

          let DAMAGE_OUTPUT = (( DICE_ROLL * ((ATTACK_DAMAGE + WEAPON_DAMAGE)/1))+(BATTLE.players[enemy].defense/6) * FORCE_MULTIPLIER)

          if(movement_skipped === 0) DAMAGE_OUTPUT = 0

          BATTLE.players[enemy].health -= parseFloat(DAMAGE_OUTPUT.toFixed(0))

          if( BATTLE.players[enemy].health -= parseFloat(DAMAGE_OUTPUT.toFixed(0)) < 0) BATTLE.players[enemy].health = 0
        } else {
          let total = 0
          for(const enemy in BATTLE.players) {
            total += BATTLE.players[enemy].defense
          }
//
          const enemy_defense = total /  BATTLE.players.length
          let DAMAGE_OUTPUT = (( DICE_ROLL * ((ATTACK_DAMAGE + WEAPON_DAMAGE)/1))+(enemy_defense/6) * FORCE_MULTIPLIER)

          if(movement_skipped === 0) DAMAGE_OUTPUT = 0

          for(enemy in BATTLE.players){
            BATTLE.players[enemy].health -= parseFloat(DAMAGE_OUTPUT.toFixed(0))
            if( BATTLE.players[enemy].health -= parseFloat(DAMAGE_OUTPUT.toFixed(0)) < 0) BATTLE.players[enemy].health = 0
          }
        }
      }
    })
  }

  const execute_MONSTER_attacks = () => {
    BATTLE.enemy_attacks.forEach(attack_id => {
      if(attack_id.attack_type !== 2) return
  
      let npc_id = -1
      const monster_index = BATTLE.monsters.findIndex(player => player.id == npc_id)

      let DICE_ROLL = attack_id.roll
      
      DICE_ROLL = DICE_ROLL + diff_obtainer(BATTLE.monsters[monster_index].strength)

      let FORCE_MULTIPLIER = 1
      let enemy_speed_skill = 0

      if(attack_id.objective_ids !== -1) {
        const enemy = BATTLE.players.findIndex(enemy => enemy.id == attack_id.objective_ids)
        enemy_speed_skill = BATTLE.players[enemy].agility
      } else {
        let total = 0
        for(const enemy in BATTLE.players) {
          total += enemy.agility
        }
        enemy_speed_skill = total /  BATTLE.players.length
      }

      const movement_skipped = skip_ability(enemy_speed_skill)

      let WEAPON_DAMAGE = BATTLE.monsters[monster_index].dexterity

      const ATTACK_DAMAGE = 100

      //TIME TO CALCULATE DAMAGE OUTPUT
      if(attack_id.objective_ids !== -1) {
        const enemy = BATTLE.players.findIndex(enemy => enemy.id == attack_id.objective_ids)

        let DAMAGE_OUTPUT = (( DICE_ROLL * ((ATTACK_DAMAGE + WEAPON_DAMAGE)/1))+(BATTLE.players[enemy].defense/6) * FORCE_MULTIPLIER)

        if(movement_skipped === 0) DAMAGE_OUTPUT = 0

        BATTLE.players[enemy].health -= parseFloat(DAMAGE_OUTPUT.toFixed(0))
      } else {
        let total = 0
        for(const enemy in BATTLE.players) {
          total += BATTLE.players[enemy].defense
        }

        const enemy_defense = total /  BATTLE.players.length
        let DAMAGE_OUTPUT = (( DICE_ROLL * ((ATTACK_DAMAGE + WEAPON_DAMAGE)/1))+(enemy_defense/6) * FORCE_MULTIPLIER)

        if(movement_skipped === 0) DAMAGE_OUTPUT = 0
        
        for(enemy in BATTLE.players){
          BATTLE.players[enemy].health -= parseFloat(DAMAGE_OUTPUT.toFixed(0))
        }
      }
      
    })
  }

  const check_if_players_are_dead = () => {
    if(BATTLE.players.length === 0) {
      console.log('?????')
      return true
    }

    let dead = true
    for(player in BATTLE.players) {
      if(BATTLE.players[player].health > 0) dead = false
    }

    console.log(dead)
    return dead
  }

  const check_if_enemies_are_dead = () => {
    if(BATTLE.npc_enemies.length === 0 && BATTLE.monsters.lenght === 0) {
      return true
    }

    let dead = true;

    for (let i = 0; i < BATTLE.npc_enemies.length; i++) {
      if (BATTLE.npc_enemies[i].health > 0) {
        dead = false;
        break;
      }
    }

    for (let i = 0; i < BATTLE.monsters.length; i++) {
      if (BATTLE.monsters[i].health > 0) {
        dead = false;
        break;
      }
    }

    return dead;
  }

  const cancel_battle = () => {
    TIMER_REPEATER = null //STOPS BATTLE

    for(player in BATTLE.players) {
      console.log('cancel battle')
      save_weapon(BATTLE.players[player].id)
      save_player(BATTLE.players[player].id)
    }
  }

  const finish_battle = () => {
    TIMER_REPEATER = null //STOPS BATTLE

    for(player in BATTLE.players) {
      console.log('finish battle')
      save_weapon(BATTLE.players[player].id)
      save_player(BATTLE.players[player].id)
    }

    for (let i = 0; i < BATTLE.monsters.length; i++) {
      const monster = BATTLE.monsters[i];
      const player = BATTLE.players[i % BATTLE.players.length];
      assign_lootTable_of_monster(monster.id, player.id);
    }

    for (let i = 0; i < BATTLE.npc_enemies.length; i++) {
      const npc = BATTLE.npc_enemies[i];
      const player = BATTLE.players[i % BATTLE.players.length];
      assign_lootTable_of_enemy_npc(npc.id, player.id);

      const randomIndex = Math.floor(Math.random() * BATTLE.players.length);

      give_enemy_weapons(BATTLE.npc_enemies[i].weapon_id, BATTLE.players[randomIndex].id)
      give_enemy_armor(BATTLE.npc_enemies[i].armor_id, BATTLE.players[randomIndex].id)
    }
  }

  const diff_obtainer = (skill) => {
    if(skill === 20){
      return 5
    } else if(skill < 20 && skill >= 18) {
      return 4
    } else if(skill < 18 && skill >= 16) {
      return 3
    } else if(skill < 16 && skill >= 14) {
      return 2
    } else if(skill < 14 && skill >= 12) {
      return 1
    } else if(skill < 12 && skill >= 10) {
      return 0
    } else if(skill < 10 && skill >= 8) {
      return -1
    } else if(skill < 8 && skill >= 6) {
      return -2
    } else if(skill < 6 && skill >= 4) {
      return -3
    } else if(skill < 4 && skill >= 2) {
      return -4
    } else {
      return -5
    }
  }

  const skip_ability = (skill) => {
    const probability = (skill - 1) * (50 / 19);
    const random = Math.random() * 100;  
    return random < probability ? 0 : 1;
  }

  const save_weapon = async (player_id) => {
    const player = BATTLE.players.find(player => parseInt(player.id) === parseInt(player_id))
    
    const weapon_data = {
      durability: player.inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.durability
    }

    await prisma.weapon.update({
      data: weapon_data,
      where:{
        id: player.inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.id
      }
    })
  }

  const save_player = async (player_id) => {
    const player_index = BATTLE.players.findIndex(player => parseInt(player.id) === parseInt(player_id))
    const player = BATTLE.players.find(player => parseInt(player.id) === parseInt(player_id))

    const player_data = {
      armor_id: player.armor_id,
      weapon_id: player.weapon_id,
      health: player.health,
      dungeon_max_health: player.dungeon_max_health
    }

    await prisma.playable_character.update({
      data: player_data,
      where: {
        id: parseInt(player_id)
      }
    })

    for(let i = 0; i < player.attacks.length; i++) {
      await prisma.attacks.update({
        data:{
          uses: player.attacks[i].uses
        }, where :{
          id: player.attacks[i].id
        }
      })
    }

    BATTLE.players.splice(player_index, 1)
  }

  const swap_weapon = (player_id, new_weapon_id) => {
    //inventory_weapon_inventory_weapon_id_userToplayable_character // ACCESS TO INVENTORY
    const old_weapon_id = BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon.weapon.id

    const player_index = BATTLE.players.findIndex(player => parseInt(player.id) === parseInt(player_id))
    const weapon_index = BATTLE.players[player_index].inventory_weapon_inventory_weapon_id_userToplayable_character.findIndex(weapon => parseInt(weapon.id_weapon) === parseInt(new_weapon_id))
    const old_weapon_index = BATTLE.players[player_index].inventory_weapon_inventory_weapon_id_userToplayable_character.findIndex (weapon => parseInt(weapon.id_weapon) === parseInt(old_weapon_id))

    let temp =  BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon

    BATTLE.players[player_index].inventory_weapon_playable_character_weapon_idToinventory_weapon = BATTLE.players[player_index].inventory_weapon_inventory_weapon_id_userToplayable_character[weapon_index]
    BATTLE.players[player_index].inventory_weapon_inventory_weapon_id_userToplayable_character[old_weapon_index] = temp

  }

  const assign_lootTable_of_monster = async(id_monster, id_player) => {
    const monster = BATTLE.monsters.find(monster => parseInt(monster.id) === parseInt(id_monster))

    const called_player = await prisma.playable_character.findFirst({
      where:{
        id:parseInt(id_player)
      }, include:{
        inventory:true
      }
    })

    for(const loot in monster.loottables){
      const object_index = called_player.inventory.find(object => object.id_object === parseInt(loot.id_object))

      if(object_index) {
        await prisma.inventory.update({
          where:{
            id: object_index.id
          }, data:{
            quantity: parseInt(object_index.quantity) + loot.amount
          }
        })
      } else {
        await prisma.inventory.create({
          data:{
            id_playable_character: parseInt(id_player),
            id_object:parseInt(loot.id_object),
            quantity: loot.amount
          }
        })
      }
    }
  }

  const assign_lootTable_of_enemy_npc = async(id_npc, id_player) => {
    const npc = BATTLE.npc_enemies.find(npc => parseInt(npc.id) === parseInt(id_npc))

    const called_player = await prisma.playable_character.findFirst({
      where:{
        id:parseInt(id_player)
      }, include:{
        inventory:true
      }
    })

    for(const loot in npc.loottables){
      const object_index = called_player.inventory.find(object => parseInt(object.id_object) === parseInt(loot.id_object))

      if(object_index) {
        await prisma.inventory.update({
          where:{
            id: object_index.id
          }, data:{
            quantity: parseInt(object_index.quantity) + loot.amount
          }
        })
      } else {
        await prisma.inventory.create({
          data:{
            id_playable_character: parseInt(id_player),
            id_object:parseInt(loot.id_object),
            quantity: loot.amount
          }
        })
      }
    }
  }

  const give_enemy_weapons = async(id_weapon, id_player) => {
    const find_weapon = await prisma.inventory_weapon.findFirst({
      where:{
        id_weapon: parseInt(id_weapon)
      }
    })

    if(!find_weapon){
      await prisma.inventory_weapon.create({
        data:{
          id_user:parseInt(id_player),
          id_weapon:parseInt(id_weapon),
          level:1
        }
      })
    }
  }

  const give_enemy_armor = async(id_armor, id_player) => {
    const find_armor = await prisma.inventory_armor.findFirst({
      where:{
        id_armor: parseInt(id_armor)
      }
    })

    if(!find_armor){
      await prisma.inventory_armor.create({
        data:{
          id_user:parseInt(id_player),
          id_armor:parseInt(id_armor),
          level:1
        }
      })
    }
  }
}

module.exports.fight_engine = fight_engine