// POM.Scheduler

POM.Scheduler = function(params) {
    this.counter = 0;
    this.mobList = null;
    this.nextMob = false;
}

POM.Scheduler.prototype.registerMobList = function(mobList) {
    this.mobList = mobList;
};

// this is called when mobs die, obv
POM.Scheduler.prototype.mourn = function() {
    this.counter -= 1;
}

POM.Scheduler.prototype.nextTurn = function() {
    this.nextMob = false;
    this.getNextMob();
    return this.nextMob;
};

POM.Scheduler.prototype.getNextMob = function() {
    var len = this.mobList.length;
    
    while (this.nextMob === false) {
        // reset the counter if necessary
        if (this.counter == len) {
            this.counter = 0;
        }
        
        // increment the mob's wait value by its speed
        this.mobList[this.counter].turnWait += this.mobList[this.counter].turnSpeed;
        
        // if this mob is ready, clean up and send them back
        if (this.mobList[this.counter].turnWait >= 30) {
            this.mobList[this.counter].turnWait -= 30;
            this.nextMob = this.mobList[this.counter];
        }
        
        // always increment the counter
        this.counter += 1;
    }
};