// POM.Prefab.Schema.Prime
// Prime schema to be imported into the data registry

// Here's the way this should work:
// We have a lot of things we need to store in the data registry
// and we need to be able to reference them quickly and consistently.
// Some of our key data will be available as global constants. 
// Those constants will contain ONLY an immutable integer ID.
// That integer ID will be the key pointing to the related value in
// the data registry. 

// Is this a little roundabout? 
// In some cases, it will be. But it will ALWAYS be consistent and reliable.

// Additionally, some entries in the data registry will just be lists of 
// the IDs of related sets of game objects. 

// For defining constants:
// Any constant that needs to be a static reference to a dynamic value
// SHOULD BE DEFINED during the prime schema import. When those dynamic
// values are created, they'll just be assigned to the proper constants.
// Any constant that needs to be a static reference to static data
// SHOULD NOT BE DEFINED UNTIL the prerequisite objects and datasets
// have been constructed.
// ^^^^^IGNORE THAT^^^^^

// All constants should be pointers to static EIDs.
// Create them as soon as possible so they will exist when they need
// to be assigned and then referenced.

// I don't think the constants should be defined here, either.
// The prime schema should contain the schema for the basic dataset
// we NEED in order to do the app.

POM.Prefab.Schema.Prime = {

    // Our canvas constants should be created immediately, these will just
    // be pointers to the ID of Canvas.context('2d')
    CANVAS_MAIN_VIEW: source,
    CANVAS_BUFFER: source,

    CANVAS_GAMEPLAY: source,
    CANVAS_GAMEPLAY_WORLD: source,
    CANVAS_GAMEPLAY_LOG: source,
    CANVAS_GAMEPLAY_MINIMAP: source,
    CANVAS_GAMEPLAY_STATS: source,

    // Image.src used to generate sprite bitmaps
    IMAGE_BASE_SHEET: source,
    IMAGE_BASE_FONT: source,

    // Bitmaps for sprites, will need to be generated before assignment
    SPRITE_MOB_DUDER: source,
    SPRITE_MOB_SHADOW: source,

    SPRITE_ITEM_FILLER: source,

    SPRITE_PROP_DOOROPEN: source,
    SPRITE_PROP_DOORCLOSED: source,

    SPRITE_TERRAIN_TILEFLOOR: source,
    SPRITE_TERRAIN_BRICKWALL: source,
    SPRITE_TERRAIN_VOID: source,

    // These really need to be defined after the data registry has been created!
    // These MUST contain the integer IDs of the corresponding registry elements!

    // POM.Director
    CURRENT_SCENE: source,
    ALL_SCENES: source,

    // We'll need quick access to all kinds of weird player information.
    // This is a placeholder.
    THE_PLAYER: source,

};



/*
*
*
* Courtesy Spaces
*
*
*/