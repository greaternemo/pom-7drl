//POM.ActEngine

POM.ActEngine = function(params) {
    this.mobList = params.mobList;
    this.actingMob = null;
    
    
}

POM.ActEngine.prototype.handleTurn = function(actor) {
    this.actingMob = actor;
    this.compel(actor);
    // do cleanup stuff here? idk
};

POM.ActEngine.prototype.compel = function(actor) {
    switch (actor.kind) {
        case "player":
            this.compelPlayer(actor);
            // other stuff??
            break;
        case "zombie":
            this.compelZombie(actor);
            break;
        
    }
};

POM.ActEngine.prototype.compelPlayer = function(actor) {
    
};

POM.ActEngine.prototype.compelZombie = function(actor) {
    
};