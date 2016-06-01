// POM.Room

POM.Room = function(params) {
	this.tileMap = null;
	this.sheet = null;
	this.nodeX = null;
	this.nodeY = null;
	this.tWidth = null;
	this.tHeight = null;
	this.active = false;
	this.deadEnd = false;

	// local lists of items and mobs for drawing
	this.itemList = [];
	this.mobList = [];

	// state of the room for minimap
	// for a void room, this.known should be 'void'
	// for the active room, it should be 'active'
	// for an explored nonvoid room it should be 'known'
	// we're going to fuck with it for now for testing tho
	// this.known = 'void'
	this.known = 'void';

	// I wish I had an enum for this.
	// Valid values for sides are:
	// 'void' for null rooms
	// 'wall' for walls
	// 'door' for closed doors
	// 'open' for open doors
	this.sides = {
		N: 'void',
		E: 'void',
		S: 'void',
		W: 'void',
	};
	this.shape = null;

	this.init(params);
}

POM.Room.prototype.init = function(params) {
	this.nodeX = params.nodeX;
	this.nodeY = params.nodeY;
	this.tWidth = POM.BASE.room.tWidth;
	this.tHeight = POM.BASE.room.tHeight;
	this.sheet = POM.BASE.room.sheet;
};

POM.Room.prototype.generate = function(params) {
	this.tileMap = [];
	if (params) {
		this.sheet = params.sheet;
	}
	var dx = null;
	var dy = null;
	var tempArray = [];

	// this creates a tileMap using our base layout
	POM.BASE.room.layout.forEach(function(element, index, array) {
		tempArray.push(element.split(","));
	});

	for (dx = 0; dx < this.tWidth; dx += 1) {
		this.tileMap.push([]);
		for (dy = 0; dy < this.tHeight; dy += 1) {
			this.tileMap[dx].push(new POM.Tile({
				locX: dx,
				locY: dy,
				kind: tempArray[dx][dy],
			}));
		}
	}

	this.updateSides();

	this.decorate();
	/*
		// 80% chance to spawn mobs
	if (POM.UTIL.rand(10) >= 2) {
		// between 1-5 mobs
		var rMobs = POM.UTIL.rand(5) + 1;
		var mobLocs = POM.UTIL.randUniqSetFromArray(POM.BASE.room.spawns.mob, rMobs);
		for (var mx = 0; mx < rMobs; mx += 1) {
			POM.gameEngine.registerMob(new POM.Mob({
				kind: 'shadow',
				//avatar: 'shadow',
				roomX: this.nodeX,
				roomY: this.nodeY,
				locX: mobLocs[mx].x,
				locY: mobLocs[mx].y,
			}))
		}
	}

	// 20% chance to spawn items
	if (POM.UTIL.rand(10) >= 8) {
		// between 1-2 items
		var rItems = POM.UTIL.rand(2) + 1;
		var itemLocs = POM.UTIL.randUniqSetFromArray(POM.BASE.room.spawns.item, rItems);
		for (var ix = 0; ix < rItems; ix += 1) {
			POM.gameEngine.registerItem(new POM.Item({
				kind: 'orb',
				roomX: this.nodeX,
				roomY: this.nodeY,
				locX: itemLocs[ix].x,
				locY: itemLocs[ix].y,
			}));
		}
	}
	*/
};

POM.Room.prototype.updateSides = function() {
	var mySides = Object.keys(this.sides);
	var myShape = '';
	for (var sk = 0; sk < mySides.length; sk += 1) {
		var rx = POM.BASE.room.sides[mySides[sk]].x;
		var ry = POM.BASE.room.sides[mySides[sk]].y;
		if (this.known == 'void') {
			this.sides[mySides[sk]] = 'void';
		} else {
			switch (this.tileMap[rx][ry].kind) {
				case 'hWall':
					this.sides[mySides[sk]] = 'wall';
					myShape += 'n';
					break;
				case 'vWall':
					this.sides[mySides[sk]] = 'wall';
					myShape += 'n';
					break;
				case 'hDoor':
					this.sides[mySides[sk]] = 'door';
					myShape += 'd';
					break;
				case 'vDoor':
					this.sides[mySides[sk]] = 'door';
					myShape += 'd';
					break;
				case 'oDoor':
					this.sides[mySides[sk]] = 'open';
					myShape += 'd';
					break;
			}
		}
	}
	this.shape = POM.BASE.room.shapes.kinds[myShape];
};


