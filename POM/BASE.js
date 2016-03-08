// POM.BASE

POM.BASE = {
            
    sheets: {
        env: {
            sWidth: 32,
            sHeight: 32,
            sphere: null,
            limbo: null,
            ascent: null,
        },
        play: {
            sWidth: 32,
            sHeight: 32,
            mobs: null,
        }
    },
    
    sprites: {
        env: {
            hWall: null,
            vWall: null,
            floor: null,
            hDoor: null,
            vDoor: null,
            oDoor: null,
        },
        play: {
            mobs: {
                avatarA: null,
                avatarB: null,
                avatarC: null,
                avatarD: null,
                avatarE: null,
                zombie: null,
                spirit: null,
                wraith: null,
            },
        },
    }
};

POM.BASE.init = function() {
            
    // Spritesheets
    
    POM.BASE.sheets.env.sphere = document.getElementById("envSphere");
    POM.BASE.sheets.env.limbo = document.getElementById("envLimbo");
    POM.BASE.sheets.env.ascent = document.getElementById("envAscent");
    POM.BASE.sheets.play.mobs = document.getElementById("playMobs");
    
    // FOR THE LOVE OF GOD, WAIT UNTIL YOUR IMAGES LOAD, BRUH
        
    // Sprites
    
    POM.BASE.sprites.env.hWall = new POM.Sprite({
        width: POM.BASE.sheets.env.sWidth,
        height: POM.BASE.sheets.env.sHeight,
        sheetX: (POM.BASE.sheets.env.sWidth * 0),
        sheetY: 0,
        kind: 'hWall',
    });
    POM.BASE.sprites.env.vWall = new POM.Sprite({
        width: POM.BASE.sheets.env.sWidth,
        height: POM.BASE.sheets.env.sHeight,
        sheetX: (POM.BASE.sheets.env.sWidth * 1),
        sheetY: 0,
        kind: 'vWall',
    });
    POM.BASE.sprites.env.floor = new POM.Sprite({
        width: POM.BASE.sheets.env.sWidth,
        height: POM.BASE.sheets.env.sHeight,
        sheetX: (POM.BASE.sheets.env.sWidth * 2),
        sheetY: 0,
        kind: 'floor',
    });
    POM.BASE.sprites.env.hDoor = new POM.Sprite({
        width: POM.BASE.sheets.env.sWidth,
        height: POM.BASE.sheets.env.sHeight,
        sheetX: (POM.BASE.sheets.env.sWidth * 3),
        sheetY: 0,
        kind: 'hDoor',
    });
    POM.BASE.sprites.env.vDoor = new POM.Sprite({
        width: POM.BASE.sheets.env.sWidth,
        height: POM.BASE.sheets.env.sHeight,
        sheetX: (POM.BASE.sheets.env.sWidth * 4),
        sheetY: 0,
        kind: 'vDoor',
    });
    POM.BASE.sprites.env.oDoor = new POM.Sprite({
        width: POM.BASE.sheets.env.sWidth,
        height: POM.BASE.sheets.env.sHeight,
        sheetX: (POM.BASE.sheets.env.sWidth * 5),
        sheetY: 0,
        kind: 'oDoor',
    });
    
    POM.BASE.sprites.play.mobs.avatarA = new POM.Sprite({
        width: POM.BASE.sheets.play.sWidth,
        height: POM.BASE.sheets.play.sHeight,
        sheetX: (POM.BASE.sheets.play.sWidth * 0),
        sheetY: 0,
        kind: 'avatarA',
    });
    POM.BASE.sprites.play.mobs.avatarB = new POM.Sprite({
        width: POM.BASE.sheets.play.sWidth,
        height: POM.BASE.sheets.play.sHeight,
        sheetX: (POM.BASE.sheets.play.sWidth * 1),
        sheetY: 0,
        kind: 'avatarB',
    });
    POM.BASE.sprites.play.mobs.avatarC = new POM.Sprite({
        width: POM.BASE.sheets.play.sWidth,
        height: POM.BASE.sheets.play.sHeight,
        sheetX: (POM.BASE.sheets.play.sWidth * 2),
        sheetY: 0,
        kind: 'avatarC',
    });
    POM.BASE.sprites.play.mobs.avatarD = new POM.Sprite({
        width: POM.BASE.sheets.play.sWidth,
        height: POM.BASE.sheets.play.sHeight,
        sheetX: (POM.BASE.sheets.play.sWidth * 3),
        sheetY: 0,
        kind: 'avatarD',
    });
    POM.BASE.sprites.play.mobs.avatarE = new POM.Sprite({
        width: POM.BASE.sheets.play.sWidth,
        height: POM.BASE.sheets.play.sHeight,
        sheetX: (POM.BASE.sheets.play.sWidth * 4),
        sheetY: 0,
        kind: 'avatarE',
    });
    POM.BASE.sprites.play.mobs.zombie = new POM.Sprite({
        width: POM.BASE.sheets.play.sWidth,
        height: POM.BASE.sheets.play.sHeight,
        sheetX: (POM.BASE.sheets.play.sWidth * 5),
        sheetY: 0,
        kind: 'zombie',
    });
    POM.BASE.sprites.play.mobs.spirit = new POM.Sprite({
        width: POM.BASE.sheets.play.sWidth,
        height: POM.BASE.sheets.play.sHeight,
        sheetX: (POM.BASE.sheets.play.sWidth * 6),
        sheetY: 0,
        kind: 'spirit',
    });
    POM.BASE.sprites.play.mobs.wraith = new POM.Sprite({
        width: POM.BASE.sheets.play.sWidth,
        height: POM.BASE.sheets.play.sHeight,
        sheetX: (POM.BASE.sheets.play.sWidth * 7),
        sheetY: 0,
        kind: 'wraith',
    });

}
    
/*    
    sprites: {
        play: {
            w: 32,
            h: 32,
            void: {
                ox: 0,
                oy: 0,
            },
            wall: {
                ox: 1,
                oy: 0,
            },
            floor: {
                ox: 2,
                oy: 0,
            },
            cdoor: {
                ox: 3,
                oy: 0,
            },
            odoor: {
                ox: 4,
                oy: 0,
            },
            man: {
                ox: 5,
                oy: 0,
            },
            zombie: {
                ox: 6,
                oy: 0,
            },
            orb: {
                ox: 7,
                oy: 0,
            },
            
        }
    },
    
    mobs: {
        man: {
            kind: 'man',
            class: 'sinner',
            agent: 'player',
            health: 5,
            damage: 1,
            turnWait: 0,
            turnSpeed: 15,
            items: {
                slotA: null,
                slotB: null,
            },
        },
        zombie: {
            kind: 'zombie',
            class: 'zombie',
            agent: 'zombie',
            health: 1,
            damage: 1,
            turnWait: 0,
            turnSpeed: 15,
            items: {},
        },
    },
    
    items: {
        orb: {
            kind: 'orb',
            
        }
    },
    
    tiles: {
        void: {
            kind: 'void',
            attrs: [],
        },
        wall: {
            kind: 'wall',
            attrs: [],
        },
        floor: {
            kind: 'floor',
            attrs: [
                'walk',
                'floor'
            ]
        },
        cdoor: {
            kind: 'cdoor',
            attrs: [
                'cdoor'
            ]
        },
        odoor: {
            kind: 'odoor',
            attrs: [
                'walk',
                'odoor'
            ]
        },
    },
    
    canvases: [
        'mainView',
        'workView',
        'initZone',
        'loadZone',
        'playZone',
        'textZone',
        'mmapZone',
        'gearZone'
    ],



}*/