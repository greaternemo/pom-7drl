// POM.UTIL

POM.UTIL = {};

POM.UTIL.rand = function(max) {
    return Math.floor(Math.random() * max);
};

POM.UTIL.randSet = function(max, total) {
    var finalSet = [];
    var count = 0;
    for (count; count < total; count++) {
        finalSet.push(POM.UTIL.rand(max));
    }
};

