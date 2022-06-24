class Player{
    constructor(pClass, Cps, Cpc, pAtk, pDef, pSpd, Hp, atkMult, pRegen, gold){
        //cps = coins/s, cpc = coins/click, P denotes player, Pregen = hp regen
        this.pClass = pClass;
        this.Cpc = Cpc;
        this.Cps = Cps;
        this.pAtk = pAtk;
        this.pDef = pDef;
        this.pSpd = pSpd;
        this.Hp = Hp;
        this.atkMult = atkMult;
        this.pRegen = pRegen;
        this.gold = gold;
    }
    takeDmg(dmgAmt) {
        this.Hp -= dmgAmt*this.pDef;
    }
    dealDmg(Enemy){
        Enemy.takeDmg(this.pAtk * this.dmgMult)
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
            Player
        }
    }
}