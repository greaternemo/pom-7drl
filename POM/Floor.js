// POM.Floor

POM.Floor = function(params) {
    this.nsOffset = null;
    this.ewOffset = null;
    this.nWidth = null;
    this.nHeight = null;
    this.deadEnd = false;
    this.nodeMap = [];
    
    this.init(params);
}

POM.Floor.prototype.init = function(params) {
    this.nsOffset = params.nsOffset;
    this.ewOffset = params.ewOffset;
    this.nWidth = params.nWidth;
    this.nHeight = params.nHeight;
    
    var dx = null;
    var dy = null;
    
    for (dx = 0; dx < this.nWidth; dx += 1) {
        this.nodeMap.push([]);
        for (dy = 0; dy < this.nHeight; dy += 1) {
            this.nodeMap[dx].push(new POM.Room({
                nodeX: dx,
                nodeY: dy,
            }));
        }
    }

};

POM.Floor.prototype.getNextRoom = function(params) {
    var nx = params.nodeX;
    var ny = params.nodeY;
    var mDir = params.mDir;
    
    var ndx = nx + POM.BASE.dirs.deltas[mDir].x;
    var ndy = ny + POM.BASE.dirs.deltas[mDir].y;
    switch (mDir) {
        case "N":
            if (ndy < 0) { ndy += this.nHeight }
            break;
        case "E":
            if (ndx >= this.nWidth) { ndx -= this.nWidth }
            break;
        case "S":
            if (ndy >= this.nHeight) { ndy -= this.nHeight }
            break;
        case "W":
            if (ndx < 0) { ndx += this.nWidth }
            break;
    }
    
    if (this.nodeMap[ndx][ndy].known == 'void') {
        this.nodeMap[ndx][ndy].generate();
        this.renovate(this.nodeMap[ndx][ndy], mDir);
    }
    return this.nodeMap[ndx][ndy];
};

POM.Floor.prototype.renovate = function(room, dir) {
    var outsides = {};
    var dIndex = null;
    var nx = room.nodeX;
    var ny = room.nodeY;
    var dx = null;
    var dy = null;
    var sx = null;
    var sy = null;
    var aDir = null;
    var nonDoors = 0;
    var tileKind = null;
    
    // gotta check all the sides for doors and such
    for (dIndex = 0; dIndex < POM.BASE.dirs.four.length; dIndex += 1) {
        aDir = POM.BASE.dirs.four[dIndex];
        dx = POM.BASE.dirs.deltas[aDir].x;
        dy = POM.BASE.dirs.deltas[aDir].y;
        
        sx = nx + dx;
        if (sx < 0) { sx += this.nWidth }
        if (sx >= this.nWidth) { sx -= this.nWidth }

        sy = ny + dy;
        if (sy < 0) { sy += this.nHeight }
        if (sx >= this.nHeight) { sy =- this.nHeight}
        
        outsides[aDir] = this.nodeMap[sx][sy].sides[aDir];
        
        if (outsides[aDir] == "wall") {
            if (aDir == 'E' || aDir == 'W') {
                tileKind = 'vWall';
            }
            else {
                tileKind = 'hWall';
            }
            // if one side faces a wall, that side has to be a wall.
            room.tileMap[POM.BASE.room.sides[aDir].x][POM.BASE.room.sides[aDir].y].morphInto(tileKind);
            nonDoors += 1;
        }
        else if (outsides[aDir] == 'open') {
            // well we can't have that now, can we?
            if (aDir == 'E' || aDir == 'W') {
                tileKind = 'vDoor';
            }
            else {
                tileKind = 'hDoor';
            }
            this.nodeMap[sx][sy].tileMap[POM.BASE.room.exits[aDir].xd][POM.BASE.room.exits[aDir].yd].morphInto(tileKind);
            if (tileKind == 'vDoor') {
                this.nodeMap[sx][sy].tileMap[POM.BASE.room.exits[aDir].xd][POM.BASE.room.exits[aDir].yd - 1].morphInto('vWall');
            }
        }
        else if (outsides[aDir] == 'void') {
            // maybe this can be a wall.
            if (POM.UTIL.rand(10) > 7) {
                if (aDir == 'E' || aDir == 'W') {
                    tileKind = 'vWall';
                }
                else {
                    tileKind = 'hWall';
                }
                room.tileMap[POM.BASE.room.sides[aDir].x][POM.BASE.room.sides[aDir].y].morphInto(tileKind);
            }
        }
        
    }
};








