const classes = {
    warrior: { atk: 8, def: 4, spd: 3, hp: 20, mult: 1.25, regen: 3 }
}
const enemies = {
    bat: { hp: 5, atk: 1, def: 0, spd: 2, reward: 10 }
}
class Player {
    constructor(pClass, Cps, Cpc, gold) {
        //cps = coins/s, cpc = coins/click 
        this.pClass = pClass;
        this.Cpc = Cpc;
        this.Cps = Cps;
        this.Atk = classes.warrior.atk;
        this.Def = classes.warrior.def;
        this.Spd = classes.warrior.spd;
        this.Hp = classes.warrior.hp;
        this.maxHp = classes.warrior.hp;
        this.atkMult = classes.warrior.mult;
        this.gold = gold;
        this.regen = classes.warrior.regen;
        this.inBattle = 0;
        this.atkCharge = 0;
    }
    takeDmg(dmgAmt) {
        this.Hp -= dmgAmt * this.Def;
    }
    dealDmg(Enemy) {
        Enemy.takeDmg(this.Atk * this.dmgMult)
    }
    startBattle() {
        this.inBattle = 1
    }
    endBattle() {
        this.inBattle = 0
    }
    addRegen(amt, type) {
        if (type = "potion") {
            duration = (typeof duration === "undefined") ? null : duration
            this.regen += amt
            setTimeout(this.addDef, duration * 1000, [amt * -1, "potion"])
            return
        }
        if (type = "armour") {
            this.regen += amt
        }
    }
    addHp(amt, type, duration) {
        duration = (typeof duration === "undefined") ? null : duration
        if (type = "potion") {
            this.Hp += amt
            setTimeout(this.addDef, duration * 1000, [amt * -1, "potion"])
            return
        }
        if (type = "armour") {
            this.maxHp += amt
        }
    }
    addDef(amt, type, duration) {
        duration = (typeof duration === "undefined") ? null : duration
        if (type = "potion") {
            this.Def += amt
            setTimeout(this.addDef, duration * 1000, [amt * -1, "potion"])
            return
        }
        if (type = "armour") {
            this.Def += amt
        }
    }
    changeArmour(stats) {
        this.addRegen(stats.regen, "armour")
        this.addDef(stats.def, "armour")
        this.add
    }
    getReward(amt) {
        this.gold += amt
    }
}
class Enemy {
    constructor(enemyType) {
        this.Atk = enemies.enemyType.atk;
        this.Def = enemies.enemyType.def;
        this.Hp = enemies.enemyType.hp;
        this.Reward = enemies.enemyType.reward;
        this.Spd = enemies.enemyType.spd;
        this.atkCharge = 0;
    }
    takeDmg(Player) {
        this.Hp -= Player.Atk * Player.atkMult * this.Def;
        if (this.eHp <= 0) {
            Player.getReward(this.Reward)
            Player.endBattle()
        }
    }
    dealDmg(Player) {
        Player.takeDmg(this.Atk)
    }
}


const player = new Player(warrior, 1, 5, 0)

function beginBattle(Player, Enemy) {
    Player.startBattle()
    if (Player.inBattle == 1) {
        setTimeout(battleTurn, 500, [Player, Enemy])
    }
}

function battleTurn(Player, Enemy) {
    Player.atkCharge++
        Enemy.atkCharge++
        if (Player.atkCharge <= Player.Spd) {
            Player.dealDmg(Enemy)
        }
    if (Enemy.atkCharge <= Enemy.Spd) {
        Enemy.dealDmg(Player)
    }

}

function updateUI() {
    document.querySelector(".hpUI").innerHTML = player.Hp + "/" + player.maxHp
    document.querySelector(".atkUI").innerHTML = player.Atk
}
setInterval(updateUI, 1000)

document.querySelector("#battleInit").addEventListener("click", updateUI(player, new Enemy("bat")))