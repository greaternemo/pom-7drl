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

NAUTILUS.Data.Factory.prototype.loadPrefabs = function (params) {
    // This needs to...
    // ... populate this.prefabs from params.
    // Welp.
    this.prefabs = params;
};

NAUTILUS.Data.Factory.prototype.makeThing = function (whichPrefab) {
    // A 'Thing' is your basic 'entity' or 'game object'. 
    // 'Thing' isn't an intrinsic type, just a container with 
    // some minimal identity data.
    let newThing = new Map();
    
    // Populate the new Thing's parts based on a template
    // TODO
    
    
    // Update the values of the new Thing based on a prefab
    // TODO
    
    // and return the new Thing.
    return newThing;
};

// This grafts Parts onto a Thing
NAUTILUS.Data.Factory.prototype.graft = function (params) {
    
};



/*
*
*
* Courtesy Spaces
*
*
*/