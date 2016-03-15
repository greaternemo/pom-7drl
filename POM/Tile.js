// POM.Tile

POM.Tile = function(params) {
    this.locX = null;
    this.locY = null;
    this.kind = null;
    this.sprite = null;
    this.mob = null;
    this.item = null;

    this.init(params);
}

POM.Tile.prototype.init = function(params) {
    this.locX = params.locX;
    this.locY = params.locY;
    this.kind = params.kind;
    this.sprite = POM.BASE.sprites.env[params.kind];
};

POM.Tile.prototype.morphInto = function(kind) {
    this.kind = kind;
    this.sprite = POM.BASE.sprites.env[kind];
}