// NAUTILUS.App.Lib.Draw
// Library for drawing things? May need to get more granular.

NAUTILUS.App.Lib.Draw = function () {};

/*
NAUTILUS.App.Lib.Draw.prototype
*/

/*
Process is:
Call drawScreen with your loop
drawScreen will draw the current scene to the main view
- First it checks for the renderable component of the scene
- Then it checks for draw layers in its draw zone
- Then it checks for renderable children
*/

NAUTILUS.App.Lib.Draw.prototype.drawScreen = function () {
    return this.drawCurrentScene();
};

NAUTILUS.App.Lib.Draw.prototype.drawToCanvas = function () {};

NAUTILUS.App.Lib.Draw.prototype.drawToBuffer = function () {};

NAUTILUS.App.Lib.Draw.prototype.drawToMain = function () {};

// if Scene is in POM, should this be in NAUT? uh probably not
NAUTILUS.App.Lib.Draw.prototype.drawCurrentScene = function () {
    let curScene = ENT(CURRENT_SCENE);
    // ok, now what
    // that... depends on how the scene is put together
    // fuck.
};

NAUTILUS.App.Lib.Draw.prototype.drawGkdjfd = function () {};

NAUTILUS.App.Lib.Draw.prototype.drawAsdfasd = function () {};



/*
*
*
* Courtesy Spaces
*
*
*/