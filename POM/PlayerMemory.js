// POM.PlayerMemory

POM.PlayerMemory = function(params) {
    this.rooms = [];
    this.player = null;
    this.floor = null;
    
    this.init(params);
}

POM.PlayerMemory.prototype.init = function(params) {
    this.player = params.player;
    this.floor = params.floor;
    // YOU HAVE TO ADD THE STARTING ROOM TO THE ROOMS ARRAY
    this.rooms.unshift(this.floor.nodeMap[this.player.roomX][this.player.roomY]);
};

POM.PlayerMemory.prototype.enterRoom = function(params) {
    var nodeX = params.nodeX;
    var nodeY = params.nodeY;
    var mIndex = null;
    
    for (mIndex = 0; mIndex < this.rooms.length; mIndex += 1) {
        if (nodeX == this.rooms[mIndex].nodeX && nodeY == this.rooms[mIndex].nodeY) {
            // if we still remember this room, move it to index 0
            var oldRoom = this.rooms.splice(mIndex, 1);
            this.rooms.unshift(oldRoom[0]);
            mIndex = 'found';
            break;
        }
    }
    
    if (mIndex != 'found') {
        // if we don't remember it, we know it now and forget one if necessary
        this.rooms.unshift(this.floor.nodeMap[nodeX][nodeY]);
        this.checkMemory();
    }
}

POM.PlayerMemory.prototype.checkMemory = function(params) {
    while (this.rooms.length > this.player.hpCur) {
        // bye felicia
        var forgotten = this.rooms.pop();
        this.forget(forgotten);
    }
}

POM.PlayerMemory.prototype.forget = function(room) {
    // bye felicia
    var fx = room.nodeX;
    var fy = room.nodeY;
    if (this.floor.deadEnd == this.floor.nodeMap[fx][fy]) {
        this.floor.deadEnd = false;
    }
    
    // any mobs or items in the room are despawned
    while (room.mobList.length > 0) {
        POM.gameEngine.destroyMob(room.mobList[0]);
    }
    while (room.itemList.length > 0) {
        POM.gameEngine.destroyItem(room.itemList[0]);
    }
    
    this.floor.nodeMap[fx][fy] = new POM.Room({
        nodeX: fx,
        nodeY: fy,
    })
}
