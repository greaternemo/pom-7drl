// POM.Scene

POM.Scene = function(params) {
    this.zones = [];
    this.active = false;
    
    this.init(params);
}

POM.Scene.prototype.init = function(params) {
    
};

POM.Scene.prototype.registerZone = function(kind, zone) {
    this.zones.push(zone);
};

POM.Scene.prototype.composeYourself = function() {
    // for loop over zones
    // iterate over them and call composition methods by type
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
    
}

POM.Scene.prototype.compose = function(zone) {
    var outcome;
    switch (zone.kind) {
        case "play":
            outcome = this.composePlayZone(zone);
            break;
        case "text":
            outcome = this.composeTextZone(zone);
            break;
        case "mini":
            outcome = this.composeMiniZone(zone);
            break;
        case "stat":
            outcome = this.composeStatZone(zone);
            break;
    }
    return outcome;
}

POM.Scene.prototype.composePlayZone = function () {
    
};

POM.Scene.prototype.composeTextZone = function(zone) {
    if (zone.dirty == 'filthy') {
        var cdd = zone.dd;
        var tempString = "";
        var tempArray = null;
        var aRow = 0;
        var aCol = 0;

        // always start by clearing what we had
        cdd.fillStyle = "black"
        cdd.fillRect(0, 0, zone.canvas.width, zone.canvas.height);
        
        for (aRow = 0; aRow < zone.nHeight; aRow += 1) {
            aCol = 0;
            tempString = "";

            tempString += POM.messageLog[aRow];
            tempArray = tempString.split("");
            for (aCol; aCol < tempArray.length; aCol += 1) {
                var mySpr = POM.BASE.sprites.font[tempArray[aCol]];
                cdd.drawImage(zone.sheet,
                    mySpr.sheetX, mySpr.sheetY,
                    mySpr.width, mySpr.height,
                    (zone.sWidth * aCol), (zone.sHeight * aRow),
                    zone.sWidth, zone.sHeight);
            }
        }
        zone.dirty = false;
        return "cleaned";
    }

};

POM.Scene.prototype.composeMiniZone = function() {
    
};

POM.Scene.prototype.composeStatZone = function() {
    
};