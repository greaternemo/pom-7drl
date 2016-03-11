// POM.js
// For all reasonable intents, POM and POM.BASE are the only global namespaces.

var POM = {

    // This original object is made of definitions the init() function will populate.

    // You only need one of a lot of things, and those go here.
    scheduler: null,
    gameEngine: null,
    viewEngine: null,
    actEngine: null,

    mainView: {},
    workView: {},

    // All of our lists and indices that reflect the current game state live here.
    // Anything that needs that data should receive references to the attributes of POM.
    gameState: {
        activeScene: null,
        activeSheet: null,
        activeRoom: null,
        
    },

    messageLog: [],

    mobList: [],
    itemList: [],
    sceneList: [],
    activeScene: null,
    activeFloor: null,
    activeRoom: null,
    
    playerMemory: null,

};

POM.init = function() {
    POM.BASE.init();

    var dx;
    var dy;

    // START YOUR ENGINES
    /*
    POM.scheduler = new POM.Scheduler({
        mobList: POM.mobList,
    });
    POM.viewEngine = new POM.ViewEngine();
    POM.actEngine = new POM.ActEngine();
    POM.gameEngine = new POM.GameEngine({
        scheduler: POM.scheduler,
        aEngine: POM.actEngine,
        vEngine: POM.vEngine,
    });
    */

    // added to POM.Scene
    function addToScene(zone) {
        if (POM.activeScene == null) {
            POM.activeScene = [];
        }
        POM.activeScene.push(zone);
    }

    function logMessage(msg) {
        if (POM.messageLog == null) {
            POM.messageLog = [];
        }
        POM.messageLog.push(msg);
        POM.messageLog.shift();
    }

    function registerMob(mob) {
        if (POM.mobList == null) {
            POM.mobList = [];
        }
        POM.mobList.push(mob);
    }

    
    POM.mainView.canvas = document.getElementById("mainView");
    POM.mainView.dd = POM.mainView.canvas.getContext("2d");
   // POM.mainView.dd.imageSmoothingEnabled = false;
	//POM.mainView.dd.mozImageSmoothingEnabled = false;

    POM.workView.canvas = document.getElementById("workView");
    POM.workView.dd = POM.workView.canvas.getContext("2d");

    POM.mainView.dd.fillStyle = "black";
    POM.mainView.dd.fillRect(0, 0, POM.mainView.canvas.width, POM.mainView.canvas.height);

    // moved to POM.Scene.composeYourself
    POM.workView.build = function() {
        POM.activeScene.forEach(function(element, index, array) {
            element.compose();
            POM.workView.dd.drawImage(element.canvas,
                0, 0,
                element.canvas.width, element.canvas.height,
                element.originX, element.originY,
                element.canvas.width, element.canvas.height
            );
        })
    };

    // moved to POM.ViewEngine.drawFrame
    POM.mainView.redrawAll = function() {
        POM.workView.build();
        POM.mainView.dd.drawImage(POM.workView.canvas,
            0, 0,
            POM.workView.canvas.width, POM.workView.canvas.height,
            0, 0,
            POM.workView.canvas.width, POM.workView.canvas.height);
    }
    /*
    POM.textZone = {};
    POM.textZone.canvas = document.getElementById("textZone");
    POM.textZone.dd = POM.textZone.canvas.getContext("2d");
    POM.textZone.originX = 0;
    POM.textZone.originY = 0;
    POM.textZone.sWidth = 9;
    POM.textZone.sHeight = 16;
    // nWidth should be updated to 64 with the new 16x9 font
    POM.textZone.nWidth = 36;
    POM.textZone.nHeight = 10;
    */
    
    POM.activeFloor = new POM.Floor({
        nsOffset: POM.BASE.floor.nsOffset,
        ewOffset: POM.BASE.floor.ewOffset,
        nWidth: POM.BASE.floor.nWidth,
        nHeight: POM.BASE.floor.nHeight,
    });
    
    POM.activeFloor.nodeMap[2][2].generate();
    POM.activeRoom = POM.activeFloor.nodeMap[2][2];
    POM.activeRoom.active = true;
    POM.activeRoom.known = 'active';
    
    POM.textZone = new POM.Zone({
        kind: 'textLog',
        originX: 0,
        originY: 0,
        sWidth: 9,
        sHeight: 16,
        nWidth: 64,
        nHeight: 10,
    });
    POM.textZone.sheet = POM.BASE.sheets.font.face;
    POM.messageLog = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ];

    logMessage("You can hear the cold.");
    logMessage("Your footsteps echo off the walls.");
    logMessage("A coat would be nice.");
    logMessage("You hear screaming in the distance.");
    logMessage("the quick brown fox jumps over the lazy dog.");
    logMessage("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.");
    logMessage("The Quick Brown Fox Jumps Over The Lazy Dog.");
    logMessage("The dog parries the fox's attack!");
    logMessage("The fox takes 83748920583610293847576 damage?");

    POM.textZone.compose = function() {
        var cdd = POM.textZone.dd;
        var tempString = "";
        var tempArray = null;
        var aRow = 0;
        var aCol = 0;

        // always start by clearing what we had
        cdd.fillStyle = "black"
        cdd.fillRect(0, 0, POM.textZone.canvas.width, POM.textZone.canvas.height);
        
        for (aRow = 0; aRow < POM.textZone.nHeight; aRow += 1) {
            aCol = 0;
            tempString = "";

            tempString += POM.messageLog[aRow];
            tempArray = tempString.split("");
            for (aCol; aCol < tempArray.length; aCol += 1) {
                var mySpr = POM.BASE.sprites.font[tempArray[aCol]];
                cdd.drawImage(POM.textZone.sheet,
                    mySpr.sheetX, mySpr.sheetY,
                    mySpr.width, mySpr.height,
                    (POM.textZone.sWidth * aCol), (POM.textZone.sHeight * aRow),
                    POM.textZone.sWidth, POM.textZone.sHeight);
            }
        }

    }

    addToScene(POM.textZone);
    /*
    POM.mmapZone = {};
    POM.mmapZone.canvas = document.getElementById("mmapZone");
    POM.mmapZone.dd = POM.playZone.canvas.getContext("2d");
    POM.mmapZone.originX = 416;
    POM.mmapZone.originY = 160;
    POM.mmapZone.sWidth = 32;
    POM.mmapZone.sHeight = 32;
    POM.mmapZone.nWidth = 5;
    POM.mmapZone.nHeight = 5;
    POM.mmapZone.nodeMap = [
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
    ];
    */
    
    POM.miniZone = new POM.Zone({
        kind: 'miniMap',
        originX: 416,
        originY: 160,
        sWidth: 32,
        sHeight: 32,
        nWidth: 5,
        nHeight: 5,
    });
    
    POM.miniZone.compose = function() {
        var nMap = POM.activeFloor.nodeMap;
        var vOff = POM.activeFloor.ewOffset;
        var hOff = POM.activeFloor.nsOffset;
        var dx = null;
        var dy = null;
        var dz = null;
        
        // always start by clearing what we had
        POM.miniZone.dd.fillStyle = "black"
        POM.miniZone.dd.fillRect(0, 0, POM.miniZone.canvas.width, POM.miniZone.canvas.height);

        // draw each doorway and the room if it's known
        for (dx =  0; dx < this.nWidth; dx += 1) {
            
            for (dy = 0; dy < this.nHeight; dy += 1) {
                if (nMap[dx][dy].known != 'void') {
                    nMap[dx][dy].updateSides();
                    POM.miniZone.dd.fillStyle = POM.BASE.colors[nMap[dx][dy].known];
                    POM.miniZone.dd.fillRect((POM.miniZone.sWidth * dx) + POM.BASE.zones.miniMap.origins.room.x,
                                             (POM.miniZone.sHeight * dy) + POM.BASE.zones.miniMap.origins.room.y,
                                             POM.BASE.zones.miniMap.origins.room.w,
                                             POM.BASE.zones.miniMap.origins.room.h);
                    // now it gets real
                    for (dz = 0; dz < POM.BASE.dirs.four.length; dz += 1) {
                        POM.miniZone.dd.fillStyle = POM.BASE.colors[nMap[dx][dy].sides[POM.BASE.dirs.four[dz]]];
                        POM.miniZone.dd.fillRect((POM.miniZone.sWidth * dx) + POM.BASE.zones.miniMap.origins[POM.BASE.dirs.four[dz]].x,
                                                 (POM.miniZone.sHeight * dy) + POM.BASE.zones.miniMap.origins[POM.BASE.dirs.four[dz]].y,
                                                 POM.BASE.zones.miniMap.origins[POM.BASE.dirs.four[dz]].w,
                                                 POM.BASE.zones.miniMap.origins[POM.BASE.dirs.four[dz]].h);
                    }
                }
            }
        }
    };
    
    addToScene(POM.miniZone);
    
    /*
    POM.playZone = {};
    POM.playZone.canvas = document.getElementById("playZone");
    POM.playZone.dd = POM.playZone.canvas.getContext("2d");
    POM.playZone.originX = 0;
    POM.playZone.originY = 160;
    POM.playZone.sWidth = 32;
    POM.playZone.sHeight = 32;
    POM.playZone.nWidth = 13;
    POM.playZone.nHeight = 13;
    */
    POM.playZone = new POM.Zone({
        kind: 'playArea',
        originX: 0,
        originY: 160,
        sWidth: 32,
        sHeight: 32,
        nWidth: 13,
        nHeight: 13,
    });
    POM.playZone.sheet = POM.BASE.sheets.env.sphere;
    
    /*
    POM.playZone.playMap = [
        [{spr: 'vWall'}, {spr: 'vWall'}, {spr: 'vWall'}, {spr: 'vWall'}, {spr: 'vWall'}, {spr: 'vWall'},
         {spr: 'vDoor'}, {spr: 'vWall'}, {spr: 'vWall'}, {spr: 'vWall'}, {spr: 'vWall'}, {spr: 'vWall'}, {spr: 'hWall'}], 
        [{spr: 'hWall'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'},
         {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'hWall'}], 
        [{spr: 'hWall'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'},
         {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'hWall'}], 
        [{spr: 'hWall'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'},
         {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'hWall'}], 
        [{spr: 'hWall'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'},
         {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'hWall'}], 
        [{spr: 'hWall'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'},
         {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'hWall'}], 
        [{spr: 'hDoor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'},
         {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'oDoor'}], 
        [{spr: 'hWall'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'},
         {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'hWall'}], 
        [{spr: 'hWall'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'},
         {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'hWall'}], 
        [{spr: 'hWall'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'},
         {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'hWall'}], 
        [{spr: 'hWall'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'},
         {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'hWall'}], 
        [{spr: 'hWall'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'},
         {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'floor'}, {spr: 'hWall'}], 
        [{spr: 'vWall'}, {spr: 'vWall'}, {spr: 'vWall'}, {spr: 'vWall'}, {spr: 'vWall'}, {spr: 'hWall'},
         {spr: 'oDoor'}, {spr: 'vWall'}, {spr: 'vWall'}, {spr: 'vWall'}, {spr: 'vWall'}, {spr: 'vWall'}, {spr: 'hWall'}], 
    ];

    POM.playZone.compose = function() {
        for (dx = 0; dx < POM.playZone.nWidth; dx += 1) {
            for (dy = 0; dy < POM.playZone.nHeight; dy += 1) {
                var targetSpr = POM.BASE.sprites.env[POM.playZone.playMap[dx][dy].spr];
                POM.playZone.dd.drawImage(POM.playZone.sheet,
                    targetSpr.sheetX, targetSpr.sheetY,
                    targetSpr.width, targetSpr.height,
                    (POM.playZone.sWidth * dx), (POM.playZone.sHeight * dy),
                    POM.playZone.sWidth, POM.playZone.sHeight);
            }
        }
        if (POM.mobList != null) {
            POM.playZone.dd.drawImage(POM.mobList[0].sheet,
                POM.mobList[0].sprite.sheetX, POM.mobList[0].sprite.sheetY,
                POM.mobList[0].sprite.width, POM.mobList[0].sprite.height,
                (POM.playZone.sWidth * POM.mobList[0].locX), (POM.playZone.sHeight * POM.mobList[0].locY),
                POM.playZone.sWidth, POM.playZone.sHeight);
        }
    };
    */
    
    POM.playZone.playMap = POM.activeRoom.tileMap;
    
    POM.playZone.compose = function() {
        // this needs a flag to check for or something
        POM.playZone.playMap = POM.activeRoom.tileMap;
        for (dx = 0; dx < POM.playZone.nWidth; dx += 1) {
            for (dy = 0; dy < POM.playZone.nHeight; dy += 1) {
                var targetSpr = POM.playZone.playMap[dx][dy].sprite;
                POM.playZone.dd.drawImage(POM.playZone.sheet,
                    targetSpr.sheetX, targetSpr.sheetY,
                    targetSpr.width, targetSpr.height,
                    (POM.playZone.sWidth * dx), (POM.playZone.sHeight * dy),
                    POM.playZone.sWidth, POM.playZone.sHeight);
            }
        }
        if (POM.mobList != null) {
            POM.playZone.dd.drawImage(POM.mobList[0].sheet,
                POM.mobList[0].sprite.sheetX, POM.mobList[0].sprite.sheetY,
                POM.mobList[0].sprite.width, POM.mobList[0].sprite.height,
                (POM.playZone.sWidth * POM.mobList[0].locX), (POM.playZone.sHeight * POM.mobList[0].locY),
                POM.playZone.sWidth, POM.playZone.sHeight);
        }
    };

    addToScene(POM.playZone);

    var player = new POM.Mob({
        kind: 'avatarB',
        locX: 6,
        locY: 6,
        roomX: POM.activeRoom.nodeX,
        roomY: POM.activeRoom.nodeY,
    });
    
    POM.playerMemory = new POM.PlayerMemory({
        player: player,
        floor: POM.activeFloor,
    });

    registerMob(player);

    window.addEventListener("keydown", player);

    player.handleEvent = function(pressedKey) {

        // fucking wait, okay
        window.removeEventListener("keydown", player);

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

        oldLoc.x += player.locX;
        oldLoc.y += player.locY;

        if (POM.BASE.dirs.codes.hasOwnProperty(pressedKey.code)) {
            
            mDir = POM.BASE.dirs.codes[pressedKey.code];
            // are we in a doorway trying to leave a room?
            if (mDir == player.inDoor) {
                // if we are, transition smoothly to the next room
                newLoc.x += POM.BASE.room.exits[mDir].x;
                newLoc.y += POM.BASE.room.exits[mDir].y;
                
                dRoom = POM.activeFloor.getNextRoom({
                    nodeX: player.roomX,
                    nodeY: player.roomY,
                    mDir: mDir,
                });
                
                // a pair of opposing doors functions as a single door
                // when moving to a new room, if the corresponding door is not open
                // it must be opened
                if (dRoom.tileMap[POM.BASE.room.exits[mDir].xd][POM.BASE.room.exits[mDir].yd].kind != 'oDoor') {
                    dRoom.tileMap[POM.BASE.room.exits[mDir].xd][POM.BASE.room.exits[mDir].yd].morphInto('oDoor');
                    if (mDir == 'E' || mDir == 'W') {
                        dRoom.tileMap[POM.BASE.room.exits[mDir].xd][POM.BASE.room.exits[mDir].yd - 1].morphInto('hWall');
                    }
                }
                
                POM.activeRoom.active = false;
                POM.activeRoom.known = 'known';
                player.roomX = dRoom.nodeX;
                player.roomY = dRoom.nodeY;
                POM.playerMemory.enterRoom({
                    nodeX: dRoom.nodeX,
                    nodeY: dRoom.nodeY,
                })
                POM.activeRoom = dRoom;
                POM.activeRoom.active = true;
                POM.activeRoom.known = 'active';
                // don't forget to move the player and unflag them as inDoor
                player.inDoor = false;
                player.locX = newLoc.x;
                player.locY = newLoc.y;
                mFlag = true;
            }
            else {
                newLoc.x += oldLoc.x;
                newLoc.y += oldLoc.y;
                newLoc.x += POM.BASE.dirs.deltas[POM.BASE.dirs.codes[pressedKey.code]].x;
                newLoc.y += POM.BASE.dirs.deltas[POM.BASE.dirs.codes[pressedKey.code]].y;
                player.locX = 0;
                player.locY = 0;
                // switch (POM.playZone.playMap[newLoc.x][newLoc.y].spr) {
                switch (POM.playZone.playMap[newLoc.x][newLoc.y].kind) {
                    case "floor":
                        outcome = "walk";
                        break;
                    case "oDoor":
                        outcome = "walk";
                        // note the player is in a damn doorway
                        player.inDoor = mDir;
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
                        player.locX += newLoc.x;
                        player.locY += newLoc.y;
                        mFlag = true;
                        break;
                    case "ewDoor":
                        // open the door, but also change the tile at its y-1
                        // POM.playZone.playMap[newLoc.x][newLoc.y].spr = 'oDoor';
                        // POM.playZone.playMap[newLoc.x][newLoc.y - 1].spr = 'hWall';
                        POM.playZone.playMap[newLoc.x][newLoc.y].morphInto('oDoor');
                        POM.playZone.playMap[newLoc.x][newLoc.y - 1].morphInto('hWall');
                        // tell the player what happened, then don't move them
                        logMessage("The door slides open.");
                        player.locX += oldLoc.x;
                        player.locY += oldLoc.y;
                        break;
                    case "nsDoor":
                        // open the door, but then don't do anything
                        // POM.playZone.playMap[newLoc.x][newLoc.y].spr = 'oDoor';
                        POM.playZone.playMap[newLoc.x][newLoc.y].morphInto('oDoor');
                        // tell the player what happened, then don't move them
                        logMessage("The door slides open.");
                        player.locX += oldLoc.x;
                        player.locY += oldLoc.y;
                        break;
                    case "wall":
                        // you obviously don't move, durr
                        logMessage("You fail to walk through the wall.");
                        player.locX += oldLoc.x;
                        player.locY += oldLoc.y;
                }
            }
            POM.mainView.redrawAll();
        }
        window.addEventListener("keydown", player);
    }
    
    // I don't think this should be here twice, lol
    // ^^^ REMEMBER YOUR SHAME, THIS IS THE FIRST DRAW AT THE END OF POM.init!!!!
    
    POM.mainView.redrawAll();
};