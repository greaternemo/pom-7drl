// POM.js
// FIRE IT UP
// FIRE IT UP
// FIRE IT UP

var POM = {
    // Let's predefine all the attrs for the app
    appDirector: null,
    appRouter: null,
    
    // ???
    
    
};

// Define anything else you need to use in POM.init()
// somewhere ABOVE POM.init()

POM.appDirector = new POM.Director();
POM.appRouter = new NAUTILUS.App.Router();

// Providing a global interface to the appRouter so anything
// can just call the function without pointing directly at POM

function SIG(params) {
    return POM.appRouter.reroute(params);
}

// Providing a global interface to the data registry to aid
// access to entity data

function ENT(eid) {
    return POM.appDirector.sData.registry.primeMap.get(eid);
}

// Moving on.

POM.init = function () {
    // Start at the top.
    
    
}





/*

Process Breakdown
-----
1) Initialization
-----
First we need to init things from the bottom up.
- Signal router
- App director

Then the app director gets its parts built.
- Data system
- Ui system
- Game system

Then we get the data system in line.
- Data registry
- Object factory

Then the ui system.
- View system
- Input system

Then the game system.
- Game director

Then the game director's parts assemble.
- Action system
- Journey system
- World system

-----
2) Importation of prefab data
-----

???

-----
3) Prep for showtime
-----

???

-----
4) Engage main app loop
-----

???



*/

