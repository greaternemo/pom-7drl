// POM.Director
// POM doesn't run the app anymore,
// it just holds it all in one place.
// The director runs the app.

POM.Director = function (params) {
    // Right now, all I'm sure of is that the Director
    // manages Scenes.
    
    // These will just be 
    this.curScene = null;
    this.allScenes = null;
    
    this.sData = null;
    this.sUi = null;
    this.sGame = null;
    
    this.init(params);
};

/*
POM.Director.prototype.
*/

POM.Director.prototype.init = function (params) {
    // make shit happen
    this.sData.registry = new NAUTILUS.Data.Registry();
    this.sData.factory = new NAUTILUS.Data.Factory();
    
    this.sUi.input = new NAUTILUS.Ui.Input();
    this.sUi.output = new NAUTILUS.Ui.Output();
    
    // fix this
    this.sGame.asdf = null;
};

POM.Director.prototype.asdf;



/*
*
*
* Courtesy Spaces
*
*
*/