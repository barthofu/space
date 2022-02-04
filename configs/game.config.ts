export const gameConfig = {

    window: {
        
        width: window.innerWidth,
        height: window.innerHeight
    },

    spaceship: {

        size: 30,
        health: 100
    },

    bullet: {

        size: 5,
        damages: 3,
        color: 'blue',
        speed: 4,
        delay: 100,
        lifetime: 1000 // in ms
    },

    thrust: {

        speed: {
            forward: 1,
            backward: -0.3
        },

        particles: {

            speed: 4,
            size: 10,
            lifetime: 500 // in ms
        }
    }
}