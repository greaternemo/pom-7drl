// NAUTILUS.App.Loop
// A structured loop template

NAUTILUS.App.Loop = function (params) {
    // loopSoul is your iterator.
    this.loopSoul = null;
    
    // loopState is whether or not the iterator should
    // process its logic on a given iteration. It serves
    // as your primary lock flag.
    this.loopState = null;
    
    // loopFlags are custom flags that can be set on an
    // instance by instance basis.
    this.loopFlags = new Map();
    
    // loopProc is a function reference that the
    // iterator will call on each successful iteration.
    this.loopProc = null;
}

/*
NAUTILUS.App.Loop.prototype.
*/

NAUTILUS.App.Loop.prototype.start = function () {
    // check against loopFlags
    // if we cool, start the iterator
};

NAUTILUS.App.Loop.prototype.stop = function () {
    // 
};

NAUTILUS.App.Loop.prototype.reset = function () {
    // clear the iterator
    // null the loopFlags
    // call start
    
};

NAUTILUS.App.Loop.prototype.hardReset = function () {
    // clear the iterator
    // null the loopFlags
    // don't call start
};

NAUTILUS.App.Loop.prototype.addFlag = function () {};

NAUTILUS.App.Loop.prototype.delFlag = function () {};

NAUTILUS.App.Loop.prototype.togFlag = function () {};

NAUTILUS.App.Loop.prototype.checkFlags = function () {
    if (this.loopState) {}
};