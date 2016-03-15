// POM.UTIL

POM.UTIL = {};

// returns an integer between 0 and max, exclusing max
// this is good for arrays because you can just use array.length for max
POM.UTIL.rand = function(max) {
    return Math.floor(Math.random() * max);
};

POM.UTIL.randSet = function(max, total) {
    var finalSet = [];
    while (finalSet.length < total) {
        finalSet.push(POM.UTIL.rand(max));
    }
    
    return finalSet;
};

POM.UTIL.randUniqSet = function(max, total) {
    // don't get smart
    if (total >= max) {
        console.log("Can't generate more unique integers than range will allow.");
        return false;
    }
    
    var finalSet = [];
    var rand = null;
    while (finalSet.length < total) {
        rand = POM.UTIL.rand(max);
        if (finalSet.indexOf(rand) == -1) {
            // only put it in if it isn't in already
            finalSet.push(rand);
        }
    }
    
    return finalSet;
}

POM.UTIL.randUniqSetFromArray = function(array, total) {
    // i warned you
    if (total >= array.length) {
        console.log("Just use the whole array, dummy");
        return array;
    }
    
    var finalSet = [];
    var rand = null;
    while (finalSet.length < total) {
        rand = POM.UTIL.rand(array.length);
        if (finalSet.indexOf(array[rand]) == -1) {
            finalSet.push(array[rand]);
        }
    }
    
    return finalSet;
}

POM.UTIL.zero = function(numArray) {
    numArray.forEach(function(eA, iA, aA) {
        eA = 0;
    })
};

