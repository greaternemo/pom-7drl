// POM.eReg.js
// Engine to handle registries in a database style

POM.eReg = function(lib) {
    this.L = lib;
    this.s = new POM.sRegistry();
    this.init();
};

POM.eReg.prototype.init = function() {
    this.core = {};
    for (var cnt = 0; cnt < this.L.defaultRegistries; cnt++) {
        this.core[this.L.defaultRegistries[cnt]] = {};
        
    }
};