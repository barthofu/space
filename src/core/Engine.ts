import { Spaceship, Camera, Asteroid } from '@entities'
import { Renderer, ControlPlayer, CollisionsManager, CenterCamera, MoveEntities } from '@systems'

import { Entity, System } from '@ecs'

export default class Engine extends Entity {

    private _lastTimestamp = 0
    public entities: Entity[] = [
        new Spaceship(),
        new Camera(true),
        new Asteroid(100, { x: 5380, y: 4950 }),
    ]
    public systems: System[] = [
        new ControlPlayer(this),
        new MoveEntities(this),
        new CollisionsManager(this),
        new CenterCamera(this),
        new Renderer(this),
    ]

    public awake(): void {

        // awake all the systems
        for (const system of this.systems) {
            system.awake()
        }

        // make sure all entities and components are awaken before starting the game
        window.requestAnimationFrame(() => {
            // set initial timestamp
            this._lastTimestamp = Date.now()

            // start the game loop
            this.update()
        })

        console.log(this)
    }

    public update(): void {
        
        // calculate the time passed since last update
        const deltaTime = (Date.now() - this._lastTimestamp) / 1000

        // call update on all the systems
        for (const system of this.systems) {
            system.update(deltaTime)
        }

        // update the current timestamp
        this._lastTimestamp = Date.now()

        // invoke on next frame
        window.requestAnimationFrame(() => this.update())
    }









    // Entities

    public addEntity(entity: Entity): void {
        this.entities.push(entity)
    }

    public removeEntity(entity: Entity): void {
        const index = this.entities.indexOf(entity)
        if (index !== -1) {
            this.entities.splice(index, 1)
        }
    }

    public getEntitiesByTag(tag: string): Entity[] {
        return this.entities.filter(entity => entity.tag === tag)
    }

    public getEntityById(id: string): Entity | undefined {
        return this.entities.find(entity => entity.id === id)
    }

    public getEntities<C extends Entity>(constr: Class<C>): C[] {
        return this.entities.filter(entity => entity instanceof constr) as C[]
    }
    
}