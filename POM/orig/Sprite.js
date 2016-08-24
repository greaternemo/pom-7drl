// POM.Sprite

POM.Sprite = function(params) {
    this.width = null;
    this.height = null;
    this.sheetX = null;
    this.sheetY = null;
    this.kind = null;
    
    this.init(params);
}

POM.Sprite.prototype.init = function(params) {
    this.width = params.width;
    this.height = params.height;
    this.sheetX = params.sheetX;
    this.sheetY = params.sheetY;
    this.kind = params.kind;
};
