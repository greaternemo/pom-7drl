// POM.UTIL

POM.UTIL = {};

// returns an integer between 0 and max, excluding max
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

POM.UTIL.randUniqSetFromArray = function(arr, total) {
    // i warned you
    if (total >= arr.length) {
        console.log("Just use the whole array, dummy");
        return arr;
    }
    
    var finalSet = [];
    var rand = null;
    while (finalSet.length < total) {
        rand = POM.UTIL.rand(arr.length);
        if (finalSet.indexOf(arr[rand]) == -1) {
            finalSet.push(arr[rand]);
        }
    }
    
    return finalSet;
}

POM.UTIL.randFrom = function(arr) {
	return POM.UTIL.randUniqSetFromArray(arr, 1); 
}

POM.UTIL.zero = function(numArray) {
    numArray.forEach(function(eA, iA, aA) {
        eA = 0;
    })
};

POM.UTIL.randDir = function() {
    return POM.UTIL.randUniqSetFromArray(POM.BASE.dirs.four, 1)[0];
}

POM.UTIL.aDie = function(size) {
	return Math.floor(Math.random() * size) + 1;
}

POM.UTIL.aCoin = function() {
	return POM.UTIL.aDie(2) - 1;
}

POM.UTIL.roll = function(dice) {
	var input = dice.split('d');
	var vals = {};
	vals.quantity = parseInt(input[0], 10);
	vals.size = parseInt(input[1], 10);

	var total = 0;
	while (vals.quantity > 0) {
		total += POM.UTIL.aDie(vals.size);
		vals.quantity--;
	}
	return total;
}

POM.UTIL.enpair = function(valx, valy) {
	var output = '';
	if (valx.hasOwnProperty('x')) {
		output += valx.x + ',' + valx.y;
	} else {
		output += valx + ',' + valy;
	}
	return output;
}

POM.UTIL.depair = function(val) {
	var output = {};
	var pieces = val.split(',');
	output.x = parseInt(pieces[0], 10);
	output.y = parseInt(pieces[1], 10);
	return output;
}

