// POM.Zone

POM.Zone = function(params) {
    this.BZ = POM.BASE.zones;
    this.kind = null;
    
    this.canvas = null;
    this.dd = null;
    // origin coords on the parent canvas
    this.originX = null;
    this.originY = null;
    // sprite width
    this.sWidth = null;
    this.sHeight = null;
    // size of the zone in nodes
    this.nWidth = null;
    this.nHeight = null;
    
    this.sheet = null;
    this.dirty = null;
    
    this.init(params);
}

POM.Zone.prototype.init = function(kind) {
    this.kind = kind;
    
    this.canvas = this.BZ[kind].canvas;
    this.dd = this.BZ[kind].canvas.getContext('2d');
    // origin coords on the parent canvas
    this.originX = this.BZ[kind].originX;
    this.originY = this.BZ[kind].originY;
    // sprite width
    this.sWidth = this.BZ[kind].sWidth;
    this.sHeight = this.BZ[kind].sHeight;
    // size of the zone in nodes
    this.nWidth = this.BZ[kind].nWidth;
    this.nHeight = this.BZ[kind].nHeight;
    
    // not all zones have sheets
    if (this.BZ[kind].sheet != null) {
        this.sheet = this.BZ[kind].sheet;
    }
    // this is always 'filthy' on init to be sure our new zone gets drawn the first time.
    this.dirty = 'filthy';
    
    this.linked = {};
};

POM.Zone.prototype.setSheet = function(sheet) {
    this.sheet = sheet;
}

// This is something I BADLY needed.
// link should be an attribute name, like 'dirty'
// target must be a callback that populates that attribute
POM.Zone.prototype.linkStates = function(link, target) {
    this.linked.linkFrom = link;
    this.linked.linkTo = target;
};

POM.Zone.prototype.checkLink = function() {
    this[this.linked.linkFrom] = this.linked.linkTo();
};


