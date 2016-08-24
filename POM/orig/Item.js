// POM.Item

POM.Item = function(params) {
    this.kind = null;
    this.sprite = null;
    this.owner = null;
    this.sheet = null;
    this.roomX = null;
    this.roomY = null;
    this.locX = null;
    this.locY = null;
    
    
    this.init(params);
}

POM.Item.prototype.init = function(params) {
    this.kind = params.kind;
    this.sprite = POM.BASE.sprites.play.items[this.kind];
    //probably do something with this ok
    this.sheet = POM.BASE.sheets.play.items.allItems;
    
    (params.roomX !== undefined) ? (this.roomX = params.roomX) : (false);
    (params.roomY !== undefined) ? (this.roomY = params.roomY) : (false);
    (params.locX !== undefined) ? (this.locX = params.locX) : (false);
    (params.locY !== undefined) ? (this.locY = params.locY) : (false);
};

POM.Item.prototype.putOnFloor = function(params) {
    this.locX = params.locX;
    this.locY = params.locY;
    this.roomX = params.roomX;
    this.roomY = params.roomY;
};