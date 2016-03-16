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
        octants: {
            N:  {x:  1, y: -1},
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
    
    actions: {
        KeyL: 'slotA',
        KeyR: 'slotB',
        //KeyO: 'orb',
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
        // shoehorning this in for the basic setup
        spawns: {
            mob: [
                {x:  2, y:  2},
                {x:  2, y:  6},
                {x:  2, y: 10},
                {x:  6, y:  2},
                {x: 10, y:  2},
                {x: 10, y:  6},
                {x: 10, y: 10}
            ],
            item: [
                {x:  3, y:  3},
                {x:  3, y:  9},
                {x:  9, y:  3},
                {x:  9, y:  9}
            ],
        },
        shapes: {
            // kinds are listed by doors, NESW, where n is no door and d is a door
            kinds: {
                nnnn: 'V',
                nnnd: 'DW',
                nndn: 'DS',
                nndd: 'CSW',
                ndnn: 'DE',
                ndnd: 'HH',
                nddn: 'CSE',
                nddd: 'TN',
                dnnn: 'DN',
                dnnd: 'CNW',
                dndn: 'HV',
                dndd: 'DE',
                ddnn: 'CNE',
                ddnd: 'DS',
                dddn: 'DW',
                dddd: 'X',
                
            },
            // 6 room shapes based on doors available.
            
            // X: all 4 doors. A cross.
            X: {},
           
            // T: 3 doors, 1 wall, named by wall side. A T-junction.
            TN: {},
            TE: {},
            TS: {},
            TW: {},
            
            // H: 2 doors, 2 walls opposite each other. A hallway.
            HH: {},
            HV: {},
            
            // C: 2 doors with a wall opposite each. A corner.
            CNE: {},
            CSE: {},
            CSW: {},
            CNW: {},
            
            // D: 1 door with 3 walls. A dead end.
            DN: {},
            DE: {},
            DS: {},
            DW: {},
            
            // V: no doors. A void room.
            V: {},
            
        },
         layout: [
            "vWall,vWall,vWall,vWall,vWall,vWall,vDoor,vWall,vWall,vWall,vWall,vWall,hWall",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "hWall,floor,floor,floor,hWall,floor,hWall,floor,hWall,floor,floor,floor,hWall",
            "hWall,floor,floor,vWall,hWall,floor,floor,floor,vWall,hWall,floor,floor,hWall",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "hDoor,floor,floor,hWall,floor,floor,floor,floor,floor,hWall,floor,floor,hDoor",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "hWall,floor,floor,vWall,hWall,floor,floor,floor,vWall,hWall,floor,floor,hWall",
            "hWall,floor,floor,floor,hWall,floor,hWall,floor,hWall,floor,floor,floor,hWall",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "vWall,vWall,vWall,vWall,vWall,vWall,vDoor,vWall,vWall,vWall,vWall,vWall,hWall",
        ],
        /*
       layout: [
            "vWall,vWall,vWall,vWall,vWall,vWall,vDoor,vWall,vWall,vWall,vWall,vWall,hWall",
            "hWall,floor,floor,floor,hWall,floor,floor,floor,hWall,floor,floor,floor,hWall",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "hWall,floor,floor,floor,hWall,floor,floor,floor,hWall,floor,floor,floor,hWall",
            "vWall,hWall,floor,vWall,vWall,hWall,floor,vWall,vWall,hWall,floor,vWall,hWall",
            "hWall,floor,floor,floor,hWall,floor,floor,floor,hWall,floor,floor,floor,hWall",
            "hDoor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hDoor",
            "hWall,floor,floor,floor,hWall,floor,floor,floor,hWall,floor,floor,floor,hWall",
            "vWall,hWall,floor,vWall,vWall,hWall,floor,vWall,vWall,hWall,floor,vWall,hWall",
            "hWall,floor,floor,floor,hWall,floor,floor,floor,hWall,floor,floor,floor,hWall",
            "hWall,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,floor,hWall",
            "hWall,floor,floor,floor,hWall,floor,floor,floor,hWall,floor,floor,floor,hWall",
            "vWall,vWall,vWall,vWall,vWall,vWall,vDoor,vWall,vWall,vWall,vWall,vWall,hWall",
        ],
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
        */
    },
    
    colors: {
        // primarily for minimap drawing
        void: "black",
        active: "white",
        known: "gray",
        wall: "black",
        open: "white",
        door: "gray",
        
        // primarily for *airquotes* "health meter"
        hurt: 'black',
        fine: 'gray',
        seen: 'white',
    },
    
    views: {
        intv: {
            spooky: (1000/15),
            ded: (1000),
        },
        fader: 0.125,
        main: {
            canvas: null,
        },
        work: {
            canvas: null,
        }
    },
    
    tiles: {
        // we can make smaller base layout maps if we have glyph conversion
        kinds: {
            'w': 'hWall',
            'W': 'vWall',
            '.': 'floor',
            'd': 'hDoor',
            'D': 'vDoor',
            '#': 'oDoor',
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
        stat: {
            base: null,
            prog: null,
            // rings is a mess because the sprites are irregularly sized
            // also prog is the sheet for rings
            rings: {
                kinds: ['sphere', 'limbo', 'ascent'],
                pieces: {
                    sphere: ['s1', 's2', 's3'],
                    limbo: ['l1', 'l2', 'l3', 'l4', 'l5'],
                    ascent: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'],
                },
                sphere: {
                    s1: {w: 25, h: 11, x:   0, y:  0},
                    s2: {w: 13, h: 21, x:   0, y: 11},
                    s3: {w: 15, h: 20, x:  13, y: 11},
                },
                limbo: {
                    l1: {w: 45, h: 23, x:  28, y:  0},
                    l2: {w: 19, h: 35, x:   0, y: 32},
                    l3: {w: 35, h: 27, x:  73, y:  0},
                    l4: {w: 35, h: 28, x:  42, y: 27},
                    l5: {w: 23, h: 37, x:  19, y: 32},
                },
                ascent: {
                    a1: {w: 47, h: 21, x: 108, y:  0},
                    a2: {w: 40, h: 42, x: 159, y:  0},
                    a3: {w: 20, h: 44, x:  96, y: 42},
                    a4: {w: 33, h: 37, x: 135, y: 42},
                    a5: {w: 51, h: 21, x: 108, y: 21},
                    a6: {w: 31, h: 31, x: 168, y: 42},
                    a7: {w: 19, h: 47, x: 116, y: 42},
                    a8: {w: 37, h: 34, x:  59, y: 55},
                },
                locs: {
                    s1: {w: 25, h: 11, x:   0, y:  0},
                    s2: {w: 13, h: 21, x:   0, y: 11},
                    s3: {w: 15, h: 20, x:  13, y: 11},
                    l1: {w: 45, h: 23, x:  28, y:  0},
                    l2: {w: 19, h: 35, x:   0, y: 32},
                    l3: {w: 35, h: 27, x:  73, y:  0},
                    l4: {w: 35, h: 28, x:  42, y: 27},
                    l5: {w: 23, h: 37, x:  19, y: 32},
                    a1: {w: 47, h: 21, x: 108, y:  0},
                    a2: {w: 40, h: 42, x: 159, y:  0},
                    a3: {w: 20, h: 44, x:  96, y: 42},
                    a4: {w: 33, h: 37, x: 135, y: 42},
                    a5: {w: 51, h: 21, x: 108, y: 21},
                    a6: {w: 31, h: 31, x: 168, y: 42},
                    a7: {w: 19, h: 47, x: 116, y: 42},
                    a8: {w: 37, h: 34, x:  59, y: 55},
                },
            },
            
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
        avatars: [
            'avatarA',
            'avatarB',
            'avatarC',
            'avatarD',
            'avatarE',
        ],
    },
    
    mobs: {
        player: {
            kind: 'avatarE',
            class: 'sinner',
            agent: 'player',
            hpCur: 5,
            hpMax: 5,
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
            hpCur: 1,
            hpMax: 1,
            damage: 1,
            turnWait: 0,
            turnSpeed: 10,
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
        stat: {
            rings: {},
        },
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
            sheet: null,
            originX: 416,
            originY: 320,
            sWidth: 32,
            sHeight: 32,
            nWidth: 5,
            nHeight: 8,
            origins: {
                items: {
                    L: {x:  60, y: 200},
                    R: {x: 108, y: 200},
                },
                memory: {
                    locs: ['mem0', 'mem1', 'mem2', 'mem3', 'mem4'],
                    mem0: {w: 28, h: 4, x:   2, y: 6,},
                    mem1: {w: 28, h: 4, x:  33, y: 6,},
                    mem2: {w: 28, h: 4, x:  64, y: 6,},
                    mem3: {w: 28, h: 4, x:  95, y: 6,},
                    mem4: {w: 28, h: 4, x: 126, y: 6,},
                },
                rings: {
                    //sphere: {
                        s1: {x:  66, y:  88},
                        s2: {x:  62, y:  98},
                        s3: {x:  79, y:  99},
                    //},
                    //limbo: {
                        l1: {x:  58, y: 120},
                        l2: {x:  99, y:  91},
                        l3: {x:  80, y:  63},
                        l4: {x:  42, y:  63},
                        l5: {x:  38, y:  92},
                    //},
                    //ascent: {
                        a1: {x:  50, y:  39},
                        a2: {x:  97, y:  44},
                        a3: {x: 122, y:  83},
                        a4: {x:  99, y: 125},
                        a5: {x:  51, y: 146},
                        a6: {x:  22, y: 127},
                        a7: {x:  14, y:  84},
                        a8: {x:  18, y:  50},
                    //},
                },
            },
        },
    },
        
    
};

POM.BASE.init = function() {
    
    // You'll need these, trust me
    
    var dx;
    var dy;
    var dw;
    var dh;
    var temp;
    
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
    POM.BASE.sheets.play.items.allItems = document.getElementById("playItems");
    
    POM.BASE.sheets.font.face = document.getElementById("fontFace");
    POM.BASE.zones.textLog.sheet = POM.BASE.sheets.font.face;
    
    POM.BASE.sheets.stat.base = document.getElementById("statBase");
    POM.BASE.sheets.stat.prog = document.getElementById("progRings");
    
    
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
    
    // POM.BASE.sheets.play.items - POM.BASE.sprites.play.items
    for (dx = 0; dx < POM.BASE.sheets.play.items.cols.length; dx += 1) {
        POM.BASE.sprites.play.items[POM.BASE.sheets.play.items.cols[dx]] = new POM.Sprite ({
            width: POM.BASE.sheets.play.items.sWidth,
            height: POM.BASE.sheets.play.items.sHeight,
            sheetX: (POM.BASE.sheets.play.items.sWidth * dx),
            sheetY: 0,
            kind: POM.BASE.sheets.play.items.cols[dx],
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
    
    temp = POM.BASE.sheets.stat;
    // POM.BASE.sheets.stat.prog - POM.BASE.sprites.stat.rings
    for (dx = 0; dx < temp.rings.kinds.length; dx += 1) {
        for (dy = 0; dy < temp.rings.pieces[temp.rings.kinds[dx]].length; dy += 1) {
            POM.BASE.sprites.stat.rings[temp.rings.pieces[temp.rings.kinds[dx]][dy]] = new POM.Sprite ({
                width: temp.rings[temp.rings.kinds[dx]][temp.rings.pieces[temp.rings.kinds[dx]][dy]].w,
                height: temp.rings[temp.rings.kinds[dx]][temp.rings.pieces[temp.rings.kinds[dx]][dy]].h,
                sheetX: temp.rings[temp.rings.kinds[dx]][temp.rings.pieces[temp.rings.kinds[dx]][dy]].x,
                sheetY: temp.rings[temp.rings.kinds[dx]][temp.rings.pieces[temp.rings.kinds[dx]][dy]].y,
                kind: temp.rings.pieces[temp.rings.kinds[dx]][dy],
            })
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