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
    this.GEng.stop();
    this.actingMob = actor;
    this.compel(actor);
    // do cleanup stuff here? idk
};

POM.ActEngine.prototype.compel = function(actor) {
    switch (actor.agent) {
        case 'player':
            this.controlPlayer(actor);
            break;
        case 'shadow':
            this.controlShadow(actor);
            break;
        case 'beast':
            this.controlBeast(actor);
            break;
    }
};

POM.ActEngine.prototype.controlPlayer = function(actor) {
    
    // if we're meditating, do that instead
    if (this.GEng.player.flags.indexOf('meditating') != -1) {
        window.removeEventListener("keydown", this.GEng.player.mob);
        this.GEng.player.waitLeft -= 1;
        if (this.GEng.player.waitLeft === 0) {
            this.GEng.player.flags.splice(this.GEng.player.flags.indexOf('meditating'), 1);
            if (this.GEng.player.gainUnderstanding() == 'won') {
                this.GEng.gameWon = true;
            }
        }
        //else {
        //    this.GEng.logMessage('You continue to dwell on the mysteries of the orb.');
        //}
        
        this.VEng.drawFrame();
        
        if (this.GEng.gameWon !== true) {
            this.GEng.start();
        }
    }
    else {
    
        // stop, collaborate, and listen for input
        window.addEventListener("keydown", actor);

        // START actor.handleEvent declaration
        actor.handleEvent = function(pKey) {
            // fucking wait, okay
            window.removeEventListener("keydown", actor);

            var GEng = POM.gameEngine;
            var GEAR = POM.gameEngine.activeRoom;
            var VEng = POM.viewEngine;
            var AEng = POM.actEngine;
            var BD = POM.BASE.dirs;
            var BR = POM.BASE.room;
            var PC = GEng.player;

            var oldLoc = {
                x: 0,
                y: 0
            };
            var newLoc = {
                x: 0,
                y: 0
            };
            var done = false;
            var wFlag = false;
            var aFlag = false;
            var mFlag = false;
            var mDir = null;
            var dRoom = null;
            var outcome = null;
            var target = null;
            var vicious = null;

            oldLoc.x += actor.locX;
            oldLoc.y += actor.locY;

            if (BD.codes.hasOwnProperty(pKey.code)) {

                if (PC.flags.indexOf('confirmMeditation') != -1) {
                    // guess we're not meditating right now
                    GEng.logMessage('You decide not to meditate.');
                    PC.flags.splice(PC.flags.indexOf('confirmMeditation'), 1);
                }

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

                    actor.roomX = dRoom.nodeX;
                    actor.roomY = dRoom.nodeY;

                    GEng.player.memory.enterRoom({
                        nodeX: dRoom.nodeX,
                        nodeY: dRoom.nodeY,
                    })
                    GEng.registerActiveRoom(dRoom);

                    // don't forget to move the player and unflag them as inDoor
                    actor.inDoor = false;

                    actor.locX = newLoc.x;
                    actor.locY = newLoc.y;

                    mFlag = true;
                } 
                else {
                    newLoc.x += oldLoc.x;
                    newLoc.y += oldLoc.y;

                    newLoc.x += BD.deltas[BD.codes[pKey.code]].x;
                    newLoc.y += BD.deltas[BD.codes[pKey.code]].y;

                    actor.locX = 0;
                    actor.locY = 0;

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

                            target = GEAR.tileHasMob(GEAR.tileMap[newLoc.x][newLoc.y]);

                            // is there someone standing there? if yes, FIGHT THEM
                            if (target) {
                                GEng.logMessage('You hit the ' + target.kind + '!');
                                target.getHit();
                                if (target.hpCur <= 0) {
                                    GEng.logMessage('The ' + target.kind + ' dies!');
                                    GEng.destroyMob(target);
                                    vicious = true;
                                }
                                if (vicious === true) {
                                    // shame on you
                                    var broke = 0;

                                    // first, destroy all the orbs in the room.
                                    // this needs to be rewritten to be item agnostic
                                    while (GEAR.itemList.length > 0) {
                                        GEng.destroyItem(GEAR.itemList[0]);
                                        broke++;
                                    }
                                    broke += actor.loseAll('orb');
                                    if (broke) {
                                        GEng.logMessage("Your viciousness shatters the orbs in the room!");
                                    }
                                }
                                actor.locX = oldLoc.x;
                                actor.locY = oldLoc.y;
                                aFlag = true;
                            }
                            // if not just move there
                            else {
                                actor.locX = newLoc.x;
                                actor.locY = newLoc.y;
                                mFlag = true;
                                // pick up an item if there's one on the tile
                                // unless your hands are full
                                target = GEAR.tileHasItem(GEAR.tileMap[newLoc.x][newLoc.y]);
                                if (target) {
                                    actor.takeItem(target);
                                }
                            }

                            break;
                        case "ewDoor":
                            // open the door, but also change the tile at its y-1
                            GEAR.tileMap[newLoc.x][newLoc.y].morphInto('oDoor');
                            GEAR.tileMap[newLoc.x][newLoc.y - 1].morphInto('hWall');
                            // tell the player what happened, then don't move them
                            //GEng.logMessage("The door slides open.");
                            actor.locX += oldLoc.x;
                            actor.locY += oldLoc.y;
                            break;
                        case "nsDoor":
                            // open the door, but then don't do anything
                            GEAR.tileMap[newLoc.x][newLoc.y].morphInto('oDoor');
                            // tell the player what happened, then don't move them
                            //GEng.logMessage("The door slides open.");
                            actor.locX += oldLoc.x;
                            actor.locY += oldLoc.y;
                            break;
                        case "wall":
                            /*
                            // you obviously don't move, durr
                            if (POM.UTIL.rand(10) >= 8) {
                                GEng.logMessage("You almost walk through the wall, but not really. It hurts.");
                                PC.getHit();
                            }
                            else {
                                //GEng.logMessage("You fail to walk through the wall.");
                            }
                            */
                            actor.locX += oldLoc.x;
                            actor.locY += oldLoc.y;
                    }
                }
                // if we handled some input, we're done until it's our turn again
                // probably
                // need to build this out

            }
            else if (POM.BASE.actions.hasOwnProperty(pKey.code)) {
                aFlag = AEng.tryToUse(actor, POM.BASE.actions[pKey.code]);
            }

            VEng.drawFrame();

            if (PC.mob.hpCur <= 0) {
                // u ded
                GEng.playerDeath();
            }

            if (mFlag === true) {
                GEng.activeRoomState = 'filthy';
                done = true;
            }

            if (aFlag === true) {
                done = true;
            }


            if (wFlag === true) {
                VEng.drawFrame();
                GEng.gameWon = true;
            }
            else if (PC.flags.indexOf('meditating') != -1) {
                VEng.drawFrame();
                GEng.start();
            }
            else if (done === true) {
                GEng.start();
            }
            else {
                VEng.drawFrame();
                // if we don't respond to a keypress, keep listening
                window.addEventListener("keydown", actor);
            }
        }
        // END actor.handleEvent declaration
    
    }
};

