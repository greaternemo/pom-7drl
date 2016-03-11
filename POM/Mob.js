// POM.Mob

POM.Mob = function(params) {
    this.kind = null;
    this.class = null;
    this.sprite = null;
    this.agent = null;
    
    this.damage = null;
    this.health = null;
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
    this.sprite = POM.BASE.sprites.play.mobs[params.kind];
    this.agent = POM.BASE.mobs[params.kind].agent;
    
    this.damage = POM.BASE.mobs[params.kind].damage;
    this.health = POM.BASE.mobs[params.kind].health;
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