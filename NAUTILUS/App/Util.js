// NAUTILUS.App.Util
// Utility functions exposed for frequent use

NAUTILUS.App.Util = function (params) {
    // EAT AT JOE'S
};

/*
NAUTILUS.App.Util.prototype

NAUTILUS.App.Util is just a bunch of prototyped functions.
But we're putting it in an object to be instantiated just
to keep things consistent, I guess?

idfk what I'm doing, y'all
jesus take the wheel
*/

// Returns an integer between 0 and max-1
NAUTILUS.App.Util.prototype.rand = function (max) {
	return Math.floor(Math.random() * max);
};

// Separate randum number function for die rolls
NAUTILUS.App.Util.prototype.aDie = function (sides) {
	return this.rand(sides) + 1;
};

NAUTILUS.App.Util.prototype.d2 = function ()  { return this.aDie(2);  };
NAUTILUS.App.Util.prototype.d4 = function ()  { return this.aDie(4);  };
NAUTILUS.App.Util.prototype.d6 = function ()  { return this.aDie(6);  };
NAUTILUS.App.Util.prototype.d8 = function ()  { return this.aDie(8);  };
NAUTILUS.App.Util.prototype.d10 = function () { return this.aDie(10); };
NAUTILUS.App.Util.prototype.d12 = function () { return this.aDie(12); };
NAUTILUS.App.Util.prototype.d20 = function () { return this.aDie(20); };

NAUTILUS.App.Util.prototype.genNum = function (len) {
    let nStr = '';
    let nCnt = 0;
    let nGen = '';
    for (nCnt; nCnt < len; nCnt++) {
        nGen = this.d10();
        nStr += '' + nGen;
    }
    return nStr;
};

//



/*
*
*
* Courtesy Spaces
*
*
*/