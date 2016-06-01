// POM.GameEngine

POM.GameEngine = function(params) {
    this.scheduler = null;
    this.AEng = null;
    this.VEng = null;
    
    // Gonna keep state data in here, etc
    this.msgLog = ["","","","","","","","","",""];
    this.msgLogState = 'filthy';
    this.activeFloor = null;
    this.activeFloorState = 'filthy';
    this.activeRoom = null;
    this.activeRoomState = 'filthy';
    this.player = null;
    this.playerState = 'filthy';
    this.gameOver = false;
    this.gameWon = false;
    
    this.itemList = [];
    this.mobList = [];
    
    // We are waiting by default since the game doesn't open directly to the game itself.
    this.waiting = true;
    this.delay = null;
    this.actor = null;
}

POM.GameEngine.prototype.registerEngines = function() {
    this.AEng = POM.actEngine;
    this.VEng = POM.viewEngine;
};

POM.GameEngine.prototype.registerScheduler = function(sched) {
    this.scheduler = sched;
    this.scheduler.registerMobList(this.mobList);
};

POM.GameEngine.prototype.registerPlayer = function(player) {
    if (!player) {
        this.player = this.createPlayer();
    }
    else {
        this.player = player;
    }
    
    //this.activeFloor.activeSheet = POM.BASE.player.journey;
    
    if (this.player.memory == null) {
        this.player.registerMemory(new POM.PlayerMemory({
            player: this.player.mob,
            floor: this.activeFloor,
        }))
    }
    this.registerMob(this.player.mob);
}

POM.GameEngine.prototype.createPlayer = function() {
    return new POM.Player();
};

POM.GameEngine.prototype.registerMob = function(mob) {
    this.mobList.push(mob);
    this.updateMobLists();
};

POM.GameEngine.prototype.destroyMob = function(mob) {
    // rip in procgen
    var tag = null;
    var bag = null;
    
    tag = this.mobList.indexOf(mob);
    bag = this.mobList.splice(tag, 1);
    
    this.scheduler.mourn();
    this.updateMobLists();
};

POM.GameEngine.prototype.updateMobLists = function() {
    var index = null;
    var dx = null;
    var dy = null;
    
    // first clear out all the local mobLists
    for (dx = 0; dx < this.activeFloor.nWidth; dx += 1) {
        for (dy = 0; dy < this.activeFloor.nHeight; dy += 1) {
            this.activeFloor.nodeMap[dx][dy].mobList = [];
        }
    }
    
    for (index = 0; index < this.mobList.length; index += 1) {
        dx = this.mobList[index].roomX;
        dy = this.mobList[index].roomY;
        this.activeFloor.nodeMap[dx][dy].mobList.push(this.mobList[index]);
    }
};

// registerItem is used to place a new item on the floor of the dungeon
POM.GameEngine.prototype.registerItem = function(item) {
    this.itemList.push(item);
    this.updateItemLists();
};

// destroyItem is used whenever an item is picked up or despawned
POM.GameEngine.prototype.destroyItem = function(item) {
    // rip in procgen
    var tag = null;
    var bag = null;
    
    tag = this.itemList.indexOf(item);
    bag = this.itemList.splice(tag, 1);
    
    this.updateItemLists();
};

// destroy

// updateItemLists clears and then regenerates all the local itemLists.
// all items on the floor of the dungeon reside in the global itemList
// and each room's local itemList holds the items on the floor of that room.
POM.GameEngine.prototype.updateItemLists = function() {
    var index = null;
    var dx = null;
    var dy = null;
    
    // first clear out all the local itemLists
    for (dx = 0; dx < this.activeFloor.nWidth; dx += 1) {
        for (dy = 0; dy < this.activeFloor.nHeight; dy += 1) {
            this.activeFloor.nodeMap[dx][dy].itemList = [];
        }
    }
    
    for (index = 0; index < this.itemList.length; index += 1) {
        dx = this.itemList[index].roomX;
        dy = this.itemList[index].roomY;
        this.activeFloor.nodeMap[dx][dy].itemList.push(this.itemList[index]);
    }
};

POM.GameEngine.prototype.registerActiveFloor = function(floor) {
    if (this.activeFloor != null) {
        this.activeFloor.active = false;
    }
    this.activeFloor = floor;
    this.activeFloor.active = true;
    this.activeFloorState = 'filthy';
};

POM.GameEngine.prototype.registerActiveRoom = function(room) {
    if (this.activeRoom != null) {
        this.activeRoom.active = false;
        this.activeRoom.known = 'known';
    }
    this.activeRoom = room;
    this.activeRoom.active = true;
    this.activeRoom.known = 'active';
    this.activeRoomState = 'filthy';
    this.scheduler.registerActiveRoom(this.activeRoom);
    this.updateMobLists();
};

POM.GameEngine.prototype.logMessage = function(msg) {
    this.msgLog.push(msg);
    this.msgLog.shift();
    this.msgLogState = 'filthy';
};

POM.GameEngine.prototype.playerDeath = function() {
    this.gameOver = true;
}

POM.GameEngine.prototype.start = function() {
    this.chill = setTimeout(this.on.bind(this), 50);
};

POM.GameEngine.prototype.stop = function() {
    return this.off();
};

POM.GameEngine.prototype.on = function() {
    if (this.waiting === false) {
        console.log("Tried to switch on GameEngine while it wasn't waiting");
    }
    
    if (this.chill != null) {
        clearTimeout(this.chill);
        this.chill = null;
    }
    
    this.waiting = false;
    
    while (this.waiting === false) {
        this.actor = this.scheduler.nextTurn();
        this.AEng.handleTurn(this.actor);
        //this.VEng.drawFrame();
    }
    //if (this.gameOver === true) {
    //    this.vEng.animateDeath();
    //    this.waiting = true;
    //}
    //if (this.gameWon === true) {
    //    this.waiting = true;
    //}
};

POM.GameEngine.prototype.off = function() {
    this.waiting = true;
};
