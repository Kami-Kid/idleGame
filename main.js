const classes = {
    warrior : {atk: 8, def:4, spd:3, hp:20, mult:1.25, regen:3}
}
class Player{
    constructor(pClass, Cps, Cpc, pAtk, pDef, pSpd, Hp, maxHp, atkMult, gold, regen){
        //cps = coins/s, cpc = coins/click, P denotes player, 
        this.pClass = pClass;
        this.Cpc = Cpc;
        this.Cps = Cps;
        this.pAtk = classes.warrior.atk;
        this.pDef = classes.warrior.def;
        this.pSpd = classes.warrior.spd;
        this.Hp = classes.warrior.hp;
        this.maxHp = classes.warrior.hp;
        this.atkMult = classes.warrior.mult;
        this.gold = gold;
        this.regen = classes.warrior.regen;
        this.inBattle = 0;
    }
    takeDmg(dmgAmt) {
        this.Hp -= dmgAmt*this.pDef;
    }
    dealDmg(Enemy){
        Enemy.takeDmg(this.pAtk * this.dmgMult)
    }
    startBattle(){
        this.inBattle = 1
    }
    endBattle(){
        this.inBattle = 0
    }
    addRegen(amt,type){
        if(type = "potion"){
            this.regen+=amt
            return
        }
        if(type = "armour"){
            this.permRegen += amt
        }
    }
    addHp(amt, type, duration){
        if(type = "potion"){
            this.Hp+=amt
            return
        }
        if(type = "armour"){
            this.maxHp += amt
        }
    }
    addDef(amt, type, duration){
        duration = (typeof duration ==="undefined") ? null : duration
        if(type = "potion"){
            this.pDef+=amt
            setTimeout(this.addDef, duration*1000, [amt*-1, "potion"])
            return
        }
        if(type = "armour"){
            this.pDef += amt
        }
    }
    changeArmour(stats){
        this.addRegen(stats.regen, "armour")
        this.addDef(stats.def, "armour")
        this.add
    }
}
class Enemy{
    constructor(eHp, eAtk, eDef, eSpd, eReward){
        this.eAtk = eAtk;
        this.eDef = eDef;
        this.eHp = eHp;
        this.eReward = eReward;
        this.eSpd = eSpd;
    }
    takeDmg(Player){
        this.eHp -= Player.pAtk*Player.atkMult*this.eDef;
        if(this.eHp <= 0){
            Player.getReward(this.eReward)
            Player.endBattle()
        }
    }
}


const player = new Player("warrior", 1,10,)