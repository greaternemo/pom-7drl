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
    
    this.init(params);
}

POM.Room.prototype.init = function(params) {
    this.nodeX = params.nodeX;
    this.nodeY = params.nodeY;
    this.tWidth = POM.BASE.room.tWidth;
    this.tHeight = POM.BASE.room.tHeight;
};

POM.Room.prototype.generate = function(params) {
    this.tileMap = [];
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
    this.updateSides();
};

POM.Room.prototype.updateSides = function() {
    var mySides = Object.keys(this.sides);
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
                    break;
                case 'vWall':
                    this.sides[mySides[sk]] = 'wall';
                    break;
                case 'hDoor':
                    this.sides[mySides[sk]] = 'door';
                    break;
                case 'vDoor':
                    this.sides[mySides[sk]] = 'door';
                    break;
                case 'oDoor':
                    this.sides[mySides[sk]] = 'open';
                    break;
            }
        }
    }
};







