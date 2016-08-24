// POM.js

var POM = {

    scheduler: null,
    gameEngine: null,
    viewEngine: null,
    actEngine: null,

};

POM.init = function() {
    POM.BASE.init();

    var temp;

    // START YOUR ENGINES
    POM.scheduler = new POM.Scheduler();
    POM.gameEngine = new POM.GameEngine();
    POM.viewEngine = new POM.ViewEngine();
    POM.actEngine = new POM.ActEngine();
	
	// associate all the engines with each other

	POM.gameEngine.registerEngines();
	POM.viewEngine.registerEngines();
	POM.actEngine.registerEngines();
	
	// then you mix em all together in a sauce that's fit for kings
	
	POM.gameEngine.registerScheduler(POM.scheduler);
	
	POM.viewEngine.registerView(new POM.View({
		mainView: POM.BASE.views.main.canvas,
		workView: POM.BASE.views.work.canvas,
	}));
	
	POM.viewEngine.registerScene('game', new POM.Scene({kind: 'game'}));
	POM.viewEngine.registerActiveScene(POM.viewEngine.scenes.game);

	// I can't remember why I was doing this part
    POM.viewEngine.vMainDD.fillStyle = "black";
    POM.viewEngine.vMainDD.fillRect(
		0, 0, POM.viewEngine.vMain.width, POM.viewEngine.vMain.height
	);
    
    POM.gameEngine.registerActiveFloor(new POM.Floor());

    POM.gameEngine.registerActiveRoom(POM.gameEngine.activeFloor.nodeMap[2][2]);
	
	POM.gameEngine.registerPlayer();
	//POM.gameEngine.player.mob.items.slotA = new POM.Item({ kind: 'orb'})
	
	// Now since we did THAT with the room generation, since the refactoring,
	// we need to put the player in a random space or we run the risk of trying
	// to spawn them on a wall tile. :/
	POM.gameEngine.player.mob.moveTo(POM.gameEngine.activeRoom.randomTileOfKind('floor'));
	
	// nemo, get your fucking life together bro
	// Right here, we generate the layout for the origin room,
	// which we then immediately make active. We need to make it ready first.
	POM.gameEngine.activeFloor.nodeMap[2][2].known = 'ready';
    POM.gameEngine.activeFloor.nodeMap[2][2].generate();

	// This is a quick and dirty fix for the origin room not being drawn on the map.
	POM.gameEngine.activeFloor.nodeMap[2][2].known = 'known';
	
	/*
	POM.gameEngine.registerMob(new POM.Mob({
		kind: 'shadow',
		avatar: 'shadow',
		roomX: 2,
		roomY: 2,
		locX: 11,
		locY: 11,
	}))
    */
	
	POM.viewEngine.activeScene.registerZone(new POM.Zone('playArea'));
	temp = POM.BASE.scenes.game.indexOf('playArea');
	POM.viewEngine.activeScene.zones[temp].linkStates(
		'dirty', function() { return POM.gameEngine.activeRoomState }
	);

	POM.viewEngine.activeScene.registerZone(new POM.Zone('textLog'));
	temp = POM.BASE.scenes.game.indexOf('textLog');
	POM.viewEngine.activeScene.zones[temp].linkStates(
		'dirty', function() { return POM.gameEngine.msgLogState }
	);

    
	POM.gameEngine.logMessage(POM.UTIL.randUniqSetFromArray([
		'You can hear the cold.',
		'Your footsteps echo off the walls.',
		'You can hear wind but you feel nothing.'
	], 1));
	//POM.gameEngine.logMessage("You can hear the cold.");
    //POM.gameEngine.logMessage("Your footsteps echo off the walls.");
    //POM.gameEngine.logMessage("A coat would be nice.");
    //POM.gameEngine.logMessage("You hear screaming in the distance.");
    //POM.gameEngine.logMessage("the quick brown fox jumps over the lazy dog.");
    //POM.gameEngine.logMessage("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.");
    //POM.gameEngine.logMessage("The Quick Brown Fox Jumps Over The Lazy Dog.");
    //POM.gameEngine.logMessage("The dog parries the fox's attack!");
    //POM.gameEngine.logMessage("The fox takes 83748920583610293847576 damage?");
    
	POM.viewEngine.activeScene.registerZone(new POM.Zone('miniMap'));
	temp = POM.BASE.scenes.game.indexOf('miniMap');
	POM.viewEngine.activeScene.zones[temp].linkStates(
		'dirty', function() { return POM.gameEngine.activeFloorState }
	);
	
	POM.viewEngine.activeScene.registerZone(new POM.Zone('statPane'));
	temp = POM.BASE.scenes.game.indexOf('statPane');
	POM.viewEngine.activeScene.zones[temp].linkStates(
		'dirty', function() { return POM.gameEngine.playerState }
	);
    
    POM.viewEngine.drawFrame();
	POM.gameEngine.start();
};

