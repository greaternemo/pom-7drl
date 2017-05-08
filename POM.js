// POM.js
// FIRE IT UP
// FIRE IT UP
// FIRE IT UP

var POM = {
    // Let's predefine all the attrs for the app
    
    // The router MUST be created before everything else
    appRouter: null,
    // The director follows 
    appDirector: null,
    
    // ???
    
    
};

// Define anything else you need to use in POM.init()
// somewhere ABOVE POM.init()

// First things first
POM.appRouter = new NAUTILUS.App.Router();

// Then this creates a TON of stuff
POM.appDirector = new POM.Director();

// START GLOBAL FUNCTION DECLARATION SECTION

// Everything declared here:
// A) Depends on the values of the attributes we just declared
// B) Cannot be required for the instantiation of anything that 
//    is instantiated by the above attribute declarations.
// C) Should be able to be called by the above objects or their
//    members after declaration with no ill effects.

// Providing a global interface to the appRouter so anything
// can just call the function without pointing directly at POM
function passSignal(signal, params) {
    return POM.appRouter.reroute(signal, params);
}
const SIG = passSignal;

// Providing a global interface to the data registry to aid
// access to entity data
function getEntity(eid) {
    return POM.appDirector.sysData.registry.primeMap.get(eid);
}
const ENT = getEntity;

// Providing a global interface to the data that a constant points to,
// rather than just the eid of the constant's pointer.
function getConstant(conVal) {
    return POM.appDirector.sysData.registry.chaseDown(conVal);
}
const CON = getConstant;

// END GLOBAL FUNCTION DECLARATION

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

