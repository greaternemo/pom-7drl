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