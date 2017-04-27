// NAUTILUS.App.Loop
// A structured loop template

NAUTILUS.App.Loop = function (procRef, procDelay) {
    // loopSoul is your loop.
    // Specifically, when you start the loop, you set up
    // a timer that repeatedly checks if loopState is 
    // true and conditionally calls loopProc.
    this.loopSoul = null;
    
    // loopState is whether or not the loop should
    // process its logic on a given iteration. It serves
    // as your primary lock flag.
    this.loopState = null;
    
    // loopFlags are custom flags that can be set on an
    // instance by instance basis.
    // WILL MESS WITH LATER
    // this.loopFlags = new Map();
    
    // loopProc is a function reference that the loop
    // will call on each successful iteration.
    
    // OPTIMALLY, procRef should be an anonymous function
    // that uses a SIG() call to actually call the draw
    // function.
    this.loopProc = procRef;
    
    // loopDelay is the delay in ms between each time the
    // interval triggers.
    this.loopDelay = procDelay;
}

/*
NAUTILUS.App.Loop.prototype.
*/

// Actually do the loop if it's okay to do the loop
NAUTILUS.App.Loop.prototype.doTheLoop = function () {
    if (this.loopState) {
        return this.loopProc();
    }
};

// Construct the interval
NAUTILUS.App.Loop.prototype.engage = function () {
    this.loopSoul = setInterval(this.doTheLoop.bind(this), this.loopDelay);
    this.start();
};

// Flip the loopState to true
NAUTILUS.App.Loop.prototype.start = function () {
    if (!this.loopState) {
        this.loopState = true;
    }
};

// Flip the loopState to false
NAUTILUS.App.Loop.prototype.stop = function () {
    if (this.loopState) {
        this.loopState = false;
    }
};

NAUTILUS.App.Loop.prototype.reset = function () {
    // clear the loop
    // null the loopState
    // call engage
    clearInterval(this.loopSoul);
    this.loopState = null;
    this.engage()
};

NAUTILUS.App.Loop.prototype.hardReset = function () {
    // clear the loop
    // null the loopFlags
    // don't call engage
    clearInterval(this.loopSoul);
    this.loopState = null;
};

/*
NAUTILUS.App.Loop.prototype.addFlag = function (fName, fInitState) {
    if (!this.loopFlags.has(fName)) {
        this.loopFlags.set(fName, fInitState);
    }
};

NAUTILUS.App.Loop.prototype.delFlag = function (fName) {
    if (this.loopFlags.has(fName)) {
        this.loopFlags.delete(fName);
    }
};

NAUTILUS.App.Loop.prototype.togFlag = function (fName) {
    if (this.loopFlags.has(fName)) {
        if (this.loopFlags.get(fName)) {
            this.loopFlags.set(fName, false);
        } else {
            this.loopFlags.set(fName, true);
        }
    }
};

NAUTILUS.App.Loop.prototype.checkFlags = function () {
    if (this.loopState) {
        
    }
};
*/

/*
*
*
* Courtesy Spaces
*
*
*/