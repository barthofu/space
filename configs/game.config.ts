export const gameConfig = {

    window: {
        
        width: window.innerWidth,
        height: window.innerHeight
    },

    spaceship: {

        size: 3,
        health: 100
    },

    bullet: {

        size: 0.5,
        damages: 3,
        color: 'blue',
        speed: 4,
        delay: 50,
        lifetime: 1000 // in ms
    },

    thrust: {

        speed: {
            forward: 1,
            backward: -0.3
        },

        particles: {

            offset: 1.5,
            speed: 4,
            size: 1,
            lifetime: 500 // in ms
        }
    },

    asteroid: {

        size: {
            min: 3,
            max: 30
        },

        radius: { // multiply by size to get radius
            min: 0.9, 
            max: 1 // don't touch this
        },
        
        speed: {
            min: 1,
            max: 3,
            rotation: 0.1
        }

    },

    planet: {

        size: {
            min: 20,
            max: 50,
            offset: 1.4
        },

        speed: {
            coeff: 1,
        },

        colors: [
            'blue',
            'green',
            'pink',
            'purple',
            'red',
            'yellow'
        ]
    },

    sun: {

        sizeOffset: 1.55,
    }

}