// POM.Floor

POM.Floor = function(params) {
    this.nWidth = null;
    this.nHeight = null;
    this.nodeMap = [];
    
    this.active = false;
    this.activeSheet = null;
    this.deadEnd = false;
    
    this.GEng = POM.gameEngine;
    this.BR = POM.BASE.room;
    this.BD = POM.BASE.dirs;
    
    this.init(params);
}

POM.Floor.prototype.init = function(params) {
    this.nWidth = POM.BASE.floor.nWidth;
    this.nHeight = POM.BASE.floor.nHeight;
    
    // as a placeholder so nothing breaks, jesus
    this.activeSheet = POM.BASE.sheets.env.sphere;
    
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
    
    var ndx = nx + this.BD.deltas[mDir].x;
    var ndy = ny + this.BD.deltas[mDir].y;
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
        this.nodeMap[ndx][ndy].generate({
            sheet: this.GEng.player.journey,
        });
        this.renovate(this.nodeMap[ndx][ndy], mDir);
    }
    return this.nodeMap[ndx][ndy];
};

POM.Floor.prototype.getAdjacentRooms = function(room) {
    
};

POM.Floor.prototype.renovate = function(room, dir) {
    var outsides = {
        N: null,
        E: null,
        S: null,
        W: null,
    };
    var dIndex = null;
    var nx = room.nodeX;
    var ny = room.nodeY;
    var dx = null;
    var dy = null;
    var sx = null;
    var sy = null;
    var aDir = null;
    var oDir = null;
    var voidWalls = 0;
    var tileKind = null;
    
    // gotta check all the sides for doors and such
    for (dIndex = 0; dIndex < this.BD.four.length; dIndex += 1) {
        POM.UTIL.zero([dx, dy, sx, sy]);
        
        aDir = this.BD.four[dIndex];
        oDir = this.BD.pairs[aDir];
        
        // just skip the room we came from, don't fuck with that one
        if (dir != oDir) {
            dx = this.BD.deltas[aDir].x;
            dy = this.BD.deltas[aDir].y;

            sx = nx + dx;
            sy = ny + dy;

                switch (aDir) {
                    case "N":
                        if (sy < 0) {
                            sy += this.nHeight
                        }
                        break;
                    case "E":
                        if (sx >= this.nWidth) {
                            sx -= this.nWidth
                        }
                        break;
                    case "S":
                        if (sy >= this.nHeight) {
                            sy -= this.nHeight
                        }
                        break;
                    case "W":
                        if (sx < 0) {
                            sx += this.nWidth
                        }
                        break;
                }
            outsides[aDir] = this.nodeMap[sx][sy].sides[oDir];

            if (outsides[aDir] == "wall") {
                if (aDir == 'E' || aDir == 'W') {
                    tileKind = 'vWall';
                }
                else {
                    tileKind = 'hWall';
                }
                // if one side faces a wall, that side has to be a wall.
                room.tileMap[this.BR.sides[aDir].x][this.BR.sides[aDir].y].morphInto(tileKind);
            }
            else if (outsides[aDir] == 'open') {
                // well we can't have that now, can we?
                tileKind = this.BR.facings[oDir].door;

                this.nodeMap[sx][sy].tileMap[this.BR.sides[oDir].x][this.BR.sides[oDir].y].morphInto(tileKind);
                if (tileKind == 'vDoor') {
                    this.nodeMap[sx][sy].tileMap[this.BR.sides[oDir].x][this.BR.sides[oDir].y - 1].morphInto('vWall');
                }
            }
            else if (outsides[aDir] == 'void') {
                // maybe this can be a wall.
                if (POM.UTIL.rand(10) > 6) {
                    tileKind = this.BR.facings[aDir].wall;
                    // since this is a new room, we don't have to check for hWalls to change to vWalls
                    room.tileMap[this.BR.sides[aDir].x][this.BR.sides[aDir].y].morphInto(tileKind);
                    voidWalls += 1;
                }
            }
        }
    }
    
    // cleanup
    if (voidWalls == 3) {
        // this is a dead end
        // the cases where dead ends can generate are rare but significant
        // voidWall tiles are the only ones we can revert to doors
        // gotta keep the player moving, gotta maintain a path
        if (this.deadEnd === false) {
            // only allow one dead end at a time
            this.deadEnd = room;
        }
        else {
            // gotta bust it up
            var reDoor = POM.UTIL.randUniqSetFromArray(this.BD.four, 2);
            while (reDoor.length > 0) {
                if (reDoor[0] != this.BD.pairs[dir]) {
                    tileKind = this.BR.facings[reDoor[0]].door;
                    room.tileMap[this.BR.sides[reDoor[0]].x][this.BR.sides[reDoor[0]].y].morphInto('tileKind');
                    
                }
                reDoor.shift();
            }
        }
    }
};








