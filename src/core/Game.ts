import { Spaceship, Camera, Asteroid } from '@entities'
import { Renderer } from '@systems'

import { Entity, System } from '@ecs'

export class Game extends Entity {

    private _lastTimestamp = 0
    public entities: Entity[] = [
        new Spaceship(),
        new Camera(true),
        new Asteroid()

    ]
    public systems: System[] = [
        new Renderer(this)
    ]

    public awake(): void {
        super.awake()

        // awake all the child entities
        for (const entity of this.entities) {
            entity.awake()
        }

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
        
        // call update on all the entities
        super.update(deltaTime)

        // call update on all the child entities
        for (const entity of this.entities) {
            entity.update(deltaTime)
        }

        // call update on all the systems
        for (const system of this.systems) {
            system.update()
        }

        // update the current timestamp
        this._lastTimestamp = Date.now()

        // invoke on next frame
        window.requestAnimationFrame(() => this.update())
    }









    // Utils

    public getEntitiesByTag(tag: string): Entity[] {
        return this.entities.filter(entity => entity.getTag() === tag)
    }

    public getEntities<C extends Entity>(constr: constr<C>): C[] {
        return this.entities.filter(entity => entity instanceof constr) as C[]
    }
    
}