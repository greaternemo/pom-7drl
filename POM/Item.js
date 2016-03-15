// POM.Item

POM.Item = function(params) {
    this.kind = null;
    this.sprite = null;
    this.owner = null;
    this.sheet = null;
    
    
    this.init(params);
}

POM.Item.prototype.init = function(params) {
    this.kind = params.kind;
    this.sprite = POM.BASE.sprites.play.items[this.kind];
    //probably do something with this ok
    this.sheet = POM.BASE.sheets.play.items.allItems;
    
}