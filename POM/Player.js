// POM.Player

POM.Player = function(params) {
    this.mob = null;
    this.avatar = null;
    this.class = null;
    this.memory = null;
    this.journey = null;
    this.prog = null;
    this.rings = {
        have: [],
        need: ['s1', 's2', 's3', 'l1', 'l2', 'l3', 'l4', 'l5', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'],
    };
    this.flags = [];
    this.waitLeft = null;
    
    this.init(params);
}

POM.Player.prototype.init = function(params) {
    // there should be nothing in params right now, ignore it
    this.avatar = this.randomAvatar();
    this.class = this.randomClass();
    
    this.journey = POM.BASE.player.journey[POM.BASE.player.start];
    
    this.mob = new POM.Mob({
        kind: 'player',
        avatar: this.avatar,
        locX: POM.BASE.player.locX,
        locY: POM.BASE.player.locY,
        roomX: POM.BASE.player.roomX,
        roomY: POM.BASE.player.roomY,
    });
    
    this.mob.class = this.class;
};

POM.Player.prototype.randomAvatar = function() {
    return POM.UTIL.randUniqSetFromArray(POM.BASE.player.avatars, 1)[0];
};

POM.Player.prototype.randomClass = function() {
    return POM.UTIL.randUniqSetFromArray(POM.BASE.player.classes, 1)[0];
};

POM.Player.prototype.registerMemory = function(memory) {
    this.memory = memory;
};



