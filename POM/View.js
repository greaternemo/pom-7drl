// POM.View

POM.View = function(params) {
    this.main = null;
    this.work = null;
    
    this.init(params);
}

POM.View.prototype.init = function(params) {
    this.main = params.mainView;
    this.work = params.workView;
};
