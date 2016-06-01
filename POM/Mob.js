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
    this.class = POM.BASE.mobs[this.kind].class;
    this.avatar = this.randomAvatar(this.kind);
    this.sprite = POM.BASE.sprites.play.mobs[this.avatar];
    this.agent = POM.BASE.mobs[this.kind].agent;
    
    this.damage = POM.BASE.mobs[this.kind].damage;
    this.hpCur = POM.BASE.mobs[this.kind].hpCur;
    this.hpMax = POM.BASE.mobs[this.kind].hpMax;
    this.turnSpeed = POM.BASE.mobs[this.kind].turnSpeed;
    this.turnWait = POM.BASE.mobs[this.kind].turnWait;
    this.items.slotA = POM.BASE.mobs[this.kind].items.slotA;
    this.items.slotB = POM.BASE.mobs[this.kind].items.slotB;
    
    this.locX = params.locX;
    this.locY = params.locY;
    this.roomX = params.roomX;
    this.roomY = params.roomY;
    this.sheet = POM.BASE.sheets.play.mobs.allMobs;
};

POM.Mob.prototype.randomAvatar = function(kind) {
    return POM.UTIL.randUniqSetFromArray(POM.BASE.mobs.avatars[kind], 1)[0];
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
};

POM.Mob.prototype.loseItem = function(slot) {
    if (slot) {
        this.items[slot] = null;
    }
    //else {
    //    this.items.slotA = null;
    //    this.items.slotB = null;
    //}
};

// Mob.loseAll will accept an iten.kind value and remove all items of that kind
// from the mob's inventory. Returns the number of items lost.

POM.Mob.prototype.loseAll = function(kind) {
    var holding = this.held(kind);
    var slot = null;
    var lost = 0;
    while (holding.length > 0) {
        slot = holding.pop();
        this.loseItem(slot);
        lost++;
    }
    return lost;
};

// Mob.held will accept an item.kind value and return an array containing each
// slot that contains that kind of item.

POM.Mob.prototype.held = function(kind) {
    var slots = ['slotA', 'slotB'];
    var hand = null;
    var output = [];
    while (slots.length > 0) {
        hand = slots.pop();
        if (this.items[hand]) {
            if (this.items[hand].kind == kind) {
                output.push(hand);
            }
        }
    }
    //for (var cnt = 0; cnt < slots.length; cnt += 1) {
    //    if (this.items[slots[cnt]].kind == kind) {
    //        output.push(slots[cnt]);
    //    }
    //}
    return output;
};

// Moves the mob to a new location. Accepts arguments in the form:
// {x: 12345, y: 12345}
POM.Mob.prototype.moveTo = function(newloc) {
    this.locX = newloc.x;
    this.locY = newloc.y;
};







