import { Scene } from '@core/Scene'
import { 
    Spaceship,
    Camera,
    Asteroid,
    Planet,
    Sun,
    SolarSystem,
    Background
} from '@entities'
import * as systems from '@systems'
import { mapConfig, gameConfig } from '@configs'
import { getAngularPosition, getRandomInt, getScaledSize, randomizeWithinRange } from '@utils/functions'
import { CircleRender, Transform } from '@components'
import { Entity } from '@core/ecs'

export class MainScene extends Scene {

    _systemsToLoad = [
        new systems.ClearCanvas(),
        new systems.ControlPlayer(),
        new systems.MoveEntities(),
        new systems.MoveEntitiesAround(),
        new systems.ShootBullet(),
        new systems.BulletManager(),
        new systems.Thrust(),
        new systems.CollisionsManager(),
        new systems.CenterBackground(),
        new systems.CenterCamera(),
        new systems.DrawOrbits(),
        new systems.Renderer(),
        //new systems.RenderCollisions(),
        new systems.Debug()
    ]
    private ignoreZones: {
        x: number,
        y: number,
        size: number
    }[] = []
    
    public awake() {

        this.generateGalaxy()
        this.loadSystems()
    }


    private generateGalaxy() {

        // define the size of the galaxy
        this.size = getScaledSize(mapConfig.size)

        this.addEntity(new Background())
        this.addEntity(new Camera(true))
        
        // spawn the player's spaceship
        this.addEntity(new Spaceship({
            position: {
                x: mapConfig.size.width / 2,
                y: mapConfig.size.height / 2
            },
            size: gameConfig.spaceship.size,
            health: gameConfig.spaceship.health,
            color: { outline: 'white', fill: 'rgba(255, 255, 255, 0.2)' }
        }))

        // generate the solar system
        this.generateSolarSystem()

        // set the spaceship position near to the solar system
        const spaceship = this.getEntitiesByTag('player')[0]!
        const spaceshipTransform = spaceship.getComponent(Transform)!

        spaceshipTransform.position.x = this.ignoreZones[0].x + this.ignoreZones[0].size + 50
        spaceshipTransform.position.y = this.ignoreZones[0].y
    }


    private generateSolarSystem() {
        
        // 1. get the content of the solar system

        //     1.1. size of the sun
        const sunSize = getRandomInt(gameConfig.planet.size.min * 3, gameConfig.planet.size.max * 2)

        //     1.2. number and properties of planets
        const numberOfPlanets = getRandomInt(mapConfig.solarSystem.minPlanets, mapConfig.solarSystem.maxPlanets)
        
        //    1.3. defining sizes of planets and their order
        const planetSizes = []
        for (let i = 0; i < numberOfPlanets; i++) planetSizes.push(getRandomInt(gameConfig.planet.size.min, gameConfig.planet.size.max))
        planetSizes.sort((a, b) => a - b)

        //    1.4 creating the objects of the planets
        const planetsColor = gameConfig.planet.colors
        const planets = planetSizes.map((planetSize, i) => {

            // get a random color, and then delete it to not have the same color twice in the solar system
            const planetColorIndex = getRandomInt(0, gameConfig.planet.colors.length - 1)
            const planetColor = planetsColor[planetColorIndex]
            planetsColor.splice(planetColorIndex, 1)

            return {
                size: planetSize,
                distance: randomizeWithinRange((i + 1) * gameConfig.planet.size.max * 1.5, 0) + sunSize / 2,
                color: planetColor,
                rotationSpeed: (numberOfPlanets - i) * gameConfig.planet.speed.coeff * 2
            }
        })

        // 2. from the content, get the size of the solar system
        const sizeOfTheSolarSystem = Math.max.apply(Math, planets.map(planet => planet.distance))
        
        // 3. get the position of the center of the galaxy, which can't conflict with :
        //    - the spaceship
        //    - other galaxies
        //    - the world limits

        let position: vector

        while (true) {

            // 3.1. get a random position
            position = {
                x: getRandomInt(0, this.size.width),
                y: getRandomInt(0, this.size.height)
            }

            // 3.2. check if the position is valid
            if (this.isValidPosition(position, sizeOfTheSolarSystem)) break
        }

        // 4. now that we have its definition, we can actualy create the solar system
        const solarSystem = new SolarSystem()

        const sun = new Sun({ position, size: sunSize })
        solarSystem.addEntity(sun)

        for (const planet of planets) {

            // create the planet entity
            const planetEntity = new Planet({
                asset: `planets/planet_${planet.color}.png`,
                position: getAngularPosition(
                    { x: position.x + planet.distance, y: position.y },
                    position,
                    getRandomInt(0, 360)
                ),
                size: planet.size,
                rotationSpeed: planet.rotationSpeed,
                sizeOffset: gameConfig.planet.size.offset,
                sunRef: sun
            })

            // add the orbit of the planet as an entity
            const orbitEntity = new Entity()
            orbitEntity.addComponent(new Transform(position, 0, { x: 0, y: 0, rotation: 0 }))
            orbitEntity.addComponent(new CircleRender(planet.distance, { outline: 'rgba(255,255,255,0.25)' }))
            orbitEntity.tag = `orbit_${planetEntity.id}`

            solarSystem.addEntity(orbitEntity)
            solarSystem.addEntity(planetEntity)
        }

        this.addEntity(solarSystem)
        
        this.ignoreZones.push({
            x: position.x,
            y: position.y,
            size: sizeOfTheSolarSystem
        })
    }


    private isValidPosition(position: vector, size: number) {

        // 1. check if the position is inside the galaxy
        if (position.x - size / 2  < 0 || 
            position.x + size / 2 > this.size.width ||
            position.y - size / 2 < 0 ||
            position.y + size / 2 > this.size.height) {

            return false
        }

        // 2. check if the position is in the camera
        const camera = this.getEntitiesByTag('mainCamera')[0]!
        const cameraTransform = camera.getComponent(Transform)!
        const cameraPosition = cameraTransform.position

        if (position.x - size / 2 < cameraPosition.x - this.size.width / 2 ||
            position.x + size / 2 > cameraPosition.x + this.size.width / 2 ||
            position.y - size / 2 < cameraPosition.y - this.size.height / 2 ||
            position.y + size / 2 > cameraPosition.y + this.size.height / 2) {

            return false
        }

        // 3. check if the position is conflicting with an ignore zone
        for (const ignoreZone of this.ignoreZones) {

            if (position.x - size / 2 < ignoreZone.x + ignoreZone.size / 2 &&
                position.x + size / 2 > ignoreZone.x - ignoreZone.size / 2 &&
                position.y - size / 2 < ignoreZone.y + ignoreZone.size / 2 &&
                position.y + size / 2 > ignoreZone.y - ignoreZone.size / 2) {

                return false
            }
        }

        // 4. if the position is valid, return true
        return true
    }


}