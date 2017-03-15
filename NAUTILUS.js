// Nautilus
// Core of the Nautilus Game Framework
// *~~~Praise Helix~~~*

// I know the name is long
// You shouldn't be calling it much TBQH
// Just for your initial object creation

var NAUTILUS = {
    // ATTENTION PASSENGERS, THIS IS CAPTAIN NEMO
    // WE GOIN ALL THE WAY, Y'ALL
    // BUCKLE UP
    // *airhorns*
};

/*
NAUTILUS is the global variable in which the namespace resides.
Each individual 'subclass' in the namespace will be a function.
Each individual system for use in a full application simply
needs to be created via the 'new' constructor and socketed
into the the combined engine of your game.
*/

// Nemo, why do you need this... *waves hands* ...this.
// SetMap is a sort of... hacky solution for the lack of enums
// in JS.
// I want an object type that gives me:
// - guaranteed unique keys
// - convenient has() methods and similar
// - methods that handle state switching?
var StateMap = function (aSet, aMap, aState) {
    // This will be our set of possible states
    this.enumSet = null;
    // This will be our set of possible transitions
    this.transMap = null;
    // This will be our current state
    this.state = null;
    
    this.init(aSet, aMap, aState);
};

/*
StateMap.prototype.
*/

StateMap.prototype.init = function (aSet, aMap, aState) {
    // For each key and each index of each value,
    // verify they exist in the set.
    // Then and only then, assign the set and map
    // to attributes.
    let dState;
    let eState;
    
    if (!aSet.has(aState)) {
        // bad origin state
        // TODO
        return;
    }
    
    for (dState in aMap.keys) {
        if (!aSet.has(dState)) {
            // bad key
            // TODO
            return;
        }
    }
    
    for (dState in aMap.values) {
        for (eState in dState.values) {
            if (!aSet.has(eState)) {
                // bad value
                // TODO
                return;
            }
        }
    }
    
    this.enumSet = aSet;
    this.transMap = aMap;
    this.state = aState;
};

StateMap.prototype.verify = function (nState) {
    let sErr;
    if (this.enumSet.has(nState)) {
        if (this.transMap.get(this.state).has(nState)) {
            return true;
        } else {
            sErr = 'transMap lacks target state for current';
        }
    } else {
        sErr = 'enumSet lacks target state';
    }
    // throw in a debug message here
    // update this once you have more robust debugging
    console.log("failed verify for state change from " +
               this.state + " to " + nState + ": " + sErr);
    return false;
};

StateMap.prototype.setState = function (nState) {
    if (this.verify(nState)) {
        this.state = nState;
    }
};

// I think that's all for the StateMap? 
// What else do I need?
// 


/*
*
*
* Courtesy Spaces
*
*
*/