// POM.Lib.Parts.zones
// Entity blueprints for different zones

POM.Lib.Parts.zones = {
    
    // Visible room
    roomMap: {
        Size: {
            h: 0,
            w: 0,
        },
        Origin: {
            x: 0,
            y: 0,
        },
        RenderGrid: {
            // h and w of the grid in number of nodes
            nd: 13,
            // h and w of each node in the grid in pixels
            px: 32,
        },
        RenderLayers: {
            src: '', // activeRoom
            layers: ['tile', 'item', 'mob'],
        }
    },
    
    // Minimap
    miniMap: {
        Size: {
            h: 0,
            w: 0,
        },
        Origin: {
            x: 0,
            y: 0,
        },
        RenderGrid: {
            // h and w of the grid in number of nodes
            nd: 13,
            // h and w of each node in the grid in pixels
            px: 32,
        },
        RenderLayers: {
            src: '', // activeRoom
            layers: ['tile', 'item', 'mob'],
        }
    },
    
    // Text pane
    textPane: {
        Size: {
            h: 0,
            w: 0,
        },
        Origin: {
            x: 0,
            y: 0,
        },
        RenderGrid: {
            // h and w of the grid in number of nodes
            nd: 13,
            // h and w of each node in the grid in pixels
            px: 32,
        },
        RenderLayers: {
            src: '', // activeRoom
            layers: ['text'],
        }
    },
    
    // Stats pane
    statsPane: {
        Size: {
            h: 0,
            w: 0,
        },
        Origin: {
            x: 0,
            y: 0,
        },
        RenderField: {
            nd: 13, // ???
            nodes: {}, // ???
        },
    },
    
};