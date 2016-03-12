// POM.BASE

POM.BASE = {
    
    dirs: {
        four: ['N', 'E', 'S', 'W'],
        eight: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
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
        pairs: {
            N: 'S',
            E: 'W',
            S: 'N',
            W: 'E',
        },
        
    },
    
    floor: {
        nWidth: 5,
        nHeight: 5,
    },
    
    room: {
        sheet: null,
        tWidth: 13,
        tHeight: 13,
        sides: {
            N: {x:  6, y:  0},
            E: {x: 12, y:  6},
            S: {x:  6, y: 12},
            W: {x:  0, y:  6},
        },
        // When you leave a room, you appear just outside the doorway in the next room
        // This is to create the illusion of shared walls between rooms
        exits: {
            N: {x:  6, y: 11, xd:  6, yd: 12},
            E: {x:  1, y:  6, xd:  0, yd:  6},
            S: {x:  6, y:  1, xd:  6, yd:  0},
            W: {x: 11, y:  6, xd: 12, yd:  6},
        },
        facings: {
            N: {
                wall: 'hWall',
                door: 'hDoor',
            },
            E: {
                wall: 'vWall',
                door: 'vDoor',
            },
            S: {
                wall: 'hWall',
                door: 'hDoor',
            },
            W: {
                wall: 'vWall',
                door: 'vDoor',
            },
        },
        layout: [
            "vWall,vWall,vWall,vWall,vWall,vWall,vDoor,vWall,vWall,vWall,vWall,vWall,hWall",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "hDoor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hDoor",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "vWall,vWall,vWall,vWall,vWall,vWall,vDoor,vWall,vWall,vWall,vWall,vWall,hWall",
        ],
    },
    
    colors: {
        void: "black",
        active: "white",
        known: "gray",
        wall: "black",
        open: "white",
        door: "gray",
    },
    
    views: {
        intv: (1000/15),
        fader: 0.125,
        main: {
            canvas: null,
        },
        work: {
            canvas: null,
        }
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
                    "no1",
                    "no2",
                    "no3",
                    "no4",
                    "no5",
                    "no6",
                    "no7",
                    "orb"
                ],
                allItems: null,
            }
        },
        font: {
            sWidth: 9,
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
    
    player: {
        // starting location and starting room
        locX: 6,
        locY: 6,
        roomX: 2,
        roomY: 2,
        start: 'sphere',
        journey: {
            sphere: null,
            limbo: null,
            ascent: null,
        },
        classes: [
            'wrath',
            'envy',
            'pride',
            'lust',
            'gluttony',
            'sloth',
            'greed'
        ],
        kinds: [
            'avatarA',
            'avatarB',
            'avatarC',
            'avatarD',
            'avatarE',
        ],
    },
    
    mobs: {
        avatarA: {
            kind: 'avatarA',
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
        avatarB: {
            kind: 'avatarB',
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
        avatarC: {
            kind: 'avatarC',
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
        avatarD: {
            kind: 'avatarD',
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
        avatarE: {
            kind: 'avatarE',
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
            items: {
                slotA: null,
                slotB: 'unable',
            },
        },
    },
    
    sprites: {
        env: {},
        play: {
            mobs: {},
            items: {},
        },
        font: {},
    },
    
    scenes: {
        title: {
            logo: null,
            menu: null,
            loading: null,
            credits: null,
        },
        game: [
            'playArea',
            'textLog',
            'miniMap',
            'statPane'
        ],
    },
    
    zones: {
        logo: {
            canvas: null,
        },
        menu: {
            canvas: null,
        },
        loading: {
            canvas: null,
        },
        credits: {
            canvas: null,
        },
        playArea: {
            canvas: null,
            sheet: null,
            originX: 0,
            originY: 160,
            sWidth: 32,
            sHeight: 32,
            nWidth: 13,
            nHeight: 13,
        },
        textLog: {
            canvas: null,
            sheet: null,
            originX: 0,
            originY: 0,
            sWidth: 9,
            sHeight: 16,
            nWidth: 64,
            nHeight: 10,
        },
        miniMap: {
            canvas: null,
            sheet: null,
            originX: 416,
            originY: 160,
            sWidth: 32,
            sHeight: 32,
            nWidth: 5,
            nHeight: 5,
            origins: {
                N: {x: 12, y:  0, w: 8, h: 4},
                E: {x: 28, y: 12, w: 4, h: 8},
                S: {x: 12, y: 28, w: 8, h: 4},
                W: {x: 0, y:  12, w: 4, h: 8},
                room: {x: 4, y: 4, w: 24, h: 24},
            },
        },
        statPane: {
            canvas: null,
        },
    },
        
    
};

POM.BASE.init = function() {
    
    // You'll need these, trust me
    
    var dx;
    var dy;
    var dw;
    var dh;
    
    // Views
    
    POM.BASE.views.main.canvas = document.getElementById("mainView");
    POM.BASE.views.work.canvas = document.getElementById("workView");
    
    // Zones
    
    POM.BASE.zones.playArea.canvas = document.getElementById("playZone");
    POM.BASE.zones.textLog.canvas = document.getElementById("textZone");
    POM.BASE.zones.miniMap.canvas = document.getElementById("miniZone");
    POM.BASE.zones.statPane.canvas = document.getElementById("statZone");
    
    // Spritesheets
    
    POM.BASE.sheets.env.sphere = document.getElementById("envSphere");
    POM.BASE.sheets.env.limbo = document.getElementById("envLimbo");
    POM.BASE.sheets.env.ascent = document.getElementById("envAscent");
    POM.BASE.room.sheet = POM.BASE.sheets.env.sphere;
    POM.BASE.player.journey.sphere = POM.BASE.sheets.env.sphere;
    POM.BASE.player.journey.limbo = POM.BASE.sheets.env.limbo;
    POM.BASE.player.journey.ascent = POM.BASE.sheets.env.ascent;
    
    POM.BASE.sheets.play.mobs.allMobs = document.getElementById("playMobs");
    POM.BASE.sheets.play.mobs.allItems = document.getElementById("playItems");
    
    POM.BASE.sheets.font.face = document.getElementById("fontFace");
    POM.BASE.zones.textLog.sheet = POM.BASE.sheets.font.face;
    
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
    

}*/