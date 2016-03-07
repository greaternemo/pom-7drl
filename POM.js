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
    var mainView = document.getElementById("mainView");
    var mV2d = mainView.getContext("2d");
    var workView = document.getElementById("workView");
    var wV2d = workView.getContext("2d");
    
    mV2d.fillStyle = "darkred";
    mV2d.fillRect(0, 0, mainView.width, mainView.height);
    
    wV2d.fillStyle = "darkolivegreen";
    wV2d.fillRect(0, 0, 100, 100);
    
    mV2d.drawImage(workView,
                  0, 0,
                  200, 200,
                  100, 100,
                  200, 200);

    
}

