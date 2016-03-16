// POM.Room

POM.Room = function(params) {
    this.tileMap = null;
    this.sheet = null;
    this.nodeX = null;
    this.nodeY = null;
    this.tWidth = null;
    this.tHeight = null;
    this.active = false;
    this.deadEnd = false;
    
    // local lists of items and mobs for drawing
    this.itemList = [];
    this.mobList = [];
    
    // state of the room for minimap
    // for a void room, this.known should be 'void'
    // for the active room, it should be 'active'
    // for an explored nonvoid room it should be 'known'
    // we're going to fuck with it for now for testing tho
    // this.known = 'void'
    this.known = 'void';
    
    // I wish I had an enum for this.
    // Valid values for sides are:
    // 'void' for null rooms
    // 'wall' for walls
    // 'door' for closed doors
    // 'open' for open doors
    this.sides = {
        N: 'void',
        E: 'void',
        S: 'void',
        W: 'void',
    };
    this.shape = null;
    
    this.init(params);
}

POM.Room.prototype.init = function(params) {
    this.nodeX = params.nodeX;
    this.nodeY = params.nodeY;
    this.tWidth = POM.BASE.room.tWidth;
    this.tHeight = POM.BASE.room.tHeight;
    this.sheet = POM.BASE.room.sheet;
};

POM.Room.prototype.generate = function(params) {
    this.tileMap = [];
    if (params) {
        this.sheet = params.sheet;
    }
    var dx = null;
    var dy = null;
    var tempArray = [];
    
    // this creates a tileMap using our base layout
    POM.BASE.room.layout.forEach(function(element, index, array) {
        tempArray.push(element.split(","));
    });

    for (dx = 0; dx < this.tWidth; dx += 1) {
        this.tileMap.push([]);
        for (dy = 0; dy < this.tHeight; dy += 1) {
            this.tileMap[dx].push(new POM.Tile({
                locX: dx,
                locY: dy,
                kind: tempArray[dx][dy],
            }));
        }
    }
    
    // 80% chance to spawn mobs
    if (POM.UTIL.rand(10) >= 2) {
        // between 1-5 mobs
        var rMobs = POM.UTIL.rand(5) + 1;
        var mobLocs = POM.UTIL.randUniqSetFromArray(POM.BASE.room.spawns.mob, rMobs);
        for (var mx = 0; mx < rMobs; mx += 1) {
            POM.gameEngine.registerMob(new POM.Mob({
                kind: 'zombie',
                avatar: 'zombie',
                roomX: this.nodeX,
                roomY: this.nodeY,
                locX: mobLocs[mx].x,
                locY: mobLocs[mx].y,                
            }))
        }
    }
    
    // 30% chance to spawn items
    if (POM.UTIL.rand(10) >= 7) {
        // between 1-2 items
        var rItems = POM.UTIL.rand(2) + 1;
        var itemLocs = POM.UTIL.randUniqSetFromArray(POM.BASE.room.spawns.item, rItems);
        for (var ix = 0; ix < rItems; ix += 1) {
            POM.gameEngine.registerItem(new POM.Item({
                kind: 'orb',               
                roomX: this.nodeX,
                roomY: this.nodeY,
                locX: itemLocs[ix].x,
                locY: itemLocs[ix].y,
            }));
        }
    }
    
    //this.decorate();
    this.updateSides();
};

POM.Room.prototype.updateSides = function() {
    var mySides = Object.keys(this.sides);
    var myShape = '';
    for (var sk = 0; sk < mySides.length; sk += 1) {
        var rx = POM.BASE.room.sides[mySides[sk]].x;
        var ry = POM.BASE.room.sides[mySides[sk]].y;
        if (this.known == 'void') {
            this.sides[mySides[sk]] = 'void';
        }
        else {
            switch (this.tileMap[rx][ry].kind) {
                case 'hWall':
                    this.sides[mySides[sk]] = 'wall';
                    myShape += 'n';
                    break;
                case 'vWall':
                    this.sides[mySides[sk]] = 'wall';
                    myShape += 'n';
                    break;
                case 'hDoor':
                    this.sides[mySides[sk]] = 'door';
                    myShape += 'd';
                    break;
                case 'vDoor':
                    this.sides[mySides[sk]] = 'door';
                    myShape += 'd';
                    break;
                case 'oDoor':
                    this.sides[mySides[sk]] = 'open';
                    myShape += 'd';
                    break;
            }
        }
    }
    this.shape = POM.BASE.room.shapes.kinds[myShape];
};


POM.Room.prototype.decorate = function() {
    
};

// checks the room's mobList to see if a specific tile has a mob on it, 
// returns the mob if true, returns false if false.
POM.Room.prototype.tileHasMob = function(tile) {
    var hasmob = false;
    var mcnt = 0;
    for (mcnt = 0; mcnt < this.mobList.length; mcnt += 1) {
        if (this.mobList[mcnt].locX == tile.locX &&
            this.mobList[mcnt].locY == tile.locY) {
            hasmob = this.mobList[mcnt];
        }
    }
    return hasmob;
}

// checks the room's itemList to see if a specific tile has an item on it, 
// returns the item if true, returns false if false.
POM.Room.prototype.tileHasItem = function(tile) {
    var hasitem = false;
    var icnt = 0;
    for (icnt = 0; icnt < this.itemList.length; icnt += 1) {
        if (this.itemList[icnt].locX == tile.locX &&
            this.itemList[icnt].locY == tile.locY) {
            hasitem = this.itemList[icnt];
        }
    }
    return hasitem;
}



