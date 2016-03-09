// POM.BASE

POM.BASE = {
    
    dirs: {
        codes: {
            ArrowUp: 'N',
            ArrowRight: 'E',
            ArrowDown: 'S',
            ArrowLeft: 'W',
        },
        deltas: {
            N:  {x:  0, y: -1},
            NE: {x:  1, y: -1},
            E:  {x:  1, y:  0},
            SE: {x:  1, y:  1},
            S:  {x:  0, y:  1},
            SW: {x: -1, y:  1},
            W:  {x: -1, y:  0},
            NW: {x: -1, y: -1},
        },
        
    },
            
    sheets: {
        env: {
            sWidth: 32,
            sHeight: 32,
            cols: [
                "hWall",
                "vWall",
                "floor",
                "hDoor",
                "vDoor",
                "oDoor"
            ],
            sphere: null,
            limbo: null,
            ascent: null,
        },
        play: {
            mobs: {
                sWidth: 32,
                sHeight: 32,
                cols: [
                    "avatarA",
                    "avatarB",
                    "avatarC",
                    "avatarD",
                    "avatarE",
                    "zombie",
                    "spirit",
                    "wraith"
                ],
                allMobs: null,
            },
            items: {
                sWidth: 32,
                sHeight: 32,
                cols: [
                    "avatarA",
                    "avatarB",
                    "avatarC",
                    "avatarD",
                    "avatarE",
                    "zombie",
                    "spirit",
                    "wraith"
                ],
                allItems: null,
            }
        },
        font: {
            sWidth: 16,
            sHeight: 16,
            rows:  [
                "digit",
                "symbol",
                "lower",
                "upper"
            ],
            cols: {
                digit: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " "],
                symbol: ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "-", "=",
                        "<", ">", "[", "]", "\"", ",", ".", ":", ";", "/", "\\", "?", "'"],
                lower: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
                        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
                upper: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
                        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
            },
            face: null,
        },
    },
    
    sprites: {
        env: {},
        play: {
            mobs: {},
            items: {},
        },
        font: {},
    }
};

POM.BASE.init = function() {
    
    // You'll need these, trust me
    
    var dx;
    var dy;
    var dw;
    var dh;
    
    // Spritesheets
    
    POM.BASE.sheets.env.sphere = document.getElementById("envSphere");
    POM.BASE.sheets.env.limbo = document.getElementById("envLimbo");
    POM.BASE.sheets.env.ascent = document.getElementById("envAscent");
    
    POM.BASE.sheets.play.mobs.allMobs = document.getElementById("playMobs");
    
    POM.BASE.sheets.font.face = document.getElementById("fontFace");
    
    // FOR THE LOVE OF GOD, WAIT UNTIL YOUR IMAGES LOAD, BRUH
        
    // Sprites
    
    // POM.BASE.sheets.env - POM.BASE.sprites.env
    for (dx = 0; dx < POM.BASE.sheets.env.cols.length; dx += 1) {
        POM.BASE.sprites.env[POM.BASE.sheets.env.cols[dx]] = new POM.Sprite ({
            width: POM.BASE.sheets.env.sWidth,
            height: POM.BASE.sheets.env.sHeight,
            sheetX: (POM.BASE.sheets.env.sWidth * dx),
            sheetY: 0,
            kind: POM.BASE.sheets.env.cols[dx],
        });
    }
    // POM.BASE.sheets.play.mobs - POM.BASE.sprites.play.mobs
    for (dx = 0; dx < POM.BASE.sheets.play.mobs.cols.length; dx += 1) {
        POM.BASE.sprites.play.mobs[POM.BASE.sheets.play.mobs.cols[dx]] = new POM.Sprite ({
            width: POM.BASE.sheets.play.mobs.sWidth,
            height: POM.BASE.sheets.play.mobs.sHeight,
            sheetX: (POM.BASE.sheets.play.mobs.sWidth * dx),
            sheetY: 0,
            kind: POM.BASE.sheets.play.mobs.cols[dx],
        });
    }

    // POM.BASE.sheets.font - POM.BASE.sprites.font
    for (dy = 0; dy < POM.BASE.sheets.font.rows.length; dy += 1) {
        for (dx = 0; dx < POM.BASE.sheets.font.cols[POM.BASE.sheets.font.rows[dy]].length; dx += 1) {
            POM.BASE.sprites.font[POM.BASE.sheets.font.cols[POM.BASE.sheets.font.rows[dy]][dx]] = new POM.Sprite({
                width: POM.BASE.sheets.font.sWidth,
                height: POM.BASE.sheets.font.sHeight,
                sheetX: (POM.BASE.sheets.font.sWidth * dx),
                sheetY: (POM.BASE.sheets.font.sHeight * dy),
                kind: POM.BASE.sheets.font.cols[POM.BASE.sheets.font.rows[dy]][dx],
            });
        }
    }
    
    
    
}
    
/*    
    
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