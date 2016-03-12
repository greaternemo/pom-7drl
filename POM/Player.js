// POM.Player

POM.Player = function(params) {
    this.mob = null;
    this.kind = null;
    this.class = null;
    this.memory = null;
    this.journey = null;
    this.fragments = null;
    
    this.init(params);
}

POM.Player.prototype.init = function(params) {
    // there should be nothing in params right now, ignore it
    this.kind = this.randomKind();
    this.class = this.randomClass();
    
    this.journey = POM.BASE.player.journey[POM.BASE.player.start];
    
    this.mob = new POM.Mob({
        kind: this.kind,
        locX: POM.BASE.player.locX,
        locY: POM.BASE.player.locY,
        roomX: POM.BASE.player.roomX,
        roomY: POM.BASE.player.roomY,
    });
    
    this.mob.class = this.class;
};

POM.Player.prototype.randomKind = function() {
    return POM.UTIL.randUniqSetFromArray(POM.BASE.player.kinds, 1)[0];
};

POM.Player.prototype.randomClass = function() {
    return POM.UTIL.randUniqSetFromArray(POM.BASE.player.classes, 1)[0];
};

POM.Player.prototype.registerMemory = function(memory) {
    this.memory = memory;
};



