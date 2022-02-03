const { System, Circle } = require('detect-collisions')

const system = new System()

const planet = new Circle({ x: 100, y: 100 }, 10);
const spaceship = new Circle({ x: 80, y: 80 }, 2);
const asteroid1 = new Circle({ x: 50, y: 50 }, 5);
const asteroid2 = new Circle({ x: 110, y: 110 }, 5);

system.insert(planet);
system.insert(spaceship);
system.insert(asteroid1);
system.insert(asteroid2);

system.update()

system.checkAll(res => {
    console.log(res)
})

