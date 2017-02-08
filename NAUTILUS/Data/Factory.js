// NAUTILUS.Data.Factory
// Filled with Oompa Loompas to build all your stuff

NAUTILUS.Data.Factory = function (params) {
    // Oompa Loompa doopity doo
    // I've got a coding puzzle for you
    // Oompa Loompa doopidah dee
    // I've googled this, so listen to me
    
    // How do you deal with tight coupling of code?
    // A simple refactor could make it explode
    // Bugs can appear at the drop of a hat
    // What do you think will come... of... that?
    
    // I DON'T LIKE THE LOOK OF IT
    
    this.prefabs = null;
};

NAUTILUS.Data.Factory.prototype.loadPrefabs = function(params) {
    // This needs to...
    // ... populate this.prefabs from params.
    // Welp.
    this.prefabs = params;
};

NAUTILUS.Data.Factory.prototype.makeThing = function(params) {
    // This needs to...
    // create a new Thing,
    let newThing = {};
    
    // populate its parts based on a template,
    // TODO
    
    // update the values of the new Thing based on prefab
    // TODO
    
    // and return the new Thing.
    return newThing;
};

