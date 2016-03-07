// POM.GameEngine

POM.GameEngine = function(params) {
    this.scheduler = params.scheduler;
    this.aEngine = params.aEngine;
    this.vEngine = params.vEngine;
    // We are waiting by default since the game doesn't open directly to the game itself.
    this.waiting = true;
    this.actor = null;
}

POM.GameEngine.prototype.start = function() {
    return this.on();
};

POM.GameEngine.prototype.stop = function() {
    return this.off();
};

POM.GameEngine.prototype.on = function() {
    if (this.waiting === false) {
        console.log("Tried to switch on GameEngine while it wasn't waiting");
    }
    
    this.waiting = false;
    
    while (this.waiting === false) {
        this.actor = this.scheduler.nextTurn();
        this.aEngine.handleTurn(this.actor);
        this.vEngine.handleTurn();
    }
};

POM.GameEngine.prototype.off = function() {
    this.waiting = true;
};