POM.ActEngine.prototype.controlShadow = function(actor) {
    // What does a shadow want? What does it do when unstimulated?
    
    // First, if you were doing something, keep doing that. 
    
    // You know, we're gonna throw some easier stuff in here first.
    // Mobs only actually move if they're in the current room. Calling it.
    if (actor.roomX == this.GEng.activeRoom.nodeX &&
        actor.roomY == this.GEng.activeRoom.nodeY) {
        this.wanderAbout(actor);
        this.VEng.drawFrame();
    }
    this.GEng.start();
};

POM.ActEngine.prototype.controlBeast = function(actor) {
    // If they're ready to charge, do that.
    // If they can see the player, prepare to charge.
    // If they can't see the player, wander about.
}

POM.ActEngine.prototype.tryToWalk = function(actor, dir) {

    var GEng = POM.gameEngine;
    var GEAR = GEng.activeRoom;
    var GEAF = GEng.activeFloor;
    var VEng = POM.viewEngine;
    var BR = POM.BASE.room;
    var BD = POM.BASE.dirs;
    var oldLoc = {x: 0, y: 0};
    var newLoc = {x: 0, y: 0};
    
    var target = false;
    var check = false;
    var mFlag = false;
    
    oldLoc.x += actor.locX;
    oldLoc.y += actor.locY;

    newLoc.x += oldLoc.x;
    newLoc.y += oldLoc.y;
    newLoc.x += BD.deltas[dir].x;
    newLoc.y += BD.deltas[dir].y;
    
    // You could use GEAR for these rather than GEAF now that it's otherwise
    // established that nothing moves if it's not in the current room.
    // Using the longer GEAF reference allows anything to act regardless of
    // which room it's in.
    
    target = GEAF.nodeMap[actor.roomX][actor.roomY].tileHasMob(
        GEAF.nodeMap[actor.roomX][actor.roomY].tileMap[newLoc.x][newLoc.y]);

    // is there someone standing there? if yes, FIGHT THEM
    if (target) {
        GEng.logMessage('The ' + actor.kind + ' hits the ' + target.kind + '!');
        if (target.kind == 'player') {
            GEng.player.getHit(2);
        }
        else {
            target.getHit(2);
        }
        if (target.hpCur <= 0 && target.kind != 'player') {
            GEng.logMessage('The ' + target.kind + ' dies!');
            GEng.destroyMob(target);
        }
    }
    // if not just move there
    else {
        actor.locX = newLoc.x;
        actor.locY = newLoc.y;
        
        // then pick up any items you can
        target = GEAF.nodeMap[actor.roomX][actor.roomY].tileHasItem(
            GEAF.nodeMap[actor.roomX][actor.roomY].tileMap[newLoc.x][newLoc.y]);
        if (target) {
            check = actor.takeItem(target);
            if (check) {
                GEng.logMessage(
                    'The ' + actor.kind + ' and its ' + target.kind + 
                    ' fade into nothingness.'
                );
                GEng.destroyMob(actor);
            }
        }
        
    }
    
}

