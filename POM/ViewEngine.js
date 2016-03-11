// POM.ViewEngine.js

POM.ViewEngine = function(params) {
    this.views = {};
    this.scenes = {};
    this.activeScene = null;
    
    this.init(params);
}

POM.ViewEngine.prototype.init = function(params) {
    this.activeScene = params.activeScene;
};

POM.ViewEngine.prototype.registerView = function(kind, view) {
    this.views[kind] = view;
};

POM.ViewEngine.prototype.registerScene = function(kind, scene) {
    this.scenes[kind] = scene;
};

POM.ViewEngine.prototype.composeActiveScene = function() {
    this.activeScene.composeYourself();
}

POM.ViewEngine.prototype.drawFrame = function() {
    this.composeActiveScene();
    this.main.dd.drawImage(this.work.canvas,
        0, 0,
        this.work.canvas.width, this.work.canvas.height,
        0, 0,
        this.work.canvas.width, this.work.canvas.height);

}