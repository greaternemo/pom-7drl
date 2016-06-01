// POM.Scene

POM.Scene = function(params) {
    this.BSP = POM.BASE.sprites;
    this.BD = POM.BASE.dirs;
    this.BZ = POM.BASE.zones;
    this.BC = POM.BASE.colors;
    this.GEng = POM.gameEngine;
    
    this.kind = null;
    this.zones = [];
    this.active = false;
    
    this.init(params);
}

POM.Scene.prototype.init = function(params) {
    this.kind = params.kind;
};

POM.Scene.prototype.registerZone = function(zone) {
    this.zones.push(zone);
};

POM.Scene.prototype.muss = function() {
    var zcount = null;
    for (zcount = 0; zcount < this.zones.length; zcount += 1) {
        this.zones[zcount].dirty = 'filthy';
    }
};

POM.Scene.prototype.composeYourself = function() {
    // for loop over zones
    // iterate over them and call composition methods by type
    var zcount = null;
    var reports = [];
    for (zcount = 0; zcount < this.zones.length; zcount += 1) {
        reports.push(this.compose(this.zones[zcount]));
    }
    return reports;
    /*
    this.zones.forEach(function(zone, index, array) {
        var report;
        report = this.compose(zone);
        if (report == 'cleaned') {
            POM.workView.dd.drawImage(zone.canvas,
                0, 0,
                zone.canvas.width, zone.canvas.height,
                zone.originX, zone.originY,
                zone.canvas.width, zone.canvas.height
            );
        }
    })
    */
    
};

POM.Scene.prototype.compose = function(zone) {
    zone.checkLink();
    var outcome;
    switch (zone.kind) {
        case "playArea":
            outcome = this.composePlayZone(zone);
            break;
        case "textLog":
            outcome = this.composeTextZone(zone);
            break;
        case "miniMap":
            outcome = this.composeMiniZone(zone);
            break;
        case "statPane":
            outcome = this.composeStatZone(zone);
            break;
    }
    return outcome;
};

POM.Scene.prototype.composePlayZone = function (zone) {
    var dx = null;
    var dy = null;
    var dz = null;
    var aRoom = null;
    var tMap = null;
    var tSpr = null;
    var iList = null;
    var iSpr = null;
    var mList = null;
    var mSpr = null;
    
    if (zone.dirty == 'filthy') {
        // we draw tiles, then items over tiles, then mobs over both
        aRoom = this.GEng.activeRoom;

        tMap = aRoom.tileMap;
        for (dx = 0; dx < zone.nWidth; dx += 1) {
            for (dy = 0; dy < zone.nHeight; dy += 1) {
                
                tSpr = tMap[dx][dy].sprite;
                
                zone.dd.drawImage(aRoom.sheet,
                    tSpr.sheetX, tSpr.sheetY,
                    tSpr.width, tSpr.height,
                    (zone.sWidth * dx), (zone.sHeight * dy),
                    zone.sWidth, zone.sHeight);
            }
        }

        iList = aRoom.itemList;
        if (iList.length > 0) {
            for (dz = 0; dz < iList.length; dz += 1) {
            
                iSpr = iList[dz].sprite;
                
                zone.dd.drawImage(iList[dz].sheet,
                iSpr.sheetX, iSpr.sheetY,
                iSpr.width, iSpr.height,
                (zone.sWidth * iList[dz].locX), (zone.sHeight * iList[dz].locY),
                zone.sWidth, zone.sHeight);
            }
        }

        mList = aRoom.mobList;
        if (mList.length > 0) {
            for (dz = 0; dz < mList.length; dz += 1) {
            
                mSpr = mList[dz].sprite;
                
                zone.dd.drawImage(mList[dz].sheet,
                mSpr.sheetX, mSpr.sheetY,
                mSpr.width, mSpr.height,
                (zone.sWidth * mList[dz].locX), (zone.sHeight * mList[dz].locY),
                zone.sWidth, zone.sHeight);
            }
        }
        
        zone.dirty = false;
        return 'cleaned';
    }
    else {
        return false;
    }
};

POM.Scene.prototype.composeTextZone = function(zone) {
    // sync first
    //zone.dirty = this.GEng.msgLogState;
    
    if (zone.dirty == 'filthy') {
        var cdd = zone.dd;
        var tempStr = "";
        var tempArr = null;
        var tRow = null;
        var tCol = null;

        // always start by clearing what we had
        cdd.fillStyle = "black"
        cdd.fillRect(0, 0, zone.canvas.width, zone.canvas.height);
        
        for (tRow = 0; tRow < zone.nHeight; tRow += 1) {
            tempStr = "";
            tempStr += this.GEng.msgLog[tRow];
            tempArr = tempStr.split("");
            
            for (tCol = 0; tCol < tempArr.length; tCol += 1) {
                var tSpr = this.BSP.font[tempArr[tCol]];
                cdd.drawImage(zone.sheet,
                    tSpr.sheetX, tSpr.sheetY,
                    tSpr.width, tSpr.height,
                    (zone.sWidth * tCol), (zone.sHeight * tRow),
                    zone.sWidth, zone.sHeight);
            }
        }
        zone.dirty = false;
        return "cleaned";
    }
    else {
        return false;
    }

};