// New experimental tech goes down here
/*
var POM = {
	L: null,
	eA: null,
	eG: null,
	eR: null,
	eV: null,
	eW: null,
}

// Utility function definitions.
// I don't know why I didn't do this in the global
// scope in the first place. 

// Returns an int between 0 and max-1
function randInt(max) {
	return Math.floor(Math.random() * max);
}

function randIntSet(max, total) {
	if (total < 1) {
		console.log('Failed randIntSet: total < 1');
		return [];
	}
	var finalSet = [];
	while (finalSet.length < total) {
		finalSet.push(rand(max));
	}
	return finalSet;
}

function randUniqIntSet(max, total) {
	if (total >= max) {
		console.log('Failed randUniqIntSet: total >= max');
		return [];
	}
	var finalSet = [];
	var rNum = null;
	while (finalSet.length < total) {
		rNum = randInt(max);
		if (finalSet.indexOf(rNum) == -1) {
			finalSet.push(rNum);
		}
	}
	return finalSet;
}

function randIndex(arr) {
	return randInt(arr.length);
}

function randIndexSet(arr, total) {
	return randIntSet(arr.length, total);
}

function randUniqIndexSet(arr, total) {
	return randUniqIntSet(arr.length, total);
}

function randElem(arr) {
	return arr[randIndex(arr)];
}

function randElemSet(arr, total) {
	var tempSet = randIndexSet(arr, total);
	var finalSet = [];
	while (tempSet.length > 0) {
		finalSet.push(arr[tempSet.shift()]);
	}
	return finalSet;
}

function randUniqElemSet(arr, total) {
	var tempSet = randUniqIndexSet(arr, total);
	var finalSet = [];
	while (tempSet.length > 0) {
		finalSet.push(arr[tempSet.shift()]);
	}
	return finalSet;
}

function randDir(num) {
	if (num == 8) {
		return randElem(['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']);
	} else {
		return randElem(['N', 'E', 'S', 'W']);
	}
}

function aDie(sides) {
	return Math.floor(Math.random() * sides) + 1;
}

function d2()  { return aDie(2);  }
function d4()  { return aDie(4);  }
function d6()  { return aDie(6);  }
function d8()  { return aDie(8);  }
function d10() { return aDie(10); }
function d12() { return aDie(12); }
function d20() { return aDie(20); }

function enpair(vx, vy) {
	var output = '';
	if (vx.hasOwnProperty('x')) {
		output += vx.x + ',' + vx.y;
	} else {
		output += vx + ',' + vy;
	}
	return output;
}

function depair(xy) {
	var output = {};
	var pieces = xy.split(',');
	output.x = parseInt(pieces[0], 10);
	output.y = parseInt(pieces[1], 10);
	return output;
}


// End utility function definitions.

POM.L = new POM.Lib;
POM.eA = new POM.eAct;
POM.eG = new POM.eGame;
POM.eR = new POM.eReg;
POM.eV = new POM.eView;
POM.eW = new POM.eWorld;

POM.build = function(args) {
	return POM.SFactory.build(args);
};














*/