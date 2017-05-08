// NAUTILUS.App.Prefab.Model
// Namespace for complex entity templates made of Parts

NAUTILUS.App.Prefab.Model = {};

/*

I'm just going to fill this file with model notes before I start creating
a bazillion damn files under Model.

I need to know what a Scene looks like.

A scene doesn't look like anything. It's a box, duder. 

Scene = {
    stuff: stuff,
}

Fuck shit fuck, how do we do terrain? Walkability? Solidity?
Just tags?

Space?
Contents?
Material?

What will have sprites? Which things will have renderable components?
Mobs
Items
Terrain
Props

Where will the master list of a object's render layers be kept?
In the object that cares.

OK, what are all the attributes something can have in terms of "being a tile"?
REALLY THINK ABOUT THIS SHIT

floor
ceiling
contents?
prop
mob
item
visible
has mass?
solid/liquid/gas?
material
weight?
tags?
sprite?
layers?
layer?
location 
coordinates? (same thing??)
draw origin point
pixel width
pixel height
draw zone
grid
space?
volume?
force?
gravity?
walkable?

OK NEW PLAN

LOCATION + SPACE
Everything is separate
The world is a map of locations
Each location is keyed to a unique xyz coordinate
Each location has contents, as it represents physical space
As of RN I'm just going to create circular refs here
A location will know what mob is in it, and a mob will know its location.

Rendering will be performed on the current scene.
Each scene contains render boxes with defined nodes.
The nodes contain draw coordinates and references to source objects.
Source objects will either be other render boxes or other various 
objects with renderable children. 
Locations will contain renderable children.

const THE_WORLD = wEID
wEID: world_id
world_id: {
    '0,0,0': spaceEID,
}

const SPACE_LIMITS = slEID

LOCATION/SPACE: {
    COORDS: {
        locXYZ: '0,0,0',
        locX: 0,
        locY: 0,
        locZ: 0,
    }
    contents: {
        items: [],
        mob: MOB,
        prop: PROP,
        terrain: TERRAIN,
    }
}

RENDER_BOX: {
    targetCanvas: CANVAS,
    isVisible: false,
    zLayer: 0,
    renderNodes: Set [
        {
            originX: 0,
            originY: 0,
            nodeSource: THING,
        },
        {
            originX: 32,
            originY: 0,
            nodeSource: THING,
        },
        {
            originX: 64,
            originY: 0,
            nodeSource: THING,
        },
    ]
}

MOB: {
    IDENTITY: {
        kind: 'duder',
    }
    SPRITE: SPRITE_DUDER,
    LOCATION: '0,0,0',
    TODO: {},
}





*/



/*
*
*
* Courtesy Spaces
*
*
*/