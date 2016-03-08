// POM.js
// For all reasonable intents, POM and POM.BASE are the only global namespaces.

var POM = {

    // This original object is made of definitions the init() function will populate.
    
    // You only need one of a lot of things, and those go here.
    scheduler: null,
    gameEngine: null,
    viewEngine: null,
    actEngine: null,
    
    mainView: null,
    workView: null,
    
    // All of our lists and indices that reflect the current game state live here.
    // Anything that needs that data should receive references to the attributes of POM.
    gameState: null,
    
    mobList: null,
    itemList: null,
    
    sceneList: null,
    activeScene: null,
    activeRoom: null,
    
};

POM.init = function() {
    POM.BASE.init();
    
    var mainView = document.getElementById("mainView");
    var mV2d = mainView.getContext("2d");
    var workView = document.getElementById("workView");
    var wV2d = workView.getContext("2d");
    
    mV2d.fillStyle = "black";
    mV2d.fillRect(0, 0, mainView.width, mainView.height);

    /*
    mV2d.fillStyle = "darkred";
    mV2d.fillRect(0, 0, mainView.width, mainView.height);
    
    wV2d.fillStyle = "darkolivegreen";
    wV2d.fillRect(0, 0, 100, 100);
    
    mV2d.drawImage(workView,
                  0, 0,
                  200, 200,
                  100, 100,
                  200, 200);
    */
    
    var playZone = {
        canvas: null,
    };
    playZone.canvas = document.getElementById("playZone");
    playZone.dd = playZone.canvas.getContext("2d");
    playZone.originX = 0;
    playZone.originY = 160;
    playZone.sWidth = 32;
    playZone.sHeight = 32;
    playZone.nWidth = 13;
    playZone.nHeight = 13;
    playZone.sheet = POM.BASE.sheets.env.ascent;
    playZone.playMap = [
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
    
    var dx;
    var dy;
    
    for (dx = 0; dx < playZone.nWidth; dx += 1) {
        for (dy = 0; dy < playZone.nHeight; dy += 1) {
            var targetSpr = POM.BASE.sprites.env[playZone.playMap[dx][dy].spr];
                playZone.dd.drawImage(playZone.sheet,
                //mV2d.drawImage(playZone.sheet,
                                    targetSpr.sheetX, targetSpr.sheetY,
                                    targetSpr.width, targetSpr.height,
                                    (playZone.sWidth * dx), (playZone.sHeight * dy),
                                    playZone.sWidth, playZone.sHeight);
        }
    }
    wV2d.drawImage(playZone.canvas,
                   0, 0,
                   playZone.canvas.width, playZone.canvas.height,
                   playZone.originX, playZone.originY,
                   playZone.canvas.width, playZone.canvas.height
                  );
    
    mV2d.drawImage(workView,
                   0, 0,
                   workView.width, workView.height,
                   0, 0,
                   mainView.width, mainView.height
                  );
};