POM.ActEngine.prototype.checkWalkableDirs = function(actor) {
    
    var walkable = [];
    
    var GEng = POM.gameEngine;
    var GEAR = GEng.activeRoom;
    var BD = POM.BASE.dirs;
    var oldLoc = {x: 0, y: 0};
    var newLoc = {x: 0, y: 0};
    var dRoom = null;
    var outcome = null;
    
    var mDir = null;

    var cnt = 0;
    
    for (cnt = 0; cnt < BD.four.length; cnt += 1) {
        mDir = BD.four[cnt];
        
        oldLoc = {x: 0, y: 0};
        newLoc = {x: 0, y: 0};
        
        oldLoc.x += actor.locX;
        oldLoc.y += actor.locY;
        
        newLoc.x += oldLoc.x;
        newLoc.y += oldLoc.y;
        
        newLoc.x += BD.deltas[mDir].x;
        newLoc.y += BD.deltas[mDir].y;
        
        // nonplayer mobs can't leave the room they're in
        // ...right now.
        switch (GEAR.tileMap[newLoc.x][newLoc.y].kind) {
            case "floor":
                outcome = "walk";
                break;
           
            case "oDoor":
                outcome = "wall";
                break;
            case "vDoor":
                outcome = "wall";
                break;
            case "hDoor":
                outcome = "wall";
                break;
            case "vWall":
                outcome = "wall";
                break;
            case "hWall":
                outcome = "wall";
                break;
        }

        if (outcome == 'walk') {
            walkable.push(mDir);
        }
    }
    return walkable;
}

POM.ActEngine.prototype.wanderAbout = function(actor) {
    
    // Just wander in a random direction like you dgaf
    var walkable = this.checkWalkableDirs(actor);
    var wDir = POM.UTIL.randUniqSetFromArray(walkable, 1);
    this.tryToWalk(actor, wDir);
        
};

POM.ActEngine.prototype.pursueThing = function(actor) {};

POM.ActEngine.prototype.tryToUse = function(actor, code) {
    var GEng = POM.gameEngine;
    var PC = GEng.player;
    var aFlag = false;
    
    switch(code) {
        case 'slotA':
        case 'slotB':
            if (actor.items[code] == null) {
                GEng.logMessage("You don't have an item in that hand.");
            }
            // try to use the item
            else if (actor.items[code].kind == 'orb') {
                if (PC.flags.indexOf('confirmMeditation') == -1) {
                    var hand;
                    if (code == 'slotA') {
                        hand = 'L';
                    }
                    else if (code == 'slotB') {
                        hand = 'R';
                    }
                    PC.flags.push('confirmMeditation');
                    GEng.logMessage("Using this orb requires 10 turns of meditation.");
                    GEng.logMessage("Press the " + hand + " key again to confirm meditation.");
                }
                else if (PC.flags.indexOf('confirmMeditation') != -1) {
                    // guess we're meditating right now
                    PC.flags.splice(PC.flags.indexOf('confirmMeditation'), 1);
                    GEng.logMessage("You fall into a deep trance and begin to meditate.");
                    PC.flags.push('meditating');
                    PC.waitLeft = 10;
                    //PC.waitLeft = 1;
                    aFlag === true;
                    //PC.mob.items[code] = null;
                    PC.mob.loseItem(code);
                }
            }
            break;
        case 'orb':
            actor.items.slotA = new POM.Item({ kind: 'orb'});
            break;
    }
    return aFlag;
}







