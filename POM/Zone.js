// POM.Zone

POM.Zone = function(params) {
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
    
    this.dirty = null;
    
    this.init(params);
}

POM.Zone.prototype.init = function(params) {
    this.kind = params.kind;
    
    this.canvas = POM.BASE.zones[params.kind].canvas;
    this.dd = POM.BASE.zones[params.kind].canvas.getContext('2d');
    // origin coords on the parent canvas
    this.originX = params.originX;
    this.originY = params.originY;
    // sprite width
    this.sWidth = params.sWidth;
    this.sHeight = params.sHeight;
    // size of the zone in nodes
    this.nWidth = params.nWidth;
    this.nHeight = params.nHeight;
    
    // this is always 'filthy' on init to be sure our new zone gets drawn the first time.
    this.dirty = 'filthy';
};

