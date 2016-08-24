// POM.Lib.Parts.mobs
// Entity blueprints for different mobs

POM.Lib.Parts.mobs = {
    
    // Player avatar
    avatar: {
        Identity: {
            species: 'avatar',
            agent: 'player',
        },
        State: {
            waiting: false,
            alive: true,
        },
        Location: {
            x: 0,
            y: 0,
        },
        Render: {
            layer: 'mob',
            sprite: 'avatar',
            dirty: true,
        },
        Movement: {
            speed: 15,
            energy: 0,
            doors: true,
        },
        Hitpoints: {
            current: 5,
            max: 5,
        },
        Damage: {
            base: 1,
        },
        Storage: {
            pickup: true,
            slots: 2,
            held: [],
        },
        Hands: {
            right: '',
            left: '',
        },
    },

    shadow: {
        Identity: {
            species: 'shadow',
            agent: 'shadow',
        },
        State: {
            waiting: false,
            alive: true,
        },
        Location: {
            x: 0,
            y: 0,
        },
        Render: {
            layer: 'mob',
            sprite: 'shadow',
            dirty: true,
        },
        Movement: {
            speed: 10,
            energy: 0,
            doors: false,
        },
        Hitpoints: {
            current: 1,
            max: 1,
        },
        Damage: {
            base: 2,
        },
        Storage: {
            pickup: false,
            slots: 1,
            held: [],
        },
    },

    beast: {
        Identity: {
            species: 'beast',
            agent: 'beast',
        },
        State: {
            waiting: false,
            alive: true,
        },
        Location: {
            x: 0,
            y: 0,
        },
        Render: {
            layer: 'mob',
            sprite: 'beast',
            dirty: true,
        },
        Movement: {
            speed: 10,
            energy: 0,
            doors: false,
        },
        Hitpoints: {
            current: 1,
            max: 1,
        },
        Damage: {
            base: 2,
        },
        Storage: {
            pickup: false,
            slots: 1,
            held: [],
        },
    },
};