POM.Room.prototype.decorate = function() {
	// NEW SHIT

	var fullMap = [];
	var fmx = 0;
	var fmy = 0;
	while (fmx < 13) {
		fmy = 0;
		while (fmy < 13) {
			fullMap.push(POM.UTIL.enpair(fmx, fmy));
			fmy++
		}
		fmx++;
	}

	var roomMap = [];
	var rmx = 1;
	var rmy = 1;
	while (rmx < 12) {
		rmy = 1;
		while (rmy < 12) {
			roomMap.push(POM.UTIL.enpair(rmx, rmy));
			rmy++;
		}
		rmx++;
	}
	//console.log('roommap: ' + roomMap);

	var pillars = POM.UTIL.roll("10d3");
	var banned = ['1,6', '6,1', '11,6', '6,11'];
	var doors = ['0,6', '6,0', '12,6', '6,12'];
	var origins = {
		N: {
			xy: '6,0',
		},
		E: {
			xy: '12,6',
		},
		S: {
			xy: '6,12',
		},
		W: {
			xy: '0,6',
		},
	}

	var sideRef = {};
	var srx = 0;
	var sry = 0;
	var cell = null;
	var cellxy = '';

	while (srx < 13) {
		// gotta reset this with each iteration
		sry = 0;
		while (sry < 13) {
			cellxy = POM.UTIL.enpair(srx, sry);
			//console.log(cellxy);
			sideRef[cellxy] = {};
			if (sry !== 0) {
				sideRef[cellxy].N = POM.UTIL.enpair(srx, sry - 1);
			}
			if (srx !== 12) {
				sideRef[cellxy].E = POM.UTIL.enpair(srx + 1, sry);
			}
			if (sry !== 12) {
				sideRef[cellxy].S = POM.UTIL.enpair(srx, sry + 1);
			}
			if (srx !== 0) {
				sideRef[cellxy].W = POM.UTIL.enpair(srx - 1, sry);
			}
			sry++;
		}
		srx++;
	}

	// generate a random door
	var dirs = ['N', 'E', 'S', 'W'];
	var openDoors = [];
	var aDir = 0;

	while (aDir < 4) {
		if (this.sides[dirs[aDir]] !== 'void') {
			if (this.sides[dirs[aDir]] !== 'wall') {
				openDoors.push(dirs[aDir]);
			}
		}
		aDir++;
	}
	/*
	while (openDoors.length === 0) {
		aDir = 0;
		while (aDir < 4) {
			if (POM.UTIL.aCoin()) {
				openDoors.push(dirs[aDir]);
			}
			aDir++;
		}
	}
	//console.log(openDoors);
	*/


	var aDoor = null;
	var finalDoors = [];
	while (openDoors.length > 0) {
		finalDoors.unshift(openDoors.pop());
		aDoor = POM.UTIL.depair(origins[finalDoors[0]].xy);
		finalDoors[0] = POM.UTIL.enpair(aDoor);
		//cdd.fillStyle = 'red';
		//cdd.fillRect(aDoor.x * 20, aDoor.y * 20, 20, 20);
	}
	//console.log('finaldoors: ' + finalDoors);

	//var isChecked = false;
	var outerMap = [];
	var outerxy = '';
	var mapCount = 0;

	// build the map of outer wall tiles, ignore open doors
	while (mapCount < 13) {
		outerxy = POM.UTIL.enpair(0, mapCount);
		if (outerMap.indexOf(outerxy) == -1) {
			if (finalDoors.indexOf(outerxy) == -1) {
				outerMap.push('' + outerxy);
			}
		}
		outerxy = POM.UTIL.enpair(12, mapCount);
		if (outerMap.indexOf(outerxy) == -1) {
			if (finalDoors.indexOf(outerxy) == -1) {
				outerMap.push('' + outerxy);
			}
		}
		outerxy = POM.UTIL.enpair(mapCount, 0);
		if (outerMap.indexOf(outerxy) == -1) {
			if (finalDoors.indexOf(outerxy) == -1) {
				outerMap.push('' + outerxy);
			}
		}
		outerxy = POM.UTIL.enpair(mapCount, 12);
		if (outerMap.indexOf(outerxy) == -1) {
			if (finalDoors.indexOf(outerxy) == -1) {
				outerMap.push('' + outerxy);
			}
		}
		mapCount++;
	}
	mapCount = 0;
	//console.log(outerMap);

	var isValid = false;
	var randMap = [];
	var pointStr = null;
	var tempMap = [];
	var validMap = [];
	var validDoors = [];
	var curCell = null;
	var sideCount = 0;
	var sidexy = '';

	while (isValid === false) {
		// This is where we actually roll to generate terrain
		randMap = [];
		while (randMap.length < pillars) {
			pointStr = POM.UTIL.enpair(POM.UTIL.roll('1d11'), POM.UTIL.roll('1d11'));
			if (banned.indexOf(pointStr) == -1) {
				if (randMap.indexOf(pointStr) == -1) {
					randMap.push(pointStr);
				}
			}
		}
		//console.log('randMap: ' + randMap);

		// Then you have to walk the map to be sure the wall placement is sound.
		tempMap = [];
		validMap = [];
		validDoors = [];
		validMap.push('' + finalDoors[0]);
		tempMap.push('' + finalDoors[0]);
		validDoors.push('' + finalDoors[0]);

		while (tempMap.length > 0) {
			curCell = tempMap.shift();
			//console.log("curCell: " + curCell);
			sideCount = 0;
			while (sideCount < 4) {
				sidexy = sideRef[curCell][dirs[sideCount]];
				//console.log("sidexy: " + sidexy);
				//console.log("dir: " + dirs[sideCount]);
				// we only add to the validMap if it's not in the outerMap
				// or randMap or validMap.
				if (sidexy) {
					if (outerMap.indexOf(sidexy) == -1) {
						if (randMap.indexOf(sidexy) == -1) {
							if (validMap.indexOf(sidexy) == -1) {
								tempMap.push('' + sidexy);
								validMap.push('' + sidexy);
								//console.log("tempMap: " + tempMap);
								//console.log("validMap: " + validMap);
								if (finalDoors.indexOf(sidexy) !== -1) {
									validDoors.push(sidexy);
									//console.log("validDoors: " + validDoors);
								}
							}
						}
					}
				}
				sideCount++;
			}
		}
		// final check, loop repeats and starts over if this fails
		if (validDoors.length == finalDoors.length) {
			isValid = true;
		}
	}

	// after all that, we go back over the map again, and if the room
	// map has any tiles that are not valid or walls, they are filled
	// in with walls since they're surrounded.
	mapCount = 0;
	curCell = null;
	while (mapCount < roomMap.length) {
		curCell = '' + roomMap[mapCount];
		if (validMap.indexOf(curCell) == -1) {
			if (randMap.indexOf(curCell) == -1) {
				randMap.push('' + curCell);
			}
		}
		mapCount++;
	}

	// now we have to transfer all this to this.tileMap
	var remap = 0;
	var repoint = null;
	var reunder = null;

	// all these need to just be vWalls and we'll clean it up next
	while (remap < randMap.length) {
		repoint = POM.UTIL.depair(randMap[remap]);
		this.tileMap[repoint.x][repoint.y].kind = 'vWall';
		remap++;
	}

	remap = 0;
	repoint = null;

	// update the outer walls to use the correct tiles
	while (remap < outerMap.length) {
		repoint = POM.UTIL.depair(outerMap[remap]);
		if (repoint.y !== 12) {
			reunder = POM.UTIL.depair(sideRef[outerMap[remap]].S);
			if (this.tileMap[reunder.x][reunder.y].kind !== 'floor') {
				this.tileMap[reunder.x][reunder.y].kind = 'vWall';
			} else {
				this.tileMap[reunder.x][reunder.y].kind = 'hWall';
			}
		}
		remap++;
	}

	remap = 0;
	repoint = null;
	reunder = null;

	// update the inner walls to use the correct tiles
	while (remap < randMap.length) {
		repoint = POM.UTIL.depair(randMap[remap]);
		reunder = POM.UTIL.depair(sideRef[outerMap[remap]].S);
		if (this.tileMap[reunder.x][reunder.y].kind !== 'floor') {
			this.tileMap[reunder.x][reunder.y].kind = 'vWall';
		} else {
			this.tileMap[reunder.x][reunder.y].kind = 'hWall';
		}
		remap++;
	}

	/*
	var pnt = null;
	while (randMap.length > 0) {
		pnt = POM.UTIL.depair(randMap.pop());
		//cdd.fillStyle = 'black';
		cdd.fillRect(pnt.x * 20, pnt.y * 20, 20, 20);
	}
	*/
};

// checks the room's mobList to see if a specific tile has a mob on it, 
// returns the mob if true, returns false if false.
POM.Room.prototype.tileHasMob = function(tile) {
	var hasmob = false;
	var mcnt = 0;
	for (mcnt = 0; mcnt < this.mobList.length; mcnt += 1) {
		if (this.mobList[mcnt].locX == tile.locX &&
			this.mobList[mcnt].locY == tile.locY) {
			hasmob = this.mobList[mcnt];
		}
	}
	return hasmob;
}

// checks the room's itemList to see if a specific tile has an item on it, 
// returns the item if true, returns false if false.
POM.Room.prototype.tileHasItem = function(tile) {
	var hasitem = false;
	var icnt = 0;
	for (icnt = 0; icnt < this.itemList.length; icnt += 1) {
		if (this.itemList[icnt].locX == tile.locX &&
			this.itemList[icnt].locY == tile.locY) {
			hasitem = this.itemList[icnt];
		}
	}
	return hasitem;
};