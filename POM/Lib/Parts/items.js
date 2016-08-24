// POM.Lib.Parts.items
// Entity blueprints for different items

POM.Lib.Parts.items = {
    
    // Identified items
    
    crystalBall: {
        KnownInfo: {
            itemName: 'crystal ball',
        },
        Usable: {
            bySpecies: ['avatar'],
        },
        NeedsConfirmation: {
            text: '10 turns of meditation',
        },
        AffectsUser: {
            effect: 'meditation',
            duration: 10,
        },
        Location: {
            x: 0,
            y: 0,
        },
    },

    // Unidentified items
    
    greenOrb: {
        UnknownInfo: {
            itemName: 'green orb',
        },
        Render: {
            layer: 'item',
            sprite: 'greenOrb',
            dirty: true,
        },
    }
    
};