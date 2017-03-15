// NAUTILUS.Data.Registry
// Universal game object database

NAUTILUS.Data.Registry = function (params) {
    // hurk
    this.primeSet = new Set();
    this.primeMap = new Map();
    this.primeSchema = null;
}

// NAUTILUS.Data.Registry.prototype.

NAUTILUS.Data.Registry.prototype.importSchema = function (params) {
    // Import a schema for understanding all these registries
    // and referencing them properly.
    // The primeSchema should be imported from the prefab data
    // as part of the app init process.
    this.primeSchema = params;
    
};

NAUTILUS.Data.Registry.prototype.registerThing = function (newent) {
    let newid = this.generateUeid();
    newent.eid = newid;
    this.primeSet.add(newid);
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
        if (this.primeSet.has(newid)) {
            // NOPE
        }
        else {
            // we good
            return newid;
        }
    }
};



/*
*
*
* Courtesy Spaces
*
*
*/