class Player{
    constructor(pClass, Cps, Cpc, pAtk, pDef, pSpd, Hp, maxHp, atkMult, gold, regen){
        //cps = coins/s, cpc = coins/click, P denotes player, 
        this.pClass = pClass;
        this.Cpc = Cpc;
        this.Cps = Cps;
        this.pAtk = pAtk;
        this.pDef = pDef;
        this.pSpd = pSpd;
        this.Hp = Hp;
        this.maxHp = maxHp
        this.atkMult = atkMult;
        this.gold = gold;
        this.regen = regen;
        this.permRegen  = regen;
    }
    takeDmg(dmgAmt) {
        this.Hp -= dmgAmt*this.pDef;
    }
    dealDmg(Enemy){
        Enemy.takeDmg(this.pAtk * this.dmgMult)
    }
    startBattle(){
        this.regen = 0.5
    }
    endBattle(){
        this.regen = this.permRegen
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
    addHp(){
        if(type = "potion"){
            this.Hp+=amt
            return
        }
        if(type = "armour"){
            this.maxHp += amt
        }
    }
    addHp(){
        if(type = "potion"){
            this.pDef+=amt
            return
        }
        if(type = "armour"){
            this.pDef += amt
        }
    }
    changeArmour(stats){
        this.addRegen(stats.regen, "armour")
        this.def
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