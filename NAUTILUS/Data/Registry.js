// NAUTILUS.Data.Registry
// Universal game object database

NAUTILUS.Data.Registry = function (params) {
    // Pretty sure the primeMap actually makes the primeSet redundant
    // this.primeSet = new Set();
    this.primeMap = new Map();
    this.primeSchema = null;
}

/*
NAUTILUS.Data.Registry.prototype.
*/

NAUTILUS.Data.Registry.prototype.importSchema = function (pSchema) {
    // Import a schema for understanding all these registries
    // and referencing them properly.
    // The primeSchema should be imported from the prefab data
    // as part of the app init process.
    this.primeSchema = pSchema;
    
};

NAUTILUS.Data.Registry.prototype.registerThing = function (newent) {
    let newid = this.generateUeid();
    newent.eid = newid;
    this.primeMap.set(newid, newent);
    
};

NAUTILUS.Data.Registry.prototype.registerCluster = function (params) {
    // Accepts a cluster of Things to be mapped to a schema
    // Iterate over each Thing in the cluster
    // TODO
};

// Generates a string containing a unique 10 digit id
NAUTILUS.Data.Registry.prototype.generateUeid = function () {
    let temp;
    let newid;
    while (true) {
        temp = '' + Math.random();
        newid = temp.substring(2, 12);
        // Must be unique, must be 10 characters long
        if (this.primeMap.has(newid) || newid.length !== 10) {
            // NOPE
        }
        else {
            // we good
            return newid;
        }
    }
};

// Recursively locates the relevant Thing at the end of a chain of pointers
NAUTILUS.Data.Registry.prototype.chaseDown = function (eid) {
    let myTarget = this.primeMap.get(eid);
    // If the primeMap has() the value of myTarget, it means the value of
    // eid is the key to another value, confirming that eid is a pointer.
    // In that case, we need to go deeper.
    if (this.primeMap.has(myTarget)) {
        return this.chaseDown(myTarget);
    } else {
        return myTarget;
    }
};



/*
*
*
* Courtesy Spaces
*
*
*/