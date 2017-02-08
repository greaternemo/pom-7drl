// NAUTILUS.Data.Registry
// Universal game object database

NAUTILUS.Data.Registry = function (params) {
    // hurk
    this.counter = 0;
    this.primeRegistry = {};
    this.primeSchema = null;
}

// NAUTILUS.Data.Registry.prototype.

NAUTILUS.Data.Registry.prototype.importSchema = function (params) {
    // Import a schema for understanding all these registries
    // and referencing them properly
    this.primeSchema = params;
    
};

NAUTILUS.Data.Registry.prototype.registerThing = function (params) {
    // Just add the Thing to the registry.
    // Or to the right registry?
    // Fuck.
    // TODO
};

NAUTILUS.Data.Registry.prototype.registerCluster = function (params) {
    // Accepts a cluster of Things to be mapped to a schema
    // Iterate over each Thing in the cluster
    // TODO
};