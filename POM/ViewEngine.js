// POM.ViewEngine.js

POM.ViewEngine = function(params) {
    this.GEng = null;
    this.AEng = null;
    
    this.view = null;
    this.vMain = null;
    this.vWork = null;
    this.vMainDD = null;
    this.vWorkDD = null;
    
    this.intv = null;
    this.fader = null;
    this.alpha = null;
    this.repeat = null;
    
    this.scenes = {};
    this.activeScene = null;
    
    this.init(params);
}

POM.ViewEngine.prototype.init = function(params) {
    // this.activeScene = params.activeScene;
    this.intv = 0;
    this.fader = POM.BASE.views.fader;
    this.alpha = 0;
};

POM.ViewEngine.prototype.registerEngines = function() {
    this.GEng = POM.gameEngine;
    this.AEng = POM.actEngine;
}

POM.ViewEngine.prototype.registerView = function(view) {
    this.view = view;
    this.vMain = this.view.main;
    this.vWork = this.view.work;
    this.vMainDD = this.vMain.getContext('2d');
    this.vWorkDD = this.vWork.getContext('2d');
};

POM.ViewEngine.prototype.registerScene = function(kind, scene) {
    this.scenes[kind] = scene;
};

POM.ViewEngine.prototype.registerActiveScene = function(scene) {
    this.activeScene = scene;
    this.activeScene.active = true;
}

POM.ViewEngine.prototype.composeActiveScene = function() {
    var reports = this.activeScene.composeYourself();
    var repcount = null;
    var zone = null;
    for (repcount = 0; repcount < reports.length; repcount += 1) {
        if (reports[repcount] == 'cleaned') {
            zone = this.activeScene.zones[repcount];
            this.vWorkDD.drawImage(zone.canvas,
                0, 0,
                zone.canvas.width, zone.canvas.height,
                zone.originX, zone.originY,
                zone.canvas.width, zone.canvas.height
            );
        }
    }
};

POM.ViewEngine.prototype.drawFrame = function() {
    // y'all gonna wait
    //this.GEng.stop();
    this.composeActiveScene();
    
    // gimme that spooky fade, fam
    this.alpha = 0;
    this.vMainDD.globalAlpha = this.alpha;
    this.intv = POM.BASE.views.intv.spooky;
        
    this.fadeIn();
};

POM.ViewEngine.prototype.fadeIn = function() {
    this.alpha += this.fader;
    this.vMainDD.globalAlpha = this.alpha;
    this.vMainDD.drawImage(this.vWork,
        0, 0,
        this.vWork.width, this.vWork.height,
        0, 0,
        this.vWork.width, this.vWork.height);
    if (this.alpha == 1) {
        // continue
        clearTimeout(this.repeat);
        // pretty sure this is what's making it recurse
        //this.GEng.start();
    } else {
        this.repeat = setTimeout(this.fadeIn.bind(this), this.intv);
    }
};

POM.ViewEngine.prototype.animateDeath = function() {
    this.alpha = 0
    this.vMainDD.globalAlpha = this.alpha;
    this.intv = POM.BASE.views.intv.ded;
    
    this.vWorkDD.fillStyle = "black";
    this.vWorkDD.fillRect(
		0, 0, this.vWork.width, this.vWork.height
	);
    
    this.fadeIn();
};