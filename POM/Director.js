// POM.Director
// POM doesn't run the app anymore,
// it just holds it all in one place.
// The director runs the app.

POM.Director = function (params) {
    // Right now, all I'm sure of is that the Director
    // manages Scenes.
    
    // These will be defined as constants, commenting these out.
    // this.curScene = null;
    // this.allScenes = null;
    
    this.sysData = {};
    this.sysUi = {};
    this.sysGame = {};
    
    this.init(params);
};

/*
POM.Director.prototype.
*/

POM.Director.prototype.init = function (params) {
    // From the top:
    // First we create the registry.
    this.sysData.registry = new NAUTILUS.Data.Registry();
    
    // Here's the deal: nothing else that we declare in this init function
    // should require data from the registry to complete their own init
    // functions. Creating the new registry does not intrinsically populate
    // its primeSchema or primeMap with meaningful content. 
    
    this.sysData.factory = new NAUTILUS.Data.Factory();
    
    this.sysUi.input = new NAUTILUS.Ui.Input();
    this.sysUi.output = new NAUTILUS.Ui.Output();
    
    // fix this
    this.sysGame.ghjk = null;
};

POM.Director.prototype.asdf;



/*
*
*
* Courtesy Spaces
*
*
*/