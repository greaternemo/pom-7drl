// POM.Mob

POM.Mob = function(params) {
    this.kind = null;
    this.class = null;
    this.avatar = null;
    this.sprite = null;
    this.agent = null;
    
    this.damage = null;
    this.hpCur = null;
    this.hpMax = null;
    this.turnSpeed = null;
    this.turnWait = null;
    this.items = {
        slotA: null,
        slotB: null,
    }
    
    this.locX = null;
    this.locY = null;
    this.inDoor = null;
    this.roomX = null;
    this.roomY = null;
    this.sheet = null;
    
    this.init(params);
}

POM.Mob.prototype.init = function(params) {
    this.kind = params.kind;
    this.class = POM.BASE.mobs[params.kind].class;
    this.avatar = params.avatar;
    this.sprite = POM.BASE.sprites.play.mobs[params.avatar];
    this.agent = POM.BASE.mobs[params.kind].agent;
    
    this.damage = POM.BASE.mobs[params.kind].damage;
    this.hpCur = POM.BASE.mobs[params.kind].hpCur;
    this.hpMax = POM.BASE.mobs[params.kind].hpMax;
    this.turnSpeed = POM.BASE.mobs[params.kind].turnSpeed;
    this.turnWait = POM.BASE.mobs[params.kind].turnWait;
    this.items.slotA = POM.BASE.mobs[params.kind].items.slotA;
    this.items.slotB = POM.BASE.mobs[params.kind].items.slotB;
    
    this.locX = params.locX;
    this.locY = params.locY;
    this.roomX = params.roomX;
    this.roomY = params.roomY;
    this.sheet = POM.BASE.sheets.play.mobs.allMobs;
};

POM.Mob.prototype.getHit = function(damage) {
    var dmg = null;
    (damage) ? (dmg = damage) : (dmg = 1);
    this.hpCur -= dmg;
};

POM.Mob.prototype.getHealed = function(damage) {
    var dmg = null;
    (damage) ? (dmg = damage) : (dmg = 1);
    (this.hpCur < this.hpMax) ? (this.hpCur += dmg) : (null) ;
};

POM.Mob.prototype.takeItem = function(item) {
    var GEng = POM.gameEngine;
    var outcome = null;
    if (this.items.slotA == null) {
        this.items.slotA = item;
        outcome = true;
    }
    else if (this.items.slotB == null) {
        this.items.slotB = item;
        outcome = true;
    }
    else {
        // hands are full
        if (this.kind == 'player') {
            GEng.logMessage("Your hands are too full to take the " + item.kind + ".");
        }
        outcome = false;
    }
    
    if (outcome === true) {
        var whodis = "";
        (this.kind == 'player') ? (whodis = 'You pick') : (whodis = 'The ' + this.kind + ' picks');
        GEng.logMessage(whodis + " up the " + item.kind + ".");
        GEng.destroyItem(item);
    }
    return outcome;
}