POM.Scene.prototype.composeMiniZone = function(zone) {
    var nMap = this.GEng.activeFloor.nodeMap;
    var dx = null;
    var dy = null;
    var dz = null;
    var spx = null;
    var spy = null;
    var zdir = null;
    var BMO = this.BZ.miniMap.origins;
    
    // we never don't update the minimap so w/e

    // always start by clearing what we had
    zone.dd.fillStyle = "black"
    zone.dd.fillRect(0, 0, zone.canvas.width, zone.canvas.height);

    // draw each doorway and the room if it's known
    for (dx = 0; dx < zone.nWidth; dx += 1) {
        for (dy = 0; dy < zone.nHeight; dy += 1) {
            
            // skip the room if it's void
            if (nMap[dx][dy].known != 'void') {
                // update the sides to reflect anything that's happened
                nMap[dx][dy].updateSides();
                
                //brace yourself
                spx = zone.sWidth * dx;
                spy = zone.sHeight * dy;
                
                // set the room color by its known value, then fill it
                zone.dd.fillStyle = this.BC[nMap[dx][dy].known];
                zone.dd.fillRect(
                    (spx + BMO.room.x), (spy + BMO.room.y),
                    BMO.room.w, BMO.room.h
                );
                // now it gets real
                // let's draw all 4 sides of the room
                for (dz = 0; dz < this.BD.four.length; dz += 1) {
                    zdir = this.BD.four[dz];
                    
                    zone.dd.fillStyle = this.BC[nMap[dx][dy].sides[zdir]];
                    zone.dd.fillRect(
                        (spx + BMO[zdir].x), (spy + BMO[zdir].y),
                        BMO[zdir].w, BMO[zdir].h
                    );
                }
            }
        }
    }
    zone.dirty = 'filthy';
    return 'cleaned';
};

POM.Scene.prototype.composeStatZone = function(zone) {
    
    var PC = null;
    var dx = null;
    var dy = null;
    var temp = null;
    var BSH = POM.BASE.sheets;
    var BZSPO = POM.BASE.zones.statPane.origins;
    if (this.GEng.player != null) {
        PC = this.GEng.player;
        
        zone.dd.drawImage(BSH.stat.base,
                          0, 0,
                          BSH.stat.base.width, BSH.stat.base.height,
                          0, 0,
                          BSH.stat.base.width, BSH.stat.base.height
                         );

        // draw the player's items if they have any
        if (PC.mob.items.slotA != null) {
            zone.dd.drawImage(BSH.play.items.allItems,
                              PC.mob.items.slotA.sprite.sheetX, PC.mob.items.slotA.sprite.sheetY,
                              PC.mob.items.slotA.sprite.width, PC.mob.items.slotA.sprite.height,
                              BZSPO.items.L.x, BZSPO.items.L.y,
                              PC.mob.items.slotA.sprite.width, PC.mob.items.slotA.sprite.height
                             );
        }
        if (PC.mob.items.slotB != null) {
            zone.dd.drawImage(BSH.play.items.allItems,
                              PC.mob.items.slotB.sprite.sheetX, PC.mob.items.slotB.sprite.sheetY,
                              PC.mob.items.slotB.sprite.width, PC.mob.items.slotB.sprite.height,
                              BZSPO.items.R.x, BZSPO.items.L.y,
                              PC.mob.items.slotB.sprite.width, PC.mob.items.slotB.sprite.height
                             );
        }
        
        
        // draw the player's rings if they have any
        if (PC.rings.have.length > 0) {
            for (dx = 0; dx < PC.rings.have.length; dx += 1) {                
                zone.dd.drawImage(BSH.stat.prog,
                                  BSH.stat.rings.locs[PC.rings.have[dx]].x,
                                  BSH.stat.rings.locs[PC.rings.have[dx]].y,
                                  BSH.stat.rings.locs[PC.rings.have[dx]].w,
                                  BSH.stat.rings.locs[PC.rings.have[dx]].h,
                                  BZSPO.rings[PC.rings.have[dx]].x,
                                  BZSPO.rings[PC.rings.have[dx]].y,
                                  BSH.stat.rings.locs[PC.rings.have[dx]].w,
                                  BSH.stat.rings.locs[PC.rings.have[dx]].h

                );
            }
            // god i hope that works
        }
        
        // draw the player's health
        if (PC.mob.hpCur > 0) {
            for (dx = 0; dx < BZSPO.memory.locs.length; dx += 1) {
                if ((PC.mob.hpCur - 1) < dx) {
                    // this one is hurt
                    zone.dd.fillStyle = POM.BASE.colors.hurt;
                }
                else if (PC.mob.hpCur >= dx) {
                    if ((PC.memory.rooms.length - 1) < dx) {
                        zone.dd.fillStyle = POM.BASE.colors.fine;
                    }
                    else {
                        zone.dd.fillStyle = POM.BASE.colors.seen;
                    }
                }
                zone.dd.fillRect(
                    BZSPO.memory[BZSPO.memory.locs[dx]].x,
                    BZSPO.memory[BZSPO.memory.locs[dx]].y,
                    BZSPO.memory[BZSPO.memory.locs[dx]].w,
                    BZSPO.memory[BZSPO.memory.locs[dx]].h
                );
            }
        }
    }
    
    
    zone.dirty = 'filthy';
    return 'cleaned';
};