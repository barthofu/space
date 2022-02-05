import { Entity, System } from '@ecs'
import { Spaceship, Camera, Asteroid, Planet } from '@entities'
import { Renderer, ControlPlayer, CollisionsManager, CenterCamera, MoveEntities, ShootBullet, BulletManager, Debug, Thrust, RenderCollisions, ClearCanvas } from '@systems'

import { InputsHandler } from './InputsHandler'
import { StateManager } from './StateManager'

export default class Engine extends Entity {

    private _lastTimestamp = 0
    private readonly _input = new InputsHandler()
    private readonly _state = new StateManager()

    public entities: Entity[] = [
        new Spaceship(),
        new Camera(true),
        new Asteroid(100, { x: 5380, y: 4950 }),
        new Planet('assets/planets/planet_pink.png', { x: 4500, y: 5300 }, 500, 1.45)
    ]
    
    public systems: System[] = [
        new ClearCanvas(this),
        new ControlPlayer(this),
        new MoveEntities(this),
        new ShootBullet(this),
        new BulletManager(this),
        new Thrust(this),
        new CollisionsManager(this),
        new CenterCamera(this),
        //new RenderCollisions(this),
        new Renderer(this),
        new Debug(this)
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

    // InputsHandler

    public get input(): InputsHandler {
        return this._input
    }
    
    // StateManager

    public get state(): StateManager {
        return this._state
    }
}