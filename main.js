const classes = {
    warrior: { atk: 8, def: 0.8, spd: 3, hp: 20, mult: 1.25, regen: 3 }
}
const enemies = {
    bat: { hp: 5, atk: 1, def: 1.5, spd: 2, reward: 10 },
    ent: { hp: 50, atk: 2, def: 0.9, spd: 5, reward: 100 }
}
class Player {
    constructor(pClass, Cps, Cpc, gold) {
        //cps = coins/s, cpc = coins/click 
        this.pClass = pClass;
        this.Cpc = Cpc;
        this.Cps = Cps;
        this.Atk = classes[pClass].atk;
        this.Def = classes[pClass].def;
        this.Spd = classes[pClass].spd;
        this.Hp = classes[pClass].hp;
        this.maxHp = classes[pClass].hp;
        this.atkMult = classes[pClass].mult;
        this.gold = gold;
        this.regen = classes[pClass].regen;
        this.inBattle = 0;
        this.atkCharge = 0;
    }
    takeDmg(dmgAmt) {
        this.Hp -= dmgAmt * this.Def;
        if (this.Hp <= 0) {
            this.endBattle()
        }
    }
    dealDmg(Enemy) {
        Enemy.takeDmg(this)
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
        this.Atk = enemies[enemyType].atk;
        this.Def = enemies[enemyType].def;
        this.Hp = enemies[enemyType].hp;
        this.Reward = enemies[enemyType].reward;
        this.Spd = enemies[enemyType].spd;
        this.atkCharge = 0;
    }
    takeDmg(Player) {
        this.Hp -= Player.Atk * Player.atkMult * this.Def;
        if (this.Hp <= 0) {
            Player.getReward(this.Reward)
            Player.endBattle()
        }
    }
    dealDmg(Player) {
        Player.takeDmg(this.Atk)
    }
    resetCharge() {
        this.atkCharge = 0;
    }
}


const player = new Player("warrior", 1, 5, 0)

function beginBattle(Player, Enemy) {
    Player.startBattle()
    if (Player.inBattle == 1) {
        setTimeout(() => battleTurn(Player, Enemy), 500)
    }
}
var currEnemy

function battleTurn(Player, Enemy) {
    currentStage = 0
    currEnemy = Enemy
    console.log(Enemy)
    console.log(Player)
    if (Player.inBattle) {
        Player.atkCharge += 1;
        if (Player.atkCharge >= Player.Spd) {
            Player.atkCharge = 0;
            Player.dealDmg(Enemy)
        }
        Enemy.atkCharge += 1;
        if (Enemy.atkCharge >= Enemy.Spd) {
            Enemy.resetCharge()
            Enemy.dealDmg(Player)
        }
        return setTimeout(() => battleTurn(Player, Enemy), 500)
    }

}

currentStage = 0

function updateUI() {
    document.querySelector("#hpUI").innerHTML = "Hp: " + Math.floor(player.Hp) + "/" + player.maxHp
    document.querySelector("#atkUI").innerHTML = "Atk: " + player.Atk
    if (player.inBattle) {

        document.querySelector("#colours").setAttribute("height", 15)
        document.querySelector("#eHp").innerHTML = Math.floor(currEnemy.Hp)
        document.querySelector("#colours").setAttribute("width", 500 - currentStage)
        currentStage += 10
        console.log(document.querySelector("#colours").getAttribute("width"))
        return
    }
    document.querySelector("#colours").setAttribute("height", 0)
}



updateUI()
setInterval(updateUI, 10)

var test;

function exampleBattle() {
    test = new Enemy("ent")
    beginBattle(player, test)
}
//document.getElementById("battleInit").addEventListener("click", beginBattle(player, new Enemy("bat")))