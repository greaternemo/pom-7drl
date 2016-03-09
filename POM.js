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
    gameState: null,

    messageLog: null,

    mobList: null,
    itemList: null,

    sceneList: null,
    activeScene: null,
    activeRoom: null,

};

POM.init = function() {
    POM.BASE.init();

    var dx;
    var dy;

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
    POM.workView.canvas = document.getElementById("workView");
    POM.workView.dd = POM.workView.canvas.getContext("2d");

    POM.mainView.dd.fillStyle = "black";
    POM.mainView.dd.fillRect(0, 0, POM.mainView.canvas.width, POM.mainView.canvas.height);

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

    POM.mainView.redrawAll = function() {
        POM.workView.build();
        POM.mainView.dd.drawImage(POM.workView.canvas,
            0, 0,
            POM.workView.canvas.width, POM.workView.canvas.height,
            0, 0,
            POM.workView.canvas.width, POM.workView.canvas.height);
    }

    POM.textZone = {};
    POM.textZone.canvas = document.getElementById("textZone");
    POM.textZone.dd = POM.textZone.canvas.getContext("2d");
    POM.textZone.originX = 0;
    POM.textZone.originY = 0;
    POM.textZone.sWidth = 16;
    POM.textZone.sHeight = 16;
    POM.textZone.nWidth = 36;
    POM.textZone.nHeight = 10;
    POM.textZone.sheet = POM.BASE.sheets.font.face;
    POM.messageLog = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ];

    logMessage("You can hear the cold.");
    logMessage("Your footsteps echo off the walls.");
    logMessage("A coat would be nice.");
    logMessage("You hear screaming in the distance.");

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

    POM.playZone = {};
    POM.playZone.canvas = document.getElementById("playZone");
    POM.playZone.dd = POM.playZone.canvas.getContext("2d");
    POM.playZone.originX = 0;
    POM.playZone.originY = 160;
    POM.playZone.sWidth = 32;
    POM.playZone.sHeight = 32;
    POM.playZone.nWidth = 13;
    POM.playZone.nHeight = 13;
    POM.playZone.sheet = POM.BASE.sheets.env.sphere;
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

    addToScene(POM.playZone);

    var player = new POM.Mob({
        kind: 'avatarA',
        locX: 7,
        locY: 7,
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
        var outcome = null;

        oldLoc.x += player.locX;
        oldLoc.y += player.locY;
        newLoc.x += oldLoc.x;
        newLoc.y += oldLoc.y;

        if (POM.BASE.dirs.codes.hasOwnProperty(pressedKey.code)) {
            newLoc.x += POM.BASE.dirs.deltas[POM.BASE.dirs.codes[pressedKey.code]].x;
            newLoc.y += POM.BASE.dirs.deltas[POM.BASE.dirs.codes[pressedKey.code]].y;
            player.locX = 0;
            player.locY = 0;
            switch (POM.playZone.playMap[newLoc.x][newLoc.y].spr) {
                case "floor":
                    outcome = "walk";
                    break;
                case "oDoor":
                    outcome = "walk";
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
                    POM.playZone.playMap[newLoc.x][newLoc.y].spr = 'oDoor';
                    POM.playZone.playMap[newLoc.x][newLoc.y - 1].spr = 'hWall';
                    // tell the player what happened, then don't move them
                    logMessage("The door slides open.");
                    player.locX += oldLoc.x;
                    player.locY += oldLoc.y;
                    break;
                case "nsDoor":
                    // open the door, but then don't do anything
                    POM.playZone.playMap[newLoc.x][newLoc.y].spr = 'oDoor';
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
            POM.mainView.redrawAll();
        }
        window.addEventListener("keydown", player);
    }
    POM.mainView.redrawAll();
};