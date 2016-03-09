// POM.Mob

POM.Mob = function(params) {
    this.kind = null;
    this.sprite = null;
    this.locX = null;
    this.locY = null;
    this.sheet = null;
    
    this.init(params);
    
}

POM.Mob.prototype.init = function(params) {
    this.kind = params.kind;
    this.sprite = POM.BASE.sprites.play.mobs[params.kind];
    this.locX = params.locX;
    this.locY = params.locY;
    this.sheet = POM.BASE.sheets.play.mobs.allMobs;
};