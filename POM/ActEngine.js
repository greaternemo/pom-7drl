//POM.ActEngine

POM.ActEngine = function(params) {
    this.mobList = null;
    this.actingMob = null;
    this.VEng = null;
    this.GEng = null;
    this.BR = POM.BASE.room;
    this.BD = POM.BASE.dirs;
    
}

POM.ActEngine.prototype.registerEngines = function() {
    this.VEng = POM.viewEngine;
    this.GEng = POM.gameEngine;
};

POM.ActEngine.prototype.handleTurn = function(actor) {
    this.actingMob = actor;
    this.compel(actor);
    // do cleanup stuff here? idk
};

POM.ActEngine.prototype.compel = function(actor) {
    switch (actor.agent) {
        case 'player':
            this.controlPlayer(actor);
            break;
        case 'zombie':
            this.controlZombie(actor);
            break;
    }
};

POM.ActEngine.prototype.controlPlayer = function(actor) {
    
    // stop, collaborate, and listen for input
    this.GEng.stop();
    window.addEventListener("keydown", actor);

    // START actor.handleEvent declaration
    actor.handleEvent = function(pKey) {
        // fucking wait, okay
        window.removeEventListener("keydown", actor);
        var GEng = POM.gameEngine;
        var GEAR = POM.gameEngine.activeRoom;
        var BD = POM.BASE.dirs;
        var BR = POM.BASE.room;

        var oldLoc = {
            x: 0,
            y: 0
        };
        var newLoc = {
            x: 0,
            y: 0
        };
        var mFlag = false;
        var mDir = null;
        var dRoom = null;
        var outcome = null;

        oldLoc.x += actor.locX;
        oldLoc.y += actor.locY;

        if (BD.codes.hasOwnProperty(pKey.code)) {

            mDir = BD.codes[pKey.code];
            // are we in a doorway trying to leave a room?
            if (mDir == actor.inDoor) {
                // if we are, transition smoothly to the next room
                newLoc.x += BR.exits[mDir].x;
                newLoc.y += BR.exits[mDir].y;

                dRoom = GEng.activeFloor.getNextRoom({
                    nodeX: actor.roomX,
                    nodeY: actor.roomY,
                    mDir: mDir,
                });

                // a pair of opposing doors functions as a single door
                // when moving to a new room, if the corresponding door is not open
                // it must be opened
                if (dRoom.tileMap[BR.exits[mDir].xd][BR.exits[mDir].yd].kind != 'oDoor') {
                    dRoom.tileMap[BR.exits[mDir].xd][BR.exits[mDir].yd].morphInto('oDoor');
                    if (mDir == 'E' || mDir == 'W') {
                        dRoom.tileMap[BR.exits[mDir].xd][BR.exits[mDir].yd - 1].morphInto('hWall');
                    }
                }

                //GEAR.active = false;
                //GEAR.known = 'known';
                actor.roomX = dRoom.nodeX;
                actor.roomY = dRoom.nodeY;
                GEng.player.memory.enterRoom({
                //POM.playerMemory.enterRoom({
                    nodeX: dRoom.nodeX,
                    nodeY: dRoom.nodeY,
                })
                GEng.registerActiveRoom(dRoom);
                //GEAR = dRoom;
                //GEAR.active = true;
                //GEAR.known = 'active';
                // don't forget to move the player and unflag them as inDoor
                actor.inDoor = false;
                actor.locX = newLoc.x;
                actor.locY = newLoc.y;
                mFlag = true;
            } else {
                newLoc.x += oldLoc.x;
                newLoc.y += oldLoc.y;
                newLoc.x += BD.deltas[BD.codes[pKey.code]].x;
                newLoc.y += BD.deltas[BD.codes[pKey.code]].y;
                actor.locX = 0;
                actor.locY = 0;
                // switch (POM.playZone.playMap[newLoc.x][newLoc.y].spr) {
                switch (GEAR.tileMap[newLoc.x][newLoc.y].kind) {
                    case "floor":
                        outcome = "walk";
                        break;
                    case "oDoor":
                        outcome = "walk";
                        // note the player is in a damn doorway
                        actor.inDoor = mDir;
                        break;
                    case "vDoor":
                        outcome = "ewDoor";
                        break;
                    case "hDoor":
                        outcome = "nsDoor";
                        break;
                    case "vWall":
                        outcome = "wall";
                        break;
                    case "hWall":
                        outcome = "wall";
                }

                switch (outcome) {
                    case "walk":
                        // you get to move, gg
                        actor.locX += newLoc.x;
                        actor.locY += newLoc.y;
                        mFlag = true;
                        break;
                    case "ewDoor":
                        // open the door, but also change the tile at its y-1
                        // POM.playZone.playMap[newLoc.x][newLoc.y].spr = 'oDoor';
                        // POM.playZone.playMap[newLoc.x][newLoc.y - 1].spr = 'hWall';
                        GEAR.tileMap[newLoc.x][newLoc.y].morphInto('oDoor');
                        GEAR.tileMap[newLoc.x][newLoc.y - 1].morphInto('hWall');
                        // tell the player what happened, then don't move them
                        GEng.logMessage("The door slides open.");
                        actor.locX += oldLoc.x;
                        actor.locY += oldLoc.y;
                        break;
                    case "nsDoor":
                        // open the door, but then don't do anything
                        // POM.playZone.playMap[newLoc.x][newLoc.y].spr = 'oDoor';
                        GEAR.tileMap[newLoc.x][newLoc.y].morphInto('oDoor');
                        // tell the player what happened, then don't move them
                        GEng.logMessage("The door slides open.");
                        actor.locX += oldLoc.x;
                        actor.locY += oldLoc.y;
                        break;
                    case "wall":
                        // you obviously don't move, durr
                        GEng.logMessage("You fail to walk through the wall.");
                        actor.locX += oldLoc.x;
                        actor.locY += oldLoc.y;
                }
            }
            // if we handled some input, we're done until it's our turn again
            // probably
            // need to build this out
            
        }
        else {
            // if we don't respond to a keypress, keep listening
            window.addEventListener("keydown", actor);
        }
        
        if (mFlag === true) {
            GEng.activeRoomState = 'filthy';
        }
            
            
        GEng.start();
    }
    // END actor.handleEvent declaration

};

POM.ActEngine.prototype.controlZombie = function(actor) {
    // What does a zombie want? What does it do when unstimulated?
    
};

POM.ActEngine.prototype.wanderAbout = function(actor) {
    
};

//POM.ActEngine.prototype.