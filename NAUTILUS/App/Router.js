// NAUTILUS.App.Router
// Signal router for hella decoupled code

// I still can't believe that this is really it.
// All it takes past this is a global signal function.
// Fucking child's play and it gave me hell.

NAUTILUS.App.Router = function (params) {
    this.routes = new Map();
};

/*
NAUTILUS.App.Router.prototype.
*/

// Imports multiple routes for redirecting signals
NAUTILUS.App.Router.prototype.importRoutes = function (rList, rRef) {
    // rList should be an array of strings, each of which 
    // is an exposed function: a route.
    // rRef should be the object reference used to call
    // the function for that route.
    let pRoutes = rList.slice();
    while (pRoutes.length) {
        this.routes.set(pRoutes.pop(), rRef);
    }
};

// Redirects signals based on imported routes.
NAUTILUS.App.Router.prototype.reroute = function (sig, params) {
    return this.routes.get(sig)[sig](params);
